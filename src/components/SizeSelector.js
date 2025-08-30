import React, { useState } from 'react';

/**
 * Size Selector Component
 * Allows users to select predefined sizes or enter custom dimensions
 */
const SizeSelector = ({ selectedSize, onSizeChange }) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customWidth, setCustomWidth] = useState(selectedSize.width);
  const [customHeight, setCustomHeight] = useState(selectedSize.height);

  // Predefined size options
  const predefinedSizes = [
    { label: 'Small (300x200)', width: 300, height: 200 },
    { label: 'Medium (400x300)', width: 400, height: 300 },
    { label: 'Large (800x600)', width: 800, height: 600 },
    { label: 'Square Small (250x250)', width: 250, height: 250 },
    { label: 'Square Large (500x500)', width: 500, height: 500 },
    { label: 'Wide Banner (1200x400)', width: 1200, height: 400 },
  ];

  /**
   * Handles predefined size selection
   */
  const handlePredefinedSize = (size) => {
    setIsCustom(false);
    setCustomWidth(size.width);
    setCustomHeight(size.height);
    onSizeChange(size);
  };

  /**
   * Handles custom size input
   */
  const handleCustomSize = () => {
    const width = parseInt(customWidth) || 400;
    const height = parseInt(customHeight) || 300;
    
    // Validate size limits
    const validatedWidth = Math.max(50, Math.min(2000, width));
    const validatedHeight = Math.max(50, Math.min(2000, height));
    
    setCustomWidth(validatedWidth);
    setCustomHeight(validatedHeight);
    
    onSizeChange({ 
      width: validatedWidth, 
      height: validatedHeight 
    });
  };

  return (
    <div className="size-selector">
      <h3>Select Image Size:</h3>
      
      {/* Predefined Sizes */}
      <div className="size-options">
        {predefinedSizes.map((size, index) => (
          <button
            key={index}
            onClick={() => handlePredefinedSize(size)}
            className={`size-option ${
              selectedSize.width === size.width && 
              selectedSize.height === size.height && 
              !isCustom ? 'active' : ''
            }`}
          >
            {size.label}
          </button>
        ))}
        
        <button
          onClick={() => setIsCustom(true)}
          className={`size-option ${isCustom ? 'active' : ''}`}
        >
          Custom Size
        </button>
      </div>

      {/* Custom Size Inputs */}
      {isCustom && (
        <div className="custom-size">
          <div className="dimension-input">
            <label>Width:</label>
            <input
              type="number"
              value={customWidth}
              onChange={(e) => setCustomWidth(e.target.value)}
              onBlur={handleCustomSize}
              min="50"
              max="2000"
            />
            <span>px</span>
          </div>
          <div className="dimension-input">
            <label>Height:</label>
            <input
              type="number"
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
              onBlur={handleCustomSize}
              min="50"
              max="2000"
            />
            <span>px</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;