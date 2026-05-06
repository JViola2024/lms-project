require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const log = require('./utils/logger');

const apiRoutes = require('./routes/api');
const app = express();

// --- Server setup ---
const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

// --- Connect database ---
mongoose
  .connect(URI)
  .then(() => log.db('Connected to database!'))
  .catch((error) => log.error('[DATABASE] DB Connection Error:', error));

// --- REST API endpoints ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'LMS API is running...' });
});

app.use('/api', apiRoutes);

// --- Start server ---
app.listen(PORT, () => {
  log.server(`Server running on port ${PORT}!`);
});

module.exports = app;
