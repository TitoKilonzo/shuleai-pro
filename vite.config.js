import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost',
    proxy: {
      '/api/mpesa': {
        target: 'https://sandbox.safaricom.co.ke',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mpesa/, ''),
        secure: true,
      }
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          appwrite: ['appwrite'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  envPrefix: 'VITE_',
})
