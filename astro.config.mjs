import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import {isIndexable} from './src/lib/indexing.mjs';
// Production origin for canonical links, Open Graph URLs, robots.txt, and the sitemap. The sitemap lists only
// indexable pages: the 404 page, teacher answer keys and printable activities are noindex (src/lib/indexing.mjs).
export default defineConfig({site:'https://thephysicslab.org',vite:{server:{allowedHosts:['terminal.local']}},output:'static',trailingSlash:'always',integrations:[sitemap({filter:isIndexable})]});
