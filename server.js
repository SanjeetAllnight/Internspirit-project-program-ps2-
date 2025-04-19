// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const mealplanRoute = require('./src/routes/mealplan');
const ocrRoute = require('./src/routes/ocr');

app.use(cors());
app.use(express.json());

app.use('/api/mealplan', mealplanRoute);
app.use('/api/ocr', ocrRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// server.js
const authRoute = require('./src/routes/authroute');
app.use('/api/auth', authRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
