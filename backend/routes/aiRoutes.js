const express = require('express');
const router = express.Router();
const { analyzeProgress } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// @route POST /api/ai/analyze
router.post('/analyze', protect, analyzeProgress);

module.exports = router;
