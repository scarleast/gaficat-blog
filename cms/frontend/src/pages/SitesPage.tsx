import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import type { Site } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  FileText,
  Settings,
  Trash2,
  Globe,
  GitBranch,
  X,
} from 'lucide-react';

interface GitHubRepo {
  full_name: string;
  name: string;
  private: boolean;
  default_branch: string;
  description: string | null;
  html_url: string;
}

export function SitesPage() {
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
      .then((res) => res.json() as Promise<{ repos: GitHubRepo[] }>)
      .then((data) => setRepos(data.repos || []))
      .catch(() => setRepos([]))
      .finally(() => setReposLoading(false));
  };

  useEffect(loadSites, []);

  useEffect(() => {
    if (showForm && repos.length === 0) loadRepos();
  }, [showForm]);

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
    setForm({ ...form, repo_full_name: repo.full_name, branch: repo.default_branch, name: form.name || repo.name });
    setRepoSearch(repo.full_name);
    setRepoDropdownOpen(false);
  };

  const filteredRepos = repos.filter((r) => r.full_name.toLowerCase().includes(repoSearch.toLowerCase()));

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createSite(form);
    setShowForm(false);
    setForm({ name: '', repo_full_name: '', branch: 'main', content_dir: 'src/content/blog/posts', media_dir: 'src/content/blog/posts', framework: 'astro' });
    setRepoSearch('');
    loadSites();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除此站点吗？')) return;
    await api.deleteSite(id);
    loadSites();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">站点管理</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">管理你的博客站点</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {showForm ? '取消' : '创建站点'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>新建站点</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1.5">站点名称</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="我的博客" />
                </div>
                <div className="relative" ref={repoDropdownRef}>
                  <label className="block text-sm font-medium mb-1.5">GitHub 仓库</label>
                  <Input
                    value={repoSearch}
                    onChange={(e) => { setRepoSearch(e.target.value); setRepoDropdownOpen(true); setForm({ ...form, repo_full_name: e.target.value }); }}
                    onFocus={() => setRepoDropdownOpen(true)}
                    required
                    placeholder={reposLoading ? '加载中...' : '搜索或输入 owner/repo'}
                    disabled={reposLoading}
                  />
                  {repoDropdownOpen && filteredRepos.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-lg">
                      {filteredRepos.map((repo) => (
                        <button key={repo.full_name} type="button" onClick={() => handleSelectRepo(repo)} className="w-full px-3 py-2 text-left text-sm hover:bg-[hsl(var(--accent))] flex items-center justify-between">
                          <span className="truncate font-medium">{repo.full_name}</span>
                          {repo.private && <Badge variant="outline" className="text-xs ml-2">private</Badge>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">分支</label>
                  <Input value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">内容目录</label>
                  <Input value={form.content_dir} onChange={(e) => setForm({ ...form, content_dir: e.target.value })} />
                </div>
              </div>
              <Button type="submit">创建</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" />
        </div>
      ) : sites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Globe className="h-12 w-12 mx-auto text-[hsl(var(--muted-foreground))] mb-4" />
            <p className="text-[hsl(var(--muted-foreground))]">暂无站点数据</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sites.map((site) => (
            <Card key={site.id} className="hover:shadow-md transition-all">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  {/* Clickable site title + info */}
                  <Link to={`/sites/${site.id}/posts`} className="flex-1 min-w-0 hover:opacity-80 transition-opacity">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="h-5 w-5 text-[hsl(var(--primary))]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[hsl(var(--foreground))] truncate">{site.name}</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{site.repo_full_name}</p>
                      </div>
                    </div>
                  </Link>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <Badge variant="secondary">{site.framework}</Badge>
                    <Separator orientation="vertical" className="h-6" />
                    <Link to={`/sites/${site.id}/posts`}>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-1" />文章
                      </Button>
                    </Link>
                    <Link to={`/sites/${site.id}/builds`}>
                      <Button variant="ghost" size="sm">
                        <GitBranch className="h-4 w-4 mr-1" />构建
                      </Button>
                    </Link>
                    <Link to={`/sites/${site.id}/settings`}>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(site.id)} className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
