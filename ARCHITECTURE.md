# 📐 Projekt Architektúra és Struktúra

## 🏗️ Technológiai Stack

### Frontend
- **React 18** - Modern UI komponensek
- **TypeScript** - Type-safe fejlesztés
- **Vite** - Gyors build tool (HMR, optimalizált bundle)
- **Tailwind CSS** - Utility-first CSS framework

### PWA
- **vite-plugin-pwa** - Service Worker és manifest generálás
- **Workbox** - Offline-first működés

### Képkezelés
- **html2canvas** - DOM elemek konvertálása képpé

### Backend Ready
- **Supabase** - PostgreSQL adatbázis, auth, storage (előkészítve)

### Deployment
- **Netlify** - Automatikus CI/CD, instant rollback

## 📁 Projekt Struktúra

```
mecseki-coelho/
│
├── 📄 Configuration Files
│   ├── package.json          # NPM függőségek
│   ├── tsconfig.json         # TypeScript config
│   ├── vite.config.ts        # Vite + PWA setup
│   ├── tailwind.config.js    # Tailwind pasztell színek
│   ├── postcss.config.js     # CSS processing
│   ├── netlify.toml          # Netlify deployment
│   └── .env.example          # Környezeti változók sablon
│
├── 📂 public/                # Statikus fájlok
│   ├── pwa-*.png            # PWA ikonok (generálandó)
│   └── README.md            # Ikon generálási útmutató
│
├── 📂 src/
│   │
│   ├── 📂 components/       # React komponensek
│   │   └── AnimationLayer.tsx
│   │       ├── 100+ animációs elem renderelése
│   │       ├── RequestAnimationFrame loop
│   │       ├── Smooth CSS transitions
│   │       └── SVG alapú alakzatok
│   │
│   ├── 📂 utils/            # Utility függvények
│   │   ├── quoteGenerator.ts
│   │   │   ├── 30+ sablon kombináció
│   │   │   ├── Magyar nyelv
│   │   │   ├── Minimum 12 szavas mondatok
│   │   │   └── Coelho-stílusú patetikus tartalom
│   │   │
│   │   └── animationGenerator.ts
│   │       ├── 100+ elem generálás
│   │       ├── 6 animáció típus (szív, csillag, stb.)
│   │       ├── Véletlenszerű mozgás, rotáció
│   │       ├── Pasztell színpaletta
│   │       └── SVG path generálás
│   │
│   ├── 📂 types/            # TypeScript típusok
│   │   └── animation.ts
│   │       ├── AnimationElement interface
│   │       └── AnimationConfig interface
│   │
│   ├── 📄 App.tsx           # Fő alkalmazás komponens
│   │   ├── State management (quote, animation)
│   │   ├── html2canvas képmentés
│   │   ├── Gombok (Puffogtatás, Animáció, Mentés)
│   │   └── Pasztell gradient háttér
│   │
│   ├── 📄 main.tsx          # React belépési pont
│   ├── 📄 index.css         # Globális Tailwind stílusok
│   └── 📄 vite-env.d.ts     # Vite TypeScript típusok
│
├── 📄 index.html            # HTML sablon (PWA meta tags)
│
└── 📚 Documentation
    ├── README.md            # Főútmutató (HU)
    ├── CLAUDE_CODE_GUIDE.md # Claude Code használat
    ├── ARCHITECTURE.md      # Ez a fájl
    └── setup.sh             # Gyors setup script

```

## 🔄 Adatfolyam

### 1. Közhely Generálás
```
User Click "Puffogtatás"
    ↓
App.tsx → handleGenerateQuote()
    ↓
quoteGenerator.ts → generateCoelhoQuote()
    ↓
Random template választás
    ↓
Random elemek (subjects, verbs, metaphors, stb.)
    ↓
12+ szavas mondat összeállítása
    ↓
State update (setQuote)
    ↓
UI re-render
```

### 2. Animáció Bekapcsolás
```
User Click "Animáció bekapcsolása"
    ↓
App.tsx → handleToggleAnimation()
    ↓
animationGenerator.ts → generateAnimationElements(120)
    ↓
120 AnimationElement létrehozása
    ├── Random típus (heart, star, pacman, stb.)
    ├── Random pozíció (x, y)
    ├── Random méret, rotáció
    ├── Random sebesség
    └── Random pasztell szín
    ↓
State update (setAnimationElements)
    ↓
AnimationLayer.tsx render
    ↓
RequestAnimationFrame loop
    ↓
updateAnimationElement() minden elemre
    ├── Mozgatás (x, y)
    ├── Rotáció
    ├── Opacity változás
    └── Wrap around (ha kilép a képernyőről)
    ↓
Folyamatos újra-renderelés
```

