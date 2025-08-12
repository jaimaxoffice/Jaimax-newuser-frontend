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
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Fix WebSocket connection issues
    hmr: {
      // Try different transport methods
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      // Fallback to polling if WebSockets fail
      clientPort: 5173,
      timeout: 10000
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
          'vendor-crypto': ['@noble/curves', '@noble/hashes', 'ox'],
          'vendor-ui': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})