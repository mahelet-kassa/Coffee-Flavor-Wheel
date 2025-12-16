import React, { useState } from 'react';
import './CoffeeEducation.css';

const CoffeeEducation = ({ coffee }) => {
  const [activeTab, setActiveTab] = useState('roast');

  const roastLevels = [
    {
      level: 'Light Roast',
      description: 'Light brown color, no oil on surface',
      characteristics: [
        'Preserves origin flavors and terroir',
        'Higher acidity and brightness',
        'Lighter body, more delicate',
        'Fruity and floral notes shine through',
        'Best for: Ethiopian Yirgacheffe, Sidamo'
      ],
      color: '#D4A574'
    },
    {
      level: 'Medium Roast',
      description: 'Medium brown, balanced flavor',
      characteristics: [
        'Balance between origin and roast flavors',
        'Moderate acidity and body',
        'More balanced sweetness',
        'Nutty and chocolate notes develop',
        'Best for: Ethiopian Guji, Jimma'
      ],
      color: '#8B6F47'
    },
    {
      level: 'Dark Roast',
      description: 'Dark brown to black, oily surface',
      characteristics: [
        'Roast flavors dominate over origin',
        'Lower acidity, heavier body',
        'Bold, smoky, sometimes bitter',
        'Caramel and chocolate notes',
        'Best for: Ethiopian Harrar (some styles)'
      ],
      color: '#3E2723'
    }
  ];

  const processingMethods = [
    {
      method: 'Washed (Wet Process)',
      description: 'Cherries are pulped, fermented, and washed before drying',
      impact: [
        'Clean, bright, and crisp flavors',
        'Higher acidity and clarity',
        'Floral and citrus notes emphasized',
        'Less body, more delicate',
        'Common in: Yirgacheffe, Sidamo'
      ],
      icon: '💧'
    },
    {
      method: 'Natural (Dry Process)',
      description: 'Cherries are dried whole with the fruit still attached',
      impact: [
        'Fruit-forward, winey flavors',
        'Heavier body and sweetness',
        'Berry and tropical fruit notes',
        'More complex, sometimes funky',
        'Common in: Harrar, some Guji'
      ],
      icon: '☀️'
    },
    {
      method: 'Honey (Pulped Natural)',
      description: 'Cherries are pulped but dried with some mucilage remaining',
      impact: [
        'Balance between washed and natural',
        'Sweet, syrupy body',
        'Fruity but clean',
        'Smooth, rounded flavors',
        'Common in: Some Ethiopian regions'
      ],
      icon: '🍯'
    }
  ];

  const ethiopianUniqueness = [
    {
      title: 'Birthplace of Coffee',
      content: 'Ethiopia is the ancestral home of Arabica coffee. Wild coffee forests in Kaffa region are where coffee originated, giving Ethiopian coffees unique genetic diversity.'
    },
    {
      title: 'Heirloom Varieties',
      content: 'Ethiopian coffees come from thousands of heirloom varieties, not single cultivars. This genetic diversity creates complex, unique flavor profiles you won\'t find elsewhere.'
    },
    {
      title: 'High Altitude Growing',
      content: 'Most Ethiopian coffees grow at 1,500-2,200 meters above sea level. Higher altitude means slower bean development, creating denser beans with more complex sugars and flavors.'
    },
    {
      title: 'Traditional Processing',
      content: 'Many Ethiopian farmers use traditional, time-honored processing methods passed down through generations, creating distinctive regional characteristics.'
    }
  ];

  return (
    <div className="coffee-education">
      <div className="education-tabs">
        <button 
          className={`tab-button ${activeTab === 'roast' ? 'active' : ''}`}
          onClick={() => setActiveTab('roast')}
        >
          Roast Levels
        </button>
        <button 
          className={`tab-button ${activeTab === 'processing' ? 'active' : ''}`}
          onClick={() => setActiveTab('processing')}
        >
          Processing Methods
        </button>
        <button 
          className={`tab-button ${activeTab === 'ethiopian' ? 'active' : ''}`}
          onClick={() => setActiveTab('ethiopian')}
        >
          Why Ethiopian?
        </button>
      </div>

      <div className="education-content">
        {activeTab === 'roast' && (
          <div className="roast-levels">
            <h3>Understanding Roast Levels</h3>
            <p className="education-intro">
              The roast level dramatically affects the flavor profile of your coffee. 
              Ethiopian coffees are typically roasted light to medium to preserve their 
              delicate origin characteristics.
            </p>
            <div className="roast-grid">
              {roastLevels.map((roast, index) => (
                <div key={index} className="roast-card" style={{ borderTopColor: roast.color }}>
                  <div className="roast-header">
                    <h4>{roast.level}</h4>
                    <div className="roast-color-indicator" style={{ backgroundColor: roast.color }}></div>
                  </div>
                  <p className="roast-description">{roast.description}</p>
                  <ul className="roast-characteristics">
                    {roast.characteristics.map((char, i) => (
                      <li key={i}>{char}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {coffee && (
              <div className="coffee-roast-info">
                <p className="roast-match">
                  <strong>{coffee.displayName || coffee.name}</strong> is roasted 
                  <strong> {coffee.tastingProfile?.roast.toLowerCase()}</strong>, which 
                  {coffee.tastingProfile?.roast.includes('Light') 
                    ? ' preserves its delicate floral and fruity notes, allowing the unique Ethiopian terroir to shine through.'
                    : coffee.tastingProfile?.roast.includes('Medium')
                    ? ' creates a balanced cup that highlights both origin characteristics and developed roast flavors.'
                    : ' brings out deeper, richer flavors while maintaining Ethiopian coffee\'s distinctive character.'}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'processing' && (
          <div className="processing-methods">
            <h3>Coffee Processing Methods</h3>
            <p className="education-intro">
              How coffee cherries are processed after harvest significantly impacts 
              the final cup. Each method brings out different flavor characteristics 
              in Ethiopian coffees.
            </p>
            <div className="processing-grid">
              {processingMethods.map((method, index) => (
                <div key={index} className="processing-card">
                  <div className="processing-icon">{method.icon}</div>
                  <h4>{method.method}</h4>
                  <p className="processing-description">{method.description}</p>
                  <div className="processing-impact">
                    <strong>Flavor Impact:</strong>
                    <ul>
                      {method.impact.map((impact, i) => (
                        <li key={i}>{impact}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="processing-note">
              <p>
                <strong>Why it matters:</strong> The processing method determines 
                how much of the cherry's fruit influences the final flavor. Washed 
                coffees taste cleaner and brighter, while natural processed coffees 
                are fruitier and more complex. Ethiopian farmers choose processing 
                methods that best showcase their region's unique characteristics.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'ethiopian' && (
          <div className="ethiopian-uniqueness">
            <h3>What Makes Ethiopian Coffee Special</h3>
            <p className="education-intro">
              Ethiopian coffee is unlike any other in the world. Here's why these 
              coffees have such distinctive and celebrated flavors.
            </p>
            <div className="uniqueness-grid">
              {ethiopianUniqueness.map((item, index) => (
                <div key={index} className="uniqueness-card">
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
            <div className="ethiopian-summary">
              <p>
                These factors combine to create Ethiopian coffees with unparalleled 
                complexity, brightness, and unique flavor profiles. Each region—from 
                Yirgacheffe's floral elegance to Harrar's winey richness—expresses 
                its terroir in ways that coffee lovers around the world celebrate.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeEducation;

