import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import { parseFrontmatter, buildFrontmatterYaml } from '@/lib/utils';

export function PostEditPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const [searchParams] = useSearchParams();
  const postPath = searchParams.get('path') || '';
  const { t } = useTranslation();

  const [frontmatterText, setFrontmatterText] = useState('');
  const [body, setBody] = useState('');
  const [sha, setSha] = useState('');
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!siteId || !postPath) return;
    api.getPost(Number(siteId), postPath)
      .then((res) => {
        const { frontmatter, body: b } = parseFrontmatter(res.post.content);
        setFrontmatterText(buildFrontmatterYaml(frontmatter));
        setBody(b);
        setSha(res.post.sha);
      })
      .catch(() => setMessage(t('common.failed')));
  }, [siteId, postPath]);

  const save = async () => {
    if (!siteId) return;
    setSaving(true);
    setMessage('');
    try {
      const content = frontmatterText + '\n' + body;
      const res = await api.savePost(Number(siteId), postPath, content, sha);
      setSha(res.post.sha);
      setMessage(t('posts.savedSuccess'));
    } catch {
      setMessage(t('common.failed'));
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    if (!siteId) return;
    setPublishing(true);
    setMessage('');
    try {
      const content = frontmatterText + '\n' + body;
      await api.savePost(Number(siteId), postPath, content, sha);
      await api.triggerBuild(Number(siteId));
      setMessage(t('posts.publishedSuccess'));
    } catch {
      setMessage(t('common.failed'));
    } finally {
      setPublishing(false);
    }
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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Link to={`/sites/${siteId}/posts`} className="text-sm text-[hsl(var(--muted-foreground))] hover:underline">
          {t('posts.backToList')}
        </Link>
        <div className="flex gap-2">
          <button onClick={save} disabled={saving} className="rounded-md border border-[hsl(var(--input))] px-4 py-2 text-sm hover:bg-[hsl(var(--accent))] disabled:opacity-50">
            {saving ? t('posts.saving') : t('posts.save')}
          </button>
          <button onClick={publish} disabled={publishing} className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90 disabled:opacity-50">
            {publishing ? t('posts.publishing') : t('posts.publish')}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 rounded-md px-4 py-2 text-sm ${message.includes(t('common.failed')) ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'}`}>
          {message}
        </div>
      )}

      {/* Frontmatter editor */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{t('posts.frontmatter')}</label>
        <textarea
          value={frontmatterText}
          onChange={(e) => setFrontmatterText(e.target.value)}
          className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--card))] px-3 py-2 text-sm font-mono"
          rows={8}
          spellCheck={false}
        />
      </div>

      {/* Body editor */}
      <div>
        <label className="block text-sm font-medium mb-1">{t('posts.content')}</label>
        <textarea
          ref={editorRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--card))] px-3 py-3 text-sm font-mono leading-relaxed min-h-[500px]"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
