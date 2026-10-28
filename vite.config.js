import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleAuthRequest } from './devAuthHandler.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-auth-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api/auth')) {
            handleAuthRequest(req, res);
          } else {
            next();
          }
        });
      },
    },
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 5173,
    host: true,
  },
});

