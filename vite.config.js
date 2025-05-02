import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    // Đây là cách chính xác để bật SPA fallback cho React Router
    middlewareMode: false,
    fs: {
      strict: false
    }
  }
})