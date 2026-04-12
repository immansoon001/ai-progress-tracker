const express = require('express');
const router = express.Router();
const { testRoute } = require('../controllers/testController');

// @route GET /api/test
router.get('/test', testRoute);

module.exports = router;
