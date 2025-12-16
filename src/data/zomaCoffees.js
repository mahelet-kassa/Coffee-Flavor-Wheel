// Individual Zoma Coffee Products
export const zomaCoffees = [
  {
    id: 'yirgacheffe',
    name: 'Yirgacheffe',
    displayName: 'Zoma Yirgacheffe',
    isBestSeller: true,
    flavor: 'floral',
    price: '$20.00',
    description: 'Very floral, bright acidity, often tea-like and elegant.',
    regionInfo: 'Yirgacheffe: Very floral, bright acidity, often tea-like and elegant.',
    tastingNotes: [
      'Very floral notes',
      'Tea-like and elegant body',
      'Bright acidity',
      'Clean finish'
    ],
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Light',
      aroma: ['floral'],
      acidity: ['bright', 'citrus'],
      sweetness: ['balanced'],
      body: ['silky', 'smooth'],
      finish: ['clean', 'smooth'],
      flavor: ['notes of jasmine', 'hint of tea'],
      balance: ['well-rounded', 'harmonious', 'elegant'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'floral undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    },
    brewingMethods: [
      {
        method: 'Pour Over',
        description: 'Best method to preserve delicate floral aromas',
        ratio: '1:16',
        time: '3-4 minutes'
      },
      {
        method: 'Siphon',
        description: 'Clean extraction highlights floral notes',
        ratio: '1:15',
        time: '1-2 minutes'
      },
      {
        method: 'Chemex',
        description: 'Thick filter produces exceptionally clean, floral cup',
        ratio: '1:16',
        time: '4-5 minutes'
      }
    ],
    color: '#FFB6C1'
  },
  {
    id: 'sidamo',
    name: 'Sidamo',
    displayName: 'Zoma Sidamo',
    isBestSeller: false,
    flavor: 'citrus',
    price: '$20.00',
    description: 'Balanced, citrus and floral notes; wide variety of profiles.',
    regionInfo: 'Sidamo (Sidama): Balanced, citrus and floral notes; wide variety of profiles.',
    tastingNotes: [
      'Citrus and floral notes',
      'Balanced profile with wide variety',
      'Bright acidity',
      'Smooth and approachable'
    ],
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Light',
      aroma: ['floral', 'citrus'],
      acidity: ['bright', 'citrus'],
      sweetness: ['balanced'],
      body: ['smooth', 'silky'],
      finish: ['clean', 'smooth'],
      flavor: ['notes of citrus', 'hint of lemon zest'],
      balance: ['well-rounded', 'harmonious', 'bright'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'citrus undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    },
    brewingMethods: [
      {
        method: 'Pour Over',
        description: 'Best method to highlight bright citrus notes',
        ratio: '1:16',
        time: '3-4 minutes'
      },
      {
        method: 'Chemex',
        description: 'Clean, bright citrus flavors',
        ratio: '1:16',
        time: '4-5 minutes'
      },
      {
        method: 'Aeropress',
        description: 'Brings out citrus acidity and brightness',
        ratio: '1:15',
        time: '2 minutes'
      }
    ],
    color: '#FFD700'
  },
  {
    id: 'harrar',
    name: 'Harrar',
    displayName: 'Zoma Harrar',
    isBestSeller: false,
    flavor: 'nutty',
    price: '$20.00',
    description: 'Heavy body with rich, winey, blueberry/berry flavors; usually natural processed.',
    regionInfo: 'Harrar (Harar): Heavy body with rich, winey, blueberry/berry flavors; usually natural processed.',
    tastingNotes: [
      'Heavy body with rich flavors',
      'Winey and complex',
      'Blueberry and berry notes',
      'Natural processed richness'
    ],
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Medium to Dark',
      aroma: ['nutty', 'chocolatey'],
      acidity: ['balanced'],
      sweetness: ['rich', 'sugary'],
      body: ['full', 'creamy'],
      finish: ['smooth', 'lingering'],
      flavor: ['notes of caramel', 'hint of berries'],
      balance: ['well-rounded', 'harmonious', 'complex'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'nutty undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    },
    brewingMethods: [
      {
        method: 'French Press',
        description: 'Full body extraction enhances rich flavors',
        ratio: '1:15',
        time: '4 minutes'
      },
      {
        method: 'Espresso',
        description: 'Concentrated rich and complex notes',
        ratio: '1:2',
        time: '25-30 seconds'
      },
      {
        method: 'Drip Coffee',
        description: 'Classic method that brings out balanced profile',
        ratio: '1:17',
        time: '5-6 minutes'
      }
    ],
    color: '#D4A574'
  },
  {
    id: 'guji',
    name: 'Guji',
    displayName: 'Zoma Guji',
    isBestSeller: false,
    flavor: 'fruity',
    price: '$20.00',
    description: 'Similar to Sidamo/Yirgacheffe but often fruitier with a rich sweetness.',
    regionInfo: 'Guji: Similar to Sidamo/Yirgacheffe but often fruitier with a rich sweetness.',
    tastingNotes: [
      'Fruity with rich sweetness',
      'Winey complexity',
      'Natural processed richness',
      'Bright berry notes'
    ],
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Light to Medium',
      aroma: ['floral', 'fruity'],
      acidity: ['bright', 'citrus'],
      sweetness: ['rich', 'sugary'],
      body: ['full', 'smooth'],
      finish: ['lingering', 'clean'],
      flavor: ['notes of berries', 'hint of wine'],
      balance: ['well-rounded', 'harmonious', 'complex'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'fruity undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    },
    brewingMethods: [
      {
        method: 'Pour Over',
        description: 'Highlights the delicate fruit notes with clean, bright cup',
        ratio: '1:16 (coffee:water)',
        time: '3-4 minutes'
      },
      {
        method: 'Aeropress',
        description: 'Brings out the fruity acidity and sweetness',
        ratio: '1:15',
        time: '2 minutes'
      },
      {
        method: 'Cold Brew',
        description: 'Smooth, sweet fruit flavors with low acidity',
        ratio: '1:8',
        time: '12-24 hours'
      }
    ],
    color: '#FF6B6B'
  }
];

