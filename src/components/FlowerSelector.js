import React from 'react';
import { GAME_CONFIG } from '../config/gameConfig';
import { styles } from '../utils/styles';

export function FlowerSelector({ flowerPage, setFlowerPage, selectedFlower, setSelectedFlower, unlockedFlowers, unlockFlowerType }) {
  const flowerKeys = Object.keys(GAME_CONFIG.FLOWERS);
  const flowersPerPage = 3;
  const maxPage = Math.ceil(flowerKeys.length / flowersPerPage) - 1;
  const visibleFlowers = flowerKeys.slice(flowerPage * flowersPerPage, (flowerPage + 1) * flowersPerPage);

  return (
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
  );
}
