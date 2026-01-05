export const GAME_CONFIG = {
  GRID_SIZE: 5,
  INITIAL_COINS: 5000,
  TICK_SPEED: 1000,
  MAX_GARDENS: Infinity,
  
  FLOWERS: {
    daisy: {
      name: 'Ромашка',
      plantCost: 10,
      sellPrice: 25,
      growthTime: 10,
      color: '#ffffff',
      sprite: '🌼',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      unlockCost: 0
    },
    tulip: {
      name: 'Тюльпан',
      plantCost: 30,
      sellPrice: 80,
      growthTime: 20,
      color: '#FFB6C1',
      sprite: '🌷',
      stages: ['🌱', '🌿', '🌸', '🌷'],
      unlockCost: 100
    },
    rose: {
      name: 'Роза',
      plantCost: 100,
      sellPrice: 300,
      growthTime: 40,
      color: '#ff1515',
      sprite: '🌹',
      stages: ['🌱', '🌿', '🌸', '🌹'],
      unlockCost: 500
    },
    sunflower: {
      name: 'Подсолнух',
      plantCost: 50,
      sellPrice: 150,
      growthTime: 30,
      color: '#FFD700',
      sprite: '🌻',
      stages: ['🌱', '🌿', '🌸', '🌻'],
      unlockCost: 250
    },
    lotus: {
      name: 'Лотос',
      plantCost: 200,
      sellPrice: 600,
      growthTime: 50,
      color: '#FF69B4',
      sprite: '🪷',
      stages: ['🌱', '🌿', '🌸', '🪷'],
      unlockCost: 800
    },
    orchid: {
      name: 'Орхидея',
      plantCost: 150,
      sellPrice: 450,
      growthTime: 45,
      color: '#DA70D6',
      sprite: '💮',
      stages: ['🌱', '🌿', '🌸', '💮'],
      unlockCost: 400
    },
    lavender: {
      name: 'Лаванда',
      plantCost: 20,
      sellPrice: 50,
      growthTime: 15,
      color: '#E6E6FA',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '💜'],
      unlockCost: 50
    },
    lily: {
      name: 'Лилия',
      plantCost: 40,
      sellPrice: 100,
      growthTime: 25,
      color: '#FFFACD',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌷'],
      unlockCost: 120
    },
    poppy: {
      name: 'Мак',
      plantCost: 25,
      sellPrice: 60,
      growthTime: 18,
      color: '#FF6347',
      sprite: '🌺',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 80
    },
    carnation: {
      name: 'Гвоздика',
      plantCost: 35,
      sellPrice: 90,
      growthTime: 22,
      color: '#FFC0CB',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌸'],
      unlockCost: 110
    },
    peony: {
      name: 'Пион',
      plantCost: 60,
      sellPrice: 160,
      growthTime: 35,
      color: '#FFB6C1',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 300
    },
    chrysanthemum: {
      name: 'Хризантема',
      plantCost: 45,
      sellPrice: 120,
      growthTime: 28,
      color: '#FFD700',
      sprite: '🌼',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      unlockCost: 200
    },
    iris: {
      name: 'Ирис',
      plantCost: 55,
      sellPrice: 140,
      growthTime: 32,
      color: '#4B0082',
      sprite: '🌷',
      stages: ['🌱', '🌿', '🌸', '🌷'],
      unlockCost: 280
    },
    dahlia: {
      name: 'Георгина',
      plantCost: 70,
      sellPrice: 180,
      growthTime: 38,
      color: '#FF69B4',
      sprite: '🌺',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 350
    },
    hydrangea: {
      name: 'Гортензия',
      plantCost: 80,
      sellPrice: 200,
      growthTime: 42,
      color: '#87CEEB',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      unlockCost: 400
    },
    azalea: {
      name: 'Азалия',
      plantCost: 50,
      sellPrice: 130,
      growthTime: 30,
      color: '#FF6347',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 250
    },
    begonia: {
      name: 'Бегония',
      plantCost: 30,
      sellPrice: 75,
      growthTime: 20,
      color: '#FFC0CB',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 100
    },
    geranium: {
      name: 'Герань',
      plantCost: 40,
      sellPrice: 100,
      growthTime: 25,
      color: '#FF6347',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 150
    },
    pansy: {
      name: 'Анютины глазки',
      plantCost: 15,
      sellPrice: 40,
      growthTime: 12,
      color: '#9370DB',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      unlockCost: 40
    },
    petunia: {
      name: 'Петунья',
      plantCost: 25,
      sellPrice: 65,
      growthTime: 18,
      color: '#FF69B4',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 90
    },
    snapdragon: {
      name: 'Львиный зев',
      plantCost: 35,
      sellPrice: 90,
      growthTime: 22,
      color: '#FFD700',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 130
    },
    marigold: {
      name: 'Бархатцы',
      plantCost: 20,
      sellPrice: 50,
      growthTime: 15,
      color: '#FFA500',
      sprite: '🌼',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      unlockCost: 60
    },
    zinnia: {
      name: 'Цинния',
      plantCost: 30,
      sellPrice: 80,
      growthTime: 20,
      color: '#FF6347',
      sprite: '🌺',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 100
    },
    cosmos: {
      name: 'Космос',
      plantCost: 25,
      sellPrice: 60,
      growthTime: 18,
      color: '#FFFACD',
      sprite: '🌼',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      unlockCost: 70
    },
    nasturtium: {
      name: 'Настурция',
      plantCost: 20,
      sellPrice: 55,
      growthTime: 16,
      color: '#FFA500',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 50
    },
    morning_glory: {
      name: 'Ипомея',
      plantCost: 40,
      sellPrice: 110,
      growthTime: 26,
      color: '#4B0082',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 160
    },
    strawberry_bush: {
      name: 'Куст клубники',
      plantCost: 100,
      sellPrice: 30, // per yield
      growthTime: 30,
      color: '#FF6347',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 15, // growthTime / 2
      unlockCost: 600
    },
    blueberry_bush: {
      name: 'Куст черники',
      plantCost: 120,
      sellPrice: 35,
      growthTime: 35,
      color: '#0000FF',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 17.5,
      unlockCost: 700
    },
    raspberry_bush: {
      name: 'Куст малины',
      plantCost: 110,
      sellPrice: 32,
      growthTime: 32,
      color: '#FF0000',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 16,
      unlockCost: 650
    },
    blackberry_bush: {
      name: 'Куст ежевики',
      plantCost: 115,
      sellPrice: 34,
      growthTime: 33,
      color: '#8B0000',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 16.5,
      unlockCost: 680
    },
    apple_tree: {
      name: 'Яблоня',
      plantCost: 200,
      sellPrice: 50,
      growthTime: 50,
      color: '#FF6347',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 25
    },
    pear_tree: {
      name: 'Груша',
      plantCost: 210,
      sellPrice: 52,
      growthTime: 52,
      color: '#FFD700',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 26
    },
    cherry_tree: {
      name: 'Вишня',
      plantCost: 190,
      sellPrice: 48,
      growthTime: 48,
      color: '#FF0000',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 24
    },
    lemon_tree: {
      name: 'Лимон',
      plantCost: 180,
      sellPrice: 45,
      growthTime: 45,
      color: '#FFFF00',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 22.5
    },
    orange_tree: {
      name: 'Апельсин',
      plantCost: 185,
      sellPrice: 46,
      growthTime: 46,
      color: '#FFA500',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 23
    },
    grapevine: {
      name: 'Виноград',
      plantCost: 220,
      sellPrice: 55,
      growthTime: 55,
      color: '#8B4513',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🍇'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 27.5
    }
  }
};