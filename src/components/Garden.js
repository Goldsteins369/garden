import React from 'react';
import { GAME_CONFIG } from '../config/gameConfig';
import { styles } from '../utils/styles';

const GARDEN_COLORS = [
  '#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#3D9970', '#7FDBFF', '#0074D9', '#B10DC9', '#F012BE', '#FFFFFF', '#AAAAAA', '#111111'
];

export function Garden({ gardens, currentGarden, setCurrentGarden, grid, selectedCells, selectedMode, isSelecting, selectionStart, setIsSelecting, setSelectionStart, setSelectedCells, plantFlower, harvestFlower, removeFlower, fertilizeFlower, unlockCell, buyGarden, coins, handleGardenContextMenu }) {
  function renderCell(cell) {
    const flowerConfig = cell.flower ? GAME_CONFIG.FLOWERS[cell.flower.type] : null;
    if (cell.flower && !flowerConfig) return <div style={styles.cell}>?</div>;
    
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

  const handleMouseDown = (cellId) => {
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

  return (
    <div style={styles.card}>
      <div style={{display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap'}}>
        <div style={styles.sectionTitle}>🌻 {gardens[currentGarden].name}</div>
      </div>
       
       <div style={styles.gardenGrid} onMouseUp={() => { setIsSelecting(false); setSelectionStart(null); setSelectedCells(new Set()); }}>
        {grid.map(cell => (
           <div key={cell.id}>
             {renderCell(cell)}
           </div>
         ))}
       </div>
     </div>
  );
}
