import React, { useState, useEffect } from 'react';
import { GAME_CONFIG } from './config/gameConfig';
import { styles } from './utils/styles';
import { playSound } from './utils/sounds';

// === APP COMPONENT ===
export default function GoldGarden() {
  const [coins, setCoins] = useState(GAME_CONFIG.INITIAL_COINS);
  const [gardens, setGardens] = useState([createGarden('Сад 1', '#dcfce7')]);
  const [currentGarden, setCurrentGarden] = useState(0);
  const [selectedFlower, setSelectedFlower] = useState('daisy');
  const [flowerPage, setFlowerPage] = useState(0);
  const [unlockedFlowers, setUnlockedFlowers] = useState(['daisy']);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [inventory, setInventory] = useState({});
  const [history, setHistory] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [isCompactFlowers, setIsCompactFlowers] = useState(false);
  const [selectedMode, setSelectedMode] = useState('plant'); // 'plant' (посадка), 'dig' (выкопать), 'fertilize' (удобрить)
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, gardenIndex: null });
  const [tempGardenName, setTempGardenName] = useState('');
  const [tempGardenColor, setTempGardenColor] = useState('');

  const GARDEN_COLORS = [
    '#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#3D9970', '#7FDBFF', '#0074D9', '#B10DC9', '#F012BE', '#FFFFFF', '#AAAAAA', '#111111'
  ];

  function createEmptyGrid() {
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
    return newGrid;
  }

  function createGarden(name, color) {
    return { name, color, grid: createEmptyGrid() };
  }

  // gardens: [{ name, color, grid }]
  const grid = gardens[currentGarden].grid;

  // Key handler: ESC closes menus; V = plant toggle, Space = dig toggle, B = fertilize toggle
  useEffect(() => {
    const handleKey = (e) => {
      if (contextMenu.show) return; // Prevent key handling when context menu is open
      if (e.key === 'Escape') {
        setShowInventory(false);
        setShowHistory(false);
        setShowResetConfirm(false);
        setContextMenu({ show: false, x: 0, y: 0, gardenIndex: null });
      }
      if (e.key === 'v' || e.key === 'V') {
        setSelectedMode(prev => prev === 'plant' ? null : 'plant');
        playSound('switch');
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setSelectedMode(prev => prev === 'dig' ? null : 'dig');
        playSound('switch');
      }
      if (e.key === 'b' || e.key === 'B') {
        setSelectedMode(prev => prev === 'fertilize' ? null : 'fertilize');
        playSound('switch');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [contextMenu.show]);

  // Growth tick
  useEffect(() => {
    const interval = setInterval(() => {
      setGardens(prevGardens => prevGardens.map(garden => ({
        ...garden,
        grid: garden.grid.map(cell => {
          if (!cell.flower) return cell;
          const flowerConfig = GAME_CONFIG.FLOWERS[cell.flower.type];
          if (!flowerConfig) return cell; // Skip invalid flower types

          const elapsedTime = (Date.now() - cell.flower.plantedAt) / 1000;
          const progress = elapsedTime / flowerConfig.growthTime;

          let stage;
          if (progress < 0.33) stage = 0;
          else if (progress < 0.66) stage = 1;
          else if (progress < 1) stage = 2;
          else stage = 3;

          let newFlower = { ...cell.flower, growthStage: stage };

          if (flowerConfig.isInfinite && stage >= 3) {
            const yieldProgress = (elapsedTime - flowerConfig.growthTime) / flowerConfig.yieldInterval;
            const newYieldCount = Math.min(Math.floor(yieldProgress) + 1, flowerConfig.maxYield);
            newFlower.yieldCount = Math.max(newFlower.yieldCount || 0, newYieldCount);
          }

          return {
            ...cell,
            flower: newFlower
          };
        })
      })));
    }, GAME_CONFIG.TICK_SPEED);

    return () => clearInterval(interval);
  }, []);

  // Mouse selection handlers
  const handleMouseDown = (e, cellId) => {
    if (e.button !== 0) return;
    setIsSelecting(true);
    setSelectionStart(cellId);
    setSelectedCells(new Set([cellId]));
  };

  const handleMouseEnter = (cellId) => {
    if (!isSelecting || !selectionStart) return;
    
    const startCell = grid.find(c => c.id === selectionStart);
    const currentCell = grid.find(c => c.id === cellId);
    
    const minRow = Math.min(startCell.row, currentCell.row);
    const maxRow = Math.max(startCell.row, currentCell.row);
    const minCol = Math.min(startCell.col, currentCell.col);
    const maxCol = Math.max(startCell.col, currentCell.col);
    
    const newSelection = new Set();
    grid.forEach(cell => {
      if (cell.row >= minRow && cell.row <= maxRow && 
          cell.col >= minCol && cell.col <= maxCol) {
        newSelection.add(cell.id);
      }
    });
    
    setSelectedCells(newSelection);
  };

  const handleMouseUp = () => {
    if (isSelecting && selectedCells.size > 0) {
      const allMature = Array.from(selectedCells).every(cellId => {
        const cell = grid.find(c => c.id === cellId);
        return cell.flower && cell.flower.growthStage >= 3;
      });

      const allEmpty = Array.from(selectedCells).every(cellId => {
        const cell = grid.find(c => c.id === cellId);
        return !cell.flower && !cell.locked;
      });

      if (allMature) {
        selectedCells.forEach(cellId => harvestFlower(cellId));
      } else if (allEmpty) {
        // Массовая посадка (только если режим 'plant')
        if (selectedMode === 'plant') {
          const flowerConfig = GAME_CONFIG.FLOWERS[selectedFlower];
          const cellsArray = Array.from(selectedCells);
          let currentCoins = coins;
          cellsArray.forEach(cellId => {
            if (currentCoins >= flowerConfig.plantCost) {
              plantFlower(cellId);
              currentCoins -= flowerConfig.plantCost;
            }
          });
        }
      } else {
        // Если есть растения в выделении — выполнить массовую операцию в зависимости от режима
        if (selectedMode === 'dig') {
          Array.from(selectedCells).forEach(cellId => {
            const c = grid.find(x => x.id === cellId);
            if (c && c.flower) removeFlower(cellId);
          });
        } else if (selectedMode === 'fertilize') {
          Array.from(selectedCells).forEach(cellId => {
            const c = grid.find(x => x.id === cellId);
            if (c && c.flower) fertilizeFlower(cellId);
          });
        }
      }
    }
    
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectedCells(new Set());
  };

  // plantFlower: update to modify gardens[currentGarden].grid
  function plantFlower(cellId) {
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

  function harvestFlower(cellId) {
    const cell = grid.find(c => c.id === cellId);
    if (!cell.flower || cell.flower.growthStage < 3) return;

    const flowerType = cell.flower.type;
    const flowerConfig = GAME_CONFIG.FLOWERS[flowerType];
    if (!flowerConfig) return; // Skip invalid types

    if (flowerConfig.isInfinite) {
      const yieldCount = cell.flower.yieldCount || 0;
      if (yieldCount > 0) {
        const yieldType = `${flowerType}_yield`;
        setInventory(prev => ({
          ...prev,
          [yieldType]: (prev[yieldType] || 0) + yieldCount
        }));
        // Reset yield, keep plant
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

  function removeFlower(cellId) {
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

  function fertilizeFlower(cellId) {
    const cell = grid.find(c => c.id === cellId);
    if (!cell || !cell.flower) return;
    const cfg = GAME_CONFIG.FLOWERS[cell.flower.type];
    // ускоряем рост: сдвигаем plantedAt назад на ~1/3 времени роста
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

  // Продать один/несколько цветов из инвентаря
  function sellFlower(flowerType, amount = 1) {
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

  // Продать всё из инвентаря
  function sellAllFlowers() {
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

  function unlockCell(cellId) {
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

  function unlockFlowerType(flowerType) {
    const flowerConfig = GAME_CONFIG.FLOWERS[flowerType];
    if (!flowerConfig) return;
    const cost = flowerConfig.unlockCost;

    if (unlockedFlowers.includes(flowerType) || isNaN(coins) || coins < cost) return;

    setCoins(prev => prev - cost);
    setUnlockedFlowers([...unlockedFlowers, flowerType]);
  }

  function buyGarden() {
    const cost = 1000;
    if (isNaN(coins) || coins < cost || gardens.length >= GAME_CONFIG.MAX_GARDENS) return;

    setCoins(prev => prev - cost);
    const newIndex = gardens.length;
    setGardens(prev => [...prev, createGarden(`Сад ${prev.length + 1}`, GARDEN_COLORS[prev.length % GARDEN_COLORS.length])]);
    setCurrentGarden(newIndex);
  }

  function addHistoryEntry(action, flowerName, amount) {
    const entry = {
      id: Date.now(),
      action,
      flowerName,
      amount,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setHistory(prev => [entry, ...prev].slice(0, 50));
  }

  function resetGame() {
    setCoins(GAME_CONFIG.INITIAL_COINS);
    setGardens([createGarden('Сад 1', '#dcfce7')]);
    setCurrentGarden(0);
    setUnlockedFlowers(['daisy']);
    setSelectedFlower('daisy');
    setInventory({});
    setHistory([]);
    setShowResetConfirm(false);
  }

  function getTotalInventoryCount() {
    return Object.values(inventory).reduce((sum, count) => sum + count, 0);
  }

  const flowerKeys = Object.keys(GAME_CONFIG.FLOWERS);
  const flowersPerPage = 3;
  const maxPage = Math.ceil(flowerKeys.length / flowersPerPage) - 1;
  const visibleFlowers = flowerKeys.slice(flowerPage * flowersPerPage, (flowerPage + 1) * flowersPerPage);

  function renderCell(cell) {
    const flowerConfig = cell.flower ? GAME_CONFIG.FLOWERS[cell.flower.type] : null;
    if (cell.flower && !flowerConfig) return <div style={styles.cell}>?</div>; // Invalid flower
    
    const isSelected = selectedCells.has(cell.id);
    
    if (cell.locked) {
      return (
        <div
          onClick={() => unlockCell(cell.id)}
          style={{
            ...styles.cell,
            backgroundColor: '#d1d5db',
            borderColor: isSelected ? '#3b82f6' : '#9ca3af',
            border: isSelected ? '3px solid #3b82f6' : '2px solid #9ca3af'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
        >
          <span style={{ fontSize: '32px' }}>🔒</span>
        </div>
      );
    }

    if (!cell.flower) {
      return (
        <div
          onClick={() => !isSelecting && selectedMode === 'plant' && plantFlower(cell.id)}
          onMouseDown={(e) => handleMouseDown(e, cell.id)}
          onMouseEnter={() => handleMouseEnter(cell.id)}
          style={{
            ...styles.cell,
            backgroundColor: isSelected ? '#bfdbfe' : '#f0fdf4',
            borderColor: isSelected ? '#3b82f6' : '#86efac',
            border: isSelected ? '3px solid #3b82f6' : '2px solid #86efac',
            color: '#9ca3af'
          }}
        >
          +
        </div>
      );
    }

    const stage = flowerConfig.stages[Math.min(cell.flower.growthStage, 3)];
    const isReady = cell.flower.growthStage >= 3;
    
    const sizes = [16, 24, 32, 40];
    const fontSize = sizes[Math.min(cell.flower.growthStage, 3)];
    
    const emojiStyle = {
      fontSize: `${fontSize}px`,
      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      display: 'inline-block',
      animation: isReady ? 'bounce 2s infinite' : 'none'
    };

    let displayEmoji = stage;
    if (flowerConfig.isInfinite && cell.flower.yieldCount > 0) {
      const yieldEmoji = flowerConfig.sprite === '🌿' ? '🍓' : flowerConfig.sprite === '🌳' ? '🍎' : '🍇';
      if (cell.flower.yieldCount <= 3) {
        displayEmoji += yieldEmoji.repeat(cell.flower.yieldCount);
      } else {
        displayEmoji += `${yieldEmoji.repeat(3)}+${cell.flower.yieldCount - 3}`;
      }
    }

    return (
      <div
        onClick={() => {
          if (isSelecting) return;
          if (selectedMode === 'dig') removeFlower(cell.id);
          else if (selectedMode === 'fertilize') fertilizeFlower(cell.id);
          else if (isReady && selectedMode !== 'fertilize' && selectedMode !== 'dig') harvestFlower(cell.id);
        }}
        onMouseDown={(e) => handleMouseDown(e, cell.id)}
        onMouseEnter={() => handleMouseEnter(cell.id)}
        style={{ 
          ...styles.cell,
          backgroundColor: flowerConfig.color,
          borderColor: isSelected ? '#3b82f6' : (isReady ? '#fbbf24' : '#86efac'),
          border: isSelected ? '3px solid #3b82f6' : (isReady ? '2px solid #fbbf24' : '2px solid #86efac'),
          boxShadow: isReady ? '0 0 20px rgba(251, 191, 36, 0.5)' : 'none',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {isReady && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            animation: 'pulse 2s infinite'
          }} />
        )}
        <span style={emojiStyle}>{displayEmoji}</span>
      </div>
    );
  }

  function formatCoins(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function handleGardenContextMenu(e, idx) {
    e.preventDefault();
    setContextMenu({ show: true, x: e.clientX, y: e.clientY, gardenIndex: idx });
    setTempGardenName(gardens[idx].name);
    setTempGardenColor(gardens[idx].color);
  }

  function saveGardenChanges() {
    if (contextMenu.gardenIndex !== null) {
      const newName = tempGardenName.slice(0, 25);
      setGardens(prev => {
        const arr = [...prev];
        arr[contextMenu.gardenIndex] = { ...arr[contextMenu.gardenIndex], name: newName, color: tempGardenColor };
        return arr;
      });
    }
    setContextMenu({ show: false, x: 0, y: 0, gardenIndex: null });
  }

  return (
    <div style={styles.container} onMouseUp={handleMouseUp}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.title}>💰 Gold Garden</div>
          <div style={styles.subtitle}>
            Сад Гольдштейна, сажайте цветы и получайте профит 
          </div>
        </div>

        <div style={{...styles.card, ...styles.topBar}}>
          <div style={styles.coinsText}>💰 {formatCoins(coins)} coins</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={sellAllFlowers}
              style={{
                padding: '8px 12px',
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              title="Продать всё"
            >
              💰 Продать всё
            </button>

            <div 
              style={styles.inventoryText}
              onClick={() => setShowInventory(true)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🎒 Инвентарь: {getTotalInventoryCount()}
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px'}}>
            <button
              onClick={() => setFlowerPage(Math.max(0, flowerPage - 1))}
              disabled={flowerPage === 0}
              style={{
                padding: '6px 12px',
                background: flowerPage === 0 ? '#d1d5db' : '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: flowerPage === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ◀️
            </button>
            <span style={{padding: '6px 12px', fontWeight: 'bold'}}>
              {flowerPage + 1} / {maxPage + 1}
            </span>
            <button
              onClick={() => setFlowerPage(Math.min(maxPage, flowerPage + 1))}
              disabled={flowerPage === maxPage}
              style={{
                padding: '6px 12px',
                background: flowerPage === maxPage ? '#d1d5db' : '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: flowerPage === maxPage ? 'not-allowed' : 'pointer'
              }}
            >
              ▶️
            </button>
          </div>
          
          <div style={styles.flowerGrid}>
            {visibleFlowers.map(key => {
              const flower = GAME_CONFIG.FLOWERS[key];
              const isUnlocked = unlockedFlowers.includes(key);
              const isSelected = selectedFlower === key;

              return (
                <div
                  key={key}
                  onClick={() => isUnlocked ? setSelectedFlower(key) : unlockFlowerType(key)}
                  style={{
                    ...styles.flowerCard,
                    backgroundColor: isUnlocked ? flower.color : '#f3f4f6',
                    borderColor: isSelected ? '#22c55e' : '#d1d5db',
                    opacity: isUnlocked ? 1 : 0.6
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '4px' }}>{flower.sprite}</div>
                  <div style={{ fontWeight: 'bold' }}>{flower.name}</div>
                  <div style={{ fontSize: '12px' }}>Цена: {flower.plantCost}💰</div>
                  <div style={{ fontSize: '12px' }}>Продажа: {flower.sellPrice}💰</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>{flower.growthTime}s</div>
                  {!isUnlocked && (
                    <div style={{ fontSize: '11px', marginTop: '4px' }}>
                      🔒 Unlock: {flower.unlockCost}💰
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.verticalGardenTabs}>
            {gardens.map((g, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={() => setCurrentGarden(idx)}
                  onDoubleClick={(e) => handleGardenContextMenu(e, idx)}
                  style={{
                    ...styles.gardenTab,
                    borderColor: g.color,
                    background: currentGarden === idx ? '#22c55e' : 'white',
                    color: currentGarden === idx ? 'white' : 'black',
                    boxShadow: currentGarden === idx ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Двойной клик для настроек"
                >
                  <span style={{ width: 12, height: 12, borderRadius: 6, background: g.color, display: 'inline-block' }} />
                  {g.name}
                </button>
              </div>
            ))}
            {gardens.length < GAME_CONFIG.MAX_GARDENS && (
              <button
                onClick={buyGarden}
                disabled={coins < 1000}
                style={{
                  ...styles.buyGardenTab,
                  borderColor: '#fbbf24',
                  background: coins >= 1000 ? '#fef3c7' : '#f3f4f6',
                  cursor: coins >= 1000 ? 'pointer' : 'not-allowed',
                  opacity: coins >= 1000 ? 1 : 0.5
                }}
              >
                + Купить сад (1000💰)
              </button>
            )}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap'}}>
            <div style={styles.sectionTitle}>🌻 {gardens[currentGarden].name}</div>
          </div>
           
           <div style={styles.gardenGrid}>
            {grid.map(cell => (
               <div key={cell.id}>
                 {renderCell(cell)}
               </div>
             ))}
           </div>
         </div>

        <div style={{...styles.card, ...styles.buttonGroup}}>
          <button
            onClick={() => setShowHistory(true)}
            style={{...styles.button, backgroundColor: '#22c55e'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
          >
            📜 История
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            style={{...styles.button, backgroundColor: '#ef4444'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
          >
            🔄 Сбросить прогресс
          </button>
        </div>

        {showInventory && (
          <div style={styles.modal} onClick={() => setShowInventory(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ca8a04' }}>🎒 Инвентарь</h3>
                <button
                  onClick={() => setShowInventory(false)}
                  style={{ fontSize: '32px', border: 'none', background: 'none', cursor: 'pointer', color: '#666' }}
                >
                  ×
                </button>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                {Object.keys(GAME_CONFIG.FLOWERS).map(flowerType => {
                  const count = inventory[flowerType] || 0;
                  const flowerConfig = GAME_CONFIG.FLOWERS[flowerType];
                  
                  if (count === 0) return null;
                  
                  return (
                    <div 
                      key={flowerType}
                      style={{
                        padding: '16px',
                        background: flowerConfig.color + '30',
                        borderRadius: '8px',
                        border: '2px solid #d1d5db',
                        marginBottom: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{flowerConfig.sprite} {flowerConfig.name}</div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          Количество: {count} | Цена: {flowerConfig.sellPrice}💰 каждый
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => sellFlower(flowerType, 1)}
                          style={{
                            padding: '6px 12px',
                            background: '#22c55e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Продать 1
                        </button>
                        <button
                          onClick={() => sellFlower(flowerType, count)}
                          style={{
                            padding: '6px 12px',
                            background: '#16a34a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Продать все
                        </button>
                      </div>
                    </div>
                  );
                })}
                
                {getTotalInventoryCount() === 0 && (
                  <p style={{ textAlign: 'center', color: '#666', padding: '32px' }}>
                    Инвентарь пуст, посадите цветы чтобы их собрать!
                  </p>
                )}
              </div>
              
              {getTotalInventoryCount() > 0 && (
                <button
                  onClick={sellAllFlowers}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#eab308',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                >
                  💰 Продать всё
                </button>
              )}
            </div>
          </div>
        )}

        {showHistory && (
          <div style={styles.modal} onClick={() => setShowHistory(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>📜 История транзакций</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  style={{ fontSize: '32px', border: 'none', background: 'none', cursor: 'pointer', color: '#666' }}
                >
                  ×
                </button>
              </div>
              
              {history.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', padding: '32px' }}>Транзакций пока нет</p>
              ) : (
                <div>
                  {history.map(entry => (
                    <div 
                      key={entry.id}
                      style={{
                        padding: '12px',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        marginBottom: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '500' }}>
                          {entry.action === 'plant' ? '🌱' : '💰'} {entry.flowerName}
                        </span>
                        <span style={{
                          fontWeight: 'bold',
                          color: entry.action === 'plant' ? '#dc2626' : '#16a34a'
                        }}>
                          {entry.action === 'plant' ? '-' : '+'}{entry.amount}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        {entry.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {showResetConfirm && (
          <div style={styles.modal}>
            <div style={{...styles.modalContent, maxWidth: '400px'}}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>⚠️ Сбросить игру?</h3>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                Это удалит весь ваш прогресс. Вы уверены?
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={resetGame}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Да, сбросить
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#d1d5db',
                    color: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{...styles.card, marginTop: '24px'}}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>📖 Как играть:</h3>
          <ul style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', listStyle: 'none', paddingLeft: 0 }}>
            <li>• Нажмите на пустые клетки чтобы посадить цветы</li>
            <li>• Используйте выделение мышью для массовой посадки/сбора</li>
            <li>• Цветы растут автоматически: 🌱 → 🌿 → 🌸 → 🌼</li>
            <li>• Нажмите чтобы собрать готовые цветы в инвентарь</li>
            <li>• Откройте инвентарь чтобы продать цветы</li>
            <li>• Откройте новые клетки для цветов (50💰)</li>
            <li>• Купите второй сад за 1000💰</li>
            <li>• ESC закрывает все меню</li>
          </ul>
        </div>

        {/* Fixed mode buttons */}
        <div style={styles.fixedModeButtons}>
          <button
            onClick={() => { setSelectedMode(prev => prev === 'plant' ? null : 'plant'); playSound('switch'); }}
            style={{ ...styles.modeButton, background: selectedMode === 'plant' ? '#86efac' : '#fef3c7' }}
            title="Режим посадки (V)"
          >🌱 Посадка</button>
          <button
            onClick={() => { setSelectedMode(prev => prev === 'dig' ? null : 'dig'); playSound('switch'); }}
            style={{ ...styles.modeButton, background: selectedMode === 'dig' ? '#fca5a5' : '#fef3c7' }}
            title="Режим выкопать (Space)"
          >🗑️ Выкопать</button>
          <button
            onClick={() => { setSelectedMode(prev => prev === 'fertilize' ? null : 'fertilize'); playSound('switch'); }}
            style={{ ...styles.modeButton, background: selectedMode === 'fertilize' ? '#fde68a' : '#fef3c7' }}
            title="Режим удобрить (B)"
          >🌿 Удобрить</button>
        </div>

        {/* Garden context menu */}
        {contextMenu.show && (
          <div style={{ ...styles.modalContent, position: 'absolute', left: contextMenu.x, top: contextMenu.y, zIndex: 1001, maxWidth: '300px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>⚙️ Настройки сада</h3>
              <button
                onClick={() => setContextMenu({ show: false, x: 0, y: 0, gardenIndex: null })}
                style={{ fontSize: '24px', border: 'none', background: 'none', cursor: 'pointer', color: '#666' }}
              >
                ×
              </button>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label>Название сада (макс 25 символов):</label>
              <input
                type="text"
                value={tempGardenName}
                onChange={(e) => setTempGardenName(e.target.value.slice(0, 25))}
                style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #d1d5db' }}
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label>Выберите цвет:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {GARDEN_COLORS.map(color => (
                  <div
                    key={color}
                    style={{ ...styles.colorOption, background: color, borderColor: tempGardenColor === color ? '#22c55e' : '#d1d5db' }}
                    onClick={() => setTempGardenColor(color)}
                  />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={saveGardenChanges} style={{ padding: '4px 8px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '4px' }}>Сохранить</button>
              <button onClick={() => setContextMenu({ show: false, x: 0, y: 0, gardenIndex: null })} style={{ padding: '4px 8px', background: '#d1d5db', color: '#1f2937', border: 'none', borderRadius: '4px' }}>Отмена</button>
            </div>
          </div>
        )}
      </div>
    </div>  );}