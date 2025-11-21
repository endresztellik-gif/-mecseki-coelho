import type { AnimationElement } from '../types/animation';

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

// Animáció típusok
const animationTypes: Array<'heart' | 'star' | 'pacman' | 'sparkle' | 'bubble' | 'flower'> = [
  'heart', 'star', 'pacman', 'sparkle', 'bubble', 'flower'
];

// Random szám generálás egy tartományban
const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Random elem választás tömbből
const randomFrom = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Egyedi animációs elem generálása
export const generateAnimationElement = (index: number): AnimationElement => {
  return {
    id: `anim-${index}-${Date.now()}-${Math.random()}`,
    type: randomFrom(animationTypes),
    x: randomInRange(0, 100), // százalékban
    y: randomInRange(0, 100),
    size: randomInRange(20, 60),
    rotation: randomInRange(0, 360),
    speed: randomInRange(2, 8),
    color: randomFrom(pastelColors),
    opacity: randomInRange(0.3, 0.8),
  };
};

// 100+ animációs elem generálása
export const generateAnimationElements = (count: number = 100): AnimationElement[] => {
  return Array.from({ length: count }, (_, i) => generateAnimationElement(i));
};

// Animációs elem frissítése (mozgás, rotáció, stb.)
export const updateAnimationElement = (element: AnimationElement): AnimationElement => {
  // Random mozgás irány
  const moveX = randomInRange(-1, 1) * element.speed * 0.1;
  const moveY = randomInRange(-1, 1) * element.speed * 0.1;
  
  // Új pozíció számítása (wrap around ha kilép a képernyőről)
  let newX = element.x + moveX;
  let newY = element.y + moveY;
  
  if (newX < -10) newX = 110;
  if (newX > 110) newX = -10;
  if (newY < -10) newY = 110;
  if (newY > 110) newY = -10;
  
  // Folyamatos rotáció
  const newRotation = (element.rotation + randomInRange(1, 3)) % 360;
  
  // Random opacity változás
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

// SVG path generálás különböző alakzatokhoz
export const getShapePath = (type: AnimationElement['type']): string => {
  switch (type) {
    case 'heart':
      return 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
    case 'star':
      return 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
    case 'sparkle':
      return 'M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7l2-7z';
    case 'bubble':
      return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z';
    case 'flower':
      return 'M12 22c-1.1 0-2-.9-2-2v-3c-2.5 0-4.5-2-4.5-4.5S7.5 8 10 8c0-2.5 2-4.5 4.5-4.5S19 5.5 19 8c2.5 0 4.5 2 4.5 4.5S21.5 17 19 17v3c0 1.1-.9 2-2 2h-5z';
    case 'pacman':
      return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5V7l5 4-5 4z';
    default:
      return '';
  }
};
