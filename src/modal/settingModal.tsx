import { useConfigStore } from '../store/configStore';
import { MaterialSymbolsClose } from '../assets/Close';
import { useRef, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConfigKey = 'FLOWER_SIZE' | 'SPREAD_INTERVAL_MS' | 'FLOWER_SCALE' | 
                 'GRID_BORDER_OPACITY' | 'GRID_HOVER_OPACITY' | 
                 'MUTATION_CHANCE' | 'RESPAWN_CHANCE_WHEN_EMPTY';

export default function SettingModal({ isOpen, onClose }: SettingModalProps) {
  const navigate = useNavigate();
  const {
    FLOWER_SIZE,
    SPREAD_INTERVAL_MS,
    FLOWER_SCALE,
    GRID_BORDER_OPACITY,
    GRID_HOVER_OPACITY,
    MUTATION_CHANCE,
    RESPAWN_CHANCE_WHEN_EMPTY,
    updateConfig,
    resetConfig
  } = useConfigStore();

  // Local state for immediate slider feedback
  const [localValues, setLocalValues] = useState({
    FLOWER_SIZE,
    SPREAD_INTERVAL_MS,
    FLOWER_SCALE,
    GRID_BORDER_OPACITY,
    GRID_HOVER_OPACITY,
    MUTATION_CHANCE,
    RESPAWN_CHANCE_WHEN_EMPTY
  });

  const debounceTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Clear all timers on unmount
  useEffect(() => {
    return () => {
      debounceTimers.current.forEach(timer => clearTimeout(timer));
      debounceTimers.current.clear();
    };
  }, []);

  // Sync local state from store (async to avoid cascade warning)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalValues({
        FLOWER_SIZE,
        SPREAD_INTERVAL_MS,
        FLOWER_SCALE,
        GRID_BORDER_OPACITY,
        GRID_HOVER_OPACITY,
        MUTATION_CHANCE,
        RESPAWN_CHANCE_WHEN_EMPTY
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [FLOWER_SIZE, SPREAD_INTERVAL_MS, FLOWER_SCALE, GRID_BORDER_OPACITY, 
      GRID_HOVER_OPACITY, MUTATION_CHANCE, RESPAWN_CHANCE_WHEN_EMPTY]);

  const debouncedUpdate = useCallback((key: ConfigKey, value: number, delay: number = 300) => {
    if (debounceTimers.current.has(key)) {
      clearTimeout(debounceTimers.current.get(key));
    }
    
    const timer = setTimeout(() => {
      updateConfig(key, value);
      debounceTimers.current.delete(key);
    }, delay);
    
    debounceTimers.current.set(key, timer);
  }, [updateConfig]);

  const handleSliderChange = (key: ConfigKey, value: number) => {
    // Update local state immediately for visual feedback
    setLocalValues(prev => ({ ...prev, [key]: value }));
    // Debounce the actual config update
    debouncedUpdate(key, value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-end p-4 pointer-events-none">
      <div 
        className="bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 pointer-events-auto w-80 max-h-[80vh] overflow-y-auto"
        style={{ marginBottom: '80px', marginRight: '0' }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-white">Flower Field</h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl leading-none"
            >
              <MaterialSymbolsClose />
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-md font-bold text-white">Setting</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Flower Size (px): {localValues.FLOWER_SIZE}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={localValues.FLOWER_SIZE}
                onChange={(e) => handleSliderChange('FLOWER_SIZE', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Flower Scale: {localValues.FLOWER_SCALE.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.01"
                value={localValues.FLOWER_SCALE}
                onChange={(e) => handleSliderChange('FLOWER_SCALE', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Spread Interval (ms): {localValues.SPREAD_INTERVAL_MS}
              </label>
              <input
                type="range"
                min="100"
                max="20000"
                step="100"
                value={localValues.SPREAD_INTERVAL_MS}
                onChange={(e) => handleSliderChange('SPREAD_INTERVAL_MS', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Grid Border Opacity: {localValues.GRID_BORDER_OPACITY.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={localValues.GRID_BORDER_OPACITY}
                onChange={(e) => handleSliderChange('GRID_BORDER_OPACITY', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Grid Hover Opacity: {localValues.GRID_HOVER_OPACITY.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={localValues.GRID_HOVER_OPACITY}
                onChange={(e) => handleSliderChange('GRID_HOVER_OPACITY', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Mutation Chance: {(localValues.MUTATION_CHANCE * 100).toFixed(2)}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={localValues.MUTATION_CHANCE * 100}
                onChange={(e) => handleSliderChange('MUTATION_CHANCE', Number(e.target.value) / 100)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Respawn Chance: {(localValues.RESPAWN_CHANCE_WHEN_EMPTY * 100).toFixed(2)}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={localValues.RESPAWN_CHANCE_WHEN_EMPTY * 100}
                onChange={(e) => handleSliderChange('RESPAWN_CHANCE_WHEN_EMPTY', Number(e.target.value) / 100)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-gray-700 space-y-2">
              
              <button
                onClick={resetConfig}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Reset to Defaults
              </button>
              <button
                onClick={() => navigate('/about')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                About Flower Field
              </button>
            </div>

            <p className='opacity-50 text-xs text-white'>
                Copyright &copy; 2026 AdMFirst.
                This project is open source under the MIT License.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
