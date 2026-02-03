export interface Flower {
  color: string;
  age: number;
}

export interface GridPosition {
  x: number;
  y: number;
}

export interface FlowerStore {
  grid: (Flower | null)[][];
  
  initializeGrid: (cols?: number, rows?: number) => void;
  getAdjacentPositions: (x: number, y: number) => GridPosition[];
  removeFlower: (row: number, col: number) => void;
  trySpawnRandomFlower: () => void;
  spreadFlowers: () => void;
  reset: () => void;
}