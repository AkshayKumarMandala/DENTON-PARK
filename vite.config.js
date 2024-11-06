import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Make sure your build is using the latest JavaScript standards
  },
  optimizeDeps: {
    include: ['@google/generative-ai'], // Ensure that specific dependencies are bundled properly
  },
})
