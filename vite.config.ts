import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'packages/render',
  base: process.env.ELECTRON == 'true' ? './' : '.',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages/render/src'),
    },
  },
  build: {
    outDir: '../../dist',
  },
  plugins: [vue()],
});
