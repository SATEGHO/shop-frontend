import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  // server: {
  //   host: true,
  //   strictPort: true,
  //   port: 8080,
  // },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});
