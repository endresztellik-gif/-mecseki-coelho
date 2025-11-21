// Animációs rendszer típus definíciói

export interface AnimationElement {
  id: string;
  type: 'heart' | 'star' | 'pacman' | 'sparkle' | 'bubble' | 'flower';
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  color: string;
  opacity: number;
}

export interface AnimationConfig {
  enabled: boolean;
  elementCount: number;
  updateInterval: number;
}
