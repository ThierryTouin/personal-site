import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://thierrytouin.fr',
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
