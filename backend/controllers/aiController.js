const Problem = require('../models/Problem');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Analyze user's problem solving progress using Gemini AI
// @route   POST /api/ai/analyze
// @access  Private
const analyzeProgress = async (req, res) => {
  try {
    const problems = await Problem.find({ userId: req.user._id });

    if (!problems || problems.length === 0) {
      return res.status(200).json({
        weakTopics: [],
        strongTopics: [],
        suggestions: ["Add some problems to get an analysis!"],
        dailyPlan: "Add at least 3 problems to start tracking your progress."
      });
    }

    // Ensure API Key exists
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'Gemini API key is missing from environment variables' });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Using a currently supported model for generateContent
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format data for the prompt
    const problemsSummary = problems.map(function (p) {
      return `Topic: ${p.topic}, Difficulty: ${p.difficulty}, Status: ${p.status}`;
    }).join('\n');

    const prompt = `
      You are an AI programming mentor analyzing a user's coding practice problems.
      Here is the list of problems the user has logged:
      
      ${problemsSummary}
      
      Analyze this data and return ONLY a valid JSON object without any markdown codes (no backticks) containing the following exact structure:
      {
        "weakTopics": ["array of strings (topics where user struggles or has most pending)"],
        "strongTopics": ["array of strings (topics where user excels or has solved)"],
        "suggestions": ["array of strings (2-3 actionable tips based on their data)"],
        "dailyPlan": "string (A concise customized daily study plan based on their weak topics)"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up potential markdown formatting from Gemini if it outputs backticks anyway
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();

    const analysis = JSON.parse(text);

    res.status(200).json(analysis);

  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ message: 'Failed to analyze progress. ' + error.message });
  }
};

module.exports = { analyzeProgress };
