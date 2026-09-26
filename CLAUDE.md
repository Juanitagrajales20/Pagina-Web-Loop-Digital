# Showroom Loop Digital — orden de slides
- Slide #1 = Home ("One Connected Brand Experience").
- #2 Display, #3 Dynamic Ads, #4 Geofencing, #5 Rich Media, #6 Native, #7 Video, #8 CTV, #9 Audio, #10 DOOH, #11 Gaming, #12 Contact us (contacto del vendedor + botón a la propuesta comercial).
- Paginador: punto N → slide #N. Botones del home: cada formato → su slide (#2–#10).
- Cambiar de slide SOLO con clic en botones (nav inferior, paginador, botones del home). Rueda, trackpad, flechas de teclado y swipe NO cambian de slide; la rueda solo hace scroll dentro de las galerías de cards.
- Scroll de galerías: scrollbar nativa oculta + indicador visible pero sobrio: riel 4×160px rgba(237,239,234,.16), tramo lima con leve glow, etiqueta vertical "SCROLL ↓" mono 9px (flecha lima animada) debajo; fundido inferior de la galería mientras quede contenido. Solo visible si hay overflow; la etiqueta y el fundido desaparecen al llegar al final.

# Calidad de diagramación (showroom y showcases)
- Nunca dejar espacios grandes vacíos. Equilibrar columnas (align stretch + contenido distribuido) o rellenar con copy derivado del que ya existe.
- Banners SIN recuadros de fondo ni contornos alrededor (ni gris, ni outline, ni box-shadow). Solo líneas divisorias de un lado entre secciones.
- Texto junto a un banner alto: la columna se estira a la altura del banner y el bloque de texto queda centrado en vertical (margin auto / align-self center), nunca pegado arriba con hueco abajo.
- Si el hueco es grande, rellenar con un banner propio de Loop Digital (house ad) con el emoji wink: fondo #080808, kicker "AD · W × H" + "● LIVE" lima, titular Archivo 900 blanco sin punto final ("STILL HERE", "YOU LOOKED", "SEEN. REMEMBERED"), texto corto #C7C9C3, botón pill lima "LET'S TALK →", "PREMIUM MEDIA" gris. Tamaños 640×320 (columna ancha) o 300×250. En slots que pueden quedar vacíos, ponerlo detrás del anuncio (z-index:-1) como fallback.
- Separación bloque ↔ banner: 40–48px arriba y abajo; nunca etiqueta o banner pegados a un párrafo.

# Campaign Showcases (demos/*.html) — misma línea visual que el showroom
- Fuentes: Archivo (títulos 900, uppercase) + JetBrains Mono (kickers/labels, tracking amplio).
- Colores: fondo #08090A, violeta #9B4DFF, lima #E8FF52, líneas #242723 / #2E322D, texto #EDEFEA / gris #9C9A95 / #C7C9C3.
- El "publisher" simulado puede ser claro (papel), pero acentos y marco siempre con la paleta Loop Digital.
- Escala tipográfica única en showcases: hero 52 · título de sección 32 · subtítulo 22 · título de card 16 · cuerpo 15 · texto secundario 13.5 · kicker/label 10 (mono, tracking 0.28em).

# Entrega de showcases
- Cada showcase nuevo: copiar a demos/<nombre>.html, aplicar paleta + escala Loop Digital, y conectarlo a su card del showroom con <a href="demos/x.html" data-demo="demos/x.html"> envolviendo la <img> (abre en pestaña nueva vía blob, fallback overlay). Verificar que responda al clic.

