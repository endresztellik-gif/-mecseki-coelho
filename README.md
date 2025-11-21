# 🎭 Mecseki Coelho - A közhely-ágyú

Egy modern, letisztult PWA alkalmazás, amely gagyi Coelho-stílusú filozofikus közhelyeket generál, giccses animációkkal és képmentési funkcióval.

## ✨ Funkciók

### 🎪 Puffogtatás gomb
- Random generált Coelho-stílusú közhely mondatok
- Minimum 12 szó hosszú, összetett mondatok
- Magyar nyelven
- Gagyi, patetikus, túlzóan filozofikus stílus
- 30+ különböző sablon kombinációval

**Példa mondatok:**
- "Az élet olyan, mint egy folyó, amely nem tud visszafordulni, mert a sors már megírta a történetet."
- "A szív útja mindig a lelken keresztül vezet, ahol a szerelem fénye ragyog."

### ✨ Animáció rendszer
- Toggle funkció (ki/be kapcsolható)
- 100+ véletlenszerű animációs elem
- Folyamatosan változó, giccses animációk:
  - ❤️ Lebegő szívek
  - ⭐ Csillogó csillagok
  - 👾 Pac-Man szerű elemek
  - ✨ Szikrák és buborékok
  - 🌸 Virágok
- Pasztell színpaletta
- Végtelen loop, smooth CSS animációkkal

### 💾 Képmentés funkció
- Lap alján letöltés ikon
- A megjelenített közhely + animáció mentése PNG képként
- html2canvas technológia
- Automatikus letöltés a böngészőben

## 🎨 Design

- **Háttér:** Pasztell gradiens (rózsaszín, lila, kék, barack, menta)
- **Betűtípus:** Crimson Text (elegáns serif)
- **Stílus:** Modern, letisztult, minimalista
- **Framework:** Tailwind CSS
- **Reszponzív:** Mobile-first design

## 🚀 Technikai stack

- **Frontend:** React 18 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **PWA:** vite-plugin-pwa (manifest + service worker)
- **Képmentés:** html2canvas
- **Backend ready:** Supabase konfiguráció előkészítve
- **Deployment:** Netlify optimalizált

## 📦 Telepítés és futtatás

### Előfeltételek
- Node.js 18+ telepítve
- npm vagy yarn package manager

### 1. Függőségek telepítése

```bash
npm install
```

### 2. Fejlesztői szerver indítása

```bash
npm run dev
```

Az alkalmazás elérhető lesz: `http://localhost:5173`

### 3. Production build

```bash
npm run build
```

A build fájlok a `dist/` könyvtárban lesznek.

### 4. Preview

```bash
npm run preview
```

## 🌐 Netlify Deployment

### Automatikus deployment

1. Jelentkezz be a [Netlify](https://netlify.com) oldalon
2. **New site from Git** → válaszd ki a GitHub repót
3. Build beállítások:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18

### Környezeti változók (opcionális)

Ha később Supabase-t akarsz használni, add hozzá a Netlify-on:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Manuális deployment

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

## 🔧 Claude Code fejlesztéshez

A projekt teljesen készen áll Claude Code használatára:

### Projekt struktúra

```
mecseki-coelho/
├── src/
│   ├── components/
│   │   └── AnimationLayer.tsx    # Animációs komponens
│   ├── utils/
│   │   ├── quoteGenerator.ts     # Közhely generátor
│   │   └── animationGenerator.ts # Animáció logika
│   ├── types/
│   │   └── animation.ts          # TypeScript típusok
│   ├── App.tsx                   # Fő komponens
│   ├── main.tsx                  # Belépési pont
│   └── index.css                 # Globális stílusok
├── public/                       # Statikus fájlok (ikonok, manifest)
├── index.html                    # HTML sablon
├── vite.config.ts                # Vite + PWA konfig
├── tailwind.config.js            # Tailwind konfig
├── netlify.toml                  # Netlify deployment config
├── .env.example                  # Környezeti változók példa
└── package.json                  # Függőségek
```

### Fejlesztési ötletek Claude Code-dal

1. **Több közhely sablon hozzáadása:**
   - Szerkeszd: `src/utils/quoteGenerator.ts`
   - Adj hozzá új template függvényeket a `templates` tömbhöz

2. **Új animáció típusok:**
   - Szerkeszd: `src/utils/animationGenerator.ts`
   - Adj hozzá új típusokat az `animationTypes` tömbhöz
   - Készíts új SVG path-okat a `getShapePath` függvényben

3. **Supabase integráció:**
   - Közhely mondatok mentése adatbázisba
   - User kedvenc mondatok
   - Megosztási funkció

4. **Továbbfejlesztési ötletek:**
   - Social share gombok
   - Többnyelvű támogatás
   - Dark mode
   - Hangosbemondás (text-to-speech)
   - Közhely statisztikák

## 📝 Környezeti változók

Másold le a `.env.example` fájlt `.env` néven és töltsd ki az értékeket:

```bash
cp .env.example .env
```

Jelenleg a Supabase változók opcionálisak, az alap funkciók ezek nélkül is működnek.

## 🎯 PWA funkciók

- ✅ Offline működés (service worker)
- ✅ Installálható mobil és desktop eszközökön
- ✅ App manifest
- ✅ Ikonok (192x192, 512x512)
- ✅ Theme color

## 🐛 Ismert problémák

Nincsenek ismert problémák. Ha találsz egyet, jelezd!

## 📄 Licenc

MIT License - Használd szabadon!

## 🤝 Közreműködés

Pull requestek és issue-k mindig szívesen látottak!

---

**Készítette:** Claude AI + Te 🎭✨

**Megjegyzés:** Ez egy paródia projekt, nem vehető komolyan. Paulo Coelho tiszteletére készült gagyi stílusban. 😄
