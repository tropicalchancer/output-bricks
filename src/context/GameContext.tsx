'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Building, Brick, INITIAL_NEIGHBORHOODS } from '@/types';

type GameAction = 
  | { type: 'ADD_BUILDING'; building: Building }
  | { type: 'ADD_BRICK'; brick: Brick }
  | { type: 'COMPLETE_BRICK'; brickId: string }
  | { type: 'COMPLETE_BUILDING'; buildingId: string };

const initialState: GameState = {
  points: 0,
  level: 'Village',
  neighborhoods: INITIAL_NEIGHBORHOODS,
};

function calculateLevel(points: number): GameState['level'] {
  if (points >= 1000) return 'Metropolis';
  if (points >= 500) return 'City';
  if (points >= 250) return 'Town';
  return 'Village';
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_BUILDING':
      return {
        ...state,
        neighborhoods: state.neighborhoods.map(n => 
          n.id === action.building.neighborhood
            ? { ...n, buildings: [...n.buildings, action.building] }
            : n
        ),
      };

    case 'ADD_BRICK':
      return {
        ...state,
        neighborhoods: state.neighborhoods.map(n => ({
          ...n,
          buildings: n.buildings.map(b => 
            action.brick.buildingIds.includes(b.id)
              ? { ...b, bricks: [...b.bricks, action.brick] }
              : b
          ),
        })),
      };

    case 'COMPLETE_BRICK': {
      let pointsEarned = 5; // Base points for completing a brick
      let completedBricksCount = 0;
      
      const newNeighborhoods = state.neighborhoods.map(n => ({
        ...n,
        buildings: n.buildings.map(b => {
          const updatedBricks = b.bricks.map(brick => {
            if (brick.id === action.brickId) {
              if (brick.isHighFriction) pointsEarned += 5;
              if (brick.isMultiBuilding) pointsEarned += 5;
              return { ...brick, completed: true };
            }
            if (brick.completed) completedBricksCount++;
            return brick;
          });
          return { ...b, bricks: updatedBricks };
        }),
      }));

      // Add bonus points for every 5 bricks completed
      if ((completedBricksCount + 1) % 5 === 0) pointsEarned += 10;

      const newPoints = state.points + pointsEarned;
      
      return {
        ...state,
        points: newPoints,
        level: calculateLevel(newPoints),
        neighborhoods: newNeighborhoods,
      };
    }

    case 'COMPLETE_BUILDING': {
      let pointsEarned = 0;
      
      const newNeighborhoods = state.neighborhoods.map(n => ({
        ...n,
        buildings: n.buildings.map(b => {
          if (b.id === action.buildingId) {
            pointsEarned = b.points;
            return { ...b, completed: true };
          }
          return b;
        }),
      }));

      const newPoints = state.points + pointsEarned;

      return {
        ...state,
        points: newPoints,
        level: calculateLevel(newPoints),
        neighborhoods: newNeighborhoods,
      };
    }

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 