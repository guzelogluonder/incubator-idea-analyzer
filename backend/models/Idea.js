const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  founderName: {
    type: String,
    trim: true
  },
  ideaTitle: {
    type: String,
    trim: true
  },
  answers: {
    problem: {
      type: String
    },
    targetCustomer: {
      type: String
    },
    existingAlternatives: {
      type: String
    },
    solution: {
      type: String
    },
    revenueModel: {
      type: String
    },
    techStackThoughts: {
      type: String
    },
    biggestRisks: {
      type: String
    }
  },
  scores: {
    problemValidation: {
      type: Number
    },
    marketMaturity: {
      type: Number
    },
    competition: {
      type: Number
    },
    differentiation: {
      type: Number
    },
    techFeasibility: {
      type: Number
    },
    riskUncertainty: {
      type: Number
    }
  },
  leanCanvas: {
    problem: {
      type: String
    },
    solution: {
      type: String
    },
    uniqueValueProp: {
      type: String
    },
    customerSegments: {
      type: String
    },
    channels: {
      type: String
    },
    revenueStreams: {
      type: String
    },
    costStructure: {
      type: String
    },
    keyMetrics: {
      type: String
    },
    unfairAdvantage: {
      type: String
    }
  },
  analysisSource: {
    type: String,
    enum: ['ai', 'heuristic'],
    default: 'heuristic'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Idea', IdeaSchema);

