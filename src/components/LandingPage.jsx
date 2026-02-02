import React from 'react';
import { getThemeColors } from '../utils/themeConfig';
import ThemeToggleButton from './ThemeToggleButton';

const LandingPage = ({ onGetStarted, theme, toggleTheme }) => {
    const colors = getThemeColors(theme);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ ...styles.landingPage, background: colors.background }}>
            {/* Theme Toggle */}
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />

            {/* Gradient Background Overlay */}
            {theme === 'dark' && <div style={styles.gradientOverlay}></div>}

            {/* Navigation */}
            <nav style={{ ...styles.nav, background: colors.navBg, borderBottom: `1px solid ${colors.cardBorder}` }}>
                <div style={styles.navContainer}>
                    <div style={styles.logo}>
                        <svg style={styles.logoSvg} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="25" width="80" height="65" rx="8" fill="url(#grad1)"/>
                            <rect x="15" y="30" width="70" height="50" rx="6" fill="white" opacity="0.9"/>
                            <circle cx="50" cy="55" r="18" fill="url(#grad2)"/>
                            <circle cx="50" cy="55" r="12" fill="white" opacity="0.3"/>
                            <rect x="70" y="35" width="10" height="10" rx="2" fill="#EC4899"/>
                            <path d="M35 15 L45 15 L50 25 L35 25 Z" fill="url(#grad1)"/>
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor:'#EC4899',stopOpacity:1}} />
                                    <stop offset="100%" style={{stopColor:'#8B5CF6',stopOpacity:1}} />
                                </linearGradient>
                                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor:'#EC4899',stopOpacity:1}} />
                                    <stop offset="100%" style={{stopColor:'#8B5CF6',stopOpacity:1}} />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span style={styles.logoText}>One 2 Kie</span>
                    </div>
                    <div style={styles.navLinks}>
                        <a onClick={() => scrollToSection('home')} style={{ ...styles.navLink, color: colors.textSecondary }}>Home</a>
                        <a onClick={() => scrollToSection('faq')} style={{ ...styles.navLink, color: colors.textSecondary }}>FAQ</a>
                        <a onClick={() => scrollToSection('privacy')} style={{ ...styles.navLink, color: colors.textSecondary }}>Privacy</a>
                        <a onClick={() => scrollToSection('about')} style={{ ...styles.navLink, color: colors.textSecondary }}>About</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" style={styles.hero}>
                <div style={styles.heroContent}>
                    <div className="animate-fadeIn">
                        <div style={styles.badge}>✨ Free Photo Booth Online</div>
                        <h1 style={{ ...styles.heroTitle, color: colors.text }}>
                            One 2 Kie
                            <br />
                            <span style={styles.heroTitleGradient}>PhotoBooth Free</span>
                        </h1>
                        <p style={{ ...styles.heroSubtitle, color: colors.textSecondary }}>
                            Abadikan momen terbaik kamu dengan berbagai pilihan layout menarik.
                            <br />
                            Gratis, mudah, dan langsung bisa di-download!
                        </p>
                        <div style={styles.heroButtons}>
                            <button
                                onClick={onGetStarted}
                                style={styles.primaryButton}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(236, 72, 153, 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.3)';
                                }}
                            >
                                🚀 Get Started
                            </button>
                            <button
                                onClick={() => scrollToSection('faq')}
                                style={{ ...styles.secondaryButton, 
                                    background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '2px solid rgba(0, 0, 0, 0.15)',
                                    color: colors.text 
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                                }}
                            >
                                Learn More →
                            </button>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div style={styles.decorativeCircle1}></div>
                    <div style={styles.decorativeCircle2}></div>
                </div>
            </section>

            {/* Features Section */}
            <section style={styles.features}>
                <div style={styles.container}>
                    <h2 style={{ ...styles.sectionTitle, color: colors.text }}>Kenapa Pilih One 2 Kie?</h2>
                    <div style={styles.featuresGrid}>
                        <div style={{ ...styles.featureCard, background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }} className="animate-slideInUp">
                            <div style={styles.featureIconWrapper}>
                                <div style={styles.featureIcon}>📸</div>
                            </div>
                            <h3 style={{ ...styles.featureTitle, color: colors.text }}>Berbagai Layout</h3>
                            <p style={{ ...styles.featureText, color: colors.textSecondary }}>
                                Pilih dari 4 layout berbeda dengan jumlah pose 2, 3, 4, atau 6 foto
                            </p>
                        </div>
                        <div style={{ ...styles.featureCard, background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }} className="animate-slideInUp">
                            <div style={styles.featureIconWrapper}>
                                <div style={styles.featureIcon}>🎨</div>
                            </div>
                            <h3 style={{ ...styles.featureTitle, color: colors.text }}>Custom Background</h3>
                            <p style={{ ...styles.featureText, color: colors.textSecondary }}>
                                Edit warna background sesuai keinginan untuk hasil yang personal
                            </p>
                        </div>
                        <div style={{ ...styles.featureCard, background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }} className="animate-slideInUp">
                            <div style={styles.featureIconWrapper}>
                                <div style={styles.featureIcon}>⚡</div>
                            </div>
                            <h3 style={{ ...styles.featureTitle, color: colors.text }}>Mudah & Cepat</h3>
                            <p style={{ ...styles.featureText, color: colors.textSecondary }}>
                                Proses sederhana: pilih layout, ambil foto, edit, dan download!
                            </p>
                        </div>
                        <div style={{ ...styles.featureCard, background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }} className="animate-slideInUp">
                            <div style={styles.featureIconWrapper}>
                                <div style={styles.featureIcon}>💯</div>
                            </div>
                            <h3 style={{ ...styles.featureTitle, color: colors.text }}>100% Gratis</h3>
                            <p style={{ ...styles.featureText, color: colors.textSecondary }}>
                                Tidak ada biaya tersembunyi. Semua fitur gratis untuk kamu!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" style={styles.faq}>
                <div style={styles.container}>
                    <h2 style={{ ...styles.sectionTitle, color: colors.text }}>Frequently Asked Questions</h2>
                    <div style={styles.faqList}>
                        {[
                            {
                                q: "Bagaimana cara menggunakan One 2 Kie?",
                                a: "Sangat mudah! Klik 'Get Started', pilih layout yang kamu suka, ambil foto dengan kamera, edit warna background jika perlu, dan download hasilnya. Selesai!"
                            },
                            {
                                q: "Apakah ada biaya untuk menggunakan layanan ini?",
                                a: "Tidak sama sekali! One 2 Kie Photo Booth 100% gratis tanpa batasan penggunaan."
                            },
                            {
                                q: "Apakah bisa digunakan di HP?",
                                a: "Ya! Website ini responsive dan bisa digunakan di smartphone, tablet, atau desktop."
                            },
                            {
                                q: "Apakah foto saya aman?",
                                a: "Semua proses dilakukan di browser kamu. Kami tidak menyimpan foto kamu di server manapun. Privasi kamu terjaga 100%."
                            }
                        ].map((item, index) => (
                            <div key={index} style={{ ...styles.faqItem, background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
                                <h3 style={{ ...styles.faqQuestion, color: colors.text }}>❓ {item.q}</h3>
                                <p style={{ ...styles.faqAnswer, color: colors.textSecondary }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Privacy Section */}
            <section id="privacy" style={styles.privacy}>
                <div style={styles.container}>
                    <h2 style={{ ...styles.sectionTitle, color: colors.text }}>Privacy Policy</h2>
                    <div style={styles.privacyContent}>
                        <div style={{ ...styles.privacyCard, background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
                            <h3 style={{ ...styles.privacySubtitle, color: colors.text }}>🔒 Keamanan & Privasi Anda</h3>
                            <p style={{ ...styles.privacyText, color: colors.textSecondary }}>
                                One 2 Kie Photo Booth sangat menghargai privasi Anda. Semua foto diproses
                                langsung di browser Anda tanpa upload ke server.
                            </p>
                            <div style={styles.privacyPoints}>
                                <div style={styles.privacyPoint}>
                                    <span style={styles.privacyIcon}>✓</span>
                                    <span style={{ ...styles.privacyPointText, color: colors.textSecondary }}>Tidak ada penyimpanan data</span>
                                </div>
                                <div style={styles.privacyPoint}>
                                    <span style={styles.privacyIcon}>✓</span>
                                    <span style={{ ...styles.privacyPointText, color: colors.textSecondary }}>Akses kamera dapat dicabut kapan saja</span>
                                </div>
                                <div style={styles.privacyPoint}>
                                    <span style={styles.privacyIcon}>✓</span>
                                    <span style={{ ...styles.privacyPointText, color: colors.textSecondary }}>Tanpa tracking atau analytics</span>
                                </div>
                                <div style={styles.privacyPoint}>
                                    <span style={styles.privacyIcon}>✓</span>
                                    <span style={{ ...styles.privacyPointText, color: colors.textSecondary }}>100% aman dan terpercaya</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" style={styles.about}>
                <div style={styles.container}>
                    <h2 style={{ ...styles.sectionTitle, color: colors.text }}>About the Creator</h2>
                    <div style={styles.aboutContent}>
                        <div style={{ ...styles.aboutCard, background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
                            <div style={styles.aboutIcon}>👨‍💻</div>
                            <h3 style={{ ...styles.aboutName, color: colors.text }}>Kieee Zakie</h3>
                            <p style={{ ...styles.aboutDescription, color: colors.textSecondary }}>
                                One 2 Kie Photo Booth dibuat dengan ❤️ untuk memberikan pengalaman photo booth
                                yang menyenangkan dan mudah diakses oleh siapa saja.
                            </p>
                            <div style={{ ...styles.aboutStats, borderTop: `1px solid ${colors.cardBorder}`, borderBottom: `1px solid ${colors.cardBorder}` }}>
                                <div style={styles.statItem}>
                                    <div style={styles.statNumber}>100%</div>
                                    <div style={{ ...styles.statLabel, color: colors.textSecondary }}>Free</div>
                                </div>
                                <div style={styles.statItem}>
                                    <div style={styles.statNumber}>0</div>
                                    <div style={{ ...styles.statLabel, color: colors.textSecondary }}>Ads</div>
                                </div>
                                <div style={styles.statItem}>
                                    <div style={styles.statNumber}>∞</div>
                                    <div style={{ ...styles.statLabel, color: colors.textSecondary }}>Photos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ ...styles.footer, borderTop: `1px solid ${colors.cardBorder}` }}>
                <div style={styles.container}>
                    <p style={{ ...styles.footerText, color: colors.textSecondary }}>
                        © 2026 One 2 Kie Photo Booth Free. Made with ❤️ for everyone.
                    </p>
                </div>
            </footer>
        </div>
    );
};

// Styles - Dark Modern Theme
const styles = {
    landingPage: {
        width: '100%',
        minHeight: '100vh',
        background: '#0F0A1E',
        position: 'relative',
        overflow: 'hidden',
    },

    gradientOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0,
    },

    // Navigation
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1000,
        padding: '1.25rem 0',
    },
    navContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1.5rem',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
    },
    logoIcon: {
        fontSize: '2rem',
    },
    logoText: {
        background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    logoSvg: {
        width: '40px',
        height: '40px',
    },
    navLinks: {
        display: 'flex',
        gap: '2.5rem',
        alignItems: 'center',
    },
    navLink: {
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
        fontSize: '1rem',
        position: 'relative',
    },

    // Hero Section
    hero: {
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        zIndex: 1,
    },
    heroContent: {
        position: 'relative',
        textAlign: 'center',
        zIndex: 1,
        padding: '2rem',
        maxWidth: '900px',
    },
    badge: {
        display: 'inline-block',
        background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        color: '#FFFFFF',
        padding: '0.75rem 2rem',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)',
    },
    heroTitle: {
        fontSize: '5rem',
        fontWeight: '900',
        marginBottom: '1.5rem',
        lineHeight: '1.1',
        fontFamily: 'Poppins, sans-serif',
    },
    heroTitleGradient: {
        background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    heroSubtitle: {
        fontSize: '1.35rem',
        marginBottom: '3rem',
        lineHeight: '1.8',
    },
    heroButtons: {
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    primaryButton: {
        background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        color: '#FFFFFF',
        padding: '1.25rem 3rem',
        fontSize: '1.2rem',
        borderRadius: '50px',
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    secondaryButton: {
        backdropFilter: 'blur(10px)',
        padding: '1.25rem 3rem',
        fontSize: '1.2rem',
        borderRadius: '50px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },

    // Decorative Elements
    decorativeCircle1: {
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'float 6s ease-in-out infinite',
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite reverse',
    },

    // Sections
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1,
    },
    sectionTitle: {
        fontSize: '3rem',
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: '4rem',
        fontFamily: 'Poppins, sans-serif',
    },

    // Features
    features: {
        padding: '8rem 0',
        position: 'relative',
        zIndex: 1,
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2.5rem',
    },
    featureCard: {
        padding: '2.5rem',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        textAlign: 'center',
        transition: 'all 0.4s ease',
        cursor: 'default',
    },
    featureIconWrapper: {
        width: '80px',
        height: '80px',
        margin: '0 auto 1.5rem',
        background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)',
    },
    featureIcon: {
        fontSize: '2.5rem',
    },
    featureTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '1rem',
        fontFamily: 'Poppins, sans-serif',
    },
    featureText: {
        lineHeight: '1.7',
    },

    // FAQ
    faq: {
        padding: '8rem 0',
        position: 'relative',
        zIndex: 1,
    },
    faqList: {
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    faqItem: {
        backdropFilter: 'blur(10px)',
        padding: '2.5rem',
        borderRadius: '20px',
    },
    faqQuestion: {
        fontSize: '1.35rem',
        fontWeight: '700',
        marginBottom: '1rem',
        fontFamily: 'Poppins, sans-serif',
    },
    faqAnswer: {
        lineHeight: '1.8',
    },

    // Privacy
    privacy: {
        padding: '8rem 0',
        position: 'relative',
        zIndex: 1,
    },
    privacyContent: {
        maxWidth: '900px',
        margin: '0 auto',
    },
    privacyCard: {
        backdropFilter: 'blur(10px)',
        padding: '3rem',
        borderRadius: '24px',
    },
    privacySubtitle: {
        fontSize: '1.75rem',
        fontWeight: '700',
        marginBottom: '1.5rem',
        fontFamily: 'Poppins, sans-serif',
    },
    privacyText: {
        lineHeight: '1.8',
        marginBottom: '2rem',
    },
    privacyPoints: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    privacyPoint: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    privacyIcon: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    },
    privacyPointText: {
        // color applied inline with theme
    },

    // About
    about: {
        padding: '8rem 0',
        position: 'relative',
        zIndex: 1,
    },
    aboutContent: {
        maxWidth: '800px',
        margin: '0 auto',
    },
    aboutCard: {
        backdropFilter: 'blur(10px)',
        padding: '4rem',
        borderRadius: '24px',
        textAlign: 'center',
    },
    aboutIcon: {
        fontSize: '5rem',
        marginBottom: '1.5rem',
    },
    aboutName: {
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        fontFamily: 'Poppins, sans-serif',
    },
    aboutDescription: {
        lineHeight: '1.8',
        marginBottom: '3rem',
        fontSize: '1.1rem',
    },
    aboutStats: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '2.5rem 0',
    },
    statItem: {
        textAlign: 'center',
    },
    statNumber: {
        fontSize: '3.5rem',
        fontWeight: '900',
        background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontFamily: 'Poppins, sans-serif',
    },
    statLabel: {
        fontSize: '1rem',
        fontWeight: '600',
        marginTop: '0.5rem',
    },

    // Footer
    footer: {
        padding: '3rem 0',
        position: 'relative',
        zIndex: 1,
    },
    footerText: {
        textAlign: 'center',
        fontSize: '0.95rem',
    },
};

export default LandingPage;
