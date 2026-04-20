import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://thierrytouin.fr',
  base: '/',
  publicDir: './public-astro',
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
