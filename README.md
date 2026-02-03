# Flower Field

A generative cellular automaton art installation built with React, TypeScript, and Vite. Watch as colorful flowers spontaneously grow and spread across an infinite field, creating ever-changing patterns and beautiful visual compositions.

## 🎨 Inspiration

This project is a web-based recreation inspired by [Katakomb Studios](https://www.youtube.com/@KatakombStudios) and their beautiful cellular automaton game. The original concept demonstrates how simple rules can create complex, mesmerizing emergent behavior.

## 🚀 Features

- **Dynamic Grid System**: Auto-sized grid that adapts to viewport dimensions
- **Cellular Automaton Logic**: Flowers spread to adjacent cells based on configurable rules
- **Interactive**: Click cells to remove flowers and influence growth patterns
- **Customizable Settings**: Adjust grid size, spread intervals, colors, and probabilities
- **Persistent Configuration**: Settings saved to localStorage automatically
- **Rich Color Palette**: 115 curated colors including flag standards and historical art pigments
- **Responsive Design**: Automatically adjusts to window resizing

## 🏗️ Architecture

### Tech Stack

- **React 19**: UI framework with modern hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS v4**: Utility-first styling
- **Zustand**: Lightweight state management with persistence
- **React Router v7**: Client-side routing

### Project Structure

```
src/
├── About.tsx              # About page component
├── App.tsx                # Main flower field simulation
├── main.tsx               # Application entry point with routing
├── style.css              # Global styles (Tailwind import)
├── assets/
│   ├── Close.tsx          # Close and arrow icons
│   ├── colors.tsx         # Color palette (115 colors)
│   ├── Flower.tsx         # Flower SVG component
│   └── Settings.tsx       # Settings gear icon
├── modal/
│   └── settingModal.tsx   # Settings configuration modal
├── store/
│   ├── configStore.ts     # Configuration state (Zustand)
│   └── flowerStore.ts     # Flower grid state (Zustand)
└── types/
    └── flowerTypes.ts     # TypeScript interfaces
```

## 🔬 How It Works

### Flower Rendering

Each flower is rendered as an SVG icon (`src/assets/Flower.tsx`) with the following characteristics:

- **SVG-based**: 14x14 viewBox flower icon with `fill="currentColor"`
- **Dynamic sizing**: Scaled based on `FLOWER_SIZE * FLOWER_SCALE` configuration
- **Color**: Each flower has a `color` property from the palette
- **Positioning**: Placed in CSS Grid cells with centered alignment

```tsx
<FlowerIcon
  style={{
    width: FLOWER_SIZE * FLOWER_SCALE,
    height: FLOWER_SIZE * FLOWER_SCALE,
    color: cell.color
  }}
/>
```

### Grid System

The grid is implemented as a 2D array `(Flower | null)[][]` where:

- Each cell can contain a `Flower` object `{ color: string, age: number }` or `null`
- Grid dimensions are calculated from container size: `cols = floor(width / FLOWER_SIZE)`
- Rendered using CSS Grid with `gridTemplateColumns` and `gridTemplateRows`
- Each cell is a `div` with fixed dimensions and optional border

### Cellular Automaton Logic

The spread algorithm (`spreadFlowers` in `flowerStore.ts`) follows these rules:

1. **Iterate through all grid cells** to find flowers
2. **For each flower**, get its adjacent positions (up, down, left, right)
3. **For each adjacent empty cell**, calculate spread probability:
   - Base chance: `MUTATION_CHANCE` (default 0.01)
   - If spread occurs, place a new flower with a random color
4. **Age tracking**: Each flower has an `age` property that increments each spread cycle

**Adjacent positions calculation**:
```typescript
getAdjacentPositions(row, col) {
  const positions = [];
  if (row > 0) positions.push({ x: row - 1, y: col });
  if (row < rows - 1) positions.push({ x: row + 1, y: col });
  if (col > 0) positions.push({ x: row, y: col - 1 });
  if (col < cols - 1) positions.push({ x: row, y: col + 1 });
  return positions;
}
```

### State Management (Zustand)

Two separate stores manage application state:

#### `configStore` - Configuration

Manages all user-configurable parameters:

```typescript
interface GameConfig {
  GRID_SIZE: number;              // Default grid dimension
  FLOWER_SIZE: number;            // Pixel size of each cell
  SPREAD_INTERVAL_MS: number;     // How often flowers spread
  MUTATION_CHANCE: number;        // Probability of spread to adjacent cells
  RESPAWN_CHANCE_WHEN_EMPTY: number;  // Chance to spawn when grid is empty
  FLOWER_SCALE: number;           // Flower icon scale relative to cell
  GRID_BORDER_OPACITY: number;    // Border transparency
  GRID_HOVER_OPACITY: number;    // Hover effect opacity
  FLOWER_COLORS: readonly string[];  // Color palette (read-only)
}
```

Uses `zustand/middleware persist` to automatically save/load from localStorage.

#### `flowerStore` - Flower Grid

Manages the dynamic flower grid:

```typescript
interface FlowerStore {
  grid: (Flower | null)[][];
  
  initializeGrid(cols?, rows?): void;
  getAdjacentPositions(row, col): GridPosition[];
  removeFlower(row, col): void;
  trySpawnRandomFlower(): void;
  spreadFlowers(): void;
  reset(): void;
}
```

**Key functions**:

- `initializeGrid()`: Creates 2D array, places initial flower at center
- `removeFlower()`: Sets cell to `null` (used by click handler)
- `trySpawnRandomFlower()`: When grid is empty, small chance to spawn flower anywhere
- `spreadFlowers()`: Core automaton logic - spreads flowers to adjacent cells

### Lifecycle Hooks

In `App.tsx`:

- `useLayoutEffect`: Initializes grid on mount and window resize
- `useEffect`: Sets up interval for periodic spreading (`SPREAD_INTERVAL_MS`)

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    spreadFlowers();
    trySpawnRandomFlower();
  }, SPREAD_INTERVAL_MS);
  
  return () => clearInterval(interval);
}, [spreadFlowers, trySpawnRandomFlower, SPREAD_INTERVAL_MS]);
```

### Settings Modal

The modal (`src/modal/settingModal.tsx`) provides:

- Sliders for numeric configuration values
- Debounced updates to prevent excessive re-renders
- Reset button to restore defaults
- Real-time visual feedback with local state

## 🎨 Color Palette

The palette (`src/assets/colors.tsx`) contains 115 colors organized into categories:

- Vibrant modern colors (pinks, purples, blues, etc.)
- Flag standards (USA, UK, France, India, South Korea, China, Germany, Pakistan, Brazil, Canada, etc.)
- Historical art pigments (Prussian Blue, Ultramarine, etc.)

Each color is a hex string that can be used directly in CSS.

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Configuration

The default configuration is in `src/store/configStore.ts`:

```typescript
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
```

## 📝 License

MIT License

## 🙏 Acknowledgments

- **Katakomb Studios** for the original inspiration
- **React** team for the amazing UI library
- **Tailwind CSS** for utility-first styling
- **Zustand** for simple yet powerful state management
- **Vite** for blazing fast development experience
