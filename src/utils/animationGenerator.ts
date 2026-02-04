import type { AnimationElement, AnimationType, AnimationBehavior, AnimationTheme } from '../types/animation';
import { animationThemes } from '../types/animation';

// Pasztell színpaletta
const pastelColors = [
  '#ffd6e7', // pink
  '#e6d6ff', // purple
  '#d6e6ff', // blue
  '#ffe6d6', // peach
  '#d6ffe6', // mint
  '#ffe6f0', // light pink
  '#f0d6ff', // lavender
  '#d6f0ff', // sky blue
  '#fff0d6', // cream
  '#e6ffd6', // light green
];

// Tűzijáték/ünnepi színek
const fireworkColors = [
  '#ff6b6b', // red
  '#ffd93d', // gold
  '#6bcb77', // green
  '#4d96ff', // blue
  '#ff6bff', // magenta
  '#ffffff', // white
];

// Őszi színek falevelekhez
const autumnColors = [
  '#d4a373', // tan
  '#bc6c25', // rust
  '#dda15e', // orange
  '#606c38', // olive
  '#8b0000', // dark red
];

// Viselkedés típus meghatározása típus alapján
export const getBehaviorForType = (type: AnimationType): AnimationBehavior => {
  const growTypes: AnimationType[] = ['rose', 'potFlower', 'sakura'];
  const explodeTypes: AnimationType[] = ['firework', 'confetti'];
  const specialTypes: AnimationType[] = ['butterfly', 'leaf', 'bird', 'snowflake', 'banana'];

  if (growTypes.includes(type)) return 'grow';
  if (explodeTypes.includes(type)) return 'explode';
  if (specialTypes.includes(type)) return 'special';
  return 'float';
};

// Színpaletta típus alapján
const getColorsForType = (type: AnimationType): string[] => {
  switch (type) {
    case 'firework':
    case 'confetti':
      return fireworkColors;
    case 'leaf':
      return autumnColors;
    case 'rose':
      return ['#ff6b6b', '#ff8fab', '#ffc2d1', '#ffe5ec'];
    case 'snowflake':
      return ['#ffffff', '#e0f7fa', '#b2ebf2', '#d6f0ff'];
    case 'coffee':
      return ['#6f4e37', '#a67b5b', '#c4a77d', '#d4a373'];
    case 'banana':
      return ['#ffe135', '#ffd700', '#ffec8b'];
    default:
      return pastelColors;
  }
};

// Random szám generálás egy tartományban
const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Random elem választás tömbből
const randomFrom = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Random téma választás
export const getRandomTheme = (): AnimationTheme => {
  const themes: AnimationTheme[] = ['eredeti', 'irodalmi', 'természet', 'ünnepi', 'vicces'];
  return randomFrom(themes);
};

// Egyedi animációs elem generálása (téma alapján)
export const generateAnimationElement = (index: number, theme?: AnimationTheme): AnimationElement => {
  const currentTheme = theme || getRandomTheme();
  const availableTypes = animationThemes[currentTheme];
  const type = randomFrom(availableTypes);
  const behavior = getBehaviorForType(type);
  const colors = getColorsForType(type);

  // Alap tulajdonságok
  const element: AnimationElement = {
    id: `anim-${index}-${Date.now()}-${Math.random()}`,
    type,
    behavior,
    x: randomInRange(0, 100),
    y: randomInRange(0, 100),
    size: randomInRange(20, 60),
    rotation: randomInRange(0, 360),
    speed: randomInRange(2, 8),
    color: randomFrom(colors),
    opacity: randomInRange(0.3, 0.8),
  };

  // Viselkedés-specifikus kezdőértékek
  if (behavior === 'grow') {
    element.scale = randomInRange(0.1, 0.3);
    element.bloomState = 0;
  } else if (behavior === 'special') {
    element.specialState = 0;
    element.velocityX = randomInRange(-2, 2);
    element.velocityY = randomInRange(0.5, 2);
  }

  return element;
};

