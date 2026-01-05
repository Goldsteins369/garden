import React from 'react';
import { styles } from '../utils/styles';
import { playSound } from '../utils/sounds';

export function ModeButtons({ selectedMode, setSelectedMode }) {
  return (
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
  );
}
