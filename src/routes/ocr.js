// routes/ocr.js

const express = require('express');
const router = express.Router();
const Tesseract = require('tesseract.js');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/ocr', authMiddleware, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No image uploaded');

  try {
    const result = await Tesseract.recognize(req.file.buffer, 'eng');
    res.json({ text: result.data.text });
  } catch (error) {
    console.error(error);
    res.status(500).send('OCR failed');
  }
});

module.exports = router;
