import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import type { Build } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RefreshCw,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  ExternalLink,
  GitBranch,
  Ban,
} from 'lucide-react';

function timeAgo(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;
  return d.toLocaleDateString('zh-CN');
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  pending: { icon: Clock, color: 'text-amber-500', label: '排队中' },
  in_progress: { icon: Loader2, color: 'text-blue-500', label: '运行中' },
  success: { icon: CheckCircle2, color: 'text-emerald-500', label: '成功' },
  failure: { icon: XCircle, color: 'text-red-500', label: '失败' },
  cancelled: { icon: Ban, color: 'text-zinc-400', label: '已取消' },
  unknown: { icon: Clock, color: 'text-zinc-400', label: '未知' },
};

export function BuildsPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);

  const loadBuilds = () => {
    if (!siteId) return;
    setLoading(true);
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
      // Refresh after a short delay to let GitHub pick up the dispatch
      setTimeout(loadBuilds, 2000);
    } catch { /* ignore */ }
    finally { setTriggering(false); }
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
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />刷新
          </Button>
          <Button size="sm" onClick={handleTrigger} disabled={triggering}>
            {triggering && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {triggering ? '触发中...' : '触发构建'}
          </Button>
        </div>
      </div>

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
            const cfg = statusConfig[build.status] || statusConfig.unknown;
            const Icon = cfg.icon;
            return (
              <Card key={build.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`h-5 w-5 flex-shrink-0 ${cfg.color} ${build.status === 'in_progress' ? 'animate-spin' : ''}`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{build.name || `#${build.run_id}`}</span>
                          {build.branch && (
                            <span className="flex items-center gap-0.5 text-xs text-[hsl(var(--muted-foreground))] flex-shrink-0">
                              <GitBranch className="h-3 w-3" />{build.branch}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">{timeAgo(build.triggered_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge
                        variant={
                          build.status === 'success' ? 'default' :
                          build.status === 'failure' ? 'destructive' :
                          'secondary'
                        }
                        className="text-xs"
                      >
                        {cfg.label}
                      </Badge>
                      {build.html_url && (
                        <a href={build.html_url} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
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
