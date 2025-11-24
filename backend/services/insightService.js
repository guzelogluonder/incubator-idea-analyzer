/**
 * Insight Score Calculation Service
 * Calculates a score based on idea completeness and quality
 */

const calculateInsightScore = (idea) => {
  let score = 0;
  const maxScore = 100;

  // Check if required fields are filled
  const requiredFields = [
    'title',
    'description',
    'problem',
    'solution',
    'targetMarket',
    'competitiveAdvantage',
    'revenueModel',
    'keyMetrics',
    'channels',
    'costStructure'
  ];

  // Base score for completeness (60 points)
  const completenessScore = 60;
  const filledFields = requiredFields.filter(field => {
    const value = idea[field];
    return value && value.trim().length > 0;
  });
  
  const completeness = filledFields.length / requiredFields.length;
  score += completenessScore * completeness;

  // Quality score based on content length (40 points)
  const qualityScore = 40;
  let qualityMultiplier = 0;

  // Title quality (5 points)
  if (idea.title && idea.title.length >= 10 && idea.title.length <= 100) {
    qualityMultiplier += 0.125;
  }

  // Description quality (10 points)
  if (idea.description && idea.description.length >= 50) {
    qualityMultiplier += 0.25;
  }

  // Problem statement quality (10 points)
  if (idea.problem && idea.problem.length >= 30) {
    qualityMultiplier += 0.25;
  }

  // Solution quality (10 points)
  if (idea.solution && idea.solution.length >= 30) {
    qualityMultiplier += 0.25;
  }

  // Target market quality (5 points)
  if (idea.targetMarket && idea.targetMarket.length >= 20) {
    qualityMultiplier += 0.125;
  }

  score += qualityScore * qualityMultiplier;

  // Round to 2 decimal places
  return Math.round(score * 100) / 100;
};

/**
 * Keyword weight sets for different score categories
 */
const PROBLEM_KEYWORDS = {
  pain: 10, pains: 10,
  costly: 10, expensive: 10,
  inefficient: 12,
  manual: 10,
  slow: 8, delays: 8, delay: 8,
  fragmented: 12,
  risk: 10, risks: 10,
  compliance: 8,
  uncertainty: 8,
};

const MARKET_KEYWORDS = {
  market: 8,
  segment: 10, segmented: 10,
  niche: 6,
  b2b: 8, b2c: 8,
  enterprise: 8,
  startup: 6, startups: 6,
  early: 5, adopters: 5,
  smb: 6,
  global: 6,
  tam: 10, sam: 10, som: 10,
};

const COMPETITION_KEYWORDS = {
  competitor: 10, competitors: 10,
  alternative: 8, alternatives: 8,
  incumbent: 10,
  existing: 6,
  manual: 6,
  spreadsheet: 6, excel: 6,
  marketplace: 6,
  saturated: 10,
  crowded: 10,
};

const DIFFERENTIATION_KEYWORDS = {
  unique: 10, uniquely: 10,
  different: 8,
  innovative: 8, innovation: 8,
  personalized: 6,
  automated: 6, automation: 6,
  ai: 8, "machine-learning": 8, ml: 8,
  "data-driven": 8,
  integrated: 6,
};

const TECH_KEYWORDS = {
  api: 8, apis: 8,
  microservice: 8, microservices: 8,
  event: 5, "event-driven": 8,
  queue: 6, kafka: 6, rabbitmq: 6,
  react: 5, vue: 5, angular: 5,
  node: 5, "node.js": 5,
  python: 5, django: 5, flask: 5,
  postgres: 5, mongodb: 5,
  docker: 5, kubernetes: 5,
  scalable: 8, scaling: 8,
  latency: 6,
  reliability: 6, resilient: 6,
};

const RISK_KEYWORDS = {
  risk: 10, risks: 10,
  uncertainty: 10,
  adoption: 8,
  churn: 8,
  regulation: 8, regulatory: 8,
  compliance: 8,
  funding: 6,
  liquidity: 6,
  "go-to-market": 6,
  competition: 6,
  dependency: 6,
};

/**
 * Helper function to score an answer based on keywords, length, and repetition
 * @param {string} text - The text to score
 * @param {Object} keywordWeights - Object mapping keywords to their point values
 * @param {Object} options - Scoring options
 * @param {number} options.minWords - Minimum word count (default: 15)
 * @param {number} options.maxWords - Maximum word count (default: 120)
 * @param {number} options.baseLengthWeight - Weight multiplier for word count (default: 0.5)
 * @returns {number} Score between 0 and 100
 */
const scoreAnswer = (text, keywordWeights, options = {}) => {
  const { minWords = 15, maxWords = 120, baseLengthWeight = 0.5 } = options;

  // Return 0 if text is empty or only whitespace
  if (!text || typeof text !== 'string' || !text.trim()) {
    return 0;
  }

  // Split text into words
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  let score = 0;

  // Length scoring
  const wordCount = words.length;
  if (wordCount < minWords) {
    score -= 20; // Penalty for too few words
  }
  if (wordCount > maxWords) {
    score -= 10; // Penalty for too many words
  }
  score += Math.min(30, wordCount * baseLengthWeight);

  // Keyword matching
  const lowerText = text.toLowerCase();
  Object.entries(keywordWeights).forEach(([keyword, weight]) => {
    const lowerKeyword = keyword.toLowerCase();
    // Count occurrences of keyword (case-insensitive)
    const regex = new RegExp(`\\b${lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      score += matches.length * weight;
    }
  });

  // Repetition penalty
  const wordFreq = {};
  words.forEach(word => {
    const lowerWord = word.toLowerCase();
    wordFreq[lowerWord] = (wordFreq[lowerWord] || 0) + 1;
  });

  Object.entries(wordFreq).forEach(([word, count]) => {
    if (count > 3) {
      const repeats = count - 3;
      score -= repeats * 5; // Penalty for excessive repetition
    }
  });

  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, score));
};

/**
 * Calculate detailed scores for an idea based on answers
 * Uses heuristic and keyword-based scoring system
 * @param {Object} answers - Object containing answer fields
 * @returns {Object} Object with score values for each category
 */
const calculateScores = (answers) => {
  // Problem Validation
  const problemValidation = scoreAnswer(
    answers.problem,
    PROBLEM_KEYWORDS,
    { minWords: 15, maxWords: 120 }
  );

  // Market Maturity
  const marketMaturity = scoreAnswer(
    answers.targetCustomer,
    MARKET_KEYWORDS,
    { minWords: 10, maxWords: 100 }
  );

  // Competition
  const competition = scoreAnswer(
    answers.existingAlternatives,
    COMPETITION_KEYWORDS,
    { minWords: 10, maxWords: 120 }
  );

  // Differentiation
  const differentiation = scoreAnswer(
    answers.solution,
    DIFFERENTIATION_KEYWORDS,
    { minWords: 15, maxWords: 120 }
  );

  // Tech Feasibility
  const techFeasibility = scoreAnswer(
    answers.techStackThoughts,
    TECH_KEYWORDS,
    { minWords: 10, maxWords: 150 }
  );

  // Risk Uncertainty (higher awareness = higher score)
  const awarenessScore = scoreAnswer(
    answers.biggestRisks,
    RISK_KEYWORDS,
    { minWords: 10, maxWords: 150 }
  );
  const riskUncertainty = Math.min(100, awarenessScore + 10);

  return {
    problemValidation,
    marketMaturity,
    competition,
    differentiation,
    techFeasibility,
    riskUncertainty,
  };
};

module.exports = {
  calculateInsightScore,
  calculateScores
};

