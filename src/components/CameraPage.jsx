import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { LAYOUTS } from '../utils/layoutConfig';
import { getThemeColors } from '../utils/themeConfig';
import ThemeToggleButton from './ThemeToggleButton';

const CameraPage = ({ selectedLayout, onComplete, onBack, theme, toggleTheme }) => {
    const webcamRef = useRef(null);
    const layout = LAYOUTS[selectedLayout];
    const totalPoses = layout.poses;
    const colors = getThemeColors(theme);

    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
    const [cameraReady, setCameraReady] = useState(false);

    // Konfigurasi kamera
    const videoConstraints = {
        width: 1280,
        height: 1280,
        facingMode: 'user',
    };

    // Check if camera is ready
    const handleUserMedia = () => {
        setCameraReady(true);
    };

    // Fungsi untuk memulai countdown dan capture
    const handleCapture = () => {
        if (countdown !== null) return; // Prevent multiple clicks

        setCountdown(3);
        let timer = 3;
        const interval = setInterval(() => {
            timer -= 1;
            setCountdown(timer);

            if (timer === 0) {
                clearInterval(interval);
                capturePhoto();
                setCountdown(null);
            }
        }, 1000);
    };

    // Fungsi untuk capture foto
    const capturePhoto = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const newPhotos = [...capturedPhotos, imageSrc];
        setCapturedPhotos(newPhotos);
        setCurrentPoseIndex(currentPoseIndex + 1);

        // Check if all poses are captured
        if (newPhotos.length === totalPoses) {
            // Wait a bit before transitioning
            setTimeout(() => {
                onComplete(newPhotos);
            }, 500);
        }
    }, [capturedPhotos, currentPoseIndex, totalPoses, onComplete]);

    // Fungsi untuk retake foto tertentu
    const handleRetake = (index) => {
        const newPhotos = [...capturedPhotos];
        newPhotos.splice(index, 1);
        setCapturedPhotos(newPhotos);
        setCurrentPoseIndex(index);
    };

    // Calculate progress
    const progress = (capturedPhotos.length / totalPoses) * 100;
    const isComplete = capturedPhotos.length === totalPoses;

    return (
        <div style={{ ...styles.cameraPage, background: colors.background }}>
            {/* Theme Toggle */}
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />

            {/* Header */}
            <div style={styles.header}>
                <button onClick={onBack} style={{ ...styles.backButton, background: colors.cardBg, color: colors.text, border: `1px solid ${colors.cardBorder}` }}>
                    ← Ganti Layout
                </button>
                <div style={styles.headerInfo}>
                    <h2 style={{ ...styles.layoutName, color: colors.text }}>{layout.name}</h2>
                    <div style={styles.progressBar}>
                        <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
                    </div>
                    <p style={{ ...styles.progressText, color: colors.textSecondary }}>
                        Foto {capturedPhotos.length} dari {totalPoses}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div style={styles.content}>
                {/* Camera Section */}
                <div style={styles.cameraSection}>
                    {!isComplete && (
                        <div style={styles.cameraContainer}>
                            <div style={styles.cameraWrapper}>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    mirrored={true}
                                    style={styles.webcam}
                                    onUserMedia={handleUserMedia}
                                />

                                {countdown !== null && (
                                    <div style={styles.countdownOverlay}>
                                        <div style={styles.countdownNumber}>
                                            {countdown > 0 ? countdown : '📸'}
                                        </div>
                                        {countdown > 0 && <div style={styles.countdownText}>GET READY</div>}
                                        {countdown === 0 && <div style={styles.countdownText}>CHEESE!</div>}
                                    </div>
                                )}

                                {/* Camera Not Ready Overlay */}
                                {!cameraReady && (
                                    <div style={styles.loadingOverlay}>
                                        <div style={styles.loadingSpinner}></div>
                                        <p style={styles.loadingText}>Memuat kamera...</p>
                                    </div>
                                )}

                                {/* Pose Indicator */}
                                <div style={{ ...styles.poseIndicator, color: colors.text, background: colors.cardBg }}>
                                    Pose #{currentPoseIndex + 1}
                                </div>
                            </div>

                            {/* Capture Button */}
                            <button
                                onClick={handleCapture}
                                disabled={countdown !== null || !cameraReady}
                                style={countdown !== null || !cameraReady ? styles.captureButtonDisabled : styles.captureButton}
                            >
                                {countdown !== null ? 'Get Ready...' : '📸 Ambil Foto'}
                            </button>
                        </div>
                    )}

                    {/* Completion Message */}
                    {isComplete && (
                        <div style={styles.completionMessage}>
                            <div style={styles.completionIcon}>✅</div>
                            <h2 style={{ ...styles.completionTitle, color: colors.text }}>Semua Foto Berhasil Diambil!</h2>
                            <p style={{ ...styles.completionText, color: colors.textSecondary }}>
                                Sedang memproses ke halaman edit...
                            </p>
                        </div>
                    )}
                </div>

                {/* Preview Grid */}
                <div style={styles.previewSection}>
                    <h3 style={{ ...styles.previewTitle, color: colors.text }}>
                        <span style={styles.previewIcon}>🖼️</span>
                        Preview Foto
                    </h3>
                    <div style={styles.previewGrid}>
                        {Array.from({ length: totalPoses }).map((_, index) => (
                            <div key={index} style={styles.previewCard}>
                                {capturedPhotos[index] ? (
                                    <>
                                        <img
                                            src={capturedPhotos[index]}
                                            alt={`Pose ${index + 1}`}
                                            style={styles.previewImage}
                                        />
                                        <button
                                            onClick={() => handleRetake(index)}
                                            style={styles.retakeButton}
                                            disabled={isComplete}
                                        >
                                            🔄 Retake
                                        </button>
                                    </>
                                ) : (
                                    <div style={styles.previewPlaceholder}>
                                        <div style={styles.placeholderIcon}>
                                            {index === currentPoseIndex ? '📷' : '⏳'}
                                        </div>
                                        <div style={{ ...styles.placeholderText, color: colors.textSecondary }}>
                                            {index === currentPoseIndex ? 'Next' : `Pose ${index + 1}`}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    cameraPage: {
        minHeight: '100vh',
        padding: '2rem',
        position: 'relative',
    },

    // Header
    header: {
        marginBottom: '2rem',
    },
    backButton: {
        backdropFilter: 'blur(10px)',
        padding: '0.75rem 1.5rem',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    headerInfo: {
        textAlign: 'center',
    },
    layoutName: {
        fontSize: '2rem',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '1rem',
    },
    progressBar: {
        width: '100%',
        maxWidth: '400px',
        height: '10px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '10px',
        margin: '0 auto 0.5rem',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
        borderRadius: '10px',
        transition: 'width 0.5s ease',
    },
    progressText: {
        fontSize: '1rem',
        fontWeight: '600',
        opacity: 0.9,
    },

    // Content
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '2rem',
        maxWidth: '1600px',
        margin: '0 auto',
    },

    // Camera Section
    cameraSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
    },
    cameraWrapper: {
        position: 'relative',
        width: '100%',
        maxWidth: '650px',
        borderRadius: '25px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '4px solid rgba(255, 255, 255, 0.3)',
    },
    webcam: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },

    // Countdown
    countdownOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    countdownNumber: {
        fontSize: '6rem',
        fontWeight: '900',
        color: 'white',
        textShadow: '0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 4px 10px rgba(0, 0, 0, 0.9)',
        animation: 'pulse 1s ease-in-out infinite',
    },
    countdownText: {
        marginTop: '1rem',
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
    },

    // Loading
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingSpinner: {
        width: '60px',
        height: '60px',
        border: '6px solid rgba(255, 255, 255, 0.3)',
        borderTop: '6px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        marginTop: '1rem',
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: '600',
    },

    // Pose Indicator
    poseIndicator: {
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        backdropFilter: 'blur(10px)',
        padding: '0.75rem 1.5rem',
        borderRadius: '50px',
        fontSize: '1.1rem',
        fontWeight: '700',
        zIndex: 5,
    },

    // Capture Button
    captureButton: {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '1.25rem 3rem',
        fontSize: '1.3rem',
        borderRadius: '50px',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
        boxShadow: '0 15px 35px rgba(240, 147, 251, 0.4)',
        transition: 'all 0.3s ease',
        border: 'none',
        cursor: 'pointer',
    },
    captureButtonDisabled: {
        background: 'rgba(255, 255, 255, 0.3)',
        color: 'rgba(255, 255, 255, 0.7)',
        padding: '1.25rem 3rem',
        fontSize: '1.3rem',
        borderRadius: '50px',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
        cursor: 'not-allowed',
        border: 'none',
    },

    // Completion
    completionMessage: {
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    },
    completionIcon: {
        fontSize: '5rem',
        marginBottom: '1rem',
    },
    completionTitle: {
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '1rem',
        fontFamily: 'Poppins, sans-serif',
    },
    completionText: {
        fontSize: '1.1rem',
    },

    // Preview Section
    previewSection: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '25px',
        padding: '2rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        maxHeight: '85vh',
        overflowY: 'auto',
    },
    previewTitle: {
        fontSize: '1.5rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        fontFamily: 'Poppins, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    previewIcon: {
        fontSize: '1.75rem',
    },
    previewGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },

    // Preview Card
    previewCard: {
        position: 'relative',
        borderRadius: '15px',
        overflow: 'hidden',
        background: '#F3F4F6',
    },
    previewImage: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
    retakeButton: {
        position: 'absolute',
        bottom: '0.75rem',
        right: '0.75rem',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '50px',
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.3s ease',
    },
    previewPlaceholder: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
    },
    placeholderIcon: {
        fontSize: '3rem',
        marginBottom: '0.5rem',
        opacity: 0.6,
    },
    placeholderText: {
        fontSize: '1rem',
        fontWeight: '600',
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
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;
    document.head.appendChild(style);
}

export default CameraPage;
