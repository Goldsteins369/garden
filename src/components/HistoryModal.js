import React from 'react';
import { styles } from '../utils/styles';

export function HistoryModal({ showHistory, setShowHistory, history }) {
  if (!showHistory) return null;

  return (
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
  );
}
