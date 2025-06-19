import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['public/favicon.ico', 'public/robots.txt', 'public/apple-touch-icon.png'],
      manifest: {
        name: 'PlaySpot',
        short_name: 'PlaySpot',
        description: 'A web app for discovering nearby available spots for playing sports',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
    }),
  ],
  define: {
    __APP_BACKEND_URL__: JSON.stringify(process.env.VITE_BACKEND_URL || 'http://localhost:5102'),
  },
})