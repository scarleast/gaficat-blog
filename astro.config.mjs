// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeImageCaptions from './src/utils/rehype-image-captions';
import rehypeMediaShortcodes from './src/utils/rehype-media-shortcodes';
import remarkMediaShortcodes from './src/utils/remark-media-shortcodes';
import { writeLegacyRedirects, writeLegacySitemap } from './src/utils/legacy-sitemap-pages.mjs';

const site = 'https://www.gaficat.com';

export default defineConfig({
  site,
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
      langAlias: {
        JSON: 'json',
        ejs: 'html',
        table: 'plaintext',
      },
    },
    remarkPlugins: [remarkMath, remarkMediaShortcodes],
    rehypePlugins: [rehypeKatex, rehypeMediaShortcodes, rehypeImageCaptions],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
  integrations: [
    sitemap(),
    {
      name: 'legacy-html-compatibility',
      hooks: {
        'astro:build:done': ({ dir }) => {
          writeLegacyRedirects(dir, site);
          writeLegacySitemap(dir, site);
        },
      },
    },
    mdx(),
  ],
});
