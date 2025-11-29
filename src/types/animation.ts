// Animációs rendszer típus definíciói

// Összes animáció típus
export type AnimationType =
  // Meglévő alapok
  | 'heart' | 'star' | 'pacman' | 'sparkle' | 'bubble' | 'flower'
  // Felhasználó kérései
  | 'firework' | 'rose' | 'banana' | 'potFlower'
  // Irodalmi téma
  | 'quill' | 'book' | 'coffee'
  // Természet téma
  | 'butterfly' | 'leaf' | 'sakura' | 'bird'
  // Ünnepi téma
  | 'snowflake' | 'confetti' | 'diamond' | 'moon';

// Animációs viselkedés típusok
export type AnimationBehavior = 'float' | 'grow' | 'explode' | 'special';

// Animáció témák
export type AnimationTheme = 'eredeti' | 'irodalmi' | 'termeszet' | 'unnepi' | 'vicces';

// Téma -> animáció típusok mapping
export const animationThemes: Record<AnimationTheme, AnimationType[]> = {
  eredeti: ['heart', 'star', 'pacman', 'sparkle', 'bubble', 'flower'],
  irodalmi: ['quill', 'book', 'coffee', 'sparkle'],
  termeszet: ['butterfly', 'leaf', 'sakura', 'bird', 'rose', 'potFlower', 'flower'],
  unnepi: ['snowflake', 'confetti', 'diamond', 'moon', 'firework', 'star'],
  vicces: ['banana', 'pacman', 'bubble']
};

export interface AnimationElement {
  id: string;
  type: AnimationType;
  behavior: AnimationBehavior;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  color: string;
  opacity: number;
  // Növekedés/nyílás animációhoz
  scale?: number;
  bloomState?: number;
  // Speciális mozgásokhoz
  specialState?: number;
  velocityX?: number;
  velocityY?: number;
}

export interface AnimationConfig {
  enabled: boolean;
  elementCount: number;
  updateInterval: number;
  currentTheme?: AnimationTheme;
}
