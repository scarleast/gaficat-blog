// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://www.gaficat.com',
  output: 'static',
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
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
    mdx(),
  ],
});
