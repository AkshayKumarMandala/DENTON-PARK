import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size limit to 1000 KB
    rollupOptions: {
      external: [
        // List of dependencies you don't want to include in the bundle
        'axios', 'firebase', '@google/generative-ai'
      ],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Bundle all node_modules into a "vendor" chunk
          }
        }
      }
    }
  }
});
