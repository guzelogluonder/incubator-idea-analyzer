/**
 * AI Idea Analysis Service
 * Generates scores and lean canvas using LLM API
 * Falls back to heuristic methods if AI is unavailable
 */

const axios = require('axios');
const { calculateScores } = require('./insightService');
const { buildLeanCanvas } = require('./leanCanvasService');

// Environment configuration
const AI_API_URL = process.env.AI_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const AI_API_KEY = process.env.AI_API_KEY; // secret key
const AI_MODEL = process.env.AI_MODEL || 'llama3-70b-8192';
const AI_ENABLED = process.env.AI_ENABLED !== 'false'; // Default: true if not explicitly disabled

/**
 * Check if AI is available
 * @returns {boolean}
 */
const isAiAvailable = () => {
  const available = AI_ENABLED && AI_API_URL && AI_API_KEY;
  
  // Debug logging
  if (!available) {
    console.log('AI Availability Check:');
    console.log('  AI_ENABLED:', AI_ENABLED);
    console.log('  AI_API_URL:', AI_API_URL ? 'Set' : 'NOT SET');
    console.log('  AI_API_KEY:', AI_API_KEY ? 'Set' : 'NOT SET');
  }
  
  return available;
};

/**
 * Generate scores using AI
 * @param {Object} answers - User answers
 * @returns {Promise<Object>} Scores object
 */
