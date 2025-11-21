#!/bin/bash

# Mecseki Coelho - Quick Setup Script
# Ez a script gyorsan beállítja a projektet

set -e

echo "🎭 Mecseki Coelho - A közhely-ágyú"
echo "=================================="
echo ""

# Színes output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Node.js verzió ellenőrzése
echo -e "${BLUE}1. Node.js verzió ellenőrzése...${NC}"
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${YELLOW}⚠️  Figyelem: Node.js 18+ ajánlott (jelenlegi: v$NODE_VERSION)${NC}"
else
    echo -e "${GREEN}✓ Node.js verzió OK (v$NODE_VERSION)${NC}"
fi
echo ""

# 2. Függőségek telepítése
echo -e "${BLUE}2. Függőségek telepítése...${NC}"
npm install
echo -e "${GREEN}✓ Függőségek telepítve${NC}"
echo ""

# 3. .env fájl létrehozása (ha nincs)
if [ ! -f .env ]; then
    echo -e "${BLUE}3. .env fájl létrehozása...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env fájl létrehozva (opcionális változók)${NC}"
else
    echo -e "${GREEN}✓ .env fájl már létezik${NC}"
fi
echo ""

# 4. Git inicializálás (ha nincs)
if [ ! -d .git ]; then
    echo -e "${BLUE}4. Git repo inicializálása...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Mecseki Coelho PWA setup"
    echo -e "${GREEN}✓ Git repo inicializálva${NC}"
else
    echo -e "${GREEN}✓ Git repo már létezik${NC}"
fi
echo ""

# 5. Kész!
echo -e "${GREEN}=================================="
echo "✨ Setup kész! ✨"
echo "==================================${NC}"
echo ""
echo "Következő lépések:"
echo ""
echo -e "${BLUE}Fejlesztői szerver indítása:${NC}"
echo "  npm run dev"
echo ""
echo -e "${BLUE}Production build:${NC}"
echo "  npm run build"
echo ""
echo -e "${BLUE}Claude Code használat:${NC}"
echo "  Nyisd meg VS Code-ban és nézd meg a CLAUDE_CODE_GUIDE.md fájlt"
echo ""
echo -e "${BLUE}Netlify deployment:${NC}"
echo "  1. Push-old fel GitHub-ra"
echo "  2. Csatlakoztasd Netlify-on"
echo "  3. Build command: npm run build"
echo "  4. Publish directory: dist"
echo ""
echo -e "${YELLOW}🎭 Jó puffogtatást! 🎭${NC}"
