import React, { useRef, useState, useEffect } from 'react';
import { LAYOUTS, DEFAULT_FRAME_COLORS } from '../utils/layoutConfig';
import { renderPhotosToCanvas, downloadCanvas } from '../utils/canvasRenderer';
import { getThemeColors } from '../utils/themeConfig';
import ThemeToggleButton from './ThemeToggleButton';

const EditDownloadPage = ({ selectedLayout, capturedPhotos, onBack, onChangeLayout, theme, toggleTheme }) => {
    const canvasRef = useRef(null);
    const layout = LAYOUTS[selectedLayout];
    const colors = getThemeColors(theme);

    const [backgroundColor, setBackgroundColor] = useState(DEFAULT_FRAME_COLORS[0]);
    const [isRendering, setIsRendering] = useState(true);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Render canvas whenever background color changes
    useEffect(() => {
        renderCanvas();
    }, [backgroundColor]);

    const renderCanvas = async () => {
        if (!canvasRef.current) return;

        setIsRendering(true);
        try {
            await renderPhotosToCanvas(capturedPhotos, layout, backgroundColor, canvasRef.current);
            // Generate preview
            const preview = canvasRef.current.toDataURL('image/png', 1.0);
            setPreviewUrl(preview);
        } catch (error) {
            console.error('Error rendering canvas:', error);
        }
        setIsRendering(false);
    };

    const handleDownload = () => {
        if (!canvasRef.current) return;

        const timestamp = new Date().getTime();
        const filename = `One2Kie-PhotoBooth-${timestamp}.png`;
        downloadCanvas(canvasRef.current, filename);
    };

    return (
        <div style={{ ...styles.editDownloadPage, background: colors.background }}>
            {/* Theme Toggle */}
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <h1 style={{ ...styles.title, color: colors.text }}>
                        <span style={styles.titleIcon}>🎨</span>
                        Edit & Download
                    </h1>
                    <p style={{ ...styles.subtitle, color: colors.textSecondary }}>
                        Customize warna background dan download hasil foto kamu!
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div style={styles.content}>
                {/* Preview Section */}
                <div style={styles.previewSection}>
                    <div style={styles.previewContainer}>
                        {isRendering && (
                            <div style={styles.renderingOverlay}>
                                <div style={styles.loadingSpinner}></div>
                                <p style={styles.loadingText}>Rendering...</p>
                            </div>
                        )}

                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={styles.previewImage}
                            />
                        )}

                        {/* Hidden canvas for rendering */}
                        <canvas
                            ref={canvasRef}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {/* Layout Info */}
                    <div style={styles.layoutInfo}>
                        <div style={{ ...styles.layoutBadge, background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, color: colors.text }}>
                            📐 {layout.name} • {layout.poses} Pose
                        </div>
                    </div>
                </div>

                {/* Edit Panel */}
                <div style={styles.editPanel}>
                    {/* Color Picker Section */}
                    <div style={styles.editSection}>
                        <h3 style={{ ...styles.sectionTitle, color: colors.text }}>
                            <span style={styles.sectionIcon}>🎨</span>
                            Warna Background
                        </h3>

                        {/* Predefined Colors */}
                        <div style={styles.colorGrid}>
                            {DEFAULT_FRAME_COLORS.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setBackgroundColor(color)}
                                    style={{
                                        ...styles.colorButton,
                                        backgroundColor: color,
                                        border: backgroundColor === color ? '4px solid #1F2937' : '2px solid #E5E7EB',
                                        transform: backgroundColor === color ? 'scale(1.1)' : 'scale(1)',
                                    }}
                                    title={color}
                                />
                            ))}
                        </div>

                        {/* Custom Color Picker */}
                        <div style={styles.customColorSection}>
                            <label style={{ ...styles.customColorLabel, color: colors.text }}>
                                Custom Color:
                            </label>
                            <div style={styles.customColorPicker}>
                                <input
                                    type="color"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                    style={styles.colorInput}
                                />
                                <input
                                    type="text"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                    style={styles.colorTextInput}
                                    placeholder="#FF6B9D"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Current Color Preview */}
                    <div style={styles.currentColorSection}>
                        <div style={styles.currentColorPreview}>
                            <div
                                style={{
                                    ...styles.currentColorSwatch,
                                    backgroundColor: backgroundColor,
                                }}
                            />
                            <div style={styles.currentColorInfo}>
                                <div style={{ ...styles.currentColorLabel, color: colors.textSecondary }}>Current Background Color</div>
                                <div style={{ ...styles.currentColorValue, color: colors.text }}>{backgroundColor}</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={styles.actionButtons}>
                        <button
                            onClick={handleDownload}
                            style={styles.downloadButton}
                            disabled={isRendering}
                        >
                            ⬇️ Download Foto
                        </button>

                        <button
                            onClick={onBack}
                            style={styles.retakeButton}
                        >
                            📷 Foto Ulang
                        </button>

                        <button
                            onClick={onChangeLayout}
                            style={styles.changeLayoutButton}
                        >
                            🎨 Ganti Layout
                        </button>
                    </div>

                    {/* Tips */}
                    <div style={styles.tipsSection}>
                        <h4 style={{ ...styles.tipsTitle, color: colors.text }}>💡 Tips:</h4>
                        <ul style={styles.tipsList}>
                            <li style={{ ...styles.tipItem, color: colors.textSecondary }}>Pilih warna background yang cocok dengan foto untuk hasil terbaik</li>
                            <li style={{ ...styles.tipItem, color: colors.textSecondary }}>Gunakan custom color picker untuk warna yang lebih spesifik</li>
                            <li style={{ ...styles.tipItem, color: colors.textSecondary }}>File akan di-download dalam format PNG berkualitas tinggi</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    editDownloadPage: {
        minHeight: '100vh',
        padding: '2rem',
        position: 'relative',
    },

    // Header
    header: {
        marginBottom: '2rem',
    },
    headerContent: {
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto',
    },
    title: {
        fontSize: '3rem',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
    },
    titleIcon: {
        fontSize: '3.5rem',
    },
    subtitle: {
        fontSize: '1.25rem',
        lineHeight: '1.6',
    },

    // Content
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr 450px',
        gap: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
    },

    // Preview Section
    previewSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
    },
    previewContainer: {
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '25px',
        padding: '2rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '70vh',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        objectFit: 'contain',
    },
    renderingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    loadingSpinner: {
        width: '50px',
        height: '50px',
        border: '5px solid #E5E7EB',
        borderTop: '5px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        marginTop: '1rem',
        color: '#6B7280',
        fontSize: '1rem',
        fontWeight: '600',
    },
    layoutInfo: {
        textAlign: 'center',
    },
    layoutBadge: {
        display: 'inline-block',
        backdropFilter: 'blur(10px)',
        padding: '0.75rem 1.5rem',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '700',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    },

    // Edit Panel
    editPanel: {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '25px',
        padding: '2rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto',
    },

    // Edit Section
    editSection: {
        borderBottom: '2px solid #F3F4F6',
        paddingBottom: '1.5rem',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        fontFamily: 'Poppins, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    sectionIcon: {
        fontSize: '1.75rem',
    },

    // Color Picker
    colorGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '1.5rem',
    },
    colorButton: {
        width: '100%',
        aspectRatio: '1/1',
        borderRadius: '15px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    },
    customColorSection: {
        marginTop: '1rem',
    },
    customColorLabel: {
        display: 'block',
        fontSize: '0.95rem',
        fontWeight: '600',
        marginBottom: '0.75rem',
    },
    customColorPicker: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    colorInput: {
        width: '80px',
        height: '50px',
        border: '2px solid #E5E7EB',
        borderRadius: '10px',
        cursor: 'pointer',
    },
    colorTextInput: {
        flex: 1,
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        fontWeight: '600',
        fontFamily: 'monospace',
        border: '2px solid #E5E7EB',
        borderRadius: '10px',
        textTransform: 'uppercase',
    },

    // Current Color
    currentColorSection: {
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        padding: '1.5rem',
    },
    currentColorPreview: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    currentColorSwatch: {
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
        border: '3px solid white',
    },
    currentColorInfo: {
        flex: 1,
    },
    currentColorLabel: {
        fontSize: '0.85rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '0.25rem',
    },
    currentColorValue: {
        fontSize: '1.25rem',
        fontWeight: '800',
        fontFamily: 'monospace',
    },

    // Action Buttons
    actionButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    downloadButton: {
        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        color: '#FFFFFF',
        padding: '1.25rem 2rem',
        fontSize: '1.2rem',
        borderRadius: '15px',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
        boxShadow: '0 10px 25px rgba(67, 233, 123, 0.3)',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.3s ease',
    },
    retakeButton: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#FFFFFF',
        padding: '1rem 2rem',
        fontSize: '1.05rem',
        borderRadius: '15px',
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.3s ease',
    },
    changeLayoutButton: {
        background: 'white',
        color: '#667eea',
        padding: '1rem 2rem',
        fontSize: '1.05rem',
        borderRadius: '15px',
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        cursor: 'pointer',
        border: '2px solid #667eea',
        transition: 'all 0.3s ease',
    },

    // Tips
    tipsSection: {
        background: 'rgba(236, 72, 153, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '15px',
        padding: '1.5rem',
    },
    tipsTitle: {
        fontSize: '1.1rem',
        fontWeight: '800',
        marginBottom: '1rem',
        fontFamily: 'Poppins, sans-serif',
    },
    tipsList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    tipItem: {
        fontSize: '0.9rem',
        lineHeight: '1.5',
        paddingLeft: '1.5rem',
        position: 'relative',
    },
};

// Add CSS animations
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
    if (!document.head.querySelector('style[data-edit-download]')) {
        style.setAttribute('data-edit-download', 'true');
        document.head.appendChild(style);
    }
}

export default EditDownloadPage;
