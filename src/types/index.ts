export type Neighborhood = {
  id: string;
  name: string;
  emoji: string;
  buildings: Building[];
};

export type Building = {
  id: string;
  name: string;
  points: number;
  neighborhood: string;
  bricks: Brick[];
  completed: boolean;
};

export type Brick = {
  id: string;
  name: string;
  isHighFriction: boolean;
  isMultiBuilding: boolean;
  completed: boolean;
  buildingIds: string[];
};

export type GameState = {
  points: number;
  level: 'Village' | 'Town' | 'City' | 'Metropolis';
  neighborhoods: Neighborhood[];
};

export const INITIAL_NEIGHBORHOODS: Neighborhood[] = [
  { id: 'financial', name: 'Financial District', emoji: '💰', buildings: [] },
  { id: 'business', name: 'Business Center', emoji: '🏢', buildings: [] },
  { id: 'wellness', name: 'Wellness Park', emoji: '🌳', buildings: [] },
  { id: 'family', name: 'Family Village', emoji: '🏘️', buildings: [] },
  { id: 'arts', name: 'Arts & Culture District', emoji: '🎨', buildings: [] },
  { id: 'residential', name: 'Residential Zone', emoji: '🏡', buildings: [] },
  { id: 'civic', name: 'Civic Center', emoji: '🌍', buildings: [] },
]; 