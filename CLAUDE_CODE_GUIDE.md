# 🤖 Claude Code Használati Útmutató

## Projekt inicializálása Claude Code-dal

### 1. Projekt megnyitása VS Code-ban

```bash
cd /path/to/mecseki-coelho
code .
```

### 2. Claude Code indítása

Nyisd meg a VS Code-ot és indítsd el Claude Code-ot:
- **macOS/Linux:** `Cmd+Shift+P` → "Claude Code: Start Session"
- **Windows:** `Ctrl+Shift+P` → "Claude Code: Start Session"

### 3. Első lépések

Claude Code automatikusan felismeri a projekt struktúrát. Kezdő parancsok:

```
"Telepítsd a függőségeket és indítsd el a dev szervert"
```

vagy

```
"Elemezd a projekt struktúrát és adj egy összefoglalót"
```

## 🎯 Fejlesztési feladatok Claude Code-dal

### Közhely generátor bővítése

```
"Adj hozzá 20 új közhely sablont a quoteGenerator.ts fájlhoz, 
még gaggibban és patetikusabban, magyar nyelven"
```

### Animációk továbbfejlesztése

```
"Hozz létre 5 új animáció típust (pl. pillangó, hold, nap, szárnyak, mandalák)
az animationGenerator.ts-ben SVG path-okkal"
```

### UI/UX fejlesztés

```
"Add hozzá egy 'Random szín séma' gombot, ami megváltoztatja a 
pasztell színeket az egész alkalmazásban"
```

```
"Készíts egy 'Megosztás' gombot, ami lehetővé teszi a közhely 
megosztását social media platformokon"
```

### Supabase integráció

```
"Integrálj Supabase-t az alkalmazásba:
1. Hozz létre egy 'quotes' táblát a kedvenc mondatok tárolására
2. Add hozzá a mentés/betöltés funkciókat
3. Készíts egy 'Kedvencek' oldalt"
```

### PWA fejlesztés

```
"Generálj PWA ikonokat 192x192 és 512x512 méretben, 
pasztell színekkel, szív vagy csillag motívummal"
```

### Testing

```
"Írj unit teszteket a quoteGenerator.ts fájlhoz Jest-tel"
```

```
"Készíts E2E teszteket Playwright-tal a fő funkcionalitáshoz"
```

## 🔧 Netlify Deployment Claude Code-dal

### 1. GitHub repo létrehozása

```
"Inicializálj git repót, készíts .gitignore fájlt és 
push-old fel GitHub-ra 'mecseki-coelho' néven"
```

### 2. Netlify konfiguráció ellenőrzése

```
"Ellenőrizd a netlify.toml fájlt és győződj meg róla, 
hogy minden build beállítás helyes"
```

### 3. Deployment teszt

```
"Futtass egy production build-et és ellenőrizd, 
hogy minden működik-e"
```

## 📝 Gyakori Claude Code parancsok

### Kód elemzés
```
"Elemezd az App.tsx komponenst és javasolj optimalizációkat"
```

### Refactoring
```
"Refaktoráld az animationGenerator.ts-t tisztább, 
funkcionálisabb kódra TypeScript best practices szerint"
```

### Dokumentáció
```
"Generálj JSDoc kommenteket az összes függvényhez 
a utils/ könyvtárban"
```

### Hibajavítás
```
"Van egy bug: az animációk nem állnak le, amikor kikapcsolom őket. 
Találd meg és javítsd ki a problémát"
```

### Új feature hozzáadása
```
"Add hozzá a dark mode támogatást Tailwind-dal, 
egy toggle gombbal a jobb felső sarokban"
```

## 🎨 Design módosítások

### Színséma változtatás
```
"Változtasd meg a pasztell színeket egy vintage 
retro palettára (narancssárga, barna, zöld)"
```

### Animációk finomhangolása
```
"Lassítsd le az animációkat 50%-kal és adj hozzá 
smooth easing funkciókat"
```

### Layout átdolgozás
```
"Tedd a címet balra, a gombokat jobbra, és a 
közhely mondatot középre nagyobb betűmérettel"
```

## 🚀 Haladó funkciók

### Multi-language támogatás
```
"Adj hozzá i18n támogatást react-i18next-tel, 
magyar és angol nyelvre"
```

### API integráció
```
"Készíts egy backend API endpoint-ot Supabase Edge Functions-szel, 
ami napi közhely mondatot küld email-ben"
```

### Analytics
```
"Integrálj Google Analytics-t vagy Plausible-t 
privacy-friendly módon"
```

## 💡 Tippek

1. **Légy specifikus:** Minél részletesebb a kérésed, annál jobb lesz az eredmény
2. **Iteratív fejlesztés:** Kezdj kis lépésekkel, majd finomíts
3. **Tesztelés:** Kérj teszteket is a kódhoz
4. **Dokumentáció:** Claude Code tud generálni README-t és kommenteket
5. **Best practices:** Kérj TypeScript és React best practices-t

## 🐛 Troubleshooting

Ha valami nem működik:

```
"Elemezd a hibát és javasol megoldást: [másold be a hibaüzenetet]"
```

```
"Miért nem működik a [feature neve]? Debuggold végig a kódot"
```

```
"A build nem sikerül Netlify-on, nézd meg a build log-ot 
és javítsd ki: [másold be a log-ot]"
```

## 📚 További források

- [Vite dokumentáció](https://vitejs.dev/)
- [React dokumentáció](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/docs)
- [Netlify](https://docs.netlify.com/)

---

**Jó kódolást! 🎭✨**
