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

    // Canvas dimensions based on layout
    const padding = 40; // Padding from background edge
    const photoSpacing = 20; // Spacing between photos

    let canvasWidth, canvasHeight;
    let photoWidth, photoHeight;

    if (layout.gridType === 'vertical-strip') {
        // Vertical strip: all photos stacked vertically
        photoWidth = 500;
        photoHeight = 375;
        const totalPhotoHeight = (photoHeight * layout.poses) + (photoSpacing * (layout.poses - 1));
        canvasWidth = photoWidth + (padding * 2);
        canvasHeight = totalPhotoHeight + (padding * 2);
    } else if (layout.gridType === 'grid-2x3') {
        // Grid 2x2 (4 photos): 2 columns, 2 rows
        photoWidth = 350;
        photoHeight = 350;
        const cols = 2;
        const rows = 2;
        canvasWidth = (photoWidth * cols) + (photoSpacing * (cols - 1)) + (padding * 2);
        canvasHeight = (photoHeight * rows) + (photoSpacing * (rows - 1)) + (padding * 2);
    }

    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw colored background only (no white frame!)
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Load and draw photos
    const imagePromises = photos.map((photoSrc) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = photoSrc;
        });
    });

    const images = await Promise.all(imagePromises);

    // Draw photos based on layout
    const startX = padding;
    const startY = padding;

    if (layout.gridType === 'vertical-strip') {
        images.forEach((img, index) => {
            const x = startX;
            const y = startY + (index * (photoHeight + photoSpacing));
            ctx.drawImage(img, x, y, photoWidth, photoHeight);
        });
    } else if (layout.gridType === 'grid-2x3') {
        // For 4 photos grid 2x2
        const displayPhotos = images.slice(0, 4); // Take only first 4 photos
        displayPhotos.forEach((img, index) => {
            const col = index % 2;
            const row = Math.floor(index / 2);
            const x = startX + (col * (photoWidth + photoSpacing));
            const y = startY + (row * (photoHeight + photoSpacing));
            ctx.drawImage(img, x, y, photoWidth, photoHeight);
        });
    }

    // Add small watermark at bottom
    const watermarkText = `One 2 Kie Photo Booth`;
    const watermarkDate = new Date().toLocaleDateString('id-ID');

    ctx.font = 'bold 14px Poppins, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // White with transparency
    ctx.textAlign = 'center';

    const textY = canvasHeight - 15;
    ctx.fillText(watermarkText, canvasWidth / 2, textY);

    ctx.font = '12px Poppins, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(watermarkDate, canvasWidth / 2, textY + 16);
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
