import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string, locale: string = 'zh-CN'): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function buildFrontmatterYaml(frontmatter: Record<string, unknown>): string {
  const lines = ['---'];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - "${String(item)}"`);
      }
    } else if (typeof value === 'string') {
      lines.push(`${key}: "${value}"`);
    } else if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else if (value instanceof Date) {
      lines.push(`${key}: "${value.toISOString().split('T')[0]}"`);
    } else if (value !== undefined && value !== null) {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

export function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content };
  }
  const yaml = match[1];
  const body = match[2];
  const frontmatter: Record<string, unknown> = {};

  for (const line of yaml.split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawValue] = m;
    let value: unknown = rawValue;
    if (rawValue === 'true') value = true;
    else if (rawValue === 'false') value = false;
    else if (rawValue.startsWith('"') && rawValue.endsWith('"')) value = rawValue.slice(1, -1);
    else if (!isNaN(Number(rawValue)) && rawValue !== '') value = Number(rawValue);
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}
