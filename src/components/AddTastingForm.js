import React, { useState, useEffect, useRef } from 'react';
import './AddTastingForm.css';

const AddTastingForm = ({ coffee, onAddTasting, initialTasting, onUpdate, onClose }) => {
  const [isOpen, setIsOpen] = useState(!!initialTasting);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const formRef = useRef(null);
  const isEditing = !!initialTasting;
  
  const getInitialFormData = () => {
    if (initialTasting) {
      return {
        coffeeName: initialTasting.coffeeName || coffee?.displayName || coffee?.name || '',
        notes: initialTasting.notes || '',
        rating: initialTasting.rating || 5,
        date: initialTasting.date ? new Date(initialTasting.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        brewingMethod: initialTasting.brewingMethod || '',
        body: initialTasting.body || 3,
        acidity: initialTasting.acidity || 3,
        aroma: initialTasting.aroma || [],
        flavorTags: initialTasting.flavorTags || [],
        wouldBuyAgain: initialTasting.wouldBuyAgain || '',
        bestTimeOfDay: initialTasting.bestTimeOfDay || '',
        pairing: initialTasting.pairing || '',
        memorableMoment: initialTasting.memorableMoment || '',
        coffeePersonality: initialTasting.coffeePersonality || '',
        coffeeSuperpower: initialTasting.coffeeSuperpower || '',
        coffeeMood: initialTasting.coffeeMood || ''
      };
    }
    return {
      coffeeName: coffee?.displayName || coffee?.name || '',
      notes: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      brewingMethod: '',
      body: 3,
      acidity: 3,
      aroma: [],
      flavorTags: [],
      wouldBuyAgain: '',
      bestTimeOfDay: '',
      pairing: '',
      memorableMoment: '',
      coffeePersonality: '',
      coffeeSuperpower: '',
      coffeeMood: ''
    };
  };
  
  const [formData, setFormData] = useState(getInitialFormData);

  // Constants - defined before useEffects
  const brewingMethods = ['Espresso', 'Pour Over', 'French Press', 'AeroPress', 'Cold Brew', 'Drip', 'Moka Pot', 'Other'];
  const aromaOptions = ['Floral', 'Fruity', 'Nutty', 'Chocolatey', 'Caramel', 'Spicy', 'Earthy', 'Citrus', 'Berry', 'Vanilla'];
  const flavorTags = ['Bold', 'Smooth', 'Complex', 'Balanced', 'Bright', 'Rich', 'Delicate', 'Robust', 'Sweet', 'Bitter'];
  const timeOfDay = ['Morning', 'Afternoon', 'Evening', 'Anytime'];
  const totalSteps = 5; // Increased to 5 steps

  // Auto-save draft to localStorage
  useEffect(() => {
    if (hasUnsavedChanges && !isEditing) {
      const draftKey = `tasting-draft-${coffee?.id}`;
      const timeoutId = setTimeout(() => {
        localStorage.setItem(draftKey, JSON.stringify(formData));
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [formData, hasUnsavedChanges, coffee?.id, isEditing]);

  // Load draft on mount
  useEffect(() => {
    if (!isEditing && coffee?.id) {
      const draftKey = `tasting-draft-${coffee.id}`;
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          setFormData(draft);
          setHasUnsavedChanges(true);
        } catch (e) {
          console.error('Error loading draft:', e);
        }
      }
    }
  }, [coffee?.id, isEditing]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Ctrl/Cmd + Enter to submit
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (currentStep === totalSteps) {
          formRef.current?.requestSubmit();
        } else {
          nextStep();
        }
      }
      // Escape to close
      if (e.key === 'Escape' && !hasUnsavedChanges) {
        handleClose();
      }
      // Arrow keys for navigation (when not in input)
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        if (e.key === 'ArrowRight' && currentStep < totalSteps) {
          nextStep();
        } else if (e.key === 'ArrowLeft' && currentStep > 1) {
          prevStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentStep, hasUnsavedChanges, totalSteps]);

  if (!coffee) return null;
  
  const flavor = coffee.flavor;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Photo size must be less than 5MB');
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setHasUnsavedChanges(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.coffeeName.trim()) {
      newErrors.coffeeName = 'Coffee name is required';
    }
    if (!formData.notes.trim()) {
      newErrors.notes = 'Please describe your tasting experience';
    }
    if (!formData.brewingMethod) {
      newErrors.brewingMethod = 'Please select a brewing method';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Go to first step with errors
      if (newErrors.coffeeName || newErrors.brewingMethod) {
        setCurrentStep(1);
      } else if (newErrors.notes) {
        setCurrentStep(3);
      }
      return;
    }
    
    const tastingData = {
      ...formData,
      flavor,
      coffeeId: coffee?.id,
      coffeeName: coffee?.displayName || coffee?.name,
      date: new Date(formData.date).toISOString(),
      photo: photoPreview // In production, upload to server and store URL
    };

    if (isEditing && initialTasting?.id) {
      onUpdate?.(initialTasting.id, tastingData);
    } else {
      onAddTasting(tastingData);
    }
    
    // Clear draft
    if (coffee?.id) {
      localStorage.removeItem(`tasting-draft-${coffee.id}`);
    }
    
    // Reset form
    const resetData = getInitialFormData();
    setFormData(resetData);
    setPhotoPreview(null);
    setPhotoFile(null);
    setCurrentStep(1);
    setErrors({});
    setHasUnsavedChanges(false);
    setShowSuccess(true);
    
    // Close form after showing success message
    setTimeout(() => {
      setIsOpen(false);
      setShowSuccess(false);
      onClose?.();
    }, 2000);
  };
  
  const handleClose = () => {
    if (hasUnsavedChanges && !isEditing) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close? Your draft will be saved.')) {
        setCurrentStep(1);
        setErrors({});
        setIsOpen(false);
        onClose?.();
      }
    } else {
      setFormData(getInitialFormData());
      setCurrentStep(1);
      setErrors({});
      setHasUnsavedChanges(false);
      setPhotoPreview(null);
      setPhotoFile(null);
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'body' || name === 'acidity' ? parseInt(value) : value
    }));
    setHasUnsavedChanges(true);
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => {
      const currentArray = prev[name] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [name]: newArray };
    });
    setHasUnsavedChanges(true);
  };

  const nextStep = () => {
    const newErrors = {};
    
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.coffeeName.trim()) {
        newErrors.coffeeName = 'Coffee name is required';
      }
      if (!formData.brewingMethod) {
        newErrors.brewingMethod = 'Please select a brewing method';
      }
    } else if (currentStep === 3) {
      if (!formData.notes.trim()) {
        newErrors.notes = 'Please describe your tasting experience';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear errors when moving to next step
    setErrors({});
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) {
    return (
      <div className="add-tasting-container">
        <button 
          className="open-form-button"
          onClick={() => setIsOpen(true)}
        >
          ☕ Add Your Tasting Experience
        </button>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="step-intro">
              <h4>☕ Let's Begin Your Tasting Journey</h4>
              <p>Start by sharing the basics of your coffee experience</p>
            </div>
            <div className="form-group">
              <label htmlFor="coffeeName">Coffee Name *</label>
              <input
                type="text"
                id="coffeeName"
                name="coffeeName"
                value={formData.coffeeName}
                onChange={handleChange}
                placeholder="e.g., Ethiopian Yirgacheffe"
                required
                disabled
                className={errors.coffeeName ? 'error' : ''}
                title="This is automatically filled from the selected coffee"
              />
              {errors.coffeeName && <span className="error-message">{errors.coffeeName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="date">When did you taste it? *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="brewingMethod">How did you brew it? *</label>
              <div className="button-group">
                {brewingMethods.map(method => (
                  <button
                    key={method}
                    type="button"
                    className={`option-button ${formData.brewingMethod === method ? 'active' : ''}`}
                    onClick={() => handleChange({ target: { name: 'brewingMethod', value: method } })}
                  >
                    {method}
                  </button>
                ))}
              </div>
              {errors.brewingMethod && <span className="error-message">{errors.brewingMethod}</span>}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="step-intro">
              <h4>👃 Engage Your Senses</h4>
              <p>Take a moment to reflect on the aromas and flavors you experienced</p>
            </div>
            <div className="form-group">
              <label>What aromas did you notice? <span className="optional-hint">(Select all that apply)</span></label>
              <div className="tag-group">
                {aromaOptions.map(aroma => (
                  <button
                    key={aroma}
                    type="button"
                    className={`tag-button ${formData.aroma.includes(aroma) ? 'active' : ''}`}
                    onClick={() => handleMultiSelect('aroma', aroma)}
                    aria-label={`Select ${aroma} aroma`}
                  >
                    {aroma}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>How would you describe the flavor? <span className="optional-hint">(Select all that apply)</span></label>
              <div className="tag-group">
                {flavorTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-button ${formData.flavorTags.includes(tag) ? 'active' : ''}`}
                    onClick={() => handleMultiSelect('flavorTags', tag)}
                    aria-label={`Select ${tag} flavor`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="body">Body/Mouthfeel: {formData.body}/5</label>
              <input
                type="range"
                id="body"
                name="body"
                min="1"
                max="5"
                value={formData.body}
                onChange={handleChange}
                className="rating-slider"
              />
              <div className="slider-labels">
                <span>Light</span>
                <span>Full</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="acidity">Acidity Level: {formData.acidity}/5</label>
              <input
                type="range"
                id="acidity"
                name="acidity"
                min="1"
                max="5"
                value={formData.acidity}
                onChange={handleChange}
                className="rating-slider"
              />
              <div className="slider-labels">
                <span>Mellow</span>
                <span>Bright</span>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="step-intro">
              <h4>💭 Share Your Story</h4>
              <p>Help us understand what made this coffee special to you</p>
            </div>
            <div className="form-group">
              <label htmlFor="notes">Share your tasting experience *</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="What flavors stood out? How did it make you feel? What memories did it evoke?"
                rows="5"
                required
                className={errors.notes ? 'error' : ''}
              />
              {errors.notes && <span className="error-message">{errors.notes}</span>}
              <span className="char-hint">{formData.notes.length} characters</span>
            </div>
            <div className="form-group">
              <label htmlFor="memorableMoment">What made this moment special? <span className="optional-hint">(Optional)</span></label>
              <textarea
                id="memorableMoment"
                name="memorableMoment"
                value={formData.memorableMoment}
                onChange={handleChange}
                placeholder="Was it the setting, the company, or something special about the coffee itself?"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bestTimeOfDay">When is the best time to enjoy this coffee?</label>
              <div className="button-group">
                {timeOfDay.map(time => (
                  <button
                    key={time}
                    type="button"
                    className={`option-button ${formData.bestTimeOfDay === time ? 'active' : ''}`}
                    onClick={() => handleChange({ target: { name: 'bestTimeOfDay', value: time } })}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="pairing">Perfect pairing? <span className="optional-hint">(Optional)</span></label>
              <input
                type="text"
                id="pairing"
                name="pairing"
                value={formData.pairing}
                onChange={handleChange}
                placeholder="e.g., Dark chocolate, croissant, or nothing at all..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Add a photo <span className="optional-hint">(Optional, max 5MB)</span></label>
              <div className="photo-upload-container">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="photo-input"
                />
                <label htmlFor="photo" className="photo-upload-button">
                  {photoPreview ? '📷 Change Photo' : '📷 Upload Photo'}
                </label>
                {photoPreview && (
                  <div className="photo-preview">
                    <img src={photoPreview} alt="Preview" />
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview(null);
                        setPhotoFile(null);
                        setHasUnsavedChanges(true);
                      }}
                      className="remove-photo"
                      aria-label="Remove photo"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className="step-intro">
              <h4>🎭 Fun Personality Questions</h4>
              <p>Let's discover your coffee's personality!</p>
            </div>
            <div className="form-group personality-question">
              <label>If your perfect coffee had a personality, what would it be? <span className="optional-hint">(Optional)</span></label>
              <div className="personality-options">
                <button
                  type="button"
                  className={`personality-button ${formData.coffeePersonality === 'bold' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeePersonality', value: 'bold' } })}
                >
                  <span className="personality-emoji">⚡</span>
                  <span className="personality-label">A. Bold & Adventurous</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeePersonality === 'calm' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeePersonality', value: 'calm' } })}
                >
                  <span className="personality-emoji">🌊</span>
                  <span className="personality-label">B. Calm & Soothing</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeePersonality === 'sweet' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeePersonality', value: 'sweet' } })}
                >
                  <span className="personality-emoji">🍭</span>
                  <span className="personality-label">C. Sweet & Playful</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeePersonality === 'bright' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeePersonality', value: 'bright' } })}
                >
                  <span className="personality-emoji">☀️</span>
                  <span className="personality-label">D. Bright & Lively</span>
                </button>
              </div>
            </div>
            <div className="form-group personality-question">
              <label>If coffee had a superpower, what would yours be? <span className="optional-hint">(Optional)</span></label>
              <div className="personality-options">
                <button
                  type="button"
                  className={`personality-button ${formData.coffeeSuperpower === 'energy' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeeSuperpower', value: 'energy' } })}
                >
                  <span className="personality-emoji">⚡</span>
                  <span className="personality-label">A. Give Energy Instantly</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeeSuperpower === 'creativity' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeeSuperpower', value: 'creativity' } })}
                >
                  <span className="personality-emoji">🎨</span>
                  <span className="personality-label">B. Inspire Creativity</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeeSuperpower === 'magic' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeeSuperpower', value: 'magic' } })}
                >
                  <span className="personality-emoji">✨</span>
                  <span className="personality-label">C. Make Mornings Magical</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeeSuperpower === 'together' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeeSuperpower', value: 'together' } })}
                >
                  <span className="personality-emoji">🤝</span>
                  <span className="personality-label">D. Bring People Together</span>
                </button>
              </div>
            </div>
            <div className="form-group personality-question">
              <label>Which coffee mood describes you best? <span className="optional-hint">(Optional)</span></label>
              <div className="personality-options">
                <button
                  type="button"
                  className={`personality-button ${formData.coffeeMood === 'cozy' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeeMood', value: 'cozy' } })}
                >
                  <span className="personality-emoji">🛋️</span>
                  <span className="personality-label">A. Cozy</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeeMood === 'energetic' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeeMood', value: 'energetic' } })}
                >
                  <span className="personality-emoji">🏃</span>
                  <span className="personality-label">B. Energetic</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeeMood === 'curious' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeeMood', value: 'curious' } })}
                >
                  <span className="personality-emoji">🔍</span>
                  <span className="personality-label">C. Curious</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeeMood === 'bold' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeeMood', value: 'bold' } })}
                >
                  <span className="personality-emoji">💪</span>
                  <span className="personality-label">D. Bold</span>
                </button>
                <button
                  type="button"
                  className={`personality-button ${formData.coffeeMood === 'relaxed' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'coffeeMood', value: 'relaxed' } })}
                >
                  <span className="personality-emoji">🧘</span>
                  <span className="personality-label">E. Relaxed</span>
                </button>
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="step-intro">
              <h4>⭐ Final Thoughts</h4>
              <p>Wrap up your tasting experience with a rating</p>
            </div>
            <div className="form-group">
              <label htmlFor="rating">Overall Rating: {formData.rating} stars</label>
              <input
                type="range"
                id="rating"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                className="rating-slider"
              />
              <div className="rating-display">
                <span className="stars-display">
                  {'★'.repeat(formData.rating)}{'☆'.repeat(5 - formData.rating)}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="wouldBuyAgain">Would you buy this coffee again?</label>
              <div className="button-group">
                <button
                  type="button"
                  className={`option-button ${formData.wouldBuyAgain === 'yes' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'wouldBuyAgain', value: 'yes' } })}
                >
                  👍 Definitely!
                </button>
                <button
                  type="button"
                  className={`option-button ${formData.wouldBuyAgain === 'maybe' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'wouldBuyAgain', value: 'maybe' } })}
                >
                  🤔 Maybe
                </button>
                <button
                  type="button"
                  className={`option-button ${formData.wouldBuyAgain === 'no' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'wouldBuyAgain', value: 'no' } })}
                >
                  👎 Probably Not
                </button>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="add-tasting-container">
      <div className="add-tasting-form-wrapper">
        <div className="form-header">
          <h3>{isEditing ? 'Edit Your Tasting Experience' : 'Add Your Tasting Experience'}</h3>
          <button 
            className="close-button"
            onClick={handleClose}
            aria-label="Close form"
          >
            ×
          </button>
        </div>
        
        {hasUnsavedChanges && !isEditing && (
          <div className="draft-indicator">
            💾 Draft saved automatically
          </div>
        )}
        
        {showSuccess && (
          <div className="success-message">
            ✨ Your tasting experience has been saved!
          </div>
        )}
        
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
        </div>
        <div className="step-indicator">
          Step {currentStep} of {totalSteps}
        </div>
        
        <form ref={formRef} onSubmit={handleSubmit} className="tasting-form">
          <div className={`step-content step-${currentStep}`}>
            {renderStepContent()}
          </div>

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="nav-button prev-button">
                ← Previous
              </button>
            )}
            {currentStep < totalSteps ? (
              <button type="button" onClick={nextStep} className="nav-button next-button">
                Next →
              </button>
            ) : (
              <>
                <button type="button" onClick={handleClose} className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {isEditing ? '✨ Update Tasting' : '✨ Save Tasting Experience'}
                </button>
              </>
            )}
          </div>
          <div className="keyboard-hints">
            <span className="hint">💡 Tip: Use ← → arrow keys to navigate, Ctrl+Enter to submit</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTastingForm;

