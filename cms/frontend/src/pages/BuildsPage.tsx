import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import type { Build } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  RefreshCw,
  FileText,
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  ExternalLink,
} from 'lucide-react';

export function BuildsPage() {
  const { siteId } = useParams<{ siteId: string }>();
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

  const statusConfig: Record<string, { icon: React.ElementType; variant: 'success' | 'destructive' | 'warning' | 'info'; label: string }> = {
    pending: { icon: Clock, variant: 'warning', label: '等待中' },
    in_progress: { icon: Loader2, variant: 'info', label: '进行中' },
    success: { icon: CheckCircle2, variant: 'success', label: '成功' },
    failure: { icon: XCircle, variant: 'destructive', label: '失败' },
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex gap-1 border-b border-[hsl(var(--border))]">
        <Link to={`/sites/${siteId}/posts`} className="px-4 py-2.5 text-sm border-b-2 border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          <FileText className="h-4 w-4 inline mr-1" />文章
        </Link>
        <Link to={`/sites/${siteId}/builds`} className="px-4 py-2.5 text-sm border-b-2 border-[hsl(var(--primary))] text-[hsl(var(--foreground))] font-medium">
          构建
        </Link>
        <Link to={`/sites/${siteId}/settings`} className="px-4 py-2.5 text-sm border-b-2 border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          设置
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">CI/CD 状态</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">构建由 GitHub Actions 管理</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadBuilds}>
            <RefreshCw className="h-4 w-4 mr-2" />刷新
          </Button>
          <Button size="sm" onClick={handleTrigger} disabled={triggering}>
            {triggering ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {triggering ? '触发中...' : '触发构建'}
          </Button>
        </div>
      </div>

      {/* Latest build highlight */}
      {!loading && builds.length > 0 && (() => {
        const latest = builds[0];
        const cfg = statusConfig[latest.status] || statusConfig.pending;
        const Icon = cfg.icon;
        return (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    latest.status === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                    latest.status === 'failure' ? 'bg-red-100 dark:bg-red-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      latest.status === 'success' ? 'text-emerald-600 dark:text-emerald-400' :
                      latest.status === 'failure' ? 'text-red-600 dark:text-red-400' :
                      'text-blue-600 dark:text-blue-400'
                    } ${latest.status === 'in_progress' ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <p className="font-medium text-[hsl(var(--foreground))]">最新构建</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">#{latest.run_id || latest.id} · {formatDate(latest.triggered_at)}</p>
                  </div>
                </div>
                <Badge variant={cfg.variant}>{cfg.label}</Badge>
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* Build history */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" />
        </div>
      ) : builds.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-[hsl(var(--muted-foreground))]">暂无构建记录</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {builds.map((build) => {
            const cfg = statusConfig[build.status] || statusConfig.pending;
            const Icon = cfg.icon;
            return (
              <Card key={build.id}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${
                        build.status === 'success' ? 'text-emerald-600' :
                        build.status === 'failure' ? 'text-red-500' :
                        'text-blue-500'
                      } ${build.status === 'in_progress' ? 'animate-spin' : ''}`} />
                      <span className="text-sm text-[hsl(var(--muted-foreground))]">#{build.run_id || build.id}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={cfg.variant} className="text-xs">{cfg.label}</Badge>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{formatDate(build.triggered_at)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
