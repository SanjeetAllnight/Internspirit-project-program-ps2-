// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./src/routes/authroute');
const ocrRoutes = require('./src/routes/ocr');
const mealPlanRoutes = require('./src/routes/mealplan');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/mealplan', mealPlanRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('AI Nutrition Assistant API Running 💪🥗');
});

module.exports = app;
