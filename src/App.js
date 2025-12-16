import React, { useState, useEffect } from 'react';
import './App.css';
import FlavorWheel from './components/FlavorWheel';
import CoffeeInfo from './components/CoffeeInfo';
import CoffeeSelector from './components/CoffeeSelector';
import AddTastingForm from './components/AddTastingForm';
import { zomaCoffees } from './data/zomaCoffees';
import { flavorWheelData } from './data/coffeeData';

function App() {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [userTastings, setUserTastings] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('zomaTastings');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever tastings change
  useEffect(() => {
    localStorage.setItem('zomaTastings', JSON.stringify(userTastings));
  }, [userTastings]);

  const handleCoffeeSelect = (coffee) => {
    setSelectedCoffee(coffee);
  };

  const handleAddTasting = (tasting) => {
    const newTasting = {
      ...tasting,
      id: Date.now().toString(), // Add unique ID
      createdAt: new Date().toISOString()
    };
    setUserTastings([...userTastings, newTasting]);
  };

  const handleUpdateTasting = (id, updatedTasting) => {
    setUserTastings(userTastings.map(t => 
      t.id === id ? { ...updatedTasting, id, updatedAt: new Date().toISOString() } : t
    ));
  };

  const handleDeleteTasting = (id) => {
    if (window.confirm('Are you sure you want to delete this tasting experience?')) {
      setUserTastings(userTastings.filter(t => t.id !== id));
    }
  };

  const selectedFlavor = selectedCoffee ? selectedCoffee.flavor : null;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Zoma Coffee Roaster</h1>
        <p className="subtitle">Interactive Coffee Flavor Wheel</p>
        <p className="tagline">Crafting connections that go beyond the cup</p>
        <div className="badges">
          <span className="badge">🌱 ORGANIC</span>
          <span className="badge">🤝 FAIR TRADE</span>
          <span className="badge">♻️ SUSTAINABLE</span>
        </div>
      </header>
      
      <main className="App-main">
        {!selectedCoffee ? (
          <div className="coffee-selection-view">
            <CoffeeSelector 
              coffees={zomaCoffees}
              selectedCoffee={selectedCoffee}
              onCoffeeSelect={handleCoffeeSelect}
            />
          </div>
        ) : (
          <>
            <div className="wheel-container">
              <FlavorWheel 
                selectedFlavor={selectedFlavor}
                selectedCoffee={selectedCoffee}
              />
            </div>
            
            <div className="info-container">
              <button 
                className="back-button"
                onClick={() => setSelectedCoffee(null)}
              >
                ← Back to Coffee Selection
              </button>
              
              <CoffeeInfo 
                coffee={selectedCoffee}
                userTastings={userTastings.filter(t => t.coffeeId === selectedCoffee.id)}
                onUpdateTasting={handleUpdateTasting}
                onDeleteTasting={handleDeleteTasting}
              />
              
              <AddTastingForm 
                coffee={selectedCoffee}
                onAddTasting={handleAddTasting}
              />
            </div>
          </>
        )}
      </main>
      
      <footer className="App-footer">
        <p>
          <a href="https://www.zomacoffeeroaster.com/" target="_blank" rel="noopener noreferrer">
            Visit Zoma Coffee Roaster
          </a>
          {' • '}
          <span>Free shipping on orders over $35</span>
        </p>
        <p className="footer-commitment">
          Crafting connections that go beyond the cup • Boston, MA
        </p>
      </footer>
    </div>
  );
}

export default App;

