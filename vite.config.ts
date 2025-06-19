import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/app/styles/variables" as *;`,
      },
    },
  },
  server: {
    proxy: {
      '/api/proxy': {
        target: 'https://alquran-api.pages.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, '/api/quran/search')
      }
    }
  }
  
})