import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@/': `${path.resolve(__dirname, 'src')}/`
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/showFile': {
        target: 'http://localhost:8080/showFile',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/showFile/, '')
      },
      '/fileName.jpg': {
        target: 'https://propensib07.s3.amazonaws.com',
        changeOrigin: true,
      },
    }
  },
  plugins: [react()],
});
