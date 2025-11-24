/**
 * AI Configuration Checker
 * Run this script to verify your AI setup
 * Usage: node check-ai-config.js
 */

const { isAiAvailable } = require('./services/aiIdeaAnalysisService');

console.log('🔍 Checking AI Configuration...\n');

console.log('Environment Variables:');
console.log('  AI_ENABLED:', process.env.AI_ENABLED !== 'false' ? '✅ true' : '❌ false');
console.log('  AI_API_URL:', process.env.AI_API_URL ? `✅ ${process.env.AI_API_URL}` : '❌ NOT SET');
console.log('  AI_API_KEY:', process.env.AI_API_KEY ? `✅ Set (${process.env.AI_API_KEY.substring(0, 10)}...)` : '❌ NOT SET');
console.log('  AI_MODEL:', process.env.AI_MODEL || 'llama3-70b-8192 (default)');
console.log('');

const available = isAiAvailable();

if (available) {
  console.log('✅ AI is AVAILABLE and ready to use!');
  console.log('');
  console.log('To test AI analysis, use:');
  console.log('  curl -X POST http://localhost:4000/api/ideas/test-ai');
} else {
  console.log('❌ AI is NOT AVAILABLE');
  console.log('');
  console.log('To enable AI analysis:');
  console.log('1. Create a .env file in the backend directory');
  console.log('2. Add the following variables:');
  console.log('');
  console.log('   AI_API_URL=https://api.groq.com/openai/v1/chat/completions');
  console.log('   AI_API_KEY=gsk-your-groq-api-key-here');
  console.log('   AI_MODEL=llama3-70b-8192');
  console.log('   AI_ENABLED=true');
  console.log('');
  console.log('3. Restart your server');
}

console.log('');

