/* eslint-disable no-undef */
import { GAME_CONFIG } from '../config/gameConfig';
import { playSound } from './sounds';

export function plantFlower(cellId, selectedFlower, grid, currentGarden, coins, setCoins, setGardens, addHistoryEntry) {
  const cell = grid.find(c => c.id === cellId);
  const flowerConfig = GAME_CONFIG.FLOWERS[selectedFlower];

  if (cell.locked || cell.flower || isNaN(coins) || coins < flowerConfig.plantCost) return;

  setCoins(prev => prev - flowerConfig.plantCost);
  setGardens(prevGardens => {
    const newGardens = [...prevGardens];
    const g = { ...newGardens[currentGarden] };
    g.grid = g.grid.map(c => c.id === cellId ? { 
      ...c, flower: { type: selectedFlower, growthStage: 0, plantedAt: Date.now() } 
    } : c);
    newGardens[currentGarden] = g;
    return newGardens;
  });
  
  playSound('plant');
  addHistoryEntry('plant', flowerConfig.name, flowerConfig.plantCost);
}

export function harvestFlower(cellId, grid, currentGarden, setInventory, setGardens, addHistoryEntry) {
  const cell = grid.find(c => c.id === cellId);
  if (!cell.flower || cell.flower.growthStage < 3) return;

  const flowerType = cell.flower.type;
  const flowerConfig = GAME_CONFIG.FLOWERS[flowerType];
  if (!flowerConfig) return;

  if (flowerConfig.isInfinite) {
    const yieldCount = cell.flower.yieldCount || 0;
    if (yieldCount > 0) {
      const yieldType = `${flowerType}_yield`;
      setInventory(prev => ({
        ...prev,
        [yieldType]: (prev[yieldType] || 0) + yieldCount
      }));
      setGardens(prevGardens => {
        const newGardens = [...prevGardens];
        const g = { ...newGardens[currentGarden] };
        g.grid = g.grid.map(c => c.id === cellId ? { ...c, flower: { ...c.flower, yieldCount: 0 } } : c);
        newGardens[currentGarden] = g;
        return newGardens;
      });
      playSound('harvest');
      addHistoryEntry('harvest', `${yieldCount}x ${flowerConfig.name} урожай`, yieldCount * flowerConfig.sellPrice);
    }
  } else {
    setInventory(prev => ({
      ...prev,
      [flowerType]: (prev[flowerType] || 0) + 1
    }));
    
    setGardens(prevGardens => {
      const newGardens = [...prevGardens];
      const g = { ...newGardens[currentGarden] };
      g.grid = g.grid.map(c => c.id === cellId ? { ...c, flower: null } : c);
      newGardens[currentGarden] = g;
      return newGardens;
    });

    playSound('harvest');
    addHistoryEntry('harvest', flowerConfig.name, flowerConfig.sellPrice);
  }
}

export function removeFlower(cellId, grid, currentGarden, setGardens, addHistoryEntry) {
  const cell = grid.find(c => c.id === cellId);
  if (!cell || !cell.flower) return;

  const flowerType = cell.flower.type;
  setGardens(prevGardens => {
    const newGardens = [...prevGardens];
    const g = { ...newGardens[currentGarden] };
    g.grid = g.grid.map(c => c.id === cellId ? { ...c, flower: null } : c);
    newGardens[currentGarden] = g;
    return newGardens;
  });

  playSound('harvest');
  addHistoryEntry('remove', GAME_CONFIG.FLOWERS[flowerType]?.name || 'Удалено', 0);
}

export function fertilizeFlower(cellId, grid, currentGarden, setGardens, addHistoryEntry) {
  const cell = grid.find(c => c.id === cellId);
  if (!cell || !cell.flower) return;
  const cfg = GAME_CONFIG.FLOWERS[cell.flower.type];
  const boostMs = Math.round(cfg.growthTime * 1000 * 0.34);
  setGardens(prevGardens => {
    const newGardens = [...prevGardens];
    const g = { ...newGardens[currentGarden] };
    g.grid = g.grid.map(c => c.id === cellId ? { 
      ...c, 
      flower: { 
        ...c.flower, 
        plantedAt: (c.flower.plantedAt || Date.now()) - boostMs 
      } 
    } : c);
    newGardens[currentGarden] = g;
    return newGardens;
  });
  playSound('plant');
  addHistoryEntry('fertilize', GAME_CONFIG.FLOWERS[cell.flower.type]?.name || 'Удобрение', 0);
}

