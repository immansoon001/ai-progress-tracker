import axios from "axios";

export const analyzeProgress = async (req, res) => {
  try {
    const prompt = `
User solved problems:
Array: 5
Graph: 1
DP: 0

Give:
- weak topics
- suggestions
- daily plan
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ aiResponse: text });

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};