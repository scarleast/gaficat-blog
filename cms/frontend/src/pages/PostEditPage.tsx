import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import yaml from 'js-yaml';
import { Button } from '@/components/ui/button';
import { VditorEditor, VditorEditorHandle } from '@/components/VditorEditor';
import {
  Save,
  Send,
  ArrowLeft,
  Trash2,
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
    const parsed = yaml.load(match[1], { schema: yaml.JSON_SCHEMA }) as Record<string, unknown>;
    const dateRaw = parsed.date instanceof Date ? parsed.date.toISOString().replace('T', ' ').slice(0, 19) : String(parsed.date || '');
    return {
      title: String(parsed.title || ''),
      date: dateRaw,
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
        ).map(([k, v]) => [k, v instanceof Date ? v.toISOString().replace('T', ' ').slice(0, 19) : String(v)])
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
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<VditorEditorHandle>(null);

  const knownKeys = new Set(['title','date','tags','categories','abbrlink','math','toc','sticky','excerpt']);

  const defaultVisible = ['date', 'categories', 'sticky', 'tags'];
  const [visibleFields, setVisibleFields] = useState<string[]>(defaultVisible);

  const allFieldKeys = useMemo(() => {
    const keys = [...visibleFields];
    Object.keys(fmData).forEach(k => {
      if (!knownKeys.has(k) && !keys.includes(k)) keys.push(k);
    });
    return keys;
  }, [visibleFields, fmData]);

  const customFields = useMemo(() => {
    return Object.entries(fmData).filter(([k]) => !knownKeys.has(k) && fmData[k] !== undefined) as [string, string][];
  }, [fmData]);

  const addableFields = useMemo(() => {
    const all = ['date', 'categories', 'sticky', 'tags', 'toc', 'math', 'excerpt'];
    return all.filter(k => !visibleFields.includes(k));
  }, [visibleFields]);

  const showField = (key: string) => {
    if (!visibleFields.includes(key)) setVisibleFields([...visibleFields, key]);
  };

  const hideField = (key: string) => {
    setVisibleFields(visibleFields.filter(k => k !== key));
  };

  const updateCustomField = (key: string, value: string) => {
    setFmData({ ...fmData, [key]: value });
  };

  const removeCustomField = (key: string) => {
    const next = { ...fmData };
    delete next[key];
    setFmData(next);
    setVisibleFields(visibleFields.filter(k => k !== key));
  };

  const addCustomField = () => {
    const key = newFieldKey.trim();
    if (!key) return;
    setFmData({ ...fmData, [key]: newFieldValue });
    setNewFieldKey('');
    setNewFieldValue('');
    setShowAddMenu(false);
    if (!visibleFields.includes(key)) setVisibleFields([...visibleFields, key]);
  };

  useEffect(() => {
    if (!siteId || !postPath) return;
    api.getPost(Number(siteId), postPath)
      .then((res) => {
        const { frontmatter, body: b } = splitFrontmatter(res.post.content);
        setFmData(parseFrontmatterData(frontmatter));
        setBody(b);
        setSha(res.post.sha);
        setLoaded(true);
      })
      .catch(() => setMessage('加载失败'));
  }, [siteId, postPath]);

  // Listen for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const save = async () => {
    if (!siteId) return;
    setSaving(true);
    setMessage('');
    try {
      // Get latest content from vditor
      const currentBody = editorRef.current?.getValue() ?? body;
      const fmYaml = buildFrontmatterYaml(fmData);
      const content = fmYaml + '\n' + currentBody;
      const res = await api.savePost(Number(siteId), postPath, content, sha);
      setSha(res.post.sha);
      setBody(currentBody);
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
      const currentBody = editorRef.current?.getValue() ?? body;
      const fmYaml = buildFrontmatterYaml(fmData);
      const content = fmYaml + '\n' + currentBody;
      await api.savePost(Number(siteId), postPath, content, sha);
      await api.triggerBuild(Number(siteId));
      setMessage('发布成功，CI 已触发');
    } catch {
      setMessage('发布失败');
    } finally {
      setPublishing(false);
    }
  };

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

  // Hide app sidebar when editor is fullscreen
  useEffect(() => {
    const sidebar = document.querySelector('aside') as HTMLElement | null;
    const header = document.querySelector('header') as HTMLElement | null;
    if (isFullscreen) {
      if (sidebar) sidebar.style.display = 'none';
      if (header) header.style.display = 'none';
      document.body.style.overflow = 'hidden';
    } else {
      if (sidebar) sidebar.style.display = '';
      if (header) header.style.display = '';
      document.body.style.overflow = '';
    }
    return () => {
      if (sidebar) sidebar.style.display = '';
      if (header) header.style.display = '';
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  return (
    <div className="notion-page">
      {/* Sticky top bar — hidden in fullscreen */}
      {!isFullscreen && (
        <div className="notion-topbar">
          <Link to={`/sites/${siteId}/posts`} className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />文章列表
          </Link>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm" onClick={save} disabled={saving} className="h-7 text-xs gap-1">
              <Save className="h-3.5 w-3.5" />{saving ? '保存中...' : '保存'}
            </Button>
            <Button size="sm" onClick={publish} disabled={publishing} className="h-7 text-xs gap-1">
              <Send className="h-3.5 w-3.5" />{publishing ? '发布中...' : '发布'}
            </Button>
          </div>
        </div>
      )}

      {message && !isFullscreen && (
        <div className={`notion-toast ${
          message.includes('失败') ? 'notion-toast--error' : 'notion-toast--success'
        }`}>
          {message}
        </div>
      )}

      {/* Notion-style page title — hidden in fullscreen */}
      {!isFullscreen && (
        <h1 className="notion-title">
          <input
            value={fmData.title}
            onChange={(e) => setFmData({ ...fmData, title: e.target.value })}
            placeholder="无标题"
            className="w-full bg-transparent outline-none text-inherit placeholder:text-[hsl(var(--muted-foreground))]/30"
          />
        </h1>
      )}

      {/* Notion-style property row — hidden in fullscreen */}
      {!isFullscreen && (
        <div className="notion-props">
          {allFieldKeys.map((key) => {
            if (key === 'tags') return (
              <div key={key} className="notion-prop">
                <span className="notion-prop__label">标签</span>
                <div className="notion-prop__value notion-prop__tags">
                  {fmData.tags.map(tag => (
                    <span
                      key={tag}
                      className="notion-tag group/tag"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <svg className="notion-tag__remove" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </span>
                  ))}
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); addTag(); }
                      if (e.key === 'Backspace' && tagInput === '' && fmData.tags.length > 0) removeTag(fmData.tags[fmData.tags.length - 1]);
                    }}
                    placeholder={fmData.tags.length === 0 ? '添加...' : ''}
                    className="notion-prop__input"
                  />
                </div>
              </div>
            );

            if (!knownKeys.has(key)) return (
              <div key={key} className="notion-prop">
                <span className="notion-prop__label truncate" title={key}>{key}</span>
                <input
                  value={typeof fmData[key] === 'string' ? fmData[key] : String(fmData[key])}
                  onChange={(e) => updateCustomField(key, e.target.value)}
                  className="notion-prop__input"
                />
                <button className="notion-prop__remove" onClick={() => removeCustomField(key)}>
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            );

            const labels: Record<string, string> = { date: '日期', categories: '分类', sticky: '置顶', toc: '目录', math: '数学', excerpt: '摘要' };
            const placeholders: Record<string, string> = { date: '2024-01-01 12:00:00', categories: '分类名称', sticky: '0', toc: '', math: '', excerpt: '自定义摘要' };
            const isToggle = key === 'toc' || key === 'math';

            return (
              <div key={key} className="notion-prop">
                <span className="notion-prop__label">{labels[key] || key}</span>
                {isToggle ? (
                  <label className="notion-prop__toggle">
                    <input type="checkbox" checked={Boolean(fmData[key as keyof FrontmatterData])} onChange={(e) => setFmData({ ...fmData, [key]: e.target.checked })} className="h-3.5 w-3.5 rounded accent-[hsl(var(--primary))]" />
                    <span>{Boolean(fmData[key as keyof FrontmatterData]) ? '开启' : '关闭'}</span>
                  </label>
                ) : (
                  <input
                    type={key === 'sticky' ? 'number' : 'text'}
                    value={String(fmData[key as keyof FrontmatterData] || '')}
                    onChange={(e) => setFmData({ ...fmData, [key]: key === 'sticky' ? (Number(e.target.value) || 0) : e.target.value })}
                    placeholder={placeholders[key] || ''}
                    className="notion-prop__input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                )}
                <button className="notion-prop__remove" onClick={() => hideField(key)}>
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            );
          })}

          {/* Add property */}
          <div className="relative">
            <button
              className="notion-prop__add"
              onClick={() => setShowAddMenu(!showAddMenu)}
            >+ 添加属性</button>
            {showAddMenu && (
              <div className="notion-prop__menu">
                {addableFields.map(k => {
                  const labels: Record<string, string> = { date: '日期', categories: '分类', sticky: '置顶', tags: '标签', toc: '目录', math: '数学公式', excerpt: '摘要' };
                  return (
                    <button key={k} className="notion-prop__menu-item" onClick={() => { showField(k); setShowAddMenu(false); }}>
                      {labels[k] || k}
                    </button>
                  );
                })}
                {addableFields.length > 0 && customFields.length > 0 && <div className="border-t border-[hsl(var(--border))] my-1" />}
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <input
                      value={newFieldKey}
                      onChange={(e) => setNewFieldKey(e.target.value)}
                      placeholder="键名"
                      className="w-20 text-xs bg-transparent outline-none border-b border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] placeholder:text-[hsl(var(--muted-foreground))]"
                      onKeyDown={(e) => e.key === 'Enter' && addCustomField()}
                    />
                    <input
                      value={newFieldValue}
                      onChange={(e) => setNewFieldValue(e.target.value)}
                      placeholder="值"
                      className="flex-1 text-xs bg-transparent outline-none border-b border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] placeholder:text-[hsl(var(--muted-foreground))]"
                      onKeyDown={(e) => e.key === 'Enter' && addCustomField()}
                    />
                    <button className="text-xs text-[hsl(var(--primary))]" onClick={addCustomField}>确认</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vditor WYSIWYG Editor — borderless, seamless with page */}
      {loaded ? (
        <div className="vditor-inset">
          <VditorEditor
            ref={editorRef}
            value={body}
            onChange={setBody}
            onSave={save}
            onFullscreenChange={setIsFullscreen}
            dark={dark}
            placeholder="开始写作..."
            minHeight={500}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center" style={{ minHeight: 500 }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" />
        </div>
      )}
    </div>
  );
}
