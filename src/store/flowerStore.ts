import type { Flower, GridPosition, FlowerStore } from '../types/flowerTypes';
import { create } from 'zustand';

import { useConfigStore } from './configStore';

function getRandomColor(): string {
  const config = useConfigStore.getState();
  return config.FLOWER_COLORS[Math.floor(Math.random() * config.FLOWER_COLORS.length)];
}

export const useFlowerStore = create<FlowerStore>((set, get) => ({
  grid: [],
  
  initializeGrid: (cols?: number, rows?: number) => {
    const config = useConfigStore.getState();
    const actualCols = Math.max(cols ?? config.GRID_SIZE, 1);
    const actualRows = Math.max(rows ?? config.GRID_SIZE, 1);
    
    // Create grid: array of rows, each row is array of cols
    const initialGrid: (Flower | null)[][] = [];
    for (let r = 0; r < actualRows; r++) {
      const row: (Flower | null)[] = new Array(actualCols).fill(null);
      initialGrid.push(row);
    }
    
    // Place initial flower in the center with bounds checking
    const startRow = Math.min(Math.floor(actualRows / 2), actualRows - 1);
    const startCol = Math.min(Math.floor(actualCols / 2), actualCols - 1);
    
    if (startRow >= 0 && startRow < initialGrid.length) {
      const row = initialGrid[startRow];
      if (startCol >= 0 && startCol < row.length) {
        row[startCol] = {
          color: getRandomColor(),
          age: 0
        };
      }
    }
    
    set({ grid: initialGrid });
  },
  
  getAdjacentPositions: (row: number, col: number): GridPosition[] => {
    const positions: GridPosition[] = [];
    const rows = get().grid.length;
    const cols = get().grid[0]?.length || 0;
    
    if (row > 0) positions.push({ x: row - 1, y: col });
    if (row < rows - 1) positions.push({ x: row + 1, y: col });
    if (col > 0) positions.push({ x: row, y: col - 1 });
    if (col < cols - 1) positions.push({ x: row, y: col + 1 });
    
    return positions;
  },
  
  removeFlower: (row: number, col: number): void => {
    const { grid } = get();
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = null;
      set({ grid: newGrid });
    }
  },
  
  trySpawnRandomFlower: (): void => {
    const { grid } = get();
    const config = useConfigStore.getState();
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    
    if (rows === 0 || cols === 0) return;
    
    // Check if grid is completely empty
    let hasAnyFlower = false;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col] !== null) {
          hasAnyFlower = true;
          break;
        }
      }
      if (hasAnyFlower) break;
    }
    
    // If grid is empty, small chance to spawn a flower
    if (!hasAnyFlower && Math.random() < config.RESPAWN_CHANCE_WHEN_EMPTY) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      
      const newGrid = grid.map(r => [...r]);
      newGrid[randomRow][randomCol] = {
        color: getRandomColor(),
        age: 0
      };
      set({ grid: newGrid });
    }
  },
  
  spreadFlowers: (): void => {
    const { grid } = get();
    const config = useConfigStore.getState();
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    
    if (rows === 0 || cols === 0) return;
    
    const newGrid: (Flower | null)[][] = grid.map(row => [...row]);
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = grid[row][col];
        if (cell) {
          const adjacentPositions = get().getAdjacentPositions(row, col);
          const emptyAdjacent = adjacentPositions.filter(({ x: ax, y: ay }) => 
            !grid[ax][ay]
          );
          
          emptyAdjacent.forEach(({ x: ax, y: ay }) => {
            if (Math.random() < config.MUTATION_CHANCE) {
              newGrid[ax][ay] = {
                color: getRandomColor(),
                age: 0
              };
            } else {
              newGrid[ax][ay] = {
                color: cell.color,
                age: 0
              };
            }
          });
        }
      }
    }
    
    const updatedGrid: (Flower | null)[][] = newGrid.map(row => 
      row.map(cell => cell ? { ...cell, age: cell.age + 1 } : null)
    );
    
    set({ grid: updatedGrid });
  },
  
  reset: (): void => {
    set({ grid: [] });
    get().initializeGrid();
  }
}));