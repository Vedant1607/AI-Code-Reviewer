import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import Editor from 'react-simple-code-editor';
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"

const App = () => {

  const [code, setCode] = useState(`function sum() {
    return 1 + 1;
  }`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_RENDER_URL || "http://localhost:5000";

  async function reviewCode() {
    if (!code.trim()) return;
    setLoading(true);
    setReview("Analyzing code...");
    try {
      const response = await axios.post(`${backendUrl}/ai/get-review`, { code });
      const result = typeof response.data === 'string' ? response.data : (response.data.review || JSON.stringify(response.data));
      setReview(result);
    } catch (err) {
      console.error("Failed to get review:", err);
      const errMsg = err.response?.data || err.message || "Failed to fetch review from backend.";
      setReview(`### ⚠️ Error\n${typeof errMsg === 'object' ? JSON.stringify(errMsg) : errMsg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full bg-[#1e1e1e]">
      <main className="h-full p-6 flex gap-4">
        
        {/* Left Panel */}
        <div className="relative h-full basis-1/2 rounded-xl bg-black p-4 font-mono text-sm overflow-y-scroll">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={16}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              background: "#000",
              color: "white",
              borderRadius: "0.75rem"
            }}
          />

          <button 
            onClick={reviewCode}
            disabled={loading}
            type="button"
            className="absolute bottom-4 right-4 rounded-xl bg-[rgb(219,219,255)] px-8 py-2 font-bold text-black select-none cursor-pointer transition hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Reviewing..." : "Review"}
          </button>
        </div>

        {/* Right Panel */}
        <div className="h-full basis-1/2 rounded-xl bg-[#343434] py-4 px-8 text-xl text-white overflow-y-scroll">
          <Markdown
            rehypePlugins={[ rehypeHighlight ]}>
            {review || "*Click 'Review' to generate code feedback.*"}
          </Markdown>
        </div>

      </main>
    </div>
  );
};

export default App;