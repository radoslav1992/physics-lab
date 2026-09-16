import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({site:process.env.SITE_URL || "https://physics-visualizer-rado.radod.chatgpt.site",vite:{server:{allowedHosts:['terminal.local']}},output:'static',trailingSlash:'always',integrations:[sitemap({filter:page=>!page.endsWith('/404/')})]});
