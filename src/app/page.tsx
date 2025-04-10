'use client';

import React from 'react';
import { GameProvider } from '@/context/GameContext';
import { useGame } from '@/context/GameContext';
import { Neighborhood } from '@/components/Neighborhood';

function GameBoard() {
  const { state } = useGame();
  
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
          <span role="img" aria-label="crane">🏗️</span>
          Urban Planner
        </h1>
        <div className="text-xl font-medium text-gray-600">
          Level: {state.level} • Points: {state.points}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {state.neighborhoods.map((neighborhood) => (
          <Neighborhood key={neighborhood.id} neighborhood={neighborhood} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
} 