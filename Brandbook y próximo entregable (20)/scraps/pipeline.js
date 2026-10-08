// Loop Digital showcase standardizer. Usage in run_script:
//   const P = eval(await readFile('scraps/pipeline.js')); await P(readFile, saveFile, replaceText, log, {src, out, title, alt});
(async function(readFile, saveFile, replaceText, log, o){
const ref = await readFile('demos/infinite-carousel.html');
const grab = re => { const m = ref.match(re); if (!m) throw new Error('missing '+re); return m[0]; };
const parts = [
 grab(/\n\/\* Loop Digital type scale[\s\S]*?@media \(max-width:900px\)\{:root[^\n]*\n/),
 grab(/\n\/\* Loop Digital showcase frame — standard \*\/[\s\S]*?@media \(max-width:900px\)\{\.topbar\{grid-template-columns:1fr auto\}[^\n]*\n/),
 grab(/\n\/\* Loop Digital — wide ads scale to fit[\s\S]*?\.ld-fit\{transform-origin:top left\}\n/),
 grab(/\n\/\* Loop Digital — standard closing block[\s\S]*?@media \(max-width:1000px\)\{\.ld-head[^\n]*\n/),
 grab(/\n\/\* Loop Digital — unified subtitles & body[\s\S]*?@media \(max-width:900px\)\{\.publisher h2[^\n]*\n/),
 grab(/\n\/\* Loop Digital — stages never exceed page \*\/[\s\S]*?\.publisher \[class\*="grid"\] > \*\{[^}]*\}\n/),
 grab(/\n\/\* Loop Digital — card titles & secondary text unified \*\/[\s\S]*?\.publisher \.kicker\{margin-bottom:14px !important\}\n/),
 grab(/\n\/\* Loop Digital — purple kickers & ad labels unified \*\/[\s\S]*?\.publisher \.ad-label\{margin-bottom:12px !important\}\n/),
 grab(/\n\/\* Loop Digital — side text aligned with title top \*\/[\s\S]*?kicker \+ h3\{margin-top:0 !important\}\n/)
].join('') + '\n.publisher .hero{display:block !important}\n.publisher{position:relative;z-index:0;isolation:isolate}\n.topbar{z-index:2147483600 !important}\n.publisher noscript{display:none !important}\n.publisher .value-kicker,.publisher .placement-title{color:#111 !important}\n' + "\n.publisher .story-kicker,.publisher .eyebrow{color:#111 !important;font:700 10px/1.2 'JetBrains Mono',monospace !important;letter-spacing:0.28em !important;text-transform:uppercase}\n" + ".publisher .placement-note span{font-size:13.5px !important;line-height:1.55 !important;color:#111 !important}\n" + "\n.publisher .placement-label,.publisher .voice-kicker{color:#111 !important;font:700 10px/1.2 'JetBrains Mono',monospace !important;letter-spacing:0.28em !important;text-transform:uppercase}\n.hero-ad-wrap{max-width:100%;overflow:hidden}\n.hero-ad-wrap{width:100% !important;max-width:100% !important}\n.hero-ad-slot{margin-left:max(0px, calc((100% - 970px) / 2)) !important}\n.hero-ad-wrap{min-width:0 !important;display:block !important}\n";
const closeJs = grab(/<script>\s*function loopCloseShowcase[\s\S]*?<\/script>/);
const fitJs = grab(/<script>\s*\(function\(\)\{\s*var SEL='[\s\S]*?<\/script>/);
const ldBlock = grab(/<section class="ld-close">[\s\S]*?<div class="ld-sign">[\s\S]*?<\/div>\s*<\/section>\n?/);
const header = grab(/<header class="topbar">[\s\S]*?<\/header>/).replace(/<div class="showcase-title">[^<]*<\/div>/, '<div class="showcase-title">' + o.title + '</div>');
const meta = grab(/<div class="showcase-meta">[\s\S]*?<div class="devices">[\s\S]*?<\/div>\s*<\/div>/);
const footer = grab(/<footer class="global-footer">[\s\S]*?<\/footer>/);
let s = await readFile(o.src);
log('sections', (s.match(/<section class="[^"]+"/g)||[]).join(' '));
log('ads', [...new Set((s.match(/class="ad-?\d+x\d+"/g)||[]))].join(','), 'auto', (s.match(/overflow(-x)?:auto/g)||[]).length, 'topbar', /class="topbar"/.test(s), 'main', /<main class="page-wrap">/.test(s), 'pf', /publisher-footer">/.test(s));
[['#090a0a','#08090A'],['#dfff3f','#E8FF52'],['#a476ff','#9B4DFF'],['#232623','#242723'],['#1e211f','#242723'],['#242724','#2E322D'],['#686c68','#9C9A95'],['rgba(9,10,10,.985)','rgba(8,9,10,.985)'],['#101210','#0E0F10'],['#111310','#0E0F10'],['#0c0d0c','#08090A']].forEach(([a,b])=>{s=s.split(a).join(b);s=s.split(a.toUpperCase()).join(b);});
s = s.replace(/<header class="topbar">[\s\S]*?<\/header>/, header);
s = s.replace(/<div class="meta-row">[\s\S]*?<div class="devices">[\s\S]*?<\/div>\s*<\/div>/, '');
s = s.replace(/<div class="showcase-meta">[\s\S]*?<div class="devices">[\s\S]*?<\/div>\s*<\/div>/, '');
s = s.replace(/<main class="page-wrap">\s*(<div class="context-label">[^<]*<\/div>)?/, '<main class="page-wrap">\n' + meta);
if (/<footer class="(standalone|global)-footer">/.test(s)) s = s.replace(/<footer class="(standalone|global)-footer">[\s\S]*?<\/footer>/, footer); else s = s.replace('</main>', '</main>\n' + footer);
s = s.replace(/<h1 style="[^"]*">/, '<h1>');
s = s.replace(/overflow(-x)?:auto/g, 'overflow:hidden');
s = s.split('These examples show how Loop Digital builds visibility').join('These examples show how premium placements build visibility');
s = s.split('and see how Loop Digital turns premium inventory').join('and see how premium inventory turns');
s = s.split('<span>Loop Digital · Simulated Publisher</span>').join('<span>Simulated Publisher</span>');
s = s.replace(/<div style="width:(\d+)px;height:(\d+)px;position:relative;">/g, (m, w, h) => +w > 600 ? `<div class="ad-${w}x${h}" style="width:${w}px;height:${h}px;position:relative;">` : m);
const starts = ['<section class="format-strip">','<section class="value-strip">','<section class="logic">','<section class="logic-strip">','<section class="impact-section">','<section class="impact">'].map(x=>s.indexOf(x)).filter(x=>x>0);
const endTags = ['<section class="smart">','<section class="experience-block">'].map(x=>s.indexOf(x)).filter(x=>x>0);
if (starts.length && endTags.length) { const a = Math.min(...starts), e = Math.max(...endTags); const b = s.indexOf('</section>', e) + 10; s = s.slice(0,a) + s.slice(b); log('removed old closing'); }
const k = s.indexOf('<div class="publisher-footer">');
if (k > 0) s = s.slice(0, k) + ldBlock + s.slice(k); else log('NO publisher-footer');
if (!/family=Archivo/.test(s)) s = s.replace('</head>', `<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">\n</head>`);
const i = s.lastIndexOf('</style>'); s = s.slice(0, i) + parts + s.slice(i);
for (const cls of ['showcase-controls','context-row','showcase-rail']) { let a; while((a=s.indexOf('<div class="'+cls+'">'))>0){ const re=/<div\b|<\/div>/g; re.lastIndex=a; let d=0,mm; while((mm=re.exec(s))){ if(mm[0]==='</div>'){ if(--d===0){ s=s.slice(0,a)+s.slice(mm.index+6); break; } } else d++; } } }
if(!/<\/body>/i.test(s)) s = s.replace(/<\/html>/i,'</body>\n</html>');
s = s.replace('</body>', closeJs.replace ? closeJs : closeJs + '\n' + fitJs + '\n</body>');
if (!/SEL='[^']*\.leaderboard-anchor/.test(s)) s = s.replace("var SEL='", "var SEL='.leaderboard-anchor,.billboard-anchor,");
if (!/SEL='[^']*\.hero-ad-slot/.test(s)) s = s.replace("var SEL='", "var SEL='.hero-ad-slot,");
const sizes = [...new Set((s.match(/class="ad-?(\d+x\d+)"/g)||[]).map(x=>x.match(/ad-?(\d+x\d+)/)[0]))].filter(c=>+c.match(/(\d+)x/)[1] > 600);
sizes.forEach(c => { if (!new RegExp("SEL='[^']*\\."+c+"[,']").test(s)) s = s.replace("var SEL='", "var SEL='." + c + ","); });
const body = s.slice(s.indexOf('<body'), s.indexOf('</body>')).replace(/<script[\s\S]*?<\/script>/g,'');
log('div', (body.match(/<div\b/g)||[]).length, (body.match(/<\/div>/g)||[]).length, 'sec', (body.match(/<section\b/g)||[]).length, (body.match(/<\/section>/g)||[]).length, 'old', /More than reach<\/h3>\s*<div class="impact-grid"/.test(s), 'ld', (s.match(/class="ld-close"/g)||[]).length, 'hdr', (s.match(/class="topbar"/g)||[]).length, 'foot', (s.match(/global-footer">/g)||[]).length, 'repeat', /Loop Digital · |<span>Loop Digital —/.test(s), 'wide', sizes.join(','));
await saveFile(o.out, s);
let g = await readFile('Showroom Loop Digital.dc.html');
const m = g.match(new RegExp('<img src="uploads/[^"]*"[^>]*alt="' + o.alt + '"[^>]*/?>'));
log('card', m && m[0].slice(0,80));
if (m && !g.includes('data-demo="' + o.out + '"')) { g = replaceText(g, m[0], `<a href="${o.out}" data-demo="${o.out}" style="display:block; cursor:pointer">${m[0]}</a>`); await saveFile('Showroom Loop Digital.dc.html', g); }
})

/* NOTE: for full-screen takeovers copy the "full-screen takeover starts below" script from demos/samsung-gear-takeover.html */
