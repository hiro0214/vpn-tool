import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: './src/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: '../userlist.csv', dest: '' }],
    }),
  ],
  build: {
    outDir: '../dist/',
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    open: '/login',
  },
});
