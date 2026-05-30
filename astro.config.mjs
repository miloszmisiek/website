import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://miloszmisiek.com',
  integrations: [tailwind(), react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      // Warm-neutral pair matched to the site's palette; switched via [data-theme].
      themes: { light: 'vitesse-light', dark: 'vesper' },
      // Emit both themes as CSS variables; we pick per data-theme in prose.css.
      defaultColor: false,
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en' /*, 'pl' */],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
