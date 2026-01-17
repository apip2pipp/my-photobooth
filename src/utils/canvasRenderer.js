// Canvas Renderer Utility for Photo Booth
// UPDATED: Now renders with colored BACKGROUND instead of frame border

/**
 * Render photos to canvas with specified layout and background color
 * @param {Array} photos - Array of base64 image strings
 * @param {Object} layout - Layout configuration object
 * @param {string} backgroundColor - Hex color for the background
 * @param {HTMLCanvasElement} canvas - Canvas element to render to
 */
export const renderPhotosToCanvas = async (photos, layout, backgroundColor, canvas) => {
    const ctx = canvas.getContext('2d');

    // Load images first to get their actual dimensions
    const imagePromises = photos.map((photoSrc) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = photoSrc;
        });
    });

    const images = await Promise.all(imagePromises);
    
    // Use actual image dimensions from webcam
    const firstImage = images[0];
    const photoWidth = firstImage.width;
    const photoHeight = firstImage.height;

    // Canvas dimensions based on layout
    const padding = 40;
    const photoSpacing = 20;
    const bottomTextSpace = 30;

    let canvasWidth, canvasHeight;

    if (layout.gridType === 'vertical-strip') {
        // Vertical strip: stack photos using their native resolution
        const totalPhotoHeight = (photoHeight * layout.poses) + (photoSpacing * (layout.poses - 1));
        canvasWidth = photoWidth + (padding * 2);
        canvasHeight = totalPhotoHeight + (padding * 2) + bottomTextSpace;
    } else if (layout.gridType === 'grid-2x3') {
        // Grid 2x3: 2 columns x 3 rows = 6 photos
        const cols = 2;
        const rows = 3;
        canvasWidth = (photoWidth * cols) + (photoSpacing * (cols - 1)) + (padding * 2);
        canvasHeight = (photoHeight * rows) + (photoSpacing * (rows - 1)) + (padding * 2) + bottomTextSpace;
    }

    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw colored background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw photos based on layout
    const startX = padding;
    const startY = padding;

    if (layout.gridType === 'vertical-strip') {
        images.forEach((img, index) => {
            const x = startX;
            const y = startY + (index * (photoHeight + photoSpacing));
            
            // Draw image at its native resolution - NO stretching!
            ctx.drawImage(img, x, y, img.width, img.height);
        });
    } else if (layout.gridType === 'grid-2x3') {
        // Render all 6 photos in 2x3 grid
        images.forEach((img, index) => {
            const col = index % 2;
            const row = Math.floor(index / 2);
            const x = startX + (col * (photoWidth + photoSpacing));
            const y = startY + (row * (photoHeight + photoSpacing));
            
            // Draw image at its native resolution - NO stretching!
            ctx.drawImage(img, x, y, img.width, img.height);
        });
    }

    // Add watermark at bottom
    const watermarkText = `One 2 Kie Photo Booth`;
    const watermarkDate = new Date().toLocaleDateString('id-ID');

    ctx.font = 'bold 16px Poppins, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.textAlign = 'center';

    const textY = canvasHeight - 40;
    ctx.fillText(watermarkText, canvasWidth / 2, textY);

    ctx.font = '13px Poppins, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(watermarkDate, canvasWidth / 2, textY + 22);
};

/**
 * Download canvas as image file
 * @param {HTMLCanvasElement} canvas - Canvas to download
 * @param {string} filename - Filename for download
 */
export const downloadCanvas = (canvas, filename = 'one2kie-photobooth.png') => {
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, 'image/png', 1.0);
};

/**
 * Generate preview from canvas
 * @param {HTMLCanvasElement} canvas - Canvas to preview
 * @returns {string} Data URL of canvas
 */
export const getCanvasPreview = (canvas) => {
    return canvas.toDataURL('image/png', 1.0);
};
