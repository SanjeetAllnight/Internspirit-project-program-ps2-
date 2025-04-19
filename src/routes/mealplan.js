// routes/mealplan.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/mealplan', async (req, res) => {
  const { ingredients, diet, calories } = req.body;

  const prompt = `
    Create a healthy meal plan using the following ingredients: ${ingredients.join(', ')}.
    The user follows a ${diet} diet and wants to stay under ${calories} calories.
    Provide 2-3 meals with calories and cooking steps.
  `;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    res.json({ plan: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
});

module.exports = router;
