/// <reference types="vavite/vite-config" />
import path from 'path'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import { defineConfig } from 'vite'
import vavite from 'vavite'

export default defineConfig({
  buildSteps: [
    { name: 'client' },
    {
      name: 'server',
      config: {
        build: {
          ssr: true,
          rollupOptions: {
            output: {
              // We have to disable this for multiple entries
              inlineDynamicImports: false
            }
          }
        }
      }
    }
  ],
  plugins: [
    vavite({
      serverEntry: '/server/index.ts',
      serveClientAssetsInDev: true
    }),
    react(),
    ssr({ disableAutoFullBuild: true })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      'next-auth/providers/github': 'node_modules/next-auth/providers/github.js'
    }
  },
  define: {
    'process.env.NEXTAUTH_URL': JSON.stringify(process.env.NEXTAUTH_URL),
    'process.env.NEXTAUTH_URL_INTERNAL': JSON.stringify(process.env.NEXTAUTH_URL_INTERNAL),
    'process.env.VERCEL_URL': JSON.stringify(process.env.VERCEL_URL)
  }
})
