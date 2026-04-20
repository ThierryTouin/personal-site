import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://thierrytouin.github.io',
  base: '/personal-site/',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
});
