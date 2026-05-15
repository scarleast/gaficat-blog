import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import type { Post } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Search,
  FileText,
  Pencil,
  Trash2,
  FolderOpen,
  Tag,
  CalendarDays,
} from 'lucide-react';

interface PostMeta {
  path: string;
  name: string;
  title: string;
  tags: string[];
  categories: string[];
  date: string;
  updated: string;
}

export function PostsPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postMetas, setPostMetas] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'tags' | 'categories'>('all');

  useEffect(() => {
    if (!siteId) return;
    api.listPosts(Number(siteId))
      .then((res) => {
        setPosts(res.posts || []);
        const metas: PostMeta[] = (res.posts || []).map((p) => {
          const fm = p.frontmatter || {};
          const dateRaw = fm.date instanceof Date
            ? fm.date.toISOString().replace('T', ' ').slice(0, 19)
            : String(fm.date || '');
          return {
            path: p.path,
            name: p.name,
            title: String(fm.title || p.name.replace(/\.(md|mdx)$/, '').replace(/-/g, ' ')),
            tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
            categories: fm.categories ? [String(fm.categories)] : extractCategoryFromPath(p.path),
            date: dateRaw,
            updated: fm.updated ? String(fm.updated) : dateRaw,
          };
        });
        setPostMetas(metas);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [siteId]);

  const extractCategoryFromPath = (path: string): string[] => {
    const parts = path.split('/');
    if (parts.length > 1) return [parts[0]];
    return [];
  };

  // Collect all unique tags and categories
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    postMetas.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [postMetas]);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    postMetas.forEach(p => p.categories.forEach(c => cats.add(c)));
    return Array.from(cats).sort();
  }, [postMetas]);

  const filtered = useMemo(() => {
    let result = postMetas;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.name.toLowerCase().includes(q));
    }
    if (activeTag) {
      result = result.filter(p => p.tags.includes(activeTag));
    }
    if (activeCategory) {
      result = result.filter(p => p.categories.includes(activeCategory));
    }
    return result;
  }, [postMetas, search, activeTag, activeCategory]);

  const handleDelete = async (path: string, sha: string) => {
    if (!confirm('确定要删除此文章吗？')) return;
    await api.deletePost(Number(siteId), path, sha);
    setPosts(posts.filter((p) => p.path !== path));
    setPostMetas(postMetas.filter((p) => p.path !== path));
  };

  // Group by category for category view
  const groupedByCategory = useMemo(() => {
    const groups: Record<string, PostMeta[]> = {};
    filtered.forEach(p => {
      const cat = p.categories[0] || '未分类';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [filtered]);

  const tabs = [
    { path: 'posts', label: '文章', icon: FileText },
    { path: 'builds', label: '构建', icon: Tag },
    { path: 'settings', label: '设置', icon: FolderOpen },
  ];

  return (
    <div className="space-y-6">
      {/* Site sub-navigation */}
      <div className="flex gap-1 border-b border-[hsl(var(--border))]">
        <Link to={`/sites/${siteId}/posts`} className="px-4 py-2.5 text-sm border-b-2 border-[hsl(var(--primary))] text-[hsl(var(--foreground))] font-medium">
          <FileText className="h-4 w-4 inline mr-1" />文章
        </Link>
        <Link to={`/sites/${siteId}/builds`} className="px-4 py-2.5 text-sm border-b-2 border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          构建
        </Link>
        <Link to={`/sites/${siteId}/settings`} className="px-4 py-2.5 text-sm border-b-2 border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          设置
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">文章管理</h1>
        <Link to={`/sites/${siteId}/posts/edit`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新建文章
          </Button>
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索文章..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant={filterMode === 'all' ? 'default' : 'outline'} size="sm" onClick={() => { setFilterMode('all'); setActiveTag(null); setActiveCategory(null); }}>
            全部
          </Button>
          <Button variant={filterMode === 'categories' ? 'default' : 'outline'} size="sm" onClick={() => setFilterMode('categories')}>
            <FolderOpen className="h-3.5 w-3.5 mr-1" />分类
          </Button>
          <Button variant={filterMode === 'tags' ? 'default' : 'outline'} size="sm" onClick={() => setFilterMode('tags')}>
            <Tag className="h-3.5 w-3.5 mr-1" />标签
          </Button>
        </div>
      </div>

      {/* Category filter chips */}
      {filterMode === 'categories' && allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge variant={activeCategory === null ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setActiveCategory(null)}>
            全部分类
          </Badge>
          {allCategories.map(cat => (
            <Badge key={cat} variant={activeCategory === cat ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}>
              {cat}
            </Badge>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-[hsl(var(--muted-foreground))] mb-4" />
            <p className="text-[hsl(var(--muted-foreground))]">暂无文章</p>
          </CardContent>
        </Card>
      ) : filterMode === 'categories' ? (
        // Grouped by category
        <div className="space-y-6">
          {Object.entries(groupedByCategory).map(([cat, catPosts]) => (
            <div key={cat}>
              <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2 flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />{cat} ({catPosts.length})
              </h3>
              <div className="space-y-2">
                {catPosts.map((post) => {
                  const original = posts.find(p => p.path === post.path);
                  return (
                    <Card key={post.path} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <Link to={`/sites/${siteId}/posts/edit?path=${encodeURIComponent(post.path)}`} className="min-w-0 flex-1 hover:opacity-80">
                            <p className="font-medium text-[hsl(var(--foreground))] truncate">{post.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {post.date && <span className="flex items-center gap-0.5 text-xs text-[hsl(var(--muted-foreground))]"><CalendarDays className="h-3 w-3" />{post.date.slice(0, 10)}</span>}
                              {post.tags.length > 0 && <span className="flex items-center gap-0.5 text-xs text-[hsl(var(--muted-foreground))]"><Tag className="h-3 w-3" />{post.tags.slice(0, 2).join(', ')}</span>}
                            </div>
                          </Link>
                          <div className="flex items-center gap-1 ml-3">
                            <Link to={`/sites/${siteId}/posts/edit?path=${encodeURIComponent(post.path)}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                            {original && (
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(post.path, original.sha)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Flat list
        <div className="space-y-2">
          {filtered.map((post) => {
            const original = posts.find(p => p.path === post.path);
            return (
              <Card key={post.path} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <Link to={`/sites/${siteId}/posts/edit?path=${encodeURIComponent(post.path)}`} className="min-w-0 flex-1 hover:opacity-80">
                      <p className="font-medium text-[hsl(var(--foreground))] truncate">{post.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {post.date && (
                          <span className="flex items-center gap-0.5 text-xs text-[hsl(var(--muted-foreground))]"><CalendarDays className="h-3 w-3" />{post.date.slice(0, 10)}</span>
                        )}
                        {post.categories.length > 0 && (
                          <span className="flex items-center gap-0.5 text-xs text-[hsl(var(--muted-foreground))]"><FolderOpen className="h-3 w-3" />{post.categories[0]}</span>
                        )}
                        {post.tags.length > 0 && (
                          <span className="flex items-center gap-0.5 text-xs text-[hsl(var(--muted-foreground))]"><Tag className="h-3 w-3" />{post.tags.slice(0, 2).join(', ')}</span>
                        )}
                      </div>
                    </Link>
                    <div className="flex items-center gap-1 ml-3">
                      <Link to={`/sites/${siteId}/posts/edit?path=${encodeURIComponent(post.path)}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      {original && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(post.path, original.sha)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
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
