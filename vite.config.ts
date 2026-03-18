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
    rollupOptions: {},
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
  server: {
    port: 3000,
    strictPort: true,
  },
})
