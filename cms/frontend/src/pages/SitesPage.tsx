import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import type { Site } from '@/types';

interface GitHubRepo {
  full_name: string;
  name: string;
  private: boolean;
  default_branch: string;
  description: string | null;
  html_url: string;
}

export function SitesPage() {
  const { t } = useTranslation();
  const [sites, setSites] = useState<Site[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [repoSearch, setRepoSearch] = useState('');
  const [repoDropdownOpen, setRepoDropdownOpen] = useState(false);
  const repoDropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '',
    repo_full_name: '',
    branch: 'main',
    content_dir: 'src/content/blog/posts',
    media_dir: 'src/content/blog/posts',
    framework: 'astro',
    build_command: '',
    output_dir: '',
  });

  const loadSites = () => {
    api.listSites()
      .then((res) => setSites(res.sites || []))
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  };

  const loadRepos = () => {
    setReposLoading(true);
    fetch('/api/repos', {
      headers: { Authorization: `Bearer ${api.getToken()}` },
    })
      .then((res) => res.json<{ repos: GitHubRepo[] }>())
      .then((data) => setRepos(data.repos || []))
      .catch(() => setRepos([]))
      .finally(() => setReposLoading(false));
  };

  useEffect(loadSites, []);

  useEffect(() => {
    if (showForm && repos.length === 0) loadRepos();
  }, [showForm]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (repoDropdownRef.current && !repoDropdownRef.current.contains(e.target as Node)) {
        setRepoDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelectRepo = (repo: GitHubRepo) => {
    setForm({
      ...form,
      repo_full_name: repo.full_name,
      branch: repo.default_branch,
      name: form.name || repo.name,
    });
    setRepoSearch(repo.full_name);
    setRepoDropdownOpen(false);
  };

  const filteredRepos = repos.filter((r) =>
    r.full_name.toLowerCase().includes(repoSearch.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createSite(form);
    setShowForm(false);
    setForm({ name: '', repo_full_name: '', branch: 'main', content_dir: 'source/_posts', media_dir: 'source/_posts', framework: 'astro', build_command: '', output_dir: '' });
    setRepoSearch('');
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

            {/* Repo selector with search dropdown */}
            <div className="relative" ref={repoDropdownRef}>
              <label className="block text-sm font-medium mb-1">{t('sites.repo')}</label>
              <input
                value={repoSearch}
                onChange={(e) => {
                  setRepoSearch(e.target.value);
                  setRepoDropdownOpen(true);
                  setForm({...form, repo_full_name: e.target.value});
                }}
                onFocus={() => setRepoDropdownOpen(true)}
                required
                placeholder={reposLoading ? t('common.loading') : t('sites.repoPlaceholder')}
                disabled={reposLoading}
                className="w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm"
              />
              {repoDropdownOpen && filteredRepos.length > 0 && (
                <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-lg">
                  {filteredRepos.map((repo) => (
                    <button
                      key={repo.full_name}
                      type="button"
                      onClick={() => handleSelectRepo(repo)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-[hsl(var(--accent))] flex items-center justify-between"
                    >
                      <span className="truncate">
                        <span className="font-medium">{repo.full_name}</span>
                        {repo.private && <span className="ml-1 text-xs text-[hsl(var(--muted-foreground))]">(private)</span>}
                      </span>
                      {repo.description && (
                        <span className="ml-2 text-xs text-[hsl(var(--muted-foreground))] truncate max-w-[40%]">{repo.description}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
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
