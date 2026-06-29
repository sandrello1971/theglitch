// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://effettoglitch.it",
  trailingSlash: "ignore",
  markdown: {
    smartypants: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/glitch/"),
      i18n: { defaultLocale: "it", locales: { it: "it-IT" } },
      changefreq: "weekly",
      lastmod: new Date(),
    }),
  ],
});
