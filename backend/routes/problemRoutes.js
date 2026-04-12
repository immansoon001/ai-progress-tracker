const express = require('express');
const router = express.Router();
const {
  getProblems,
  createProblem,
  updateProblem,
} = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getProblems).post(protect, createProblem);
router.route('/:id').put(protect, updateProblem);

module.exports = router;
