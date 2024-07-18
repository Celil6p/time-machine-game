import React from 'react';

interface ResultProps {
  object: string;
  year: number;
  tense: string;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ object, year, tense, onRestart }) => {
  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Challenge:</h2>
      <div className="space-y-2">
        <p><strong>Object:</strong> {object}</p>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Tense:</strong> {tense}</p>
      </div>
      <p className="mt-4 text-gray-600">
        Create a sentence using the {tense} tense about the {object} in the year {year}.
      </p>
      <button 
        onClick={onRestart}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Restart Game
      </button>
    </div>
  );
};

export default Result;