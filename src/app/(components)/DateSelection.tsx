import React, { useState, useEffect } from 'react';

const DateSelection: React.FC<{ onSelect: (year: number) => void }> = ({ onSelect }) => {
  const [year, setYear] = useState(2025);
  const [isSelecting, setIsSelecting] = useState(true);

  useEffect(() => {
    if (isSelecting) {
      const interval = setInterval(() => {
        setYear((prevYear) => Math.floor(Math.random() * (2100 - 2025 + 1)) + 2025);
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        setIsSelecting(false);
        setTimeout(() => onSelect(year), 2000);  // Wait 2 seconds before calling onSelect
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isSelecting, year, onSelect]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 h-16 bg-gray-200 relative overflow-hidden rounded-lg">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl font-bold">
          {year}
        </div>
        <div
          className={`absolute bottom-0 left-0 w-4 h-4 bg-red-500 transform -translate-x-1/2 ${
            isSelecting ? 'animate-bounce' : ''
          }`}
          style={{ transition: 'left 0.05s ease-in-out', left: `${((year - 2025) / (2100 - 2025)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DateSelection;