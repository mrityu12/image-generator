import React from 'react';

/**
 * Image Display Component
 * Shows generated image with download functionality
 */
const ImageDisplay = ({ imageUrl, size, onDownload, isLoading }) => {
  return (
    <div className="image-display">
      <h3>Generated Image:</h3>
      
      <div className="image-container">
        {isLoading ? (
          <div className="loading-placeholder" style={{
            width: Math.min(size.width, 400),
            height: Math.min(size.height, 300)
          }}>
            <div className="loading-spinner"></div>
            <p>Generating image...</p>
          </div>
        ) : (
          <img 
            src={imageUrl} 
            alt={`Generated placeholder ${size.width}x${size.height}`}
            className="generated-image"
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'contain'
            }}
          />
        )}
      </div>

      {/* Image Details */}
      <div className="image-details">
        <p><strong>Dimensions:</strong> {size.width} x {size.height} pixels</p>
        <p><strong>URL:</strong> <code>{imageUrl}</code></p>
      </div>

      {/* Action Buttons */}
      <div className="image-actions">
        <button 
          onClick={onDownload}
          className="download-btn"
          disabled={!imageUrl || isLoading}
        >
          Download Image
        </button>
        
        <button 
          onClick={() => navigator.clipboard.writeText(imageUrl)}
          className="copy-btn"
          disabled={!imageUrl || isLoading}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default ImageDisplay;