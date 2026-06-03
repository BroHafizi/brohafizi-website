import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.string(),
    excerpt: z.string().optional().default(''),
    featuredImage: z.string().optional().default(''),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    author: z.string().default('BroHafizi'),
  }),
});

export const collections = { posts };
