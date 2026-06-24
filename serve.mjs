// serve.mjs — minimal static file server with SPA fallback
// Usage:
//   node serve.mjs                  -> serves this folder on :3000
//   node serve.mjs 3100 v2          -> serves ./v2 on :3100
//   node serve.mjs <port> <root>
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const PORT = parseInt(args[0] || process.env.PORT || '3000', 10);
const ROOT = args[1] ? resolve(SCRIPT_DIR, args[1]) : SCRIPT_DIR;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    // prevent path traversal
    const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    let filePath = join(ROOT, safePath);

    let s;
    try {
      s = await stat(filePath);
      if (s.isDirectory()) {
        filePath = join(filePath, 'index.html');
        s = await stat(filePath);
      }
    } catch {
      // SPA fallback: serve index.html for unknown routes
      filePath = join(ROOT, 'index.html');
    }

    const data = await readFile(filePath);
    const type = TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Serving ${ROOT} at http://localhost:${PORT}`);
});
