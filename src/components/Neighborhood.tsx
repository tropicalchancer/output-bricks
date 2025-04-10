'use client';

import React, { useState } from 'react';
import { Building as BuildingType, Neighborhood as NeighborhoodType } from '@/types';
import { useGame } from '@/context/GameContext';
import { Building } from './Building';

type Props = {
  neighborhood: NeighborhoodType;
};

export function Neighborhood({ neighborhood }: Props) {
  const { dispatch } = useGame();
  const [isAdding, setIsAdding] = useState(false);
  const [newBuildingName, setNewBuildingName] = useState('');
  const [newBuildingPoints, setNewBuildingPoints] = useState('');

  const handleAddBuilding = () => {
    if (!newBuildingName || !newBuildingPoints) return;

    const building: BuildingType = {
      id: Math.random().toString(36).substr(2, 9),
      name: newBuildingName,
      points: parseInt(newBuildingPoints),
      neighborhood: neighborhood.id,
      bricks: [],
      completed: false,
    };

    dispatch({ type: 'ADD_BUILDING', building });
    setIsAdding(false);
    setNewBuildingName('');
    setNewBuildingPoints('');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{neighborhood.emoji}</span>
          <h2 className="text-xl font-bold">{neighborhood.name}</h2>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Building
        </button>
      </div>

      {isAdding && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <input
            type="text"
            placeholder="Building name"
            value={newBuildingName}
            onChange={(e) => setNewBuildingName(e.target.value)}
            className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Points value"
            value={newBuildingPoints}
            onChange={(e) => setNewBuildingPoints(e.target.value)}
            className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddBuilding}
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {neighborhood.buildings.length > 0 && (
        <div className="mt-4 space-y-4">
          {neighborhood.buildings.map((building) => (
            <Building key={building.id} building={building} />
          ))}
        </div>
      )}
    </div>
  );
} 