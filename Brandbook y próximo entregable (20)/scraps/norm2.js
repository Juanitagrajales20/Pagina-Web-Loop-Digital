window.NORM2 = async (keys, readImage, createCanvas, saveFile) => {
  for (const k of keys) {
    const im = await readImage('assets/nlogo-' + k + '.png');
    const W = im.width, H = im.height;
    const src = createCanvas(W, H), sc = src.getContext('2d'); sc.drawImage(im, 0, 0);
    const id = sc.getImageData(0, 0, W, H), d = id.data;
    for (let i = 0; i < d.length; i += 4) { const mx = Math.max(d[i],d[i+1],d[i+2]), mn = Math.min(d[i],d[i+1],d[i+2]); if (mn > 200 && mx - mn < 24) d[i+3] = 0; }
    sc.putImageData(id, 0, 0);
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) { if (d[(y*W+x)*4+3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
    x0 = Math.max(0, x0-2); y0 = Math.max(0, y0-2); const w = Math.min(W, x1+3) - x0, h = Math.min(H, y1+3) - y0;
    const cap = w / h < 1.6 ? 320 : 250;
    const s = Math.min(380 / Math.sqrt(w*h), 1020 / w, cap / h);
    const cv = createCanvas(1080, 360), c = cv.getContext('2d'); c.imageSmoothingQuality = 'high';
    c.drawImage(src, x0, y0, w, h, (1080-w*s)/2, (360-h*s)/2, w*s, h*s);
    await saveFile('assets/nlogo-' + k + '.png', cv);
  }
};
