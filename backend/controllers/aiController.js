import axios from "axios";

export const analyzeProgress = async (req, res) => {
  try {
    console.log("⏳ Request started");

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: "Say hello" }],
          },
        ],
      },
      {
        timeout: 20000, // ⬅️ backend timeout
      }
    );

    console.log("✅ Response received");

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ aiResponse: text });

  } catch (error) {
    console.error("🔥 BACKEND ERROR:", error.message);

    res.status(500).json({
      message: "AI request failed",
      error: error.message,
    });
  }
};