import React, { useState } from 'react';
import './CoffeeInfo.css';
import CoffeeEducation from './CoffeeEducation';
import AddTastingForm from './AddTastingForm';

const CoffeeInfo = ({ coffee, userTastings, onUpdateTasting, onDeleteTasting }) => {
  const [expandedTastings, setExpandedTastings] = useState({});
  const [sortBy, setSortBy] = useState('date'); // 'date', 'rating', 'newest'
  const [editingTasting, setEditingTasting] = useState(null);
  
  if (!coffee) return null;

  const toggleTasting = (index) => {
    setExpandedTastings(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const sortedTastings = [...userTastings].sort((a, b) => {
    switch(sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
      case 'oldest':
        return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
      default: // 'date'
        return new Date(b.date) - new Date(a.date);
    }
  });

  const handleExport = () => {
    const csvContent = [
      ['Coffee Name', 'Date', 'Rating', 'Brewing Method', 'Body', 'Acidity', 'Notes', 'Aromas', 'Flavor Tags', 'Best Time', 'Pairing', 'Would Buy Again', 'Personality', 'Superpower', 'Mood'].join(','),
      ...sortedTastings.map(t => [
        `"${t.coffeeName || ''}"`,
        t.date || '',
        t.rating || '',
        t.brewingMethod || '',
        t.body || '',
        t.acidity || '',
        `"${(t.notes || '').replace(/"/g, '""')}"`,
        (t.aroma || []).join('; '),
        (t.flavorTags || []).join('; '),
        t.bestTimeOfDay || '',
        `"${(t.pairing || '').replace(/"/g, '""')}"`,
        t.wouldBuyAgain || '',
        t.coffeePersonality || '',
        t.coffeeSuperpower || '',
        t.coffeeMood || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `zoma-tastings-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="coffee-info">
      <div className="coffee-header" style={{ borderLeftColor: coffee.color }}>
        <div className="coffee-header-content">
          <div>
            <h2>{coffee.displayName || coffee.name}</h2>
            {coffee.isBestSeller && (
              <span className="best-seller-label">Best Seller</span>
            )}
          </div>
          <div className="flavor-badge" style={{ backgroundColor: coffee.color }}>
            {coffee.flavor.charAt(0).toUpperCase() + coffee.flavor.slice(1)}
          </div>
        </div>
        <div className="coffee-price-header">{coffee.price}</div>
      </div>

      <div className="coffee-section">
        <div className="zoma-commitment">
          <p>🌱 <strong>Organic</strong> • 🤝 <strong>Fair Trade</strong> • ♻️ <strong>Sustainable</strong></p>
        </div>
        {coffee.regionInfo && (
          <div className="region-info">
            <h4>About This Region</h4>
            <p>{coffee.regionInfo}</p>
          </div>
        )}
        <div className="shop-section">
          <a 
            href="https://www.zomacoffeeroaster.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="shop-button"
          >
            Shop {coffee.displayName || coffee.name} →
          </a>
        </div>
      </div>

      {coffee.tastingNotes && (
        <div className="coffee-section">
          <h3>Tasting Notes</h3>
          <ul className="tasting-notes">
            {coffee.tastingNotes.map((note, index) => (
              <li key={index}>
                <span className="note-icon">☕</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}


      {userTastings.length > 0 && (
        <div className="coffee-section">
          <div className="tastings-header">
            <h3>Your Tasting Experiences ({userTastings.length})</h3>
            <div className="tastings-controls">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
                aria-label="Sort tastings"
              >
                <option value="date">Sort by Date</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating">Highest Rating</option>
              </select>
              <button onClick={handleExport} className="export-button" title="Export to CSV">
                📥 Export
              </button>
            </div>
          </div>
          <div className="user-tastings">
            {sortedTastings.map((tasting, index) => {
              const originalIndex = userTastings.findIndex(t => t.id === tasting.id);
              const displayIndex = originalIndex >= 0 ? originalIndex : index;
              const isExpanded = expandedTastings[index];
              const hasDetails = tasting.brewingMethod || tasting.aroma?.length > 0 || tasting.flavorTags?.length > 0;
              
              return (
                <div key={index} className={`user-tasting-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="tasting-summary" onClick={() => hasDetails && toggleTasting(index)}>
                    <div className="tasting-header">
                      <div className="tasting-title-section">
                        <strong>{tasting.coffeeName}</strong>
                        <span className="tasting-date">
                          {new Date(tasting.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="tasting-quick-info">
                        <div className="tasting-rating">
                          <span className="stars">
                            {'★'.repeat(tasting.rating || 5)}{'☆'.repeat(5 - (tasting.rating || 5))}
                          </span>
                        </div>
                        <div className="tasting-actions">
                          {hasDetails && (
                            <button 
                              className="expand-button" 
                              aria-label="Toggle details"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTasting(displayIndex);
                              }}
                            >
                              {isExpanded ? '▼' : '▶'}
                            </button>
                          )}
                          {onUpdateTasting && (
                            <button
                              className="edit-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTasting(tasting);
                              }}
                              aria-label="Edit tasting"
                              title="Edit this tasting"
                            >
                              ✏️
                            </button>
                          )}
                          {onDeleteTasting && (
                            <button
                              className="delete-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteTasting(tasting.id);
                              }}
                              aria-label="Delete tasting"
                              title="Delete this tasting"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="tasting-notes-preview">{tasting.notes}</p>
                  </div>
                  
                  {isExpanded && (
                    <div className="tasting-details">
                      <div className="tasting-details-grid">
                        {tasting.brewingMethod && (
                          <div className="detail-item">
                            <span className="detail-label">☕ Brewing Method</span>
                            <span className="detail-value">{tasting.brewingMethod}</span>
                          </div>
                        )}
                        
                        {tasting.body && (
                          <div className="detail-item">
                            <span className="detail-label">💪 Body</span>
                            <div className="detail-slider">
                              <div className="slider-bar">
                                <div 
                                  className="slider-fill" 
                                  style={{ width: `${(tasting.body / 5) * 100}%` }}
                                ></div>
                              </div>
                              <span className="slider-value">{tasting.body}/5</span>
                            </div>
                          </div>
                        )}
                        
                        {tasting.acidity && (
                          <div className="detail-item">
                            <span className="detail-label">✨ Acidity</span>
                            <div className="detail-slider">
                              <div className="slider-bar">
                                <div 
                                  className="slider-fill" 
                                  style={{ width: `${(tasting.acidity / 5) * 100}%` }}
                                ></div>
                              </div>
                              <span className="slider-value">{tasting.acidity}/5</span>
                            </div>
                          </div>
                        )}
                        
                        {tasting.bestTimeOfDay && (
                          <div className="detail-item">
                            <span className="detail-label">🕐 Best Time</span>
                            <span className="detail-value">{tasting.bestTimeOfDay}</span>
                          </div>
                        )}
                        
                        {tasting.wouldBuyAgain && (
                          <div className="detail-item">
                            <span className="detail-label">🛒 Would Buy Again</span>
                            <span className="detail-value">
                              {tasting.wouldBuyAgain === 'yes' && '👍 Definitely!'}
                              {tasting.wouldBuyAgain === 'maybe' && '🤔 Maybe'}
                              {tasting.wouldBuyAgain === 'no' && '👎 Probably Not'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {tasting.aroma && tasting.aroma.length > 0 && (
                        <div className="detail-section">
                          <span className="detail-section-label">👃 Aromas</span>
                          <div className="tag-list">
                            {tasting.aroma.map((aroma, i) => (
                              <span key={i} className="detail-tag">{aroma}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {tasting.flavorTags && tasting.flavorTags.length > 0 && (
                        <div className="detail-section">
                          <span className="detail-section-label">🏷️ Flavor Profile</span>
                          <div className="tag-list">
                            {tasting.flavorTags.map((tag, i) => (
                              <span key={i} className="detail-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {tasting.pairing && (
                        <div className="detail-section">
                          <span className="detail-section-label">🍽️ Pairing Suggestion</span>
                          <p className="detail-text">{tasting.pairing}</p>
                        </div>
                      )}
                      
                      {tasting.memorableMoment && (
                        <div className="detail-section">
                          <span className="detail-section-label">💭 Memorable Moment</span>
                          <p className="detail-text">{tasting.memorableMoment}</p>
                        </div>
                      )}
                      
                      {(tasting.coffeePersonality || tasting.coffeeSuperpower || tasting.coffeeMood) && (
                        <div className="detail-section personality-section">
                          <span className="detail-section-label">🎭 Coffee Personality</span>
                          <div className="personality-display">
                            {tasting.coffeePersonality && (
                              <div className="personality-item">
                                <span className="personality-question-label">Personality:</span>
                                <span className="personality-answer">
                                  {tasting.coffeePersonality === 'bold' && '⚡ Bold & Adventurous'}
                                  {tasting.coffeePersonality === 'calm' && '🌊 Calm & Soothing'}
                                  {tasting.coffeePersonality === 'sweet' && '🍭 Sweet & Playful'}
                                  {tasting.coffeePersonality === 'bright' && '☀️ Bright & Lively'}
                                </span>
                              </div>
                            )}
                            {tasting.coffeeSuperpower && (
                              <div className="personality-item">
                                <span className="personality-question-label">Superpower:</span>
                                <span className="personality-answer">
                                  {tasting.coffeeSuperpower === 'energy' && '⚡ Give Energy Instantly'}
                                  {tasting.coffeeSuperpower === 'creativity' && '🎨 Inspire Creativity'}
                                  {tasting.coffeeSuperpower === 'magic' && '✨ Make Mornings Magical'}
                                  {tasting.coffeeSuperpower === 'together' && '🤝 Bring People Together'}
                                </span>
                              </div>
                            )}
                            {tasting.coffeeMood && (
                              <div className="personality-item">
                                <span className="personality-question-label">Mood:</span>
                                <span className="personality-answer">
                                  {tasting.coffeeMood === 'cozy' && '🛋️ Cozy'}
                                  {tasting.coffeeMood === 'energetic' && '🏃 Energetic'}
                                  {tasting.coffeeMood === 'curious' && '🔍 Curious'}
                                  {tasting.coffeeMood === 'bold' && '💪 Bold'}
                                  {tasting.coffeeMood === 'relaxed' && '🧘 Relaxed'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {editingTasting && (
        <div className="edit-tasting-modal">
          <AddTastingForm
            coffee={coffee}
            initialTasting={editingTasting}
            onUpdate={onUpdateTasting}
            onClose={() => setEditingTasting(null)}
          />
        </div>
      )}

      <div className="coffee-section education-section">
        <CoffeeEducation coffee={coffee} />
      </div>
    </div>
  );
};

export default CoffeeInfo;

