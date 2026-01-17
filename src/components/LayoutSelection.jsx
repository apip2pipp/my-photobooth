import React from 'react';
import { LAYOUTS } from '../utils/layoutConfig';
import { getThemeColors } from '../utils/themeConfig';
import ThemeToggleButton from './ThemeToggleButton';

const LayoutSelection = ({ onSelectLayout, theme, toggleTheme }) => {
    const layoutArray = Object.values(LAYOUTS);
    const colors = getThemeColors(theme);

    return (
        <div style={{ ...styles.layoutSelection, background: colors.background }}>
            {/* Theme Toggle */}
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />

            {/* Back Button */}
            <button
                onClick={() => window.location.reload()}
                style={{ ...styles.backButton, color: colors.textSecondary }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            >
                ← Back
            </button>

            {/* Header */}
            <div style={styles.header}>
                <h1 style={{ ...styles.title, color: colors.text }}>Select Your Layout</h1>
                <p style={{ ...styles.subtitle, color: colors.textSecondary }}>Choose how you want to capture the moment</p>
            </div>

            {/* Layout Grid */}
            <div style={styles.layoutGrid}>
                {layoutArray.map((layout, index) => (
                    <div
                        key={layout.id}
                        style={{ ...styles.layoutCard, background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}
                        onClick={() => onSelectLayout(layout.id)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = theme === 'dark' ? '0 20px 40px rgba(236, 72, 153, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.08)';
                        }}
                    >
                        {/* Selection Circle Icon */}
                        <div style={{ ...styles.selectCircle, border: `2px solid ${colors.textSecondary}` }}>
                            <div style={styles.selectCircleInner}></div>
                        </div>

                        {/* Layout Preview */}
                        <div style={styles.layoutPreview}>
                            {renderLayoutPreview(layout)}
                        </div>

                        {/* Layout Info */}
                        <div style={styles.layoutInfo}>
                            <h2 style={{ ...styles.layoutName, color: colors.text }}>
                                {getLayoutDisplayName(layout.id)}
                            </h2>
                            <p style={{ ...styles.layoutDescription, color: colors.textSecondary }}>{layout.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper function to get display name
const getLayoutDisplayName = (id) => {
    const names = {
        'C': 'Single Shot',
        'B': '3-Photo Strip',
        'A': 'Photo Strip',
        'D': '4-Photo Grid'
    };
    return names[id] || `Layout ${id}`;
};

// Helper function to render layout preview
const renderLayoutPreview = (layout) => {
    const previewBoxes = [];

    if (layout.gridType === 'vertical-strip') {
        // Vertical strip layout
        for (let i = 0; i < layout.poses; i++) {
            previewBoxes.push(
                <div key={i} style={styles.previewBox}></div>
            );
        }
        return (
            <div style={styles.previewContainerVertical}>
                {previewBoxes}
            </div>
        );
    } else if (layout.gridType === 'grid-2x3') {
        // Grid 2x3 layout (6 photos)
        for (let i = 0; i < 6; i++) {
            previewBoxes.push(
                <div key={i} style={styles.previewBoxGrid}></div>
            );
        }
        return (
            <div style={styles.previewContainerGrid}>
                {previewBoxes}
            </div>
        );
    }
};

// Styles - Modern Dark Theme
const styles = {
    layoutSelection: {
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #2D1B3D 0%, #1a0f29 100%)',
        padding: '2rem',
        position: 'relative',
    },

    // Back Button
    backButton: {
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        background: 'transparent',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        padding: '0.5rem',
        transition: 'all 0.3s ease',
        opacity: 0.7,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },

    // Header
    header: {
        textAlign: 'center',
        marginBottom: '2.5rem',
        paddingTop: '2rem',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '0.5rem',
        letterSpacing: '-0.5px',
    },
    subtitle: {
        fontSize: '1rem',
        fontWeight: '400',
    },

    // Layout Grid
    layoutGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
    },

    // Layout Card
    layoutCard: {
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    // Selection Circle
    selectCircle: {
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
    },
    selectCircleInner: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: 'transparent',
    },

    // Layout Preview
    layoutPreview: {
        width: '100%',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
    },
    previewContainerVertical: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        width: '100%',
        maxWidth: '140px',
    },
    previewContainerGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.4rem',
        width: '100%',
        maxWidth: '160px',
    },
    previewBox: {
        aspectRatio: '4/3',
        background: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    previewBoxGrid: {
        aspectRatio: '1/1',
        background: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },

    // Layout Info
    layoutInfo: {
        textAlign: 'center',
        width: '100%',
    },
    layoutName: {
        fontSize: '1.2rem',
        fontWeight: '700',
        marginBottom: '0.4rem',
        fontFamily: 'Poppins, sans-serif',
    },
    layoutDescription: {
        fontSize: '0.85rem',
        fontWeight: '400',
        lineHeight: '1.4',
    },
};

export default LayoutSelection;
