import type { Element, Root, Text } from 'hast';
import { normalizeShortcodeText, renderMediaShortcode } from './remark-media-shortcodes';

const shortcodePattern = /^\s*{%\s*(bilibili|audio|video)\s*([\s\S]*?)\s*%}\s*$/;

function isElement(node: Root['children'][number] | Element['children'][number], tagName?: string): node is Element {
  return node.type === 'element' && (!tagName || node.tagName === tagName);
}

function isText(node: Element['children'][number]): node is Text {
  return node.type === 'text';
}

function textFromElement(node: Element): string {
  if (node.tagName === 'a' && typeof node.properties?.href === 'string') {
    return node.properties.href;
  }

  return node.children.map((child) => {
    if (isText(child)) return child.value;
    if (isElement(child)) return textFromElement(child);
    return '';
  }).join('');
}

function shortcodeHtmlFromParagraph(node: Element): string | null {
  const value = normalizeShortcodeText(node.children.map((child) => {
    if (isText(child)) return child.value;
    if (isElement(child)) return textFromElement(child);
    return '';
  }).join(''));

  const match = value.match(shortcodePattern);
  if (!match) return null;

  return renderMediaShortcode(match[1], match[2]);
}

export default function rehypeMediaShortcodes() {
  return (tree: Root) => {
    function visit(parent: Root | Element) {
      parent.children = parent.children.map((child) => {
        if (!isElement(child)) return child;

        visit(child);

        if (child.tagName !== 'p') return child;

        const rendered = shortcodeHtmlFromParagraph(child);
        if (!rendered) return child;

        return {
          type: 'raw',
          value: rendered,
        } as Root['children'][number];
      });
    }

    visit(tree);
  };
}
