import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// 是否构建为github部署页面
const isDeployGithub = process.env.deploy === 'github';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __DEV__: process?.env?.mode === 'development',
  },
});
