const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const { analyzeIdeaWithAi } = require('../services/aiIdeaAnalysisService');

// POST /api/ideas - Create a new idea
router.post('/', async (req, res) => {
  try {
    const { founderName, ideaTitle, answers } = req.body;

    console.log('📝 Creating new idea:', ideaTitle);
    console.log('   Founder:', founderName);

    // Analyze idea using AI (with fallback to heuristic methods)
    const { scores, leanCanvas, source } = await analyzeIdeaWithAi(answers);

    console.log('📊 Analysis completed. Source:', source);

    // Remove internal source markers before saving
    const cleanScores = { ...scores };
    delete cleanScores._source;
    const cleanLeanCanvas = { ...leanCanvas };
    delete cleanLeanCanvas._source;

    // Create new Idea document
    const idea = new Idea({
      founderName,
      ideaTitle,
      answers,
      scores: cleanScores,
      leanCanvas: cleanLeanCanvas,
      analysisSource: source // Track whether AI or heuristic was used
    });

    const savedIdea = await idea.save();
    console.log('✅ Idea saved with ID:', savedIdea._id);
    console.log('   Analysis source:', savedIdea.analysisSource);
    
    res.json(savedIdea);
  } catch (error) {
    console.error('❌ Error creating idea:', error);
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

// POST /api/ideas/test-ai - Test AI analysis endpoint
router.post('/test-ai', async (req, res) => {
  try {
    const { analyzeIdeaWithAi, isAiAvailable } = require('../services/aiIdeaAnalysisService');
    
    // Check AI availability
    const aiAvailable = isAiAvailable();
    
    // Test answers
    const testAnswers = {
      problem: 'Küçük işletmeler için muhasebe ve finansal yönetim süreçleri çok karmaşık ve zaman alıcı. Manuel işlemler hata riski taşıyor ve maliyetli yazılımlar küçük işletmeler için uygun değil.',
      targetCustomer: 'Küçük ve orta ölçekli işletmeler (KOBİ), özellikle 5-50 çalışanı olan şirketler, serbest çalışanlar ve danışmanlar.',
      existingAlternatives: 'Mevcut çözümler arasında QuickBooks, Xero, Sage gibi uluslararası platformlar var. Türkiye\'de Logo, Nebim gibi yerel çözümler mevcut ancak bunlar genellikle pahalı ve karmaşık.',
      solution: 'AI destekli, bulut tabanlı bir muhasebe ve finansal yönetim platformu. Otomatik fatura işleme, akıllı kategorizasyon, gerçek zamanlı raporlama ve Türk muhasebe standartlarına uyumlu bir sistem.',
      revenueModel: 'Aylık abonelik modeli (SaaS). Temel plan 99 TL/ay, Pro plan 199 TL/ay, Enterprise plan özel fiyatlandırma. Ayrıca entegrasyon ve danışmanlık hizmetleri için ek gelir.',
      techStackThoughts: 'Backend: Node.js + Express + MongoDB. Frontend: React. AI: OpenAI API veya benzeri LLM servisleri. Bulut: AWS veya Azure. Ölçeklenebilir mikroservis mimarisi.',
      biggestRisks: 'Rekabet yoğunluğu, müşteri edinme maliyetleri, veri güvenliği ve uyumluluk gereksinimleri. Ayrıca Türk muhasebe mevzuatındaki değişikliklere hızlı adapte olma ihtiyacı.'
    };

    if (!aiAvailable) {
      return res.status(400).json({ 
        error: 'AI is not available',
        message: 'Please set AI_API_URL and AI_API_KEY environment variables',
        testAnswers: testAnswers
      });
    }

    // Test AI analysis
    const result = await analyzeIdeaWithAi(testAnswers);

    res.json({
      success: true,
      aiAvailable: true,
      analysisSource: result.source,
      scores: result.scores,
      leanCanvas: result.leanCanvas,
      testAnswers: testAnswers,
      message: result.source === 'ai' 
        ? 'AI analysis completed successfully!' 
        : 'AI analysis failed, used heuristic fallback'
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;

