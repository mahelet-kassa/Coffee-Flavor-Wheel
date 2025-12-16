import React from 'react';
import './CoffeeSelector.css';

const CoffeeSelector = ({ coffees, selectedCoffee, onCoffeeSelect }) => {
  return (
    <div className="coffee-selector">
      <h2>Choose Your Coffee</h2>
      <p className="selector-subtitle">Select a coffee to explore its flavor profile</p>
      <div className="coffee-grid">
        {coffees.map((coffee) => (
          <div
            key={coffee.id}
            className={`coffee-card ${selectedCoffee?.id === coffee.id ? 'selected' : ''}`}
            onClick={() => onCoffeeSelect(coffee)}
            style={{ borderColor: coffee.color }}
          >
            {coffee.isBestSeller && (
              <div className="best-seller-badge">Best Seller</div>
            )}
            <h3>{coffee.displayName}</h3>
            <p className="coffee-price">{coffee.price}</p>
            <p className="coffee-description">{coffee.description}</p>
            <div className="coffee-flavor-badge" style={{ backgroundColor: coffee.color }}>
              {coffee.flavor.charAt(0).toUpperCase() + coffee.flavor.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeSelector;

