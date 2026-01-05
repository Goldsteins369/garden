import { useEffect } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';

export function useGrowth(setGardens) {
  useEffect(() => {
    const interval = setInterval(() => {
      setGardens(prevGardens => prevGardens.map(garden => ({
        ...garden,
        grid: garden.grid.map(cell => {
          if (!cell.flower) return cell;
          const flowerConfig = GAME_CONFIG.FLOWERS[cell.flower.type];
          if (!flowerConfig) return cell;

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
  }, [setGardens]);
}
