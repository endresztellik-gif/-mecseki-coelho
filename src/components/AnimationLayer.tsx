import { useEffect, useRef } from 'react';
import type { AnimationElement } from '../types/animation';
import { getShapePath, updateAnimationElement } from '../utils/animationGenerator';

interface AnimationLayerProps {
  elements: AnimationElement[];
  onUpdateElements: (elements: AnimationElement[]) => void;
}

// Meghatározza, hogy stroke vagy fill alapú legyen-e az SVG
const isStrokeBasedType = (type: AnimationElement['type']): boolean => {
  return ['firework', 'snowflake', 'coffee'].includes(type);
};

// Speciális transform a pillangóhoz (szárnycsapás effekt)
const getSpecialTransform = (element: AnimationElement): string => {
  const scale = element.scale || 1;
  const baseTransform = `translate(-50%, -50%) rotate(${element.rotation}deg)`;

  if (element.type === 'butterfly') {
    // Szárnycsapás: scaleY változik a specialState alapján
    const scaleY = 0.5 + Math.abs(Math.sin((element.specialState || 0) * 5)) * 0.5;
    return `${baseTransform} scale(${scale}, ${scaleY})`;
  }

  return `${baseTransform} scale(${scale})`;
};

export const AnimationLayer: React.FC<AnimationLayerProps> = ({ elements, onUpdateElements }) => {
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      // Frissítsük az összes elemet
      const updatedElements = elements.map(updateAnimationElement);
      onUpdateElements(updatedElements);

      // Következő frame
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Indítsuk el az animációt
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [elements, onUpdateElements]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => {
        const isStrokeBased = isStrokeBasedType(element.type);
        const scale = element.scale || 1;
        const effectiveSize = element.size * scale;

        return (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: getSpecialTransform(element),
              opacity: element.opacity,
              transition: 'opacity 0.1s ease-out',
            }}
          >
            <svg
              width={effectiveSize}
              height={effectiveSize}
              viewBox="0 0 24 24"
              fill={isStrokeBased ? 'none' : element.color}
              stroke={isStrokeBased ? element.color : 'none'}
              strokeWidth={isStrokeBased ? 2 : 0}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: element.behavior === 'explode'
                  ? `drop-shadow(0 0 ${8 * scale}px ${element.color})`
                  : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }}
            >
              <path d={getShapePath(element.type)} />
            </svg>
          </div>
        );
      })}
    </div>
  );
};
