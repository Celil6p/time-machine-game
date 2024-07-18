import React, { useState, useEffect, useRef } from 'react';

const tenses = ['Future Perfect', 'Future Perfect Continuous'];

const TenseSelection: React.FC<{ onSelect: (tense: string) => void }> = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSelecting, setIsSelecting] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      startSelection();
    }
  }, []);

  const startSelection = () => {
    const duration = 3000; // 3 seconds total
    const interval = 100; // Change every 100ms
    let iterations = 0;

    const selectionInterval = setInterval(() => {
      iterations++;
      setSelectedIndex((prevIndex) => (prevIndex + 1) % tenses.length);

      if (iterations * interval >= duration) {
        clearInterval(selectionInterval);
        setIsSelecting(false);
        const finalIndex = Math.floor(Math.random() * tenses.length);
        setSelectedIndex(finalIndex);
        setTimeout(() => onSelect(tenses[finalIndex]), 1000);
      }
    }, interval);

    return () => clearInterval(selectionInterval);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold mb-4">Selecting Tense</h2>
      <div className="flex justify-center space-x-4">
        {tenses.map((tense, index) => (
          <div
            key={tense}
            className={`
              w-64 h-32 flex items-center justify-center text-center p-4 rounded-lg
              transition-all duration-300 ease-in-out transform
              ${selectedIndex === index 
                ? 'bg-blue-500 text-white scale-110 shadow-lg' 
                : 'bg-gray-200 text-gray-800 scale-100'}
            `}
          >
            <span className="text-lg font-semibold">{tense}</span>
          </div>
        ))}
      </div>
      {!isSelecting && (
        <p className="mt-4 text-lg">
          Selected: <strong>{tenses[selectedIndex]}</strong>
        </p>
      )}
    </div>
  );
};

export default TenseSelection;