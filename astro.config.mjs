import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://thierrytouin.fr',
  base: '/',
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
