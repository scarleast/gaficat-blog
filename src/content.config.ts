import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './source/_posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    abbrlink: z.coerce.string(),
    tags: z.array(z.string()).default([]),
    categories: z.union([
      z.string(),
      z.array(z.string()),
      z.array(z.array(z.string())),
    ]).default([]),
    math: z.boolean().default(false),
    sticky: z.number().optional(),
    toc: z.boolean().default(true),
    excerpt: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './source/_pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, pages };
