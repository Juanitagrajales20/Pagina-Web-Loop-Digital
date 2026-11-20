# Showroom Mobile Fix Report

## Problem
The Loop Digital showroom worked well on desktop/but had issues on mobile devices. The main problems were:
- Horizontal scrolling caused by `width:100vw` (includes browser chrome)
- Height issues from `height:100vh` (address bar shifts on mobile)
- Fixed padding and grid layouts that don't adapt to narrow screens
- Small touch targets for navigation

## Solution
Modified `Showroom Loop Digital.dc.html` with the following changes:

### 1. Viewport & Units Fix
- Changed `<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">`
- Changed `width:100vw` → `width:100%` on all slides
- Changed `height:100vh` → `height:100dvh` on all slides
- Added helper scripts for Safari vw/vh handling

### 2. Mobile-Responsive CSS

**@media (max-width:768px):**
- Padding: `44px 64px 40px` → `28px clamp(20px,5vw,36px) 16px`
- Grid columns stack: `.ld-sidecol`, `div[style*="flex:9 1 460px"]` → `flex:1 1 100%`
- Header gap: reduced from `clamp(14px,2.4vw,30px)` to `8px`
- Touch targets: `span[data-goto]` → `padding:8px 12px`, `font-size:8px`
- Video mock: `.ld-vmock` → `transform:scale(.6)`
- Overflow: `body{overflow-x:hidden}`

**@media (max-width:420px):**
- Padding: `44px 64px 40px` → `16px clamp(16px,4vw,28px) 12px`
- Layout: `.ld-hero-wrap{container-type:inline-size}`
- Text: `h1{font-size:clamp(36px,8vw,48px)}`
- Cards: `.ld-pub-grid > div` → `width:100%`, `max-width:100%`
- Navigation: `nav a` → `font-size:8px`, `padding:6px 8px`

### Files Modified
- `Showroom Loop Digital.dc.html` - Main showroom file with all fixes

### Result
- ✅ No horizontal scrolling on mobile
- ✅ Proper address bar handling
- ✅ Content stacks appropriately on narrow screens
- ✅ Larger, tap-friendly touch targets
- ✅ Scaled text and elements proportional to screen width
- ✅ Desktop experience unchanged

### Server
Running at `http://localhost:8081/` via `servidor.ps1`