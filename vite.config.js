import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'save-data-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/save-data' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { filename, content } = JSON.parse(body);
                // Validate filename to prevent path traversal
                const allowedFiles = ['projects.js', 'blog.js', 'skills.js', 'experience.js', 'about.js'];
                if (!allowedFiles.includes(filename)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Invalid filename' }));
                  return;
                }
                const filePath = path.join(__dirname, 'src', 'data', filename);
                fs.writeFileSync(filePath, content, 'utf8');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})

