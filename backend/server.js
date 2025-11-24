// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const ideasRouter = require('./routes/ideas');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/ideas', ideasRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  const { isAiAvailable } = require('./services/aiIdeaAnalysisService');
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    aiEnabled: isAiAvailable()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Check AI configuration
  const { isAiAvailable } = require('./services/aiIdeaAnalysisService');
  if (isAiAvailable()) {
    console.log('✅ AI Analysis is ENABLED');
    console.log(`   Model: ${process.env.AI_MODEL || 'llama3-70b-8192'}`);
  } else {
    console.log('⚠️  AI Analysis is DISABLED');
    console.log('   Set AI_API_URL and AI_API_KEY to enable AI analysis');
  }
});

module.exports = app;

