import type { Element, Root, Text } from 'hast';

function isElement(node: Root['children'][number] | Element['children'][number], tagName?: string): node is Element {
  return node.type === 'element' && (!tagName || node.tagName === tagName);
}

function isText(node: Element['children'][number]): node is Text {
  return node.type === 'text';
}

function isWhitespace(node: Element['children'][number]): boolean {
  return isText(node) && node.value.trim() === '';
}

function cloneElement(node: Element): Element {
  return {
    ...node,
    properties: { ...(node.properties || {}) },
    children: [...node.children],
  };
}

function imageFromParagraph(node: Element): Element | null {
  const meaningful = node.children.filter((child) => !isWhitespace(child));
  if (meaningful.length !== 1) return null;

  const child = meaningful[0];
  if (isElement(child, 'img')) return child;

  if (isElement(child, 'a')) {
    const linkMeaningful = child.children.filter((linkChild) => !isWhitespace(linkChild));
    if (linkMeaningful.length === 1 && isElement(linkMeaningful[0], 'img')) {
      return linkMeaningful[0];
    }
  }

  return null;
}

export default function rehypeImageCaptions() {
  return (tree: Root) => {
    function visit(parent: Root | Element) {
      parent.children = parent.children.map((child) => {
        if (!isElement(child)) return child;

        visit(child);

        if (child.tagName !== 'p') return child;

        const image = imageFromParagraph(child);
        const alt = typeof image?.properties?.alt === 'string' ? image.properties.alt.trim() : '';
        if (!image || !alt) return child;

        return {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: [
            ...child.children.map((figureChild) => (isElement(figureChild) ? cloneElement(figureChild) : figureChild)),
            {
              type: 'element',
              tagName: 'figcaption',
              properties: { className: ['image-caption'] },
              children: [{ type: 'text', value: alt }],
            },
          ],
        } satisfies Element;
      });
    }

    visit(tree);
  };
}
