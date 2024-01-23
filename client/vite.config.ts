import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/server': {
        target: 'http://server:5000',
        changeOrigin: true,
        secure: false,      
        ws: true,
        rewrite: (path) => path.replace(/^\/server/, '')
      }
    }
  },
})

