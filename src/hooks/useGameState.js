import { useState } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';

function createGarden(name, color) {
  const newGrid = [];
  for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
    for (let col = 0; col < GAME_CONFIG.GRID_SIZE; col++) {
      newGrid.push({
        id: `${row}-${col}`,
        row,
        col,
        flower: null,
        locked: row > 2 || col > 2
      });
    }
  }
  return { name, color, grid: newGrid };
}

export function useGameState() {
  const [coins, setCoins] = useState(GAME_CONFIG.INITIAL_COINS);
  const [gardens, setGardens] = useState([createGarden('Сад 1', '#dcfce7')]);
  const [currentGarden, setCurrentGarden] = useState(0);
  const [selectedFlower, setSelectedFlower] = useState('daisy');
  const [flowerPage, setFlowerPage] = useState(0);
  const [unlockedFlowers, setUnlockedFlowers] = useState(['daisy']);
  const [inventory, setInventory] = useState({});
  const [history, setHistory] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [selectedMode, setSelectedMode] = useState('plant');
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, gardenIndex: null });
  const [tempGardenName, setTempGardenName] = useState('');
  const [tempGardenColor, setTempGardenColor] = useState('');
  const [showInventory, setShowInventory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return {
    coins, setCoins,
    gardens, setGardens,
    currentGarden, setCurrentGarden,
    selectedFlower, setSelectedFlower,
    flowerPage, setFlowerPage,
    unlockedFlowers, setUnlockedFlowers,
    inventory, setInventory,
    history, setHistory,
    isSelecting, setIsSelecting,
    selectionStart, setSelectionStart,
    selectedCells, setSelectedCells,
    selectedMode, setSelectedMode,
    contextMenu, setContextMenu,
    tempGardenName, setTempGardenName,
    tempGardenColor, setTempGardenColor,
    showInventory, setShowInventory,
    showHistory, setShowHistory,
    showResetConfirm, setShowResetConfirm
  };
}
