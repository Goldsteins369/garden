import React from 'react';
import { styles } from '../utils/styles';

const GARDEN_COLORS = [
  '#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#3D9970', '#7FDBFF', '#0074D9', '#B10DC9', '#F012BE', '#FFFFFF', '#AAAAAA', '#111111'
];

export function GardenContextMenu({ contextMenu, setContextMenu, tempGardenName, setTempGardenName, tempGardenColor, setTempGardenColor, saveGardenChanges }) {
  if (!contextMenu.show) return null;

  return (
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
  );
}
