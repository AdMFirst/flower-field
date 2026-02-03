import { useFlowerStore } from './store/flowerStore';
import { useEffect, useCallback, useLayoutEffect, useRef, useState } from 'react';
import FlowerIcon from './assets/Flower';
import { useConfigStore } from './store/configStore';
import { MaterialSymbolsSettings } from './assets/Settings';
import SettingModal from './modal/settingModal';

export default function FlowerField() {
  const { grid, initializeGrid, spreadFlowers, removeFlower, trySpawnRandomFlower } = useFlowerStore();
  const { FLOWER_SIZE, SPREAD_INTERVAL_MS, FLOWER_SCALE, GRID_BORDER_OPACITY } = useConfigStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const calculateAndInitializeGrid = useCallback(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      const cols = Math.floor(clientWidth / FLOWER_SIZE);
      const rows = Math.floor(clientHeight / FLOWER_SIZE);
      initializeGrid(cols, rows);
    }
  }, [FLOWER_SIZE, initializeGrid]);

  useLayoutEffect(() => {
    calculateAndInitializeGrid();
    const handleResize = () => calculateAndInitializeGrid();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateAndInitializeGrid]);

  useEffect(() => {
    const interval = setInterval(() => {
      spreadFlowers();
      trySpawnRandomFlower();
    }, SPREAD_INTERVAL_MS);
    
    return () => clearInterval(interval);
  }, [spreadFlowers, trySpawnRandomFlower, SPREAD_INTERVAL_MS]);

  const handleCellClick = (row: number, col: number) => {
    removeFlower(row, col);
  };

  const cells: React.ReactNode[] = [];
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const cell = grid[x][y];
      cells.push(
        <div
          key={`${x}-${y}`}
          className="flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all"
          style={{
            width: FLOWER_SIZE,
            height: FLOWER_SIZE,
            backgroundColor: 'transparent',
            border: `1px solid rgba(255, 255, 255, ${GRID_BORDER_OPACITY})`
          }}
          onClick={() => handleCellClick(x, y)}
        >
          {cell && (
            <FlowerIcon
              style={{
                width: FLOWER_SIZE * FLOWER_SCALE,
                height: FLOWER_SIZE * FLOWER_SCALE,
                color: cell.color
              }}
            />
          )}
        </div>
      );
    }
  }

  return (
    <div className="fixed inset-0">
      <div
        ref={containerRef}
        className="fixed inset-0 grid gap-0 bg-gray-900"
        style={{
          gridTemplateColumns: `repeat(${grid[0]?.length || 20}, ${FLOWER_SIZE}px)`,
          gridTemplateRows: `repeat(${grid.length}, ${FLOWER_SIZE}px)`
        }}
      >
        {cells}
      </div>

      {/* Floating Settings Button */}
      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className="fixed bottom-4 right-4 p-3 transition-all z-50 opacity-50 hover:opacity-100"
        style={{ 
            background: 'none', 
            border: 'none', 
            boxShadow: 'none' 
        }}
    >
        <MaterialSymbolsSettings 
            className="text-white" 
            style={{ width: 24, height: 24 }} 
        />
    </button>

      {/* Settings Modal */}
      <SettingModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
