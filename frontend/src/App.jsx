import { useState } from "react";
import API from "./api";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const res = await API.post("/ai/analyze", {}, { timeout: 30000 });

      const aiResponse = res.data?.aiResponse;

      // ✅ Handle string OR object safely
      if (!aiResponse) {
        setData("No response from AI");
      } else if (typeof aiResponse === "string") {
        setData(aiResponse);
      } else {
        setData(JSON.stringify(aiResponse, null, 2));
      }

    } catch (err) {
      console.error("FULL ERROR:", err);

      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message;

      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-5">
        AI Progress Tracker 🚀
      </h1>

      {/* BUTTON */}
      <button
        onClick={handleAnalyze}
        className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Analyze Progress"}
      </button>

      {/* RESULT */}
      {data && (
        <div className="mt-6 p-4 bg-gray-800 rounded">
          <h2 className="text-xl mb-2">AI Insights</h2>

          <pre className="whitespace-pre-wrap text-green-300">
            {data}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;