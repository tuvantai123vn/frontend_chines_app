import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    historyApiFallback: true, // Giúp React Router xử lý route đúng khi reload hoặc nhập đường dẫn
  }
})
