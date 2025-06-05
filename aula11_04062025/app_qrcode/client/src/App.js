import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateQRCode = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }

      const data = await response.json();
      setQrCode(data.qrCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <div className="input-container">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encode in QR code"
          rows={5}
        />
        <button onClick={generateQRCode} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate QR Code'}
        </button>
      </div>
      
      {error && <p className="error">{error}</p>}
      
      {qrCode && (
        <div className="qr-container">
          <h2>Your QR Code</h2>
          <img src={qrCode} alt="Generated QR Code" />
          <a href={qrCode} download="qrcode.png">
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}

export default App;