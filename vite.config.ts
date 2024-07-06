import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'


export default defineConfig({
  plugins: [
    mkcert(),
    react(),
    {
      name: 'configure-response-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.originalUrl.startsWith('/music')) {
            res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless (Chrome > 96)');
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
            res.setHeader('Content-Security-Policy', "frame-src 'self' https://www.youtube.com;")
          } else {
            res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          }
          next();
        });
      }
    }
  ],
})
