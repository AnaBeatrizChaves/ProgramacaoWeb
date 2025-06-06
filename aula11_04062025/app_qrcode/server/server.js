const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/generate-qr', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Gerar QR Code como Data URL (imagem PNG em base64)
    const qrDataUrl = await QRCode.toDataURL(text);
    
    res.json({ qrCode: qrDataUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});