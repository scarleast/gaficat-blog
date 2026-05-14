import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import type { Site } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FileText, Settings, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SiteSettingsPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();
  const [site, setSite] = useState<Site | null>(null);
  const [form, setForm] = useState<Partial<Site>>({});

  useEffect(() => {
    if (!siteId) return;
    api.getSite(Number(siteId))
      .then((res) => { setSite(res.site); setForm(res.site); })
      .catch(() => navigate('/'));
  }, [siteId]);

  if (!site) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" />
    </div>
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateSite(site!.id, form);
    navigate('/');
  };

  const fields: { key: keyof Site; label: string }[] = [
    { key: 'name', label: '站点名称' },
    { key: 'repo_full_name', label: 'GitHub 仓库' },
    { key: 'branch', label: '分支' },
    { key: 'content_dir', label: '内容目录' },
    { key: 'media_dir', label: '媒体目录' },
    { key: 'framework', label: '框架' },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex gap-1 border-b border-[hsl(var(--border))]">
        <Link to={`/sites/${siteId}/posts`} className="px-4 py-2.5 text-sm border-b-2 border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          <FileText className="h-4 w-4 inline mr-1" />文章
        </Link>
        <Link to={`/sites/${siteId}/builds`} className="px-4 py-2.5 text-sm border-b-2 border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          构建
        </Link>
        <Link to={`/sites/${siteId}/settings`} className="px-4 py-2.5 text-sm border-b-2 border-[hsl(var(--primary))] text-[hsl(var(--foreground))] font-medium">
          <Settings className="h-4 w-4 inline mr-1" />设置
        </Link>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>站点设置</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              {fields.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1.5">{label}</label>
                  <Input
                    value={(form[key] as string) ?? ''}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}
              <Separator />
              <div className="flex gap-3">
                <Button type="submit">保存</Button>
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>取消</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