export function unlockCell(cellId, grid, currentGarden, coins, setCoins, setGardens) {
  const cost = 50;
  if (isNaN(coins) || coins < cost) return;

  setCoins(prev => prev - cost);
  setGardens(prevGardens => {
    const newGardens = [...prevGardens];
    const g = { ...newGardens[currentGarden] };
    g.grid = g.grid.map(c => c.id === cellId ? { ...c, locked: false } : c);
    newGardens[currentGarden] = g;
    return newGardens;
  });
}

export function unlockFlowerType(flowerType, unlockedFlowers, coins, setCoins, setUnlockedFlowers, setSelectedFlower) {
  const flowerConfig = GAME_CONFIG.FLOWERS[flowerType];
  if (!flowerConfig) return;
  const cost = flowerConfig.unlockCost;

  if (unlockedFlowers.includes(flowerType) || isNaN(coins) || coins < cost) return;

  setCoins(prev => prev - cost);
  setUnlockedFlowers([...unlockedFlowers, flowerType]);
  setSelectedFlower(flowerType);
}

export function buyGarden(coins, setCoins, setGardens, setCurrentGarden, gardens) {
  const cost = 1000;
  if (isNaN(coins) || coins < cost || gardens.length >= GAME_CONFIG.MAX_GARDENS) return;

  setCoins(prev => prev - cost);
  const newIndex = gardens.length;
  setGardens(prev => [...prev, createGarden(`Сад ${prev.length + 1}`, GARDEN_COLORS[prev.length % GARDEN_COLORS.length])]);
  setCurrentGarden(newIndex);
}

export function sellFlower(flowerType, amount, setCoins, setInventory, addHistoryEntry) {
  const flowerConfig = flowerType.includes('_yield') ? GAME_CONFIG.FLOWERS[flowerType.replace('_yield', '')] : GAME_CONFIG.FLOWERS[flowerType];
  const available = inventory[flowerType] || 0;
  if (available < amount || !flowerConfig) return;

  const earnings = flowerConfig.sellPrice * amount;
  setCoins(prev => prev + earnings);
  setInventory(prev => ({
    ...prev,
    [flowerType]: prev[flowerType] - amount
  }));

  playSound('sell');
  addHistoryEntry('sell', `${amount}x ${flowerConfig.name}`, earnings);
}

export function sellAllFlowers(inventory, setCoins, setInventory, addHistoryEntry) {
  let totalEarnings = 0;
  const soldItems = [];
  Object.entries(inventory).forEach(([flowerType, count]) => {
    if (count > 0) {
      const flowerConfig = flowerType.includes('_yield') ? GAME_CONFIG.FLOWERS[flowerType.replace('_yield', '')] : GAME_CONFIG.FLOWERS[flowerType];
      if (!flowerConfig) return;
      const earnings = flowerConfig.sellPrice * count;
      totalEarnings += earnings;
      soldItems.push(`${count}x ${flowerConfig.name}`);
    }
  });
  if (totalEarnings > 0) {
    setCoins(prev => prev + totalEarnings);
    setInventory({});
    playSound('sell');
    addHistoryEntry('sell', soldItems.join(', '), totalEarnings);
  }
}

export function addHistoryEntry(action, flowerName, amount, setHistory) {
  const entry = {
    id: Date.now(),
    action,
    flowerName,
    amount,
    timestamp: new Date().toLocaleTimeString()
  };
  
  setHistory(prev => [entry, ...prev].slice(0, 50));
}

export function resetGame(setCoins, setGardens, setCurrentGarden, setUnlockedFlowers, setSelectedFlower, setInventory, setHistory, setShowResetConfirm) {
  setCoins(GAME_CONFIG.INITIAL_COINS);
  setGardens([createGarden('Сад 1', '#dcfce7')]);
  setCurrentGarden(0);
  setUnlockedFlowers(['daisy']);
  setSelectedFlower('daisy');
  setInventory({});
  setHistory([]);
  setShowResetConfirm(false);
}

export function getTotalInventoryCount(inventory) {
  return Object.values(inventory).reduce((sum, count) => sum + count, 0);
}

export function formatCoins(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const GARDEN_COLORS = [
  '#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#3D9970', '#7FDBFF', '#0074D9', '#B10DC9', '#F012BE', '#FFFFFF', '#AAAAAA', '#111111'
];

// Helper
export function createGarden(name, color) {
  const newGrid = [];
  for (let i = 0; i < GAME_CONFIG.GRID_SIZE; i++) {
    for (let j = 0; j < GAME_CONFIG.GRID_SIZE; j++) {
      newGrid.push({
        id: `${i}-${j}`,
        row: i,
        col: j,
        flower: null,
        locked: i > 2 || j > 2
      });
    }
  }
  return { name, color, grid: newGrid };
}