# Marco estándar de showcase (igual en todos)
- Header sticky: logo LOOP/DIGITAL izq · título centro "FORMATO — MARCA" (mono 12, tracking 0.32em) · botón "× CERRAR" der (pill, borde #2E322D, hover violeta; cierra pestaña o overlay).
- Fila meta: kicker lima "DESKTOP — LOOP DIGITAL SIMULATED PUBLISHER" izq + DESKTOP/IPAD/MOBILE der.
- Browser chrome (3 puntos + URL) sobre publisher papel.
- Ancho estándar del publisher en TODOS los showcases: .page-wrap width:min(1180px, calc(100% - 64px)), centrado; móvil calc(100% - 24px).
- Footer global siempre visible: "PREMIUM MEDIA FOR BRANDS THAT WANT TO BE REMEMBERED." izq · "WHERE YOUR BRAND APPEARS MATTERS." lima der.
- Header, meta y footer se ven siempre (pestaña nueva u overlay).
- Título hero del publisher ("LOOP DIGITAL CAMPAIGN SHOWCASE") siempre en UN solo renglón: nowrap + tamaño fluido min(52px, 4vw).
- Nunca scroll horizontal en showcases: anuncios anchos (1200×250, 970×250, 728×90…) se escalan para caber en su contenedor (script fit estándar).
- Bloque de cierre estándar en todos los showcases (antes del publisher-footer): .ld-close con 01 Roles (Display/Rich Media/Dynamic Ads) · 02 More than reach (5 resultados) · 03 How we work (Position/Curate/Connect/Refine) · firma. Todo el texto dentro del publisher en negro #111; violeta solo como marcador.
- No repetir "Loop Digital" dentro del showcase: el logo del header basta. Publisher-footer = "Simulated Publisher"; firma de cierre sin "Loop Digital".
- Subtítulos y textos homogéneos en todo el publisher (referencia "Top Story"): h2/h3 Archivo 900 uppercase 32px, lh 1.02, tracking -0.035em; párrafos Archivo 400 15px, lh 1.6; todo #111.
- Títulos de card/punto (h4, strong): Archivo 900 16px uppercase lh 1.2. Texto secundario de cards: 13.5px lh 1.55 #111. Kicker → título 14px; título → párrafo 14px.
- Kickers y etiquetas "Advertising" dentro del publisher: JetBrains Mono 10px 700, tracking 0.28em, NEGRO #111 (no violeta). Kicker→título 14px; etiqueta→anuncio 12px.
- Ningún título ni texto en morado dentro del publisher: todo negro #111 (en paneles oscuros, blanco #EDEFEA / lima). Violeta solo como marcador gráfico.
- Etiqueta de banner estándar: "Advertising · ANCHO × ALTO" (medida real), una sola línea (nowrap), justo encima del banner a 12px, alineada al borde izquierdo del creativo (calcular desde la posición de la propia etiqueta, no del padre). Etiqueta y banner apilados juntos (flex column gap 12px); en grids de filas usar grid-template-rows:min-content 1fr para que la fila de la etiqueta no se estire.
- Galerías de ejecuciones (una por fila): texto a la izquierda centrado en vertical, etiqueta + banner a la derecha alineados a la izquierda.
- Sin barras de scroll junto a banners: contenedores de anuncios overflow hidden, scrollbars ocultas.
- Anuncios a pantalla completa/expandibles empiezan debajo del header sticky; los banners de slot (300×600, etc.) nunca quedan fijos al hacer scroll. Capas adform-adbox-fixed vacías: ocultas y sin pointer-events (no deben bloquear clics).
- Estilos inline de paneles propios (house ads, fallbacks) con !important en color y font-size: las reglas globales del publisher (#111, 13.5px) los pisan. El emoji se dibuja en SVG (no con spans em) para que no lo deformen.

# Anuncios expandibles / rich media (aprendido en Decathlon, Prudential, Mercedes)
- Nunca mover (reparent) un nodo que contiene un iframe de anuncio: el navegador lo recarga y queda en blanco. Para anclarlo, posicionarlo en absoluto con coordenadas del documento desde donde está.
- Half-page expandible (300×600 → 800×600) en columna derecha: cerrado alineado exacto al slot; expandido con borde derecho y top fijos al slot (crece hacia la izquierda sobre el texto). Corregir con delta medido del rect real (getBoundingClientRect), forzar transform:none y margin:0.
- Identificar el anuncio correcto por tamaño/slot antes de tocarlo; nunca tocar otros anuncios de la página (p.ej. el 980×70 superior).
- Zona de expansión sin caja punteada ni fondo: texto a la izquierda (kicker "EXPANSION AREA · 800 × 600", título 32, párrafo 15, puntos 01–03, "HOVER THE AD TO EXPAND ←") y banner a la derecha, como un bloque centrado (grid minmax(0,760px) 300px, justify-content center, gap 48px). El relleno automático (house ads) nunca entra en zonas de expansión.
- El anuncio nunca queda fijo al hacer scroll ni por encima del header (header z-index máximo).
- Anuncios con video que quedan en blanco (autoplay bloqueado): script que recorre los iframes del anuncio y fuerza muted + playsinline + play() (ver demos/lyric-carousel.html, #ld-lyric-video).

# Proceso de trabajo
- Arreglos que valen para todos: aplicarlos en los 57 showcases, no solo en el reportado, y auditar después con un script qué archivos no lo recibieron (p.ej. los que no tienen </body>).
- Etiquetas de banner insertadas en contenedores flex en fila: envolver etiqueta + banner en una columna (flex column gap 12px) para que no queden al lado.

# Emoji de marca
- El emoji principal de Loop Digital es WINK (ojo izq. anillo violeta #9B4DFF, ojo der. línea plana violeta, sonrisa arco lima #E8FF52 sobre #080808). Usar siempre el wink cuando se use el emoji.
- Usar exactamente el wink del brandbook ("LOOP has a face"): SVG viewBox 0 0 186.8 171.7 — ellipse cx46.5 cy40 rx34.75 ry28.25 stroke 23.5 #9B4DFF · rect x93.8 y28.25 w93 h23.5 rx10 #9B4DFF · sonrisa path "M6 5 A 59.4 59.4 0 0 0 94 5" (viewBox 0 0 100 31) stroke 7.2 #E8FF52 round. Dentro de tile cuadrado radius 26%, #0B0B0B, borde 1px #242723; emoji ≈47% del ancho del tile.

# Terminología
- Los formatos ahora se llaman "media placements" (MEDIA PLACEMENTS). Copy de cada placement = el de la página web (sección 07). ES: "MEDIA PLACEMENTS" se mantiene en inglés.
