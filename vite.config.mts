import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const basePath = process.env.BASE_PATH || "/HSK1-Anki-App";

export default defineConfig({
  plugins: [
    sveltekit(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "HSK学習アプリ",
        short_name: "HSK学習",
        description: "新 HSK 1級・2級の中国語単語学習アプリ",
        theme_color: "#f59e0b",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: `${basePath}/`,
        start_url: `${basePath}/`,
        icons: [
          {
            src: `${basePath}/pwa-192x192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${basePath}/pwa-512x512.png`,
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: `${basePath}/pwa-512x512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "cdnjs-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
