import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { execSync } from 'child_process';
import path from 'path';

function watchExcelProjectsPlugin() {
  return {
    name: 'watch-excel-projects',
    buildStart() {
      try {
        console.log('[excel-projects] Parsing Academic Projects.xlsx...');
        execSync('node scripts/build-projects-data.mjs', { stdio: 'inherit' });
      } catch (err) {
        console.error('[excel-projects] Error building projects data:', err);
      }
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('Academic Projects.xlsx')) {
        console.log('[excel-projects] Academic Projects.xlsx changed! Rebuilding dataset...');
        try {
          execSync('node scripts/build-projects-data.mjs', { stdio: 'inherit' });
          server.ws.send({ type: 'full-reload' });
        } catch (err) {
          console.error('[excel-projects] Error rebuilding projects data:', err);
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    watchExcelProjectsPlugin(),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'icons.svg'],
      manifest: {
        name: 'AIDA JECC | Dept. of AI & Data Science',
        short_name: 'AIDA JECC',
        description: 'Official application of Department of Artificial Intelligence & Data Science at Jyothi Engineering College (JECC), Thrissur.',
        theme_color: '#080808',
        background_color: '#080808',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,xlsx,json,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/ik\.imagekit\.io\/AIDA\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'aida-imagekit-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

