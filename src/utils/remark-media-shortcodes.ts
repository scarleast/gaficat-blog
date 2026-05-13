import type { Root, RootContent } from 'mdast';

type ShortcodeArgs = Record<string, string | boolean>;

const shortcodePattern = /^\s*{%\s*(bilibili|audio|video)\s*([\s\S]*?)\s*%}\s*$/;

export function normalizeShortcodeText(value: string): string {
  return value
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u00a0/g, ' ');
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value: unknown): string {
  return escapeHtml(value);
}

function parseArgs(input: string): { positional: string[]; named: ShortcodeArgs } {
  const positional: string[] = [];
  const named: ShortcodeArgs = {};
  const normalizedInput = normalizeShortcodeText(input);
  const tokenPattern = /([A-Za-z_][\w-]*)=(?:"([^"]*)"|'([^']*)'|([^\s]+))|(?:"([^"]*)"|'([^']*)'|([^\s]+))/g;

  for (const match of normalizedInput.matchAll(tokenPattern)) {
    if (match[1]) {
      named[match[1]] = normalizeShortcodeText(match[2] ?? match[3] ?? match[4] ?? '');
    } else {
      positional.push(normalizeShortcodeText(match[5] ?? match[6] ?? match[7] ?? ''));
    }
  }

  return { positional, named };
}

function extractInlineValue(node: RootContent): string {
  if ('value' in node && typeof node.value === 'string') {
    return node.value;
  }

  if (node.type === 'link') {
    return node.url;
  }

  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map((child) => extractInlineValue(child as RootContent)).join('');
  }

  return '';
}

function boolValue(value: string | boolean | undefined, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function renderBilibili(args: ShortcodeArgs, positional: string[]): string | null {
  const bvid = typeof args.bvid === 'string' ? args.bvid : '';
  const aid = typeof args.aid === 'string' ? args.aid : '';
  const first = positional[0] || '';
  const resolvedBvid = bvid || (first.toUpperCase().startsWith('BV') ? first : '');
  const resolvedAid = aid || (first && !resolvedBvid ? first : '');
  if (!resolvedBvid && !resolvedAid) return null;

  const page = typeof args.page === 'string' ? args.page : '1';
  const aspectRatio = typeof args.aspectRatio === 'string' ? args.aspectRatio : '16/9';
  const autoplay = boolValue(args.autoplay) ? '1' : '0';
  const query = resolvedBvid
    ? `bvid=${encodeURIComponent(resolvedBvid)}`
    : `aid=${encodeURIComponent(resolvedAid)}`;
  const src = `//player.bilibili.com/player.html?${query}&page=${encodeURIComponent(page)}&high_quality=1&danmaku=0&autoplay=${autoplay}`;

  return `<div class="bilibili-wrapper"><div class="bilibili-container" style="aspect-ratio: ${escapeAttribute(aspectRatio)};"><iframe src="${escapeAttribute(src)}" scrolling="no" frameborder="0" allowfullscreen="true" loading="lazy" class="bilibili-iframe"></iframe></div></div>`;
}

function renderAudio(args: ShortcodeArgs, positional: string[]): string | null {
  const src = typeof args.src === 'string' ? args.src : positional[0] || '';
  if (!src) return null;

  const title = typeof args.title === 'string' ? args.title : positional[1] || '';
  const author = typeof args.author === 'string' ? args.author : positional[2] || '';
  const label = [title, author].filter(Boolean).join(' - ') || '音频';

  return `<div class="audio-player-wrapper" data-audio-player><audio class="audio-player-media" preload="metadata" data-audio-element aria-label="${escapeAttribute(label)}"><source src="${escapeAttribute(src)}" type="audio/mpeg" /></audio><div class="audio-player-shell"><button class="audio-player-play" type="button" aria-label="播放 ${escapeAttribute(label)}" data-audio-play><svg class="audio-icon audio-icon-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg><svg class="audio-icon audio-icon-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"></path></svg></button><div class="audio-player-main"><div class="audio-player-heading"><span class="audio-player-title">${escapeHtml(title || '音频')}</span>${author ? `<span class="audio-player-author">${escapeHtml(author)}</span>` : ''}</div><div class="audio-player-controls"><span class="audio-player-time" data-audio-current>0:00</span><input class="audio-player-progress" type="range" min="0" max="100" step="0.1" value="0" aria-label="调整 ${escapeAttribute(label)} 播放进度" data-audio-progress /><span class="audio-player-time" data-audio-duration>--:--</span></div></div><div class="audio-player-actions"><button class="audio-player-action" type="button" aria-label="静音 ${escapeAttribute(label)}" data-audio-mute><svg class="audio-icon audio-icon-volume" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"></path><path d="M16 8.5a5 5 0 010 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M18.5 6a8 8 0 010 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><svg class="audio-icon audio-icon-muted" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"></path><path d="M17 9l4 4m0-4l-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button><a class="audio-player-action audio-player-download" href="${escapeAttribute(src)}" download aria-label="下载 ${escapeAttribute(label)}"><svg class="audio-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0l4-4m-4 4l-4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 19h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></a></div></div></div>`;
}

function renderVideo(args: ShortcodeArgs, positional: string[]): string | null {
  const src = typeof args.src === 'string' ? args.src : positional[0] || '';
  if (!src) return null;

  const title = typeof args.title === 'string' ? args.title : positional[1] || '';
  const poster = typeof args.poster === 'string' ? args.poster : '';
  const aspectRatio = typeof args.aspectRatio === 'string' ? args.aspectRatio : '16/9';
  const autoplay = boolValue(args.autoplay);

  return `<div class="video-player-wrapper">${title ? `<div class="video-player-title">${escapeHtml(title)}</div>` : ''}<div class="video-player-container" style="aspect-ratio: ${escapeAttribute(aspectRatio)};"><video controls preload="metadata" data-plyr${poster ? ` poster="${escapeAttribute(poster)}"` : ''}${autoplay ? ' autoplay' : ''}><source src="${escapeAttribute(src)}" /></video></div></div>`;
}

export function renderMediaShortcode(name: string, rawArgs: string): string | null {
  const { positional, named } = parseArgs(rawArgs);

  if (name === 'bilibili') return renderBilibili(named, positional);
  if (name === 'audio') return renderAudio(named, positional);
  if (name === 'video') return renderVideo(named, positional);
  return null;
}

function transformNode(node: RootContent): RootContent {
  if (node.type !== 'paragraph') return node;

  const value = normalizeShortcodeText(
    node.children.map((child) => extractInlineValue(child as RootContent)).join(''),
  );

  const match = value.match(shortcodePattern);
  if (!match) return node;

  const rendered = renderMediaShortcode(match[1], match[2]);
  if (!rendered) return node;

  return {
    type: 'html',
    value: rendered,
  };
}

export default function remarkMediaShortcodes() {
  return (tree: Root) => {
    tree.children = tree.children.map(transformNode);
  };
}
