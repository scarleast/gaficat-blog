import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface HeatmapProps {
  data: Record<string, number>; // date string 'YYYY-MM-DD' -> count
  months?: number;
}

const COLORS = [
  'bg-[hsl(var(--muted))]',
  'bg-emerald-200 dark:bg-emerald-900/40',
  'bg-emerald-400 dark:bg-emerald-700',
  'bg-emerald-600 dark:bg-emerald-500',
  'bg-emerald-800 dark:bg-emerald-300',
];

const MONTH_LABELS = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const DAY_LABELS = ['周日','周一','周二','周三','周四','周五','周六'];

export function Heatmap({ data, months = 6 }: HeatmapProps) {
  const { weeks, maxCount, monthLabels } = useMemo(() => {
    const now = new Date();
    // End at the end of the current week (Saturday)
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    // Start from Sunday, going back ~months*4 weeks
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - months * 7 * 4 - 6);
    // Align to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    type DayCell = { date: string; count: number; dayOfWeek: number } | null;
    const weeks: DayCell[][] = [];

    const d = new Date(startDate);
    let currentWeek: DayCell[] = [];

    while (d <= endDate) {
      const dayOfWeek = d.getDay();
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      const dateStr = d.toISOString().slice(0, 10);
      currentWeek.push({ date: dateStr, count: data[dateStr] || 0, dayOfWeek });
      d.setDate(d.getDate() + 1);
    }
    // Pad last week to 7 days
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }

    const mc = Math.max(1, ...Object.values(data));
    const ml: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const firstDay = week.find(c => c !== null);
      if (!firstDay) return;
      const m = new Date(firstDay.date).getMonth();
      if (m !== lastMonth) {
        ml.push({ label: MONTH_LABELS[m], weekIndex: i });
        lastMonth = m;
      }
    });

    return { weeks, maxCount: mc, monthLabels: ml };
  }, [data, months]);

  const getColor = (count: number) => {
    if (count === 0) return COLORS[0];
    const level = Math.ceil((count / maxCount) * 4);
    return COLORS[Math.min(level, 4)];
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Month labels */}
        <div className="flex text-xs text-[hsl(var(--muted-foreground))] mb-1" style={{ paddingLeft: 40 }}>
          {monthLabels.map((m, i) => (
            <span
              key={i}
              className="flex-shrink-0"
              style={{ width: 14 * (i < monthLabels.length - 1 ? monthLabels[i + 1].weekIndex - m.weekIndex : weeks.length - m.weekIndex) * 1 }}
            >
              {m.label}
            </span>
          ))}
        </div>
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] text-xs text-[hsl(var(--muted-foreground))]">
            {[0, 1, 2, 3, 4, 5, 6].map(d => (
              <div key={d} className="h-[14px] flex items-center leading-none">
                {[1, 3, 5].includes(d) ? DAY_LABELS[d] : ''}
              </div>
            ))}
          </div>
          {/* Grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  day ? (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.count} 次提交`}
                      className={cn('h-[14px] w-[14px] rounded-[2px] transition-colors', getColor(day.count))}
                    />
                  ) : (
                    <div key={`empty-${di}`} className="h-[14px] w-[14px]" />
                  )
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