// 100+ animációs elem generálása (opcionálisan téma alapján)
export const generateAnimationElements = (count: number = 100, theme?: AnimationTheme): AnimationElement[] => {
  const selectedTheme = theme || getRandomTheme();
  return Array.from({ length: count }, (_, i) => generateAnimationElement(i, selectedTheme));
};

// Lebegő elem frissítése (alapértelmezett viselkedés)
const updateFloatingElement = (element: AnimationElement): AnimationElement => {
  const moveX = randomInRange(-1, 1) * element.speed * 0.1;
  const moveY = randomInRange(-1, 1) * element.speed * 0.1;

  let newX = element.x + moveX;
  let newY = element.y + moveY;

  if (newX < -10) newX = 110;
  if (newX > 110) newX = -10;
  if (newY < -10) newY = 110;
  if (newY > 110) newY = -10;

  const newRotation = (element.rotation + randomInRange(1, 3)) % 360;

  const opacityChange = randomInRange(-0.05, 0.05);
  let newOpacity = element.opacity + opacityChange;
  newOpacity = Math.max(0.2, Math.min(0.9, newOpacity));

  return {
    ...element,
    x: newX,
    y: newY,
    rotation: newRotation,
    opacity: newOpacity,
  };
};

// Növekvő elem frissítése (rózsák, virágok)
const updateGrowingElement = (element: AnimationElement): AnimationElement => {
  const scale = element.scale || 0.1;
  const bloomState = element.bloomState || 0;

  // Lassan növekszik
  let newScale = scale + 0.005;
  let newBloomState = bloomState + 0.01;

  // Ha elérte a maximumot, újrakezdi
  if (newScale > 1.2) {
    newScale = 0.1;
    newBloomState = 0;
  }

  // Enyhe mozgás
  const moveX = Math.sin(Date.now() / 1000 + element.x) * 0.1;
  const moveY = Math.cos(Date.now() / 1500 + element.y) * 0.05;

  return {
    ...element,
    x: element.x + moveX,
    y: element.y + moveY,
    scale: newScale,
    bloomState: newBloomState,
    opacity: Math.min(0.9, 0.3 + newBloomState * 0.6),
  };
};

// Robbanó elem frissítése (tűzijáték, konfetti)
const updateExplodingElement = (element: AnimationElement): AnimationElement => {
  const specialState = element.specialState || 0;

  // Robbanás fázis
  let newState = specialState + 0.02;
  let newOpacity = element.opacity;
  let newScale = element.scale || 1;

  if (newState < 0.5) {
    // Felszálló fázis
    return {
      ...element,
      y: element.y - element.speed * 0.5,
      specialState: newState,
    };
  } else if (newState < 1) {
    // Robbanás/szétrepülés fázis
    const explosionProgress = (newState - 0.5) * 2;
    newScale = 1 + explosionProgress * 2;
    newOpacity = 0.9 - explosionProgress * 0.7;

    const angle = element.rotation * (Math.PI / 180);
    const spreadX = Math.cos(angle) * explosionProgress * 3;
    const spreadY = Math.sin(angle) * explosionProgress * 3;

    return {
      ...element,
      x: element.x + spreadX,
      y: element.y + spreadY,
      scale: newScale,
      opacity: newOpacity,
      specialState: newState,
      rotation: element.rotation + 5,
    };
  } else {
    // Újrakezdés
    return {
      ...element,
      x: randomInRange(20, 80),
      y: randomInRange(80, 100),
      scale: 1,
      opacity: randomInRange(0.6, 0.9),
      specialState: 0,
      rotation: randomInRange(0, 360),
    };
  }
};

