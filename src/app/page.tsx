'use client';

import React, { useState } from 'react';
import Teams from './(components)/Teams';
import ObjectSelection from './(components)/ObjectSelection';
import DateSelection from './(components)/DateSelection';
import TenseSelection from './(components)/TenseSelection';
import Result from './(components)/Result';

export default function Home() {
  const [teamCount, setTeamCount] = useState(2);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePhase, setGamePhase] = useState(0);
  const [selectedObject, setSelectedObject] = useState('');
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedTense, setSelectedTense] = useState('');

  const handleTeamCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeamCount(parseInt(e.target.value));
  };

  const startGame = () => {
    setGameStarted(true);
    setGamePhase(1);
  };

  const handleObjectSelect = (object: string) => {
    setSelectedObject(object);
    setGamePhase(2);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setGamePhase(3);
  };

  const handleTenseSelect = (tense: string) => {
    setSelectedTense(tense);
    setGamePhase(4);
  };

  const restartGame = () => {
    setGamePhase(1);
    setSelectedObject('');
    setSelectedYear(0);
    setSelectedTense('');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl mb-8">Time Capsule Game</h1>
        
        {!gameStarted ? (
          <div className="mb-4">
            <label htmlFor="teamCount" className="mr-2">Number of Teams:</label>
            <select
              id="teamCount"
              value={teamCount}
              onChange={handleTeamCountChange}
              className="bg-gray-700 text-white rounded p-1 mr-4"
            >
              {[2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <button 
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded">
            {gamePhase === 1 && <ObjectSelection onSelect={handleObjectSelect} />}
            {gamePhase === 2 && <DateSelection onSelect={handleYearSelect} />}
            {gamePhase === 3 && <TenseSelection onSelect={handleTenseSelect} />}
            {gamePhase === 4 && (
              <Result 
                object={selectedObject} 
                year={selectedYear} 
                tense={selectedTense} 
                onRestart={restartGame}
              />
            )}
          </div>
        )}
      </div>

      {gameStarted && <Teams teamCount={teamCount} />}
    </main>
  );
}