import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { generateCoelhoQuote, generatePhilosopherAttribution } from './utils/quoteGenerator';
import { generateAnimationElements, getRandomTheme } from './utils/animationGenerator';
import { AnimationLayer } from './components/AnimationLayer';
import type { AnimationElement, AnimationTheme } from './types/animation';

function App() {
  const [quote, setQuote] = useState<string>('');
  const [attribution, setAttribution] = useState<string>('');
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(false);
  const [animationElements, setAnimationElements] = useState<AnimationElement[]>([]);
  const [, setCurrentTheme] = useState<AnimationTheme>('eredeti');
  const contentRef = useRef<HTMLDivElement>(null);

  // Új közhely generálása - minden puffogtatáskor új animáció téma!
  const handleGenerateQuote = () => {
    const newQuote = generateCoelhoQuote();
    setQuote(newQuote);
    setAttribution(generatePhilosopherAttribution());

    // Ha az animáció be van kapcsolva, generáljunk új elemeket ÚJ TÉMÁVAL
    if (animationEnabled) {
      const newTheme = getRandomTheme();
      setCurrentTheme(newTheme);
      const elements = generateAnimationElements(120, newTheme);
      setAnimationElements(elements);
    }
  };

  // Animáció ki/be kapcsolása
  const handleToggleAnimation = () => {
    if (!animationEnabled) {
      // Generáljunk 100+ animációs elemet random témával
      const newTheme = getRandomTheme();
      setCurrentTheme(newTheme);
      const elements = generateAnimationElements(120, newTheme);
      setAnimationElements(elements);
    } else {
      setAnimationElements([]);
    }
    setAnimationEnabled(!animationEnabled);
  };

  // Animációs elemek frissítése
  const handleUpdateElements = useCallback((elements: AnimationElement[]) => {
    setAnimationElements(elements);
  }, []);

  // Kép mentése
  const handleSaveImage = async () => {
    if (!contentRef.current || !quote) {
      alert('Először generálj egy közhely mondatot!');
      return;
    }

    try {
      const canvas = await html2canvas(contentRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      // Konvertáljuk blob-ba és töltsük le
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `mecseki-coelho-${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error('Hiba a kép mentése közben:', error);
      alert('Hiba történt a kép mentése során.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animációs réteg */}
      {animationEnabled && (
        <AnimationLayer 
          elements={animationElements} 
          onUpdateElements={handleUpdateElements}
        />
      )}

      {/* Pasztell gradient háttér */}
      <div className="fixed inset-0 bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue -z-10" />

      {/* Főtartalom */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
        <div
          ref={contentRef}
          className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col"
        >
          {/* Cím - könyv fedlap */}
          <div className="text-center space-y-3 mb-24 sm:mb-32">
            <h1 className="text-4xl sm:text-5xl font-elegant font-bold text-gray-800">
              Mecseki Coelho
            </h1>
            <h2 className="text-xl sm:text-2xl font-elegant text-gray-600 italic">
              A közhely-ágyú
            </h2>
          </div>

          {/* Közhely mondat - könyv tartalma */}
          {quote && (
            <div className="min-h-[300px] sm:min-h-[250px] flex items-center justify-center mb-32 sm:mb-40 py-8">
              <div className="w-full px-4">
                <p className="text-lg sm:text-xl font-elegant text-gray-700 leading-relaxed text-center">
                  "{quote}"
                </p>
                <p className="text-sm text-gray-400 italic text-right mt-3">
                  — {attribution}
                </p>
              </div>
            </div>
          )}

          {/* Gombok - könyv alja */}
          <div className="flex flex-col gap-4 justify-center items-stretch pt-16 sm:pt-20 mt-auto">
            <button
              onClick={handleGenerateQuote}
              className="w-full sm:w-auto px-8 py-4 bg-pastel-purple hover:bg-pastel-pink transition-colors rounded-full font-elegant text-lg text-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
            >
              🎭 Puffogtatás
            </button>

            <button
              onClick={handleToggleAnimation}
              className={`w-full sm:w-auto px-8 py-4 ${
                animationEnabled 
                  ? 'bg-pastel-peach hover:bg-pastel-mint' 
                  : 'bg-pastel-blue hover:bg-pastel-purple'
              } transition-colors rounded-full font-elegant text-lg text-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105 duration-200`}
            >
              {animationEnabled ? '✨ Animáció kikapcsolása' : '✨ Animáció bekapcsolása'}
            </button>
          </div>
        </div>

        {/* Mentés gomb (csak ha van mondat) */}
        {quote && (
          <button
            onClick={handleSaveImage}
            className="mt-8 p-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 duration-200"
            title="Mentés képként"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6 text-gray-700"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
