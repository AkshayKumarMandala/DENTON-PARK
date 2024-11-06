import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginVercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginVercel()
  ],
  build: {
    outDir: 'dist', // Specifies the output directory
  },
  server: {
    port: 3000, // Port to run the development server on
    open: true, // Automatically open the app in the browser
  },
});
