import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import yaml from 'js-yaml';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MarkdownPreview } from '@/components/ui/markdown-preview';
import {
  Save,
  Send,
  ArrowLeft,
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  Image,
  Table,
  FileCode,
  Eye,
  Columns,
} from 'lucide-react';

function splitFrontmatter(content: string): { frontmatter: string; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: '---\n---', body: content };
  return { frontmatter: `---\n${match[1]}\n---`, body: match[2] };
}

interface FrontmatterData {
  title: string;
  date: string;
  tags: string[];
  categories: string;
  abbrlink: string;
  math: boolean;
  toc: boolean;
  sticky: number | string;
  excerpt: string;
  [key: string]: unknown;
}

function parseFrontmatterData(fmText: string): FrontmatterData {
  const match = fmText.match(/^---\n([\s\S]*?)\n---$/);
  if (!match) {
    return { title: '', date: '', tags: [], categories: '', abbrlink: '', math: false, toc: true, sticky: 0, excerpt: '' };
  }
  try {
    const parsed = yaml.load(match[1]) as Record<string, unknown>;
    return {
      title: String(parsed.title || ''),
      date: String(parsed.date || ''),
      tags: Array.isArray(parsed.tags) ? parsed.tags.map(String) : [],
      categories: String(parsed.categories || ''),
      abbrlink: String(parsed.abbrlink || ''),
      math: Boolean(parsed.math),
      toc: parsed.toc !== false,
      sticky: Number(parsed.sticky) || 0,
      excerpt: String(parsed.excerpt || ''),
      ...Object.fromEntries(
        Object.entries(parsed).filter(([k]) =>
          !['title','date','tags','categories','abbrlink','math','toc','sticky','excerpt'].includes(k)
        )
      ),
    };
  } catch {
    return { title: '', date: '', tags: [], categories: '', abbrlink: '', math: false, toc: true, sticky: 0, excerpt: '' };
  }
}