// Speciális elem frissítése (pillangó, falevél, madár, hópehely, banán)
const updateSpecialElement = (element: AnimationElement): AnimationElement => {
  const velocityX = element.velocityX || 0;
  const velocityY = element.velocityY || 1;
  const specialState = element.specialState || 0;

  let newX = element.x;
  let newY = element.y;
  let newRotation = element.rotation;
  let newSpecialState = specialState + 0.05;
  let newScale = element.scale || 1;

  switch (element.type) {
    case 'butterfly':
      // Szárnycsapás effekt (scale pulzálás Y tengely mentén)
      newScale = 0.7 + Math.sin(newSpecialState * 5) * 0.3;
      // Hullámzó repülés
      newX = element.x + Math.sin(newSpecialState) * 0.5;
      newY = element.y + Math.sin(newSpecialState * 0.5) * 0.3;
      newRotation = element.rotation + Math.sin(newSpecialState) * 2;
      break;

    case 'bird':
      // Hullámzó repülés balról jobbra
      newX = element.x + element.speed * 0.2;
      newY = element.y + Math.sin(newSpecialState * 2) * 0.3;
      if (newX > 110) newX = -10;
      break;

    case 'leaf':
      // Himbálózó zuhanás
      newX = element.x + Math.sin(newSpecialState * 2) * velocityX * 0.2;
      newY = element.y + velocityY * 0.3;
      newRotation = element.rotation + Math.sin(newSpecialState) * 3;
      if (newY > 110) {
        newY = -10;
        newX = randomInRange(0, 100);
      }
      break;

    case 'snowflake':
      // Lassú esés + oldalra sodródás
      newX = element.x + Math.sin(newSpecialState * 0.5) * 0.3;
      newY = element.y + velocityY * 0.15;
      newRotation = element.rotation + 0.5;
      if (newY > 110) {
        newY = -10;
        newX = randomInRange(0, 100);
      }
      break;

    case 'banana':
      // Fokozatos "héjlehúzás" effekt (rotation + scale változás)
      newScale = 0.8 + Math.abs(Math.sin(newSpecialState * 0.5)) * 0.4;
      newRotation = element.rotation + 1;
      newX = element.x + Math.sin(newSpecialState) * 0.2;
      newY = element.y + Math.cos(newSpecialState * 0.3) * 0.1;
      break;

    default:
      return updateFloatingElement(element);
  }

  // Wrap around
  if (newX < -10) newX = 110;
  if (newX > 110) newX = -10;

  return {
    ...element,
    x: newX,
    y: newY,
    rotation: newRotation,
    scale: newScale,
    specialState: newSpecialState,
  };
};

// Fő frissítő függvény - viselkedés alapján delegál
export const updateAnimationElement = (element: AnimationElement): AnimationElement => {
  switch (element.behavior) {
    case 'grow':
      return updateGrowingElement(element);
    case 'explode':
      return updateExplodingElement(element);
    case 'special':
      return updateSpecialElement(element);
    default:
      return updateFloatingElement(element);
  }
};

