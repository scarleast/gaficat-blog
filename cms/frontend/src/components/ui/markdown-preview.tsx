import { useMemo } from 'react';
import { marked } from 'marked';

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const html = useMemo(() => {
    try {
      return marked.parse(content, { async: false }) as string;
    } catch {
      return '<p>渲染失败</p>';
    }
  }, [content]);

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none p-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
