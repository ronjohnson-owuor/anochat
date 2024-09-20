import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'), // Entry point for your app
      },
      output: {
        dir: 'dist',
        format: 'es',
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to your Express backend
    },
  },
});
