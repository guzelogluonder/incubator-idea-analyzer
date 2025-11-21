const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const { calculateScores } = require('../services/insightService');
const { buildLeanCanvas } = require('../services/leanCanvasService');

// POST /api/ideas - Create a new idea
router.post('/', async (req, res) => {
  try {
    const { founderName, ideaTitle, answers } = req.body;

    // Calculate scores from answers
    const scores = calculateScores(answers);

    // Build lean canvas from answers
    const leanCanvas = buildLeanCanvas(answers);

    // Create new Idea document
    const idea = new Idea({
      founderName,
      ideaTitle,
      answers,
      scores,
      leanCanvas
    });

    const savedIdea = await idea.save();
    res.json(savedIdea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/ideas - Get all ideas sorted by createdAt ascending
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: 1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/ideas/:id - Get a single idea by ID
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(500).json({ error: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

