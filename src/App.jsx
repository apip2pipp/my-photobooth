import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const App = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null); // Menyimpan hasil foto
  const [countdown, setCountdown] = useState(null); // Menyimpan angka hitung mundur

  // Konfigurasi kamera
  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user" // Kamera depan
  };

  // Fungsi untuk memulai timer dan ambil foto
  const handleCapture = () => {
    setCountdown(3); // Set timer 3 detik

    let timer = 3;
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);

      if (timer === 0) {
        clearInterval(interval);
        capture(); // Ambil foto saat 0
        setCountdown(null); // Reset timer text
      }
    }, 1000);
  };

  // Fungsi inti mengambil gambar dari webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  // Fungsi untuk foto ulang
  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: '20px' }}>📸 Simple Photobooth</h1>

      {/* JIKA BELUM ADA FOTO -> TAMPILKAN KAMERA */}
      {imgSrc === null ? (
        <div style={styles.cameraBox}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
            height={500}
            videoConstraints={videoConstraints}
            mirrored={true} // Biar kayak cermin
            style={styles.webcam}
          />

          {/* TAMPILAN TIMER DI TENGAH KAMERA */}
          {countdown !== null && (
            <div style={styles.timerOverlay}>
              {countdown > 0 ? countdown : "CHEESE!"}
            </div>
          )}

          <button
            onClick={handleCapture}
            disabled={countdown !== null} // Disable tombol pas lagi hitung mundur
            style={countdown !== null ? styles.buttonDisabled : styles.buttonCapture}
          >
            {countdown !== null ? "Get Ready..." : "Ambil Foto"}
          </button>
        </div>
      ) : (
        // JIKA SUDAH ADA FOTO -> TAMPILKAN HASIL
        <div style={styles.resultBox}>
          <img src={imgSrc} alt="Hasil Foto" style={styles.resultImage} />

          <div style={styles.buttonGroup}>
            <button onClick={retake} style={styles.buttonRetake}>Foto Ulang</button>
            <button onClick={() => alert("Nanti kita buat fitur download!")} style={styles.buttonSave}>Simpan</button>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS SEDERHANA (Biar gak pusing setup CSS file dulu)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif'
  },
  cameraBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  webcam: {
    borderRadius: '10px',
    marginBottom: '20px',
    objectFit: 'cover'
  },
  timerOverlay: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '80px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '0 0 10px rgba(0,0,0,0.5)',
    zIndex: 10
  },
  buttonCapture: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: '#ff4757',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s'
  },
  buttonDisabled: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: '#ccc',
    color: '#666',
    border: 'none',
    borderRadius: '50px',
    cursor: 'not-allowed',
  },
  resultBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  resultImage: {
    borderRadius: '10px',
    maxWidth: '100%',
    width: '500px',
    border: '10px solid white',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)'
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px'
  },
  buttonRetake: {
    padding: '10px 20px',
    backgroundColor: '#747d8c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  buttonSave: {
    padding: '10px 20px',
    backgroundColor: '#2ed573',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default App;