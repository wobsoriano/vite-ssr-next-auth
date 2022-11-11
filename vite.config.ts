import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), ssr()],
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, './'),
    }
  },
  define: {
    'process.env.NEXTAUTH_URL': JSON.stringify(process.env.NEXTAUTH_URL),
    'process.env.NEXTAUTH_URL_INTERNAL': JSON.stringify(process.env.NEXTAUTH_URL_INTERNAL),
    'process.env.VERCEL_URL': JSON.stringify(process.env.VERCEL_URL)
  }
})
