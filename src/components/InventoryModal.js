import React from 'react';
import { GAME_CONFIG } from '../config/gameConfig';
import { styles } from '../utils/styles';

export function InventoryModal({ showInventory, setShowInventory, inventory, sellFlower, sellAllFlowers, getTotalInventoryCount }) {
  if (!showInventory) return null;

  return (
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
  );
}
