import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import type { Post } from '@/types';

export function PostsPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!siteId) return;
    api.listPosts(Number(siteId))
      .then((res) => setPosts(res.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [siteId]);

  const handleDelete = async (path: string, sha: string) => {
    if (!confirm(t('posts.deleteConfirm'))) return;
    await api.deletePost(Number(siteId), path, sha);
    setPosts(posts.filter((p) => p.path !== path));
  };

  const filtered = search
    ? posts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : posts;

  const tabs = [
    { path: 'posts', label: t('sites.posts') },
    { path: 'media', label: t('sites.media') },
    { path: 'builds', label: t('sites.builds') },
    { path: 'settings', label: t('sites.settings') },
  ];

  return (
    <div>
      {/* Site sub-navigation */}
      <div className="flex gap-1 mb-6 border-b border-[hsl(var(--border))]">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={`/sites/${siteId}/${tab.path === 'posts' ? 'posts' : tab.path}`}
            className="px-4 py-2 text-sm border-b-2 border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">{t('posts.title')}</h1>
        <Link
          to={`/sites/${siteId}/posts/edit`}
          className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90"
        >
          {t('posts.create')}
        </Link>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('posts.search')}
        className="mb-4 w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm"
      />

      {loading ? (
        <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">{t('common.loading')}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[hsl(var(--border))] p-12 text-center">
          <p className="text-[hsl(var(--muted-foreground))]">{t('posts.noPosts')}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((post) => (
            <div key={post.path} className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-[hsl(var(--foreground))] truncate">
                  {(post.frontmatter as Record<string, string>)?.title || post.name}
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{post.name}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link
                  to={`/sites/${siteId}/posts/edit?path=${encodeURIComponent(post.path)}`}
                  className="text-sm text-[hsl(var(--primary))] hover:underline"
                >
                  {t('posts.edit')}
                </Link>
                <button onClick={() => handleDelete(post.path, post.sha)} className="text-sm text-red-500 hover:underline">
                  {t('posts.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