const generateAiScores = async (answers) => {
  if (!isAiAvailable()) {
    throw new Error('AI is not available');
  }

  try {
    const prompt = buildScoresPrompt(answers);

    // Build request payload
    const requestPayload = {
      model: AI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'Sen deneyimli bir girişim analisti ve yatırımcısısın. Girişim fikirlerini objektif ve detaylı bir şekilde analiz ediyorsun. Türkçe yanıt veriyorsun. Yanıtların sadece JSON formatında olmalı, başka açıklama ekleme.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    };

    // Add response_format for models that support it
    // Groq models (llama3) and OpenAI GPT models support JSON mode
    if (AI_MODEL.includes('gpt-4') || AI_MODEL.includes('gpt-3.5') || AI_MODEL.includes('llama3')) {
      requestPayload.response_format = { type: 'json_object' };
    }

    const response = await axios.post(
      AI_API_URL,
      requestPayload,
      {
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    // Validate response structure
    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error('Invalid API response structure');
    }

    const aiResponse = response.data.choices[0].message.content;
    if (!aiResponse) {
      throw new Error('Empty response from AI');
    }

    // Try to parse JSON (handle cases where AI might add extra text)
    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch (parseError) {
      // Try to extract JSON from response if it's wrapped in text
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error(`Failed to parse JSON response: ${parseError.message}`);
      }
    }

    // Validate and normalize scores
    return {
      problemValidation: normalizeScore(parsed.problemValidation),
      marketMaturity: normalizeScore(parsed.marketMaturity),
      competition: normalizeScore(parsed.competition),
      differentiation: normalizeScore(parsed.differentiation),
      techFeasibility: normalizeScore(parsed.techFeasibility),
      riskUncertainty: normalizeScore(parsed.riskUncertainty),
      _source: 'ai'
    };

  } catch (error) {
    console.error('Error generating AI scores:', error.message);
    if (error.response) {
      console.error('API Response Status:', error.response.status);
      console.error('API Response Data:', error.response.data);
      throw new Error(`AI API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('No response received from AI API');
      throw new Error('AI API request failed: No response received');
    } else {
      throw new Error(`AI scores generation failed: ${error.message}`);
    }
  }
};

/**
 * Generate Lean Canvas using AI
 * @param {Object} answers - User answers
 * @returns {Promise<Object>} Lean Canvas object
 */
const generateAiLeanCanvas = async (answers) => {
  if (!isAiAvailable()) {
    throw new Error('AI is not available');
  }

  try {
    const prompt = buildLeanCanvasPrompt(answers);

    // Build request payload
    const requestPayload = {
      model: AI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'Sen deneyimli bir girişim danışmanısın ve Lean Canvas uzmanısın. Girişim fikirlerinden detaylı ve profesyonel Lean Canvas oluşturuyorsun. Türkçe yanıt veriyorsun. Yanıtların sadece JSON formatında olmalı, başka açıklama ekleme.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    };

    // Add response_format for models that support it
    // Groq models (llama3) and OpenAI GPT models support JSON mode
    if (AI_MODEL.includes('gpt-4') || AI_MODEL.includes('gpt-3.5') || AI_MODEL.includes('llama3')) {
      requestPayload.response_format = { type: 'json_object' };
    }

    const response = await axios.post(
      AI_API_URL,
      requestPayload,
      {
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    // Validate response structure
    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error('Invalid API response structure');
    }

    const aiResponse = response.data.choices[0].message.content;
    if (!aiResponse) {
      throw new Error('Empty response from AI');
    }

    // Try to parse JSON
    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch (parseError) {
      // Try to extract JSON from response if it's wrapped in text
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error(`Failed to parse JSON response: ${parseError.message}`);
      }
    }

    // Validate and return lean canvas
    return {
      problem: parsed.problem || '',
      solution: parsed.solution || '',
      uniqueValueProp: parsed.uniqueValueProp || '',
      customerSegments: parsed.customerSegments || '',
      channels: parsed.channels || '',
      revenueStreams: parsed.revenueStreams || '',
      costStructure: parsed.costStructure || '',
      keyMetrics: parsed.keyMetrics || '',
      unfairAdvantage: parsed.unfairAdvantage || '',
      _source: 'ai'
    };

  } catch (error) {
    console.error('Error generating AI lean canvas:', error.message);
    if (error.response) {
      console.error('API Response Status:', error.response.status);
      console.error('API Response Data:', error.response.data);
      throw new Error(`AI API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('No response received from AI API');
      throw new Error('AI API request failed: No response received');
    } else {
      throw new Error(`AI lean canvas generation failed: ${error.message}`);
    }
  }
};

/**
 * Analyze idea using AI (scores + lean canvas)
 * Falls back to heuristic methods if AI fails
 * @param {Object} answers - User answers
 * @returns {Promise<Object>} Object with scores and leanCanvas
 */
const analyzeIdeaWithAi = async (answers) => {
  // Check AI availability first
  const aiAvailable = isAiAvailable();
  
  if (!aiAvailable) {
    console.warn('⚠️  AI is not available. Using heuristic methods.');
    console.warn('   To enable AI, set AI_API_URL and AI_API_KEY environment variables.');
    
    // Fallback to heuristic methods
    const scores = calculateScores(answers);
    const leanCanvas = buildLeanCanvas(answers);

    return {
      scores: { ...scores, _source: 'heuristic' },
      leanCanvas: { ...leanCanvas, _source: 'heuristic' },
      source: 'heuristic'
    };
  }

  // Try AI first
  console.log('🤖 Attempting AI analysis...');
  console.log('   Model:', AI_MODEL);
  console.log('   API URL:', AI_API_URL);
  
  try {
    console.log('   Generating scores and lean canvas...');
    const [scores, leanCanvas] = await Promise.all([
      generateAiScores(answers),
      generateAiLeanCanvas(answers)
    ]);

    console.log('✅ AI analysis completed successfully!');
    return {
      scores,
      leanCanvas,
      source: 'ai'
    };
  } catch (error) {
    console.error('❌ AI analysis failed!');
    console.error('   Error:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Response:', JSON.stringify(error.response.data, null, 2));
    }
    console.warn('   Falling back to heuristic methods...');
    
    // Fallback to heuristic methods
    const scores = calculateScores(answers);
    const leanCanvas = buildLeanCanvas(answers);

    return {
      scores: { ...scores, _source: 'heuristic' },
      leanCanvas: { ...leanCanvas, _source: 'heuristic' },
      source: 'heuristic'
    };
  }
};

/**
 * Build prompt for scores generation
 */
const buildScoresPrompt = (answers) => {
  return `Aşağıda bir girişim fikrinin detayları bulunmaktadır. 
Lütfen her kategori için 0-100 arası bir skor ver ve JSON formatında yanıt ver.

GİRİŞİMCİNİN CEVAPLARI:
- Problem: ${answers.problem || 'Belirtilmemiş'}
- Hedef Müşteri: ${answers.targetCustomer || 'Belirtilmemiş'}
- Mevcut Alternatifler: ${answers.existingAlternatives || 'Belirtilmemiş'}
- Çözüm: ${answers.solution || 'Belirtilmemiş'}
- Gelir Modeli: ${answers.revenueModel || 'Belirtilmemiş'}
- Teknoloji Yığını Düşünceleri: ${answers.techStackThoughts || 'Belirtilmemiş'}
- En Büyük Riskler: ${answers.biggestRisks || 'Belirtilmemiş'}

Lütfen aşağıdaki JSON formatında yanıt ver (sadece JSON, başka açıklama yok):

{
  "problemValidation": 75,
  "marketMaturity": 65,
  "competition": 70,
  "differentiation": 80,
  "techFeasibility": 60,
  "riskUncertainty": 55
}

Skorlama kriterleri:
- problemValidation: Problem tanımının netliği, aciliyeti ve gerçekçiliği (0-100)
- marketMaturity: Pazarın olgunluğu ve hedef müşteri segmentinin netliği (0-100)
- competition: Rekabet analizinin derinliği ve alternatiflerin farkındalığı (0-100)
- differentiation: Çözümün farklılaşma gücü ve benzersiz değer önerisi (0-100)
- techFeasibility: Teknik fizibilite ve teknoloji yığını uygunluğu (0-100)
- riskUncertainty: Risk farkındalığı ve belirsizlik yönetimi (0-100, yüksek farkındalık = yüksek skor)`;
};

/**
 * Build prompt for lean canvas generation
 */
const buildLeanCanvasPrompt = (answers) => {
  return `Aşağıda bir girişim fikrinin detayları bulunmaktadır. 
Lütfen bu bilgilere dayanarak profesyonel bir Lean Canvas oluştur ve JSON formatında yanıt ver.

GİRİŞİMCİNİN CEVAPLARI:
- Problem: ${answers.problem || 'Belirtilmemiş'}
- Hedef Müşteri: ${answers.targetCustomer || 'Belirtilmemiş'}
- Mevcut Alternatifler: ${answers.existingAlternatives || 'Belirtilmemiş'}
- Çözüm: ${answers.solution || 'Belirtilmemiş'}
- Gelir Modeli: ${answers.revenueModel || 'Belirtilmemiş'}
- Teknoloji Yığını Düşünceleri: ${answers.techStackThoughts || 'Belirtilmemiş'}
- En Büyük Riskler: ${answers.biggestRisks || 'Belirtilmemiş'}

Lütfen aşağıdaki JSON formatında yanıt ver (sadece JSON, başka açıklama yok):

{
  "problem": "Müşterilerin karşılaştığı temel problemler (2-3 madde)",
  "solution": "Önerilen çözüm yaklaşımı (2-3 madde)",
  "uniqueValueProp": "Benzersiz değer önerisi (1 cümle)",
  "customerSegments": "Hedef müşteri segmentleri",
  "channels": "Müşterilere ulaşma kanalları",
  "revenueStreams": "Gelir modelleri ve akışları",
  "costStructure": "Ana maliyet kalemleri",
  "keyMetrics": "İzlenmesi gereken ana metrikler",
  "unfairAdvantage": "Sürdürülebilir rekabet avantajı"
}

Her alan için detaylı, profesyonel ve gerçekçi içerik üret.`;
};

/**
 * Normalize score to 0-100 range
 */
const normalizeScore = (score) => {
  if (typeof score !== 'number') {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round(score)));
};

module.exports = {
  analyzeIdeaWithAi,
  generateAiScores,
  generateAiLeanCanvas,
  isAiAvailable
};

