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

const calculateScores = (answers) => {
  // Helper function to count words in a string
  const countWords = (str) => {
    if (!str || typeof str !== 'string') return 0;
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Helper function to clamp value between 0 and 100
  const clamp = (value) => {
    return Math.min(100, Math.max(0, value));
  };

  // Calculate word counts
  const wordCounts = {
    problem: countWords(answers.problem),
    targetCustomer: countWords(answers.targetCustomer),
    existingAlternatives: countWords(answers.existingAlternatives),
    solution: countWords(answers.solution),
    techStackThoughts: countWords(answers.techStackThoughts),
    biggestRisks: countWords(answers.biggestRisks)
  };

  // Calculate scores based on word counts
  // For most fields, more words = higher score (up to a reasonable limit)
  // For biggestRisks, more words = lower risk = higher score (inverse relationship)
  
  const scores = {
    problemValidation: clamp(wordCounts.problem * 5), // ~20 words = 100
    marketMaturity: clamp(wordCounts.targetCustomer * 5), // ~20 words = 100
    competition: clamp(wordCounts.existingAlternatives * 5), // ~20 words = 100
    differentiation: clamp(wordCounts.solution * 5), // ~20 words = 100
    techFeasibility: clamp(wordCounts.techStackThoughts * 5), // ~20 words = 100
    riskUncertainty: clamp(100 - (wordCounts.biggestRisks * 5)) // More words = lower risk = higher score
  };

  return scores;
};

module.exports = {
  calculateInsightScore,
  calculateScores
};

