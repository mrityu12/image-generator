import React, { useState } from 'react';
import SizeSelector from './SizeSelector';
import ImageDisplay from './ImageDisplay';
import { generateImageUrl, downloadImage } from '../services/imageService';
import '../styles/ImageGenerator.css';

/**
 * Main Image Generator Component
 * Handles image generation logic and state management
 */
const ImageGenerator = () => {
  // State management
  const [selectedSize, setSelectedSize] = useState({ width: 400, height: 300 });
  const [imageUrl, setImageUrl] = useState('');
  const [customText, setCustomText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handles image generation
   * Creates URL and updates state
   */
  const handleGenerateImage = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Generate image URL using service
      const url = generateImageUrl(selectedSize, customText);
      setImageUrl(url);

      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Image generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles image download
   */
  const handleDownloadImage = () => {
    if (imageUrl) {
      downloadImage(
        imageUrl,
        `placeholder-${selectedSize.width}x${selectedSize.height}.jpg`
      );
    }
  };

  /**
   * Handles size selection change
   */
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setImageUrl(''); // Clear current image when size changes
    setError('');
  };

  return (
    <div className="image-generator">
      <div className="generator-card">
        <h2>Generate Your Image</h2>

        {/* Size Selection */}
        <div className="control-section">
          <SizeSelector
            selectedSize={selectedSize}
            onSizeChange={handleSizeChange}
          />
        </div>

        {/* Custom Text Input */}
        <div className="control-section">
          <label htmlFor="customText">Custom Text (Optional):</label>
          <input
            id="customText"
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter custom text for your image"
            className="text-input"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateImage}
          disabled={isLoading}
          className="generate-btn"
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>

        {/* Error Display */}
        {error && <div className="error-message">{error}</div>}

        {/* Image Display */}
        {imageUrl && (
          <ImageDisplay
            imageUrl={imageUrl}
            size={selectedSize}
            onDownload={handleDownloadImage}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