function buildFrontmatterYaml(data: FrontmatterData): string {
  const lines: string[] = ['---'];
  lines.push(`title: ${data.title ? JSON.stringify(data.title) : "''"}`);
  if (data.date) lines.push(`date: ${JSON.stringify(data.date)}`);
  if (data.abbrlink) lines.push(`abbrlink: ${data.abbrlink}`);
  if (data.tags.length > 0) {
    lines.push('tags:');
    data.tags.forEach(t => lines.push(`  - ${JSON.stringify(t)}`));
  } else {
    lines.push('tags: []');
  }
  if (data.categories) lines.push(`categories: ${JSON.stringify(data.categories)}`);
  lines.push(`math: ${data.math}`);
  lines.push(`toc: ${data.toc}`);
  if (data.sticky) lines.push(`sticky: ${data.sticky}`);
  if (data.excerpt) lines.push(`excerpt: ${JSON.stringify(data.excerpt)}`);
  // Preserve unknown fields
  const knownKeys = new Set(['title','date','tags','categories','abbrlink','math','toc','sticky','excerpt']);
  for (const [key, value] of Object.entries(data)) {
    if (!knownKeys.has(key) && value !== undefined && value !== '') {
      if (typeof value === 'string') lines.push(`${key}: ${JSON.stringify(value)}`);
      else if (typeof value === 'boolean') lines.push(`${key}: ${value}`);
      else if (typeof value === 'number') lines.push(`${key}: ${value}`);
      else lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

export function PostEditPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const [searchParams] = useSearchParams();
  const postPath = searchParams.get('path') || '';

  const [fmData, setFmData] = useState<FrontmatterData>({
    title: '', date: '', tags: [], categories: '', abbrlink: '', math: false, toc: true, sticky: 0, excerpt: '',
  });
  const [body, setBody] = useState('');
  const [sha, setSha] = useState('');
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'source' | 'preview' | 'split'>('source');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (!siteId || !postPath) return;
    api.getPost(Number(siteId), postPath)
      .then((res) => {
        const { frontmatter, body: b } = splitFrontmatter(res.post.content);
        setFmData(parseFrontmatterData(frontmatter));
        setBody(b);
        setSha(res.post.sha);
      })
      .catch(() => setMessage('加载失败'));
  }, [siteId, postPath]);

  const save = async () => {
    if (!siteId) return;
    setSaving(true);
    setMessage('');
    try {
      const fmYaml = buildFrontmatterYaml(fmData);
      const content = fmYaml + '\n' + body;
      const res = await api.savePost(Number(siteId), postPath, content, sha);
      setSha(res.post.sha);
      setMessage('保存成功');
    } catch {
      setMessage('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    if (!siteId) return;
    setPublishing(true);
    setMessage('');
    try {
      const fmYaml = buildFrontmatterYaml(fmData);
      const content = fmYaml + '\n' + body;
      await api.savePost(Number(siteId), postPath, content, sha);
      await api.triggerBuild(Number(siteId));
      setMessage('发布成功，CI 已触发');
    } catch {
      setMessage('发布失败');
    } finally {
      setPublishing(false);
    }
  };

  // Toolbar action
  const insert = useCallback((before: string, after: string, placeholder: string) => {
    const ta = document.querySelector<HTMLTextAreaElement>('#editor-textarea');
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = body.substring(start, end) || placeholder;
    const newText = body.substring(0, start) + before + selected + after + body.substring(end);
    setBody(newText);
    requestAnimationFrame(() => {
      ta.selectionStart = start + before.length;
      ta.selectionEnd = start + before.length + selected.length;
      ta.focus();
    });
  }, [body]);

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !fmData.tags.includes(tag)) {
      setFmData({ ...fmData, tags: [...fmData.tags, tag] });
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setFmData({ ...fmData, tags: fmData.tags.filter(t => t !== tag) });
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const val = ta.value;
      setBody(val.substring(0, start) + '  ' + val.substring(end));
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      save();
    }
  }, [body, save]);

  const toolbarButtons = [
    { icon: Bold, action: () => insert('**', '**', '粗体'), title: '加粗' },
    { icon: Italic, action: () => insert('*', '*', '斜体'), title: '斜体' },
    { icon: Heading2, action: () => insert('## ', '', '标题'), title: '标题' },
    { icon: List, action: () => insert('- ', '', '列表项'), title: '无序列表' },
    { icon: ListOrdered, action: () => insert('1. ', '', '列表项'), title: '有序列表' },
    { icon: Quote, action: () => insert('> ', '', '引用'), title: '引用' },
    { icon: Code, action: () => insert('`', '`', '代码'), title: '行内代码' },
    { icon: Link2, action: () => insert('[', '](url)', '链接文本'), title: '链接' },
    { icon: Image, action: () => insert('![', '](url)', '图片描述'), title: '图片' },
    { icon: Table, action: () => insert('\n| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| ', ' | 数据 | 数据 |\n', '数据'), title: '表格' },
  ];

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link to={`/sites/${siteId}/posts`} className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />返回列表
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={save} disabled={saving}>
            <Save className="h-4 w-4 mr-1" />{saving ? '保存中...' : '保存'}
          </Button>
          <Button size="sm" onClick={publish} disabled={publishing}>
            <Send className="h-4 w-4 mr-1" />{publishing ? '发布中...' : '发布'}
          </Button>
        </div>
      </div>

      {message && (
        <div className={`rounded-md px-4 py-2 text-sm ${
          message.includes('失败') ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
        }`}>
          {message}
        </div>
      )}

      {/* Frontmatter Form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">文章元数据</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-medium mb-1">标题</label>
              <Input value={fmData.title} onChange={(e) => setFmData({ ...fmData, title: e.target.value })} placeholder="文章标题" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">日期</label>
              <Input value={fmData.date} onChange={(e) => setFmData({ ...fmData, date: e.target.value })} placeholder="2024-01-01 12:00:00" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">分类</label>
              <Input value={fmData.categories} onChange={(e) => setFmData({ ...fmData, categories: e.target.value })} placeholder="分类名称" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">标签</label>
              <div className="flex gap-1.5 flex-wrap mb-1.5">
                {fmData.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/20" onClick={() => removeTag(tag)}>
                    {tag} &times;
                  </Badge>
                ))}
              </div>
              <div className="flex gap-1">
                <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="添加标签" className="flex-1" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                <Button variant="outline" size="sm" onClick={addTag}>+</Button>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={fmData.toc} onChange={(e) => setFmData({ ...fmData, toc: e.target.checked })} className="rounded" />
                目录
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={fmData.math} onChange={(e) => setFmData({ ...fmData, math: e.target.checked })} className="rounded" />
                数学公式
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">置顶优先级</label>
              <Input type="number" value={fmData.sticky || ''} onChange={(e) => setFmData({ ...fmData, sticky: Number(e.target.value) || 0 })} placeholder="0" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <div className="border border-[hsl(var(--border))] rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5">
          <div className="flex items-center gap-0.5">
            {toolbarButtons.map((btn, i) => (
              <Button key={i} variant="ghost" size="icon" className="h-7 w-7" onClick={btn.action} title={btn.title}>
                <btn.icon className="h-3.5 w-3.5" />
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Button variant={activeTab === 'source' ? 'secondary' : 'ghost'} size="sm" className="h-7 text-xs" onClick={() => setActiveTab('source')}>
              <FileCode className="h-3.5 w-3.5 mr-1" />源码
            </Button>
            <Button variant={activeTab === 'split' ? 'secondary' : 'ghost'} size="sm" className="h-7 text-xs" onClick={() => setActiveTab('split')}>
              <Columns className="h-3.5 w-3.5 mr-1" />分屏
            </Button>
            <Button variant={activeTab === 'preview' ? 'secondary' : 'ghost'} size="sm" className="h-7 text-xs" onClick={() => setActiveTab('preview')}>
              <Eye className="h-3.5 w-3.5 mr-1" />预览
            </Button>
          </div>
        </div>

        {/* Editor area */}
        <div className="flex" style={{ minHeight: 500 }}>
          {(activeTab === 'source' || activeTab === 'split') && (
            <textarea
              id="editor-textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`bg-[hsl(var(--background))] text-sm font-mono leading-relaxed p-4 resize-none outline-none ${
                activeTab === 'split' ? 'w-1/2 border-r border-[hsl(var(--border))]' : 'w-full'
              }`}
              style={{ minHeight: 500 }}
              spellCheck={false}
              placeholder="开始写作..."
            />
          )}
          {(activeTab === 'preview' || activeTab === 'split') && (
            <div className={`${activeTab === 'split' ? 'w-1/2' : 'w-full'} overflow-auto bg-[hsl(var(--background))]`}>
              <MarkdownPreview content={body} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
