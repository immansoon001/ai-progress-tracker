const Problem = require('../models/Problem');

// @desc    Get user problems
// @route   GET /api/problems
// @access  Private
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ userId: req.user._id });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new problem
// @route   POST /api/problems
// @access  Private
const createProblem = async (req, res) => {
  try {
    const { title, platform, difficulty, topic, status } = req.body;

    if (!title || !platform || !difficulty || !topic) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    const problem = await Problem.create({
      userId: req.user._id,
      title,
      platform,
      difficulty,
      topic,
      status: status || 'Pending',
    });

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update problem
// @route   PUT /api/problems/:id
// @access  Private
const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Check for user ownership
    if (problem.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this problem' });
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProblems,
  createProblem,
  updateProblem,
};
