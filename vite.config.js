// // vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
//   server:{
//     host:'0.0.0.0',
//     port:5173
//   },
// })
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { VitePWA } from "vite-plugin-pwa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // plugins: [react()],
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "apple-touch-icon.png",
        "jaimax-192.png",
        "jaimax-512.png",
        "safari-pinned-tab.svg",
      ],
      manifest: {
        name: "Jaimax",
        short_name: "Jaimax",
        description:
          "Connect, transact, and manage crypto seamlessly with Jaimax",
        theme_color: "#1d8e85",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        icons: [
          {
            src: "jaimax-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "jaimax-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "jaimax-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // cleanupOutdatedCaches: true,
        // clientsClaim: true
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    // Fix WebSocket connection issues
    hmr: {
      // Try different transport methods
      protocol: "ws",
      host: "localhost",
      port: 5173,
      // Fallback to polling if WebSockets fail
      clientPort: 5173,
      timeout: 10000,
    },
    watch: {
      // Increase the polling interval for better performance
      usePolling: true,
      interval: 1000,
    },
    // Increase timeout
    middlewareMode: false,
  },
  // Keep the build optimizations from the previous answer
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-crypto": ["@noble/curves", "@noble/hashes", "ox"],
          "vendor-ui": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
