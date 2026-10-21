import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
// Production origin for canonical links, Open Graph URLs, robots.txt, and the sitemap.
export default defineConfig({site:'https://thephysicslab.org',vite:{server:{allowedHosts:['terminal.local']}},output:'static',trailingSlash:'always',integrations:[sitemap({filter:page=>!page.endsWith('/404/')})]});
