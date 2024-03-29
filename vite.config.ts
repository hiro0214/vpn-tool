import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: './src/',
  plugins: [react()],
  build: {
    outDir: '../dist/',
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    open: '/login',
  },
});
