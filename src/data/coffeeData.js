export const coffeeData = [
  {
    flavor: 'fruity',
    name: 'Fruity Ethiopian Coffees',
    examples: ['Zoma Guji', 'Ethiopian Guji'],
    tastingNotes: [
      'Rich blueberry and berry flavors (Harrar)',
      'Fruity with rich sweetness (Guji)',
      'Winey complexity',
      'Natural processed richness'
    ],
    regionInfo: 'Guji: Similar to Sidamo/Yirgacheffe but often fruitier with a rich sweetness.',
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
    color: '#FF6B6B',
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Light to Medium',
      aroma: ['floral', 'fruity'],
      acidity: ['bright', 'citrus'],
      sweetness: ['rich', 'sugary'],
      body: ['full', 'smooth'],
      finish: ['lingering', 'clean'],
      // Page 2 attributes
      flavor: ['notes of berries', 'hint of wine'],
      balance: ['well-rounded', 'harmonious', 'complex'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'fruity undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    }
  },
  {
    flavor: 'nutty',
    name: 'Rich Body Ethiopian Coffees',
    examples: ['Zoma Harrar', 'Ethiopian Harrar'],
    tastingNotes: [
      'Heavy body with rich flavors',
      'Winey and complex',
      'Blueberry and berry notes',
      'Natural processed richness'
    ],
    regionInfo: 'Harrar (Harar): Heavy body with rich, winey, blueberry/berry flavors; usually natural processed.',
    brewingMethods: [
      {
        method: 'French Press',
        description: 'Full body extraction enhances nutty flavors',
        ratio: '1:15',
        time: '4 minutes'
      },
      {
        method: 'Espresso',
        description: 'Concentrated nutty and chocolate notes',
        ratio: '1:2',
        time: '25-30 seconds'
      },
      {
        method: 'Drip Coffee',
        description: 'Classic method that brings out balanced nutty profile',
        ratio: '1:17',
        time: '5-6 minutes'
      }
    ],
    color: '#D4A574',
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Medium to Dark',
      aroma: ['nutty', 'chocolatey'],
      acidity: ['balanced'],
      sweetness: ['rich', 'sugary'],
      body: ['full', 'creamy'],
      finish: ['smooth', 'lingering'],
      // Page 2 attributes
      flavor: ['notes of caramel', 'hint of berries'],
      balance: ['well-rounded', 'harmonious', 'complex'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'nutty undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    }
  },
  {
    flavor: 'floral',
    name: 'Floral Ethiopian Coffees',
    examples: ['Zoma Yirgacheffe (Best Seller)', 'Ethiopian Yirgacheffe'],
    tastingNotes: [
      'Very floral notes (Yirgacheffe)',
      'Tea-like and elegant body',
      'Bright acidity',
      'Citrus and floral balance (Sidamo)'
    ],
    regionInfo: 'Yirgacheffe: Very floral, bright acidity, often tea-like and elegant.',
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
    color: '#FFB6C1',
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Light',
      aroma: ['floral'],
      acidity: ['bright', 'citrus'],
      sweetness: ['balanced'],
      body: ['silky', 'smooth'],
      finish: ['clean', 'smooth'],
      // Page 2 attributes
      flavor: ['notes of jasmine', 'hint of tea'],
      balance: ['well-rounded', 'harmonious', 'elegant'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'floral undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    }
  },
  {
    flavor: 'spicy',
    name: 'Spicy Ethiopian Coffees',
    examples: ['Ethiopian Limu'],
    tastingNotes: [
      'Floral or spicy undertones (Limu)',
      'Smooth and balanced',
      'Gentle acidity',
      'Medium body and approachable (Jimma)'
    ],
    regionInfo: 'Limu: Smooth, balanced, gentle acidity; often floral or spicy undertones.',
    brewingMethods: [
      {
        method: 'French Press',
        description: 'Full extraction enhances spicy characteristics',
        ratio: '1:15',
        time: '4 minutes'
      },
      {
        method: 'Turkish Coffee',
        description: 'Traditional method that intensifies spicy notes',
        ratio: '1:10',
        time: '3-4 minutes'
      },
      {
        method: 'Espresso',
        description: 'Concentrated spicy and earthy flavors',
        ratio: '1:2',
        time: '25-30 seconds'
      }
    ],
    color: '#CD853F',
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Medium',
      aroma: ['nutty', 'spicy'],
      acidity: ['balanced'],
      sweetness: ['balanced'],
      body: ['smooth', 'full'],
      finish: ['smooth', 'lingering'],
      // Page 2 attributes
      flavor: ['notes of spice', 'hint of floral'],
      balance: ['well-rounded', 'harmonious', 'balanced'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'spicy undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    }
  },
  {
    flavor: 'caramel',
    name: 'Balanced Ethiopian Coffees',
    examples: ['Ethiopian Jimma (Djimmah)'],
    tastingNotes: [
      'Smooth and balanced (Limu)',
      'Medium body and approachable (Jimma)',
      'Gentle acidity',
      'Wide range from washed to natural processing'
    ],
    regionInfo: 'Jimma (Djimmah): Broad range from washed to natural; medium body and approachable taste.',
    brewingMethods: [
      {
        method: 'Pour Over',
        description: 'Clean method highlights caramel sweetness',
        ratio: '1:16',
        time: '3-4 minutes'
      },
      {
        method: 'Drip Coffee',
        description: 'Consistent extraction brings out balanced caramel notes',
        ratio: '1:17',
        time: '5-6 minutes'
      },
      {
        method: 'Aeropress',
        description: 'Smooth, sweet caramel flavors',
        ratio: '1:15',
        time: '2 minutes'
      }
    ],
    color: '#DEB887',
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Medium',
      aroma: ['nutty', 'chocolatey'],
      acidity: ['balanced'],
      sweetness: ['sugary', 'rich'],
      body: ['smooth', 'silky'],
      finish: ['smooth', 'clean'],
      // Page 2 attributes
      flavor: ['notes of caramel', 'hint of toffee'],
      balance: ['well-rounded', 'harmonious', 'smooth'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'caramel undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    }
  },
  {
    flavor: 'earthy',
    name: 'Earthy Ethiopian Coffees',
    examples: ['Ethiopian Kaffa', 'Wild Forest-Grown Beans'],
    tastingNotes: [
      'Ancestral birthplace of Arabica coffee',
      'Wild and forest-grown beans',
      'Herbal complexity',
      'Deep, earthy character'
    ],
    regionInfo: 'Kaffa: Ancestral birthplace of Arabica coffee; wild and forest-grown beans with unique character.',
    brewingMethods: [
      {
        method: 'French Press',
        description: 'Full body extraction enhances earthy characteristics',
        ratio: '1:15',
        time: '4 minutes'
      },
      {
        method: 'Espresso',
        description: 'Concentrated earthy and herbal notes',
        ratio: '1:2',
        time: '25-30 seconds'
      },
      {
        method: 'Cold Brew',
        description: 'Smooth, mellow earthy flavors',
        ratio: '1:8',
        time: '12-24 hours'
      }
    ],
    color: '#8B7355',
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Medium to Dark',
      aroma: ['earthy', 'nutty'],
      acidity: ['balanced'],
      sweetness: ['balanced'],
      body: ['full', 'creamy'],
      finish: ['lingering', 'smooth'],
      // Page 2 attributes
      flavor: ['notes of forest floor', 'hint of herbal'],
      balance: ['well-rounded', 'harmonious', 'earthy'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'earthy undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    }
  },
  {
    flavor: 'citrus',
    name: 'Citrus Ethiopian Coffees',
    examples: ['Zoma Sidamo', 'Ethiopian Sidamo'],
    tastingNotes: [
      'Citrus and floral notes (Sidamo)',
      'Balanced profile with wide variety',
      'Gentle acidity (Limu)',
      'Smooth and approachable'
    ],
    regionInfo: 'Sidamo (Sidama): Balanced, citrus and floral notes; wide variety of profiles.',
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
    color: '#FFD700',
    tastingProfile: {
      coffeeType: 'Ethiopian Single Origin',
      roast: 'Light',
      aroma: ['floral', 'citrus'],
      acidity: ['bright', 'citrus'],
      sweetness: ['balanced'],
      body: ['smooth', 'silky'],
      finish: ['clean', 'smooth'],
      // Page 2 attributes
      flavor: ['notes of citrus', 'hint of lemon zest'],
      balance: ['well-rounded', 'harmonious', 'bright'],
      complexity: ['multi-layered depth of flavor', 'intricate'],
      aftertaste: ['lingering sweetness', 'citrus undertones'],
      overallImpression: ['elegant', 'sophisticated', 'memorable']
    }
  }
];

export const flavorWheelData = [
  { id: 'fruity', label: 'Fruity', angle: 0, color: '#FF6B6B' },
  { id: 'nutty', label: 'Nutty', angle: 51.4, color: '#D4A574' },
  { id: 'floral', label: 'Floral', angle: 102.9, color: '#FFB6C1' },
  { id: 'spicy', label: 'Spicy', angle: 154.3, color: '#CD853F' },
  { id: 'caramel', label: 'Caramel', angle: 205.7, color: '#DEB887' },
  { id: 'earthy', label: 'Earthy', angle: 257.1, color: '#8B7355' },
  { id: 'citrus', label: 'Citrus', angle: 308.6, color: '#FFD700' }
];

