// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://matkerbino.github.io',
  base: '/semana-academica-campus-xxii',
  vite: { plugins: [tailwindcss()] },
});
