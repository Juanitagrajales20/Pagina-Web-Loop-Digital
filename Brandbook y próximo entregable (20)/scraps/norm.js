window.NORM = async (keys, readImage, createCanvas, saveFile) => {
  for (const k of keys) {
    const im = await readImage('assets/nlogo-' + k + '.png');
    const W = im.width, H = im.height;
    const src = createCanvas(W, H), sc = src.getContext('2d'); sc.drawImage(im, 0, 0);
    const id = sc.getImageData(0, 0, W, H), d = id.data;
    const bb = () => { let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1; for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) { const i = (y*W+x)*4; if (d[i+3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } } return [x0, y0, x1, y1]; };
    let [x0, y0, x1, y1] = bb();
    const cnt = {}; const ring = (x, y) => { const i = (y*W+x)*4; if (d[i+3] < 200) return; const key = (d[i]>>3)+','+(d[i+1]>>3)+','+(d[i+2]>>3); cnt[key] = (cnt[key]||0)+1; };
    for (let x = x0; x <= x1; x += 2) { ring(x, y0+1); ring(x, y1-1); } for (let y = y0; y <= y1; y += 2) { ring(x0+1, y); ring(x1-1, y); }
    const top = Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];
    if (top) { const [r,g,b] = top[0].split(',').map(v=>v*8+4); if (r > 200 && g > 200 && b > 200) { for (let i = 0; i < d.length; i += 4) if (d[i+3] > 0 && Math.abs(d[i]-r) < 18 && Math.abs(d[i+1]-g) < 18 && Math.abs(d[i+2]-b) < 18) d[i+3] = 0; sc.putImageData(id, 0, 0); [x0, y0, x1, y1] = bb(); } }
    x0 = Math.max(0, x0-2); y0 = Math.max(0, y0-2); const w = Math.min(W, x1+3) - x0, h = Math.min(H, y1+3) - y0;
    const r = w / h, cap = r < 1.6 ? 320 : 250;
    const s = Math.min(380 / Math.sqrt(w*h), 1020 / w, cap / h);
    const cv = createCanvas(1080, 360), c = cv.getContext('2d'); c.imageSmoothingQuality = 'high';
    c.drawImage(src, x0, y0, w, h, (1080-w*s)/2, (360-h*s)/2, w*s, h*s);
    await saveFile('assets/nlogo-' + k + '.png', cv);
  }
};
