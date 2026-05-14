import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import type { Build } from '@/types';

export function BuildsPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const { t } = useTranslation();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);

  const loadBuilds = () => {
    if (!siteId) return;
    api.listBuilds(Number(siteId))
      .then((res) => setBuilds(res.builds || []))
      .catch(() => setBuilds([]))
      .finally(() => setLoading(false));
  };

  useEffect(loadBuilds, [siteId]);

  const handleTrigger = async () => {
    if (!siteId) return;
    setTriggering(true);
    try {
      await api.triggerBuild(Number(siteId));
      loadBuilds();
    } catch { /* ignore */ }
    finally { setTriggering(false); }
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    failure: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  };

  const statusLabels: Record<string, string> = {
    pending: t('builds.statusPending'),
    in_progress: t('builds.statusInProgress'),
    success: t('builds.statusSuccess'),
    failure: t('builds.statusFailure'),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">{t('builds.title')}</h1>
        <div className="flex gap-2">
          <button onClick={loadBuilds} className="rounded-md border border-[hsl(var(--input))] px-4 py-2 text-sm hover:bg-[hsl(var(--accent))]">
            {t('builds.refresh')}
          </button>
          <button onClick={handleTrigger} disabled={triggering} className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90 disabled:opacity-50">
            {triggering ? t('builds.triggering') : t('builds.trigger')}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">{t('common.loading')}</div>
      ) : builds.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[hsl(var(--border))] p-12 text-center">
          <p className="text-[hsl(var(--muted-foreground))]">{t('builds.noBuilds')}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {builds.map((build) => (
            <div key={build.id} className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[build.status] || ''}`}>
                  {statusLabels[build.status] || build.status}
                </span>
                <span className="text-sm text-[hsl(var(--muted-foreground))]">#{build.run_id || build.id}</span>
              </div>
              <div className="text-right text-sm text-[hsl(var(--muted-foreground))]">
                <div>{formatDate(build.triggered_at)}</div>
                {build.completed_at && <div>{formatDate(build.completed_at)}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
