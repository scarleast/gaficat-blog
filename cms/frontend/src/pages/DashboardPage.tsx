import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import type { Site } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heatmap } from '@/components/ui/heatmap';
import { Plus, FileText, Globe, Settings } from 'lucide-react';

export function DashboardPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState<Record<string, number>>({});

  useEffect(() => {
    api.listSites()
      .then((res) => {
        setSites(res.sites || []);
        // Load heatmap for first site
        if (res.sites?.length) {
          fetch(`/api/sites/${res.sites[0].id}/commits`, {
            headers: { Authorization: `Bearer ${api.getToken()}` },
          })
            .then(r => r.json())
            .then(d => setHeatmapData(d.commits || {}))
            .catch(() => {});
        }
      })
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">仪表盘</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">管理你的博客站点和内容</p>
        </div>
        <Link to="/sites">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            创建站点
          </Button>
        </Link>
      </div>

      {/* Heatmap */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">更新热力图</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(heatmapData).length > 0 ? (
            <Heatmap data={heatmapData} />
          ) : (
            <p className="text-sm text-[hsl(var(--muted-foreground))]">暂无提交记录</p>
          )}
        </CardContent>
      </Card>

      {/* Sites */}
      {sites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Globe className="h-12 w-12 mx-auto text-[hsl(var(--muted-foreground))] mb-4" />
            <p className="text-[hsl(var(--muted-foreground))]">还没有站点，点击「创建站点」开始</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <Link key={site.id} to={`/sites/${site.id}/posts`}>
              <Card className="hover:shadow-md transition-all hover:border-[hsl(var(--primary))]/30 cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{site.name}</CardTitle>
                    <Badge variant="secondary">{site.framework}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">{site.repo_full_name}</p>
                  <div className="flex gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                    <Badge variant="outline" className="text-xs">{site.branch}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
