const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.js');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Static assets para sa Vercel
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Database Connection
connectDB();

// API Routes
app.use('/api/songs', require('./routes/songRoutes'));

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🔥 Backend server running on port ${PORT}`));
}

module.exports = app;