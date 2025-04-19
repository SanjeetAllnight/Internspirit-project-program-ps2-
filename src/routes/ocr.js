// routes/ocr.js
const express = require('express');
const router = express.Router();
const Tesseract = require('tesseract.js');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/ocr', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No image uploaded');

  try {
    const result = await Tesseract.recognize(req.file.buffer, 'eng');
    res.json({ text: result.data.text });
  } catch (err) {
    console.error(err);
    res.status(500).send('OCR failed');
  }
});

module.exports = router;
