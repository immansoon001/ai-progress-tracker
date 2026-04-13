import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeProgress = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro",
    });

    const prompt = `
User solved problems:
Array: 5
Graph: 1
DP: 0

Analyze and return:
- weak topics
- suggestions
- daily plan
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    res.json({ aiResponse: text });

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};