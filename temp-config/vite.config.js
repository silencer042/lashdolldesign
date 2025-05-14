
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../static-build',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@shared': path.resolve(process.cwd(), '../../shared'),
      '@assets': path.resolve(process.cwd(), '../../attached_assets'),
    },
  },
})