import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');
const env = process?.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __DEV__: env?.mode === 'development',
  },
});
