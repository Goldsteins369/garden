export const GAME_CONFIG = {
  GRID_SIZE: 5,
  INITIAL_COINS: 10,
  TICK_SPEED: 1000,
  MAX_GARDENS: Infinity,
  
  FLOWERS: {
    daisy: {
      name: 'Ромашка',
      plantCost: 10,
      sellPrice: 20,
      growthTime: 30,
      color: '#ffffff',
      sprite: '🌼',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      unlockCost: 0
    },
    pansy: {
      name: 'Анютины глазки',
      plantCost: 25,
      sellPrice: 50,
      growthTime: 45,
      color: '#9370DB',
      sprite: '🌸',
      stages: ['🌱', '🌿', '🌸', '🌸'],
      imageDataUri: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'><g><ellipse cx='50' cy='30' rx='35' ry='25' fill='mediumpurple' stroke='indigo' stroke-width='4'/><ellipse cx='25' cy='50' rx='25' ry='22' fill='mediumpurple' stroke='indigo' stroke-width='4'/><ellipse cx='75' cy='50' rx='25' ry='22' fill='mediumpurple' stroke='indigo' stroke-width='4'/><path d='M20 65 Q50 85 80 65 Q50 95 20 65 Z' fill='indigo'/><circle cx='50' cy='70' r='8' fill='gold' stroke='indigo' stroke-width='3'/><rect x='47' y='95' width='6' height='15' fill='seagreen'/><ellipse cx='38' cy='105' rx='12' ry='6' fill='mediumseagreen'/><ellipse cx='62' cy='105' rx='12' ry='6' fill='mediumseagreen'/></g></svg>`,
      unlockCost: 40
    },
    marigold: {
      name: 'Бархатцы',
      plantCost: 50,
      sellPrice: 100,
      growthTime: 60,
      color: '#FFA500',
      sprite: '🏵️',
      stages: ['🌱', '🌿', '🌸', '🏵️'],
      unlockCost: 60
    },
    lavender: {
      name: 'Лаванда',
      plantCost: 100,
      sellPrice: 200,
      growthTime: 90,
      color: '#E6E6FA',
      sprite: '🪻',
      stages: ['🌱', '🌿', '🌸', '🪻'],
      unlockCost: 150
    },
    hibiscus: {
      name: 'Гибискус',
      plantCost: 200,
      sellPrice: 400,
      growthTime: 120,
      color: '#FF69B4',
      sprite: '🌺',
      stages: ['🌱', '🌿', '🌸', '🌺'],
      unlockCost: 300
    },
    tulip: {
      name: 'Тюльпан',
      plantCost: 350,
      sellPrice: 700,
      growthTime: 150,
      color: '#FFB6C1',
      sprite: '🌷',
      stages: ['🌱', '🌿', '🌸', '🌷'],
      unlockCost: 500
    },
    sunflower: {
      name: 'Подсолнух',
      plantCost: 500,
      sellPrice: 1000,
      growthTime: 180,
      color: '#FFD700',
      sprite: '🌻',
      stages: ['🌱', '🌿', '🌸', '🌻'],
      unlockCost: 750
    },
    rose: {
      name: 'Роза',
      plantCost: 650,
      sellPrice: 1300,
      growthTime: 210,
      color: '#ff1515',
      sprite: '🌹',
      stages: ['🌱', '🌿', '🌸', '🌹'],
      unlockCost: 1000
    },
    orchid: {
      name: 'Орхидея',
      plantCost: 780,
      sellPrice: 1560,
      growthTime: 240,
      color: '#DA70D6',
      sprite: '💮',
      stages: ['🌱', '🌿', '🌸', '💮'],
      unlockCost: 1200
    },
    lotus: {
      name: 'Лотос',
      plantCost: 1100,
      sellPrice: 2200,
      growthTime: 300,
      color: '#FF69B4',
      sprite: '🪷',
      stages: ['🌱', '🌿', '🌸', '🪷'],
      unlockCost: 1600
    },
    clover: {
      name: 'Клевер',
      plantCost: 1250,
      sellPrice: 2500,
      growthTime: 260,
      color: '#FFFACD',
      sprite: '🍀',
      stages: ['🌱', '🌿', '☘️', '🍀'],
      unlockCost: 1800
    },
    mushroom: {
      name: 'Гриб',
      plantCost: 1400,
      sellPrice: 2800,
      growthTime: 270,
      color: '#FF6347',
      sprite: '🍄',
      stages: ['🌱', '🌿', '🍄', '🍄'],
      unlockCost: 2000
    },
    maple: {
      name: 'Клен',
      plantCost: 1600,
      sellPrice: 3200,
      growthTime: 280,
      color: '#FFC0CB',
      sprite: '🍁',
      stages: ['🌱', '🌿', '🍁', '🍁'],
      unlockCost: 2200
    },
    bamboo: {
      name: 'Бамбук',
      plantCost: 1800,
      sellPrice: 3600,
      growthTime: 290,
      color: '#FFB6C1',
      sprite: '🎋',
      stages: ['🌱', '🌿', '🎋', '🎋'],
      unlockCost: 2500
    },
    wheat: {
      name: 'Пшеница',
      plantCost: 2000,
      sellPrice: 4000,
      growthTime: 300,
      color: '#FFD700',
      sprite: '🌾',
      stages: ['🌱', '🌿', '🌾', '🌾'],
      unlockCost: 2800
    },
    cactus: {
      name: 'Кактус',
      plantCost: 2250,
      sellPrice: 4500,
      growthTime: 300,
      color: '#4B0082',
      sprite: '🌵',
      stages: ['🌱', '🌿', '🌵', '🌵'],
      unlockCost: 3000
    },
    palm: {
      name: 'Пальма',
      plantCost: 2500,
      sellPrice: 5000,
      growthTime: 300,
      color: '#FF69B4',
      sprite: '🌴',
      stages: ['🌱', '🌿', '🌴', '🌴'],
      unlockCost: 3500
    },
    pine: {
      name: 'Ель',
      plantCost: 2800,
      sellPrice: 5600,
      growthTime: 300,
      color: '#87CEEB',
      sprite: '🌲',
      stages: ['🌱', '🌿', '🌲', '🌲'],
      unlockCost: 4000
    },
    chestnut: {
      name: 'Каштан',
      plantCost: 3000,
      sellPrice: 6000,
      growthTime: 300,
      color: '#FF6347',
      sprite: '🌰',
      stages: ['🌱', '🌿', '🌰', '🌰'],
      unlockCost: 4500
    },
    pumpkin: {
      name: 'Тыква',
      plantCost: 3250,
      sellPrice: 6500,
      growthTime: 300,
      color: '#FFC0CB',
      sprite: '🎃',
      stages: ['🌱', '🌿', '🎃', '🎃'],
      unlockCost: 5000
    },
    watermelon: {
      name: 'Арбуз',
      plantCost: 3500,
      sellPrice: 7000,
      growthTime: 300,
      color: '#FF6347',
      sprite: '🍉',
      stages: ['🌱', '🌿', '🍉', '🍉'],
      unlockCost: 5500
    },
    pineapple: {
      name: 'Ананас',
      plantCost: 3750,
      sellPrice: 7500,
      growthTime: 300,
      color: '#FFD700',
      sprite: '🍍',
      stages: ['🌱', '🌿', '🍍', '🍍'],
      unlockCost: 6000
    },
    coconut: {
      name: 'Кокос',
      plantCost: 4000,
      sellPrice: 8000,
      growthTime: 300,
      color: '#FF6347',
      sprite: '🥥',
      stages: ['🌱', '🌿', '🥥', '🥥'],
      unlockCost: 6500
    },
    kiwi: {
      name: 'Киви',
      plantCost: 4250,
      sellPrice: 8500,
      growthTime: 300,
      color: '#FFFACD',
      sprite: '🥝',
      stages: ['🌱', '🌿', '🥝', '🥝'],
      unlockCost: 7000
    },
    peach: {
      name: 'Персик',
      plantCost: 4500,
      sellPrice: 9000,
      growthTime: 300,
      color: '#FFA500',
      sprite: '🍑',
      stages: ['🌱', '🌿', '🍑', '🍑'],
      unlockCost: 7500
    },
    mango: {
      name: 'Манго',
      plantCost: 4750,
      sellPrice: 9500,
      growthTime: 300,
      color: '#4B0082',
      sprite: '🥭',
      stages: ['🌱', '🌿', '🥭', '🥭'],
      unlockCost: 8000
    },
    strawberry_bush: {
      name: 'Куст клубники',
      plantCost: 5000,
      sellPrice: 1500, // per yield
      growthTime: 300,
      color: '#FF6347',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 10000
    },
    blueberry_bush: {
      name: 'Куст черники',
      plantCost: 6000,
      sellPrice: 1800,
      growthTime: 300,
      color: '#0000FF',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 12000
    },
    raspberry_bush: {
      name: 'Куст малины',
      plantCost: 7000,
      sellPrice: 2100,
      growthTime: 300,
      color: '#FF0000',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 14000
    },
    blackberry_bush: {
      name: 'Куст ежевики',
      plantCost: 8000,
      sellPrice: 2400,
      growthTime: 300,
      color: '#8B0000',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🌼'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 16000
    },
    apple_tree: {
      name: 'Яблоня',
      plantCost: 10000,
      sellPrice: 3000,
      growthTime: 300,
      color: '#FF6347',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 20000
    },
    pear_tree: {
      name: 'Груша',
      plantCost: 12000,
      sellPrice: 3500,
      growthTime: 300,
      color: '#FFD700',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 24000
    },
    cherry_tree: {
      name: 'Вишня',
      plantCost: 15000,
      sellPrice: 4000,
      growthTime: 300,
      color: '#FF0000',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 30000
    },
    lemon_tree: {
      name: 'Лимон',
      plantCost: 18000,
      sellPrice: 4500,
      growthTime: 300,
      color: '#FFFF00',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 36000
    },
    orange_tree: {
      name: 'Апельсин',
      plantCost: 20000,
      sellPrice: 5000,
      growthTime: 300,
      color: '#FFA500',
      sprite: '🌳',
      stages: ['🌱', '🌿', '🌸', '🌳'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 40000
    },
    grapevine: {
      name: 'Виноград',
      plantCost: 25000,
      sellPrice: 6000,
      growthTime: 300,
      color: '#8B4513',
      sprite: '🌿',
      stages: ['🌱', '🌿', '🌸', '🍇'],
      isInfinite: true,
      maxYield: 5,
      yieldInterval: 60,
      unlockCost: 50000
    }
  },
  DECOR: {
    lamp_sun: {
      name: 'Солнечная лампа',
      plantCost: 500,
      type: 'growth',
      value: 0.25,
      radius: 1,
      sprite: '💡',
      color: '#FEF08A',
      description: '+25% к скорости роста (радиус 1)'
    },
    lamp_moon: {
      name: 'Лунная лампа',
      plantCost: 1500,
      type: 'growth',
      value: 0.15,
      radius: 2,
      sprite: '🏮',
      color: '#E9D5FF',
      description: '+15% к скорости роста (радиус 2)'
    },
    totem_growth: {
      name: 'Тотем роста',
      plantCost: 3000,
      type: 'growth',
      value: 0.50,
      radius: 1,
      sprite: '🗿',
      color: '#A78BFA',
      description: '+50% к скорости роста (радиус 1)'
    },
    statue_water: {
      name: 'Статуя воды',
      plantCost: 5000,
      type: 'growth',
      value: 0.10,
      radius: 3,
      sprite: '⛲',
      color: '#BAE6FD',
      description: '+10% к скорости роста (радиус 3)'
    },
    stone_gold: {
      name: 'Золотой камень',
      plantCost: 2000,
      type: 'price',
      value: 0.05,
      radius: 0,
      sprite: '💎',
      color: '#FDE047',
      description: '+5% к стоимости продажи (глобально)'
    },
    stone_ruby: {
      name: 'Рубин',
      plantCost: 4000,
      type: 'price',
      value: 0.10,
      radius: 0,
      sprite: '♦️',
      color: '#FDA4AF',
      description: '+10% к стоимости продажи (глобально)'
    },
    stone_sapphire: {
      name: 'Сапфир',
      plantCost: 6000,
      type: 'price',
      value: 0.15,
      radius: 0,
      sprite: '🔹',
      color: '#93C5FD',
      description: '+15% к стоимости продажи (глобально)'
    },
    stone_emerald: {
      name: 'Изумруд',
      plantCost: 8000,
      type: 'hybrid',
      growthValue: 0.05,
      priceValue: 0.05,
      radius: 0,
      sprite: '✳️',
      color: '#86EFAC',
      description: '+5% рост и +5% стоимость (глобально)'
    },
    rune_ancient: {
      name: 'Древняя руна',
      plantCost: 10000,
      type: 'price',
      value: 0.20,
      radius: 0,
      sprite: '🧿',
      color: '#D8B4FE',
      description: '+20% к стоимости продажи (глобально)'
    },
    gnome: {
      name: 'Садовый гном',
      plantCost: 2500,
      type: 'growth',
      value: 0.10,
      radius: 2,
      sprite: '🧙‍♂️',
      color: '#FCA5A5',
      description: '+10% к скорости роста (радиус 2)'
    },
    cat_lucky: {
      name: 'Кот удачи',
      plantCost: 7500,
      type: 'price',
      value: 0.25,
      radius: 0,
      sprite: '🐱',
      color: '#FDBA74',
      description: '+25% к стоимости продажи (глобально)'
    },
    fountain_magic: {
      name: 'Волшебный фонтан',
      plantCost: 12000,
      type: 'growth',
      value: 0.30,
      radius: 2,
      sprite: '⛲',
      color: '#67E8F9',
      description: '+30% к скорости роста (радиус 2)'
    }
  }
};
