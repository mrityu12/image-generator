/**
 * Image Service
 * Handles image generation and download functionality
 * Uses Lorem Picsum API, Unsplash Source, and Placehold.co for text
 */

/**
 * Generates image URL
 * - If custom text → use Placehold.co
 * - Else → use Lorem Picsum for random images
 * @param {Object} size - Image dimensions {width, height}
 * @param {string} customText - Optional custom text
 * @returns {string} Generated image URL
 */
export const generateImageUrl = (size, customText = '') => {
  const { width, height } = size;

  // Use Lorem Picsum as primary API
  const baseUrl = 'https://picsum.photos';

  // Add random seed to get different images
  const seed = Math.floor(Math.random() * 1000);

  // If custom text is provided, use placehold.co (stable service)
  if (customText.trim()) {
    const encodedText = encodeURIComponent(customText.trim());
    return `https://placehold.co/${width}x${height}/667eea/ffffff?text=${encodedText}`;
  }

  // Return Lorem Picsum URL with random seed
  return `${baseUrl}/${width}/${height}?random=${seed}`;
};

/**
 * Alternative image service (Unsplash API simulation)
 * Note: Real Unsplash API requires authentication
 * @param {Object} size - Image dimensions
 * @param {string} query - Search query
 * @returns {string} Image URL
 */
export const generateUnsplashUrl = (size, query = 'nature') => {
  const { width, height } = size;
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}`;
};

/**
 * Downloads image from URL
 * @param {string} imageUrl - Image URL to download
 * @param {string} filename - Desired filename
 */
export const downloadImage = async (imageUrl, filename) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback: open image in new tab
    window.open(imageUrl, '_blank');
  }
};

/**
 * Validates image dimensions
 * Ensures dimensions are within [50, 2000]
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {Object} Validated dimensions { width, height, isValid }
 */
export const validateDimensions = (width, height) => {
  const minSize = 50;
  const maxSize = 2000;

  const validatedWidth = Math.max(minSize, Math.min(maxSize, width));
  const validatedHeight = Math.max(minSize, Math.min(maxSize, height));

  return {
    width: validatedWidth,
    height: validatedHeight,
    isValid: validatedWidth === width && validatedHeight === height,
  };
};