// SVG path generálás különböző alakzatokhoz
export const getShapePath = (type: AnimationType): string => {
  switch (type) {
    // === Meglévő alapok ===
    case 'heart':
      return 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
    case 'star':
      return 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
    case 'sparkle':
      return 'M12 0l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5L12 0z';
    case 'bubble':
      return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5-7a1 1 0 110-2 1 1 0 010 2z';
    case 'flower':
      return 'M12 1c1.5 0 3 2.5 3 5 2.5 0 5 1.5 5 3s-2.5 3-5 3c0 2.5-1.5 5-3 5s-3-2.5-3-5c-2.5 0-5-1.5-5-3s2.5-3 5-3c0-2.5 1.5-5 3-5zm0 7a2 2 0 100 4 2 2 0 000-4z';

    // === Javított Pac-Man ===
    case 'pacman':
      return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 0l8 10-8 10V2z';

    // === Tűzijáték ===
    case 'firework':
      return 'M12 2v6m0 4v10M2 12h6m4 0h10M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M19.07 4.93l-4.24 4.24m-5.66 5.66l-4.24 4.24';

    // === Rózsa ===
    case 'rose':
      return 'M12 2c-1 2-3 3-3 5s2 3 3 3 3-1 3-3-2-3-3-5zm0 6c-2 1-4 3-4 5 0 3 2 5 4 7 2-2 4-4 4-7 0-2-2-4-4-5zm0 4c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z';

    // === Banán ===
    case 'banana':
      return 'M7 3c0 0-1 2-1 5s1 7 3 10c2 3 5 4 7 4 0 0 1-1 1-2s-1-2-2-2c-2 0-4-1-5-3-1-2-2-5-2-7s0-3 1-4c0-1-2-1-2-1z';

    // === Cserepes virág ===
    case 'potFlower':
      return 'M12 2c-2 0-3 2-3 4 0 1 .5 2 1.5 2.5L10 10h4l-.5-1.5c1-.5 1.5-1.5 1.5-2.5 0-2-1-4-3-4zM8 12h8l-1 8H9l-1-8zm4-8c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1z';

    // === Irodalmi téma ===
    case 'quill':
      return 'M20 2c-2 2-6 6-8 10-1 2-2 5-2 8l2-2c0-2 1-4 2-6 2-4 5-7 7-9l-1-1zM4 20l2-2c1 1 2 2 4 2l-2 2c-2 0-3-1-4-2z';

    case 'book':
      return 'M4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2zm2 0h5v8l-2.5-1.5L6 12V4zm0 14v-2h12v2H6z';

    case 'coffee':
      return 'M18 8h2a2 2 0 012 2v1a2 2 0 01-2 2h-2M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm4-6v3m4-3v3m4-3v3';

    // === Természet téma ===
    case 'butterfly':
      return 'M12 12c-3-3-6-4-8-3s-2 4 0 6 5 2 8 0c3 2 6 2 8 0s2-5 0-6-5 0-8 3zm0 0v8m-1-4h2';

    case 'leaf':
      return 'M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-5 0-9 2-12 5l-2-2-3 3 3 3';

    case 'sakura':
      return 'M12 2c1 1 1 3 0 4-1-1-1-3 0-4zm-4 4c1.5 0 2.5 1 2.5 2.5S9.5 11 8 11s-2.5-1-2.5-2.5S6.5 6 8 6zm8 0c1.5 0 2.5 1 2.5 2.5S17.5 11 16 11s-2.5-1-2.5-2.5S14.5 6 16 6zM6 12c1 1.5 1 3 0 4.5-1-1.5-1-3 0-4.5zm12 0c1 1.5 1 3 0 4.5-1-1.5-1-3 0-4.5zM12 14c1.5 0 2.5 1 2.5 2.5S13.5 19 12 19s-2.5-1-2.5-2.5 1-2.5 2.5-2.5z';

    case 'bird':
      return 'M22 6c-2 0-4 1-5 3l-8 1c-2 0-4 1-5 3h5l-3 4 4-2 2 4 2-5 5 1c2-1 3-3 3-5V6z';

    // === Ünnepi téma ===
    case 'snowflake':
      return 'M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07M12 6l-2-2m4 0l-2 2m-6 4l-2 2m0-4l2 2m14-2l2 2m-2-4l-2 2m-6 10l-2 2m4-2l-2-2';

    case 'confetti':
      return 'M4 4l2 4 4-2-2-4-4 2zm12 0l2 4 4-2-2-4-4 2zM4 16l2 4 4-2-2-4-4 2zm12 0l2 4 4-2-2-4-4 2zM10 10l2 4 4-2-2-4-4 2z';

    case 'diamond':
      return 'M12 2L2 9l10 13 10-13-10-7zM2 9h20M7 9l5 13M17 9l-5 13M12 2l-5 7m10-7l-5 7';

    case 'moon':
      return 'M12 3a9 9 0 109 9c0-5-4-9-9-9zm0 0c2.5 0 5 2 5 5s-2.5 5-5 5';

    default:
      return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z';
  }
};
