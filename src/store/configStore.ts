import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import colors from '../assets/colors';

export interface GameConfig {
  // Grid settings
  GRID_SIZE: number;
  FLOWER_SIZE: number;
  
  // Timing
  SPREAD_INTERVAL_MS: number;
  
  // Probabilities
  MUTATION_CHANCE: number;
  RESPAWN_CHANCE_WHEN_EMPTY: number;
  
  // UI
  FLOWER_SCALE: number;
  GRID_BORDER_OPACITY: number;
  GRID_HOVER_OPACITY: number;
  
  // Colors (read-only, not persisted)
  FLOWER_COLORS: readonly string[];
}

interface ConfigStore extends GameConfig {
  updateConfig: <K extends keyof GameConfig>(key: K, value: GameConfig[K]) => void;
  resetConfig: () => void;
}

const defaultConfig: GameConfig = {
  GRID_SIZE: 20,
  FLOWER_SIZE: 50,
  SPREAD_INTERVAL_MS: 5000,
  MUTATION_CHANCE: 0.01,
  RESPAWN_CHANCE_WHEN_EMPTY: 0.1,
  FLOWER_SCALE: 0.8,
  GRID_BORDER_OPACITY: 0.1,
  GRID_HOVER_OPACITY: 0.2,
  FLOWER_COLORS: colors as readonly string[]
};

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      ...defaultConfig,
      
      updateConfig: <K extends keyof GameConfig>(key: K, value: GameConfig[K]) => {
        set({ [key]: value });
      },
      
      resetConfig: () => {
        set(defaultConfig);
      }
    }),
    {
      name: 'flower-field-config',
      partialize: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { FLOWER_COLORS, ...configToPersist } = state;
        return configToPersist;
      }
    }
  )
);