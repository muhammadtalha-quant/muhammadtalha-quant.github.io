import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    sitemap({
      hostname: 'https://muhammadtalha-quant.github.io',
      dynamicRoutes: ['/'],
    }),
  ],
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 150,
  },
  server: {
    port: 3000,
    strictPort: true,
  },
})
