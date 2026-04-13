const express = require('express');
const { analyzeProgress } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// @route POST /api/ai/analyze

const router = express.Router();
router.post("/analyze", analyzeProgress);

module.exports = router;