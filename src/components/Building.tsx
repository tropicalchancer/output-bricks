'use client';

import React, { useState } from 'react';
import { Building as BuildingType, Brick } from '@/types';
import { useGame } from '@/context/GameContext';

type Props = {
  building: BuildingType;
};

export function Building({ building }: Props) {
  const { dispatch } = useGame();
  const [isAdding, setIsAdding] = useState(false);
  const [newBrickName, setNewBrickName] = useState('');
  const [isHighFriction, setIsHighFriction] = useState(false);
  const [isMultiBuilding, setIsMultiBuilding] = useState(false);

  const handleAddBrick = () => {
    if (!newBrickName) return;

    const brick: Brick = {
      id: Math.random().toString(36).substr(2, 9),
      name: newBrickName,
      isHighFriction,
      isMultiBuilding,
      completed: false,
      buildingIds: [building.id],
    };

    dispatch({ type: 'ADD_BRICK', brick });
    setIsAdding(false);
    setNewBrickName('');
    setIsHighFriction(false);
    setIsMultiBuilding(false);
  };

  const handleCompleteBrick = (brickId: string) => {
    dispatch({ type: 'COMPLETE_BRICK', brickId });
  };

  const handleCompleteBuilding = () => {
    dispatch({ type: 'COMPLETE_BUILDING', buildingId: building.id });
  };

  const allBricksCompleted = building.bricks.length > 0 && 
    building.bricks.every(brick => brick.completed);

  return (
    <div className={`p-4 border rounded-lg ${building.completed ? 'bg-green-50' : 'bg-white'} shadow-sm transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{building.name}</h3>
        <span className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
          {building.points} pts
        </span>
      </div>

      {building.bricks.length > 0 && (
        <div className="space-y-2 mb-4">
          {building.bricks.map((brick) => (
            <div
              key={brick.id}
              className={`p-3 border rounded-lg flex items-center justify-between ${
                brick.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              } transition-colors`}
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{brick.name}</span>
                <div className="flex gap-2">
                  {brick.isHighFriction && (
                    <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      High Friction
                    </span>
                  )}
                  {brick.isMultiBuilding && (
                    <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                      Multi-Building
                    </span>
                  )}
                </div>
              </div>
              {!brick.completed && (
                <button
                  onClick={() => handleCompleteBrick(brick.id)}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {isAdding ? (
        <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <input
            type="text"
            placeholder="Brick name"
            value={newBrickName}
            onChange={(e) => setNewBrickName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isHighFriction}
                onChange={(e) => setIsHighFriction(e.target.checked)}
                className="w-4 h-4 rounded text-yellow-500 focus:ring-yellow-500"
              />
              High Friction
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isMultiBuilding}
                onChange={(e) => setIsMultiBuilding(e.target.checked)}
                className="w-4 h-4 rounded text-purple-500 focus:ring-purple-500"
              />
              Multi-Building
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddBrick}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Brick
          </button>
          {allBricksCompleted && !building.completed && (
            <button
              onClick={handleCompleteBuilding}
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              Complete Building
            </button>
          )}
        </div>
      )}
    </div>
  );
} 