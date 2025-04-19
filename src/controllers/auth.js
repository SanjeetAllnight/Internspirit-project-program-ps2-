// src/controllers/auth.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock database (replace this with a real DB later)
const users = [];

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) return res.status(400).json({ msg: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: Date.now(), name, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ msg: 'User registered successfully' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
};

module.exports = { signup, login };
