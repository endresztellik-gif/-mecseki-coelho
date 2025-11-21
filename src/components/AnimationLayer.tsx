import { useEffect, useRef } from 'react';
import type { AnimationElement } from '../types/animation';
import { getShapePath, updateAnimationElement } from '../utils/animationGenerator';

interface AnimationLayerProps {
  elements: AnimationElement[];
  onUpdateElements: (elements: AnimationElement[]) => void;
}

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
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute transition-all duration-300 ease-linear"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
            opacity: element.opacity,
          }}
        >
          <svg
            width={element.size}
            height={element.size}
            viewBox="0 0 24 24"
            fill={element.color}
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }}
          >
            <path d={getShapePath(element.type)} />
          </svg>
        </div>
      ))}
    </div>
  );
};
