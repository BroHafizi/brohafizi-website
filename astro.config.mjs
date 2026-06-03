// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

import markdoc from '@astrojs/markdoc';

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://brohafizi.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), react(), keystatic(), markdoc()],
  adapter: vercel()
});