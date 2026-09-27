// Servidor local de vista previa — Loop Digital
// Uso: doble clic en iniciar-servidor.bat (requiere Node.js instalado)
// Sirve esta carpeta en http://localhost:8080 sin cache (ideal para probar showroom + showcases)
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const PORT = 8080;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm' };
http.createServer((req, res) => {
  try {
    const u = new URL(req.url, 'http://x');
    let p = decodeURIComponent(u.pathname);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.normalize(path.join(ROOT, p));
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(f).pipe(res);
  } catch (e) { res.writeHead(500); res.end('err'); }
}).listen(PORT, '127.0.0.1', () => console.log('Loop Digital preview: http://localhost:' + PORT));
