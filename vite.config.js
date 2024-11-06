import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: [
        '@fortawesome/react-fontawesome',
        'react-qr-code', 
        'axios',
        'firebase',
        // Add any other external packages here
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
