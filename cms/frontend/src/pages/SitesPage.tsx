import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import type { Site } from '@/types';

export function SitesPage() {
  const { t } = useTranslation();
  const [sites, setSites] = useState<Site[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    repo_full_name: '',
    branch: 'main',
    content_dir: 'src/content/posts',
    media_dir: 'src/assets/media',
    framework: 'astro',
    build_command: 'npm run build',
    output_dir: 'dist',
  });

  const loadSites = () => {
    api.listSites()
      .then((res) => setSites(res.sites || []))
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  };

  useEffect(loadSites, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createSite(form);
    setShowForm(false);
    setForm({ name: '', repo_full_name: '', branch: 'main', content_dir: 'src/content/posts', media_dir: 'src/assets/media', framework: 'astro', build_command: 'npm run build', output_dir: 'dist' });
    loadSites();
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t('sites.deleteConfirm'))) return;
    await api.deleteSite(id);
    loadSites();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">{t('sites.title')}</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90"
        >
          {showForm ? t('common.cancel') : t('sites.create')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">{t('sites.name')}</label>
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder={t('sites.namePlaceholder')} className="w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('sites.repo')}</label>
              <input value={form.repo_full_name} onChange={(e) => setForm({...form, repo_full_name: e.target.value})} required placeholder={t('sites.repoPlaceholder')} className="w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('sites.branch')}</label>
              <input value={form.branch} onChange={(e) => setForm({...form, branch: e.target.value})} className="w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('sites.framework')}</label>
              <select value={form.framework} onChange={(e) => setForm({...form, framework: e.target.value})} className="w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm">
                <option value="astro">Astro</option>
                <option value="hexo">Hexo</option>
                <option value="hugo">Hugo</option>
                <option value="jekyll">Jekyll</option>
                <option value="next">Next.js</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('sites.contentDir')}</label>
              <input value={form.content_dir} onChange={(e) => setForm({...form, content_dir: e.target.value})} className="w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('sites.buildCommand')}</label>
              <input value={form.build_command} onChange={(e) => setForm({...form, build_command: e.target.value})} className="w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm" />
            </div>
          </div>
          <button type="submit" className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90">
            {t('sites.save')}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">{t('common.loading')}</div>
      ) : sites.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[hsl(var(--border))] p-12 text-center">
          <p className="text-[hsl(var(--muted-foreground))]">{t('common.noData')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sites.map((site) => (
            <div key={site.id} className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <div>
                <h3 className="font-semibold text-[hsl(var(--foreground))]">{site.name}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{site.repo_full_name} · {site.framework}</p>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/sites/${site.id}/posts`} className="text-sm text-[hsl(var(--primary))] hover:underline">{t('sites.posts')}</a>
                <a href={`/sites/${site.id}/settings`} className="text-sm text-[hsl(var(--muted-foreground))] hover:underline">{t('sites.settings')}</a>
                <button onClick={() => handleDelete(site.id)} className="text-sm text-red-500 hover:underline">{t('sites.delete')}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