### 3. Képmentés
```
User Click "Mentés ikon"
    ↓
App.tsx → handleSaveImage()
    ↓
html2canvas(contentRef.current)
    ├── Teljes DOM elem befotózása
    ├── Animációk aktuális állapota
    └── Háttér, szöveg, minden
    ↓
Canvas → Blob konverzió
    ↓
Blob → Object URL
    ↓
Automatikus letöltés (a tag)
    ↓
URL cleanup
```

## 🎨 Design System

### Színpaletta (Pasztell)
```css
pink:   #ffd6e7
purple: #e6d6ff
blue:   #d6e6ff
peach:  #ffe6d6
mint:   #d6ffe6
```

### Tipográfia
- **Font:** Crimson Text (Google Fonts)
- **Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Használat:**
  - Cím: 4xl-5xl, bold
  - Alcím: 2xl-3xl, italic
  - Közhely: xl-2xl, regular

### Spacing
- Tailwind default spacing scale
- Container: max-w-3xl
- Padding: p-8 (desktop), p-4 (mobile)

### Shadows
- Card: shadow-2xl
- Buttons: shadow-lg, hover:shadow-xl
- Icons: drop-shadow(0 2px 4px rgba(0,0,0,0.1))

## 🔌 API Integráció (Előkészítve)

### Supabase Schema (későbbi bővítéshez)

```sql
-- Felhasználók kedvenc mondatai
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  quote_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_favorite BOOLEAN DEFAULT FALSE
);

-- Napi közhely
CREATE TABLE daily_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_text TEXT NOT NULL,
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  view_count INTEGER DEFAULT 0
);
```

### API Endpoints (javaslat)
```
GET  /api/quotes          - Összes mentett közhely
POST /api/quotes          - Új közhely mentése
GET  /api/quotes/random   - Random közhely
GET  /api/quotes/daily    - Mai napi közhely
POST /api/quotes/:id/like - Like funkció
```

## 🚀 Performance

### Optimalizációk
- **Code Splitting:** Vite automatikus
- **Tree Shaking:** Használatlan kód eltávolítása
- **CSS Purging:** Tailwind csak használt osztályokat
- **Image Optimization:** SVG használata (scalable)
- **Lazy Loading:** React.lazy() (ha szükséges)

### PWA Caching
```javascript
// Workbox stratégiák
{
  '**/*.{js,css,html}': 'CacheFirst',
  '**/*.{png,jpg,svg}': 'CacheFirst',
  '/api/**': 'NetworkFirst'
}
```

## 🧪 Testing Stratégia (javaslat)

### Unit Tests (Jest)
- `quoteGenerator.test.ts` - Mondat generálás logika
- `animationGenerator.test.ts` - Animáció kalkulációk

### Integration Tests
- `App.test.tsx` - Komponens integrációk

### E2E Tests (Playwright)
- Közhely generálás flow
- Animáció be/kikapcsolás
- Képmentés funkció

## 📦 Build Output

### Development
```
npm run dev
→ Vite dev server @ localhost:5173
→ Hot Module Replacement (HMR)
→ Source maps
```

### Production
```
npm run build
→ dist/
  ├── index.html (minified)
  ├── assets/
  │   ├── index-[hash].js (bundled, minified)
  │   └── index-[hash].css (purged, minified)
  ├── manifest.webmanifest
  └── sw.js (service worker)
```

## 🔐 Biztonság

### Környezeti Változók
- Csak `VITE_` prefixű változók kerülnek a kliensbe
- Érzékeny kulcsok backend-en tárolva (Supabase)
- `.env` gitignore-ban

### Content Security Policy (javaslat)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               img-src 'self' data:; 
               script-src 'self' 'unsafe-inline'">
```

## 🌐 Browser Support

- **Chrome/Edge:** 90+
- **Firefox:** 88+
- **Safari:** 14+
- **Mobile Safari:** 14+
- **Android Chrome:** 90+

## 📱 PWA Features

### Installálhatóság
- ✅ manifest.json
- ✅ Service Worker
- ✅ HTTPS (Netlify automatikus)
- ✅ 192x192 és 512x512 ikonok

### Offline Működés
- ✅ Statikus fájlok cache-elése
- ✅ Közhely generálás offline is működik
- ⏳ API hívások: Network First stratégia

## 🔮 Jövőbeli Fejlesztések

1. **Backend Integráció**
   - Supabase auth
   - Felhasználói profilok
   - Kedvenc mondatok mentése

2. **Social Features**
   - Megosztás Facebookon, Twitteren
   - QR kód generálás
   - Közösségi galléria

3. **AI Enhancement**
   - Claude API integráció még több variációért
   - Képgenerálás (DALL-E, Stable Diffusion)
   - Hangbemondás (TTS)

4. **Gamification**
   - Napi kihívások
   - Achievement rendszer
   - Leaderboard

5. **Multi-language**
   - Angol, német, francia, spanyol

---

**Készült:** 2024
**Technológia:** React + TypeScript + Vite + Tailwind + PWA
**Stílus:** Gagyi, patetikus, filozofikus 🎭✨
