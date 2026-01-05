import React from 'react';
import { styles } from '../utils/styles';

export function ResetConfirmModal({ showResetConfirm, setShowResetConfirm, resetGame }) {
  if (!showResetConfirm) return null;

  return (
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
  );
}
