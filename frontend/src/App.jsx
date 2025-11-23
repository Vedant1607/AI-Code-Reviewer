import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import Editor from 'react-simple-code-editor';
import axios from "axios";
import Markdown from "react-markdown";

const App = () => {

  const [code, setCode] = useState(`function sum() {
    return 1 + 1;
  }`);
  const [review, setReview] = useState(``);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });

    setReview(response.data);
  }

  return (
    <div className="h-screen w-full bg-[#1e1e1e]">
      <main className="h-full p-6 flex gap-4">
        
        {/* Left Panel */}
        <div className="relative h-full basis-1/2 rounded-xl bg-black p-4 font-mono text-sm">
          <Editor
            value={code}                     // FIXED
            onValueChange={code => setCode(code)}   // FIXED
            highlight={code =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={16}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              background: "#000",          // matches your container
              color: "white",
              borderRadius: "0.75rem"      // same as rounded-xl
            }}
          />

          <button 
          onClick={reviewCode}
            type="button"
            className="absolute bottom-4 right-4 rounded-xl bg-[rgb(219,219,255)] px-8 py-2 font-bold text-black select-none cursor-pointer transition hover:bg-white"
          >
            Review
          </button>
        </div>

        {/* Right Panel */}
        <div className="h-full basis-1/2 rounded-xl bg-[#343434] py-4 px-8 text-xl text-white overflow-y-scroll">
          <Markdown>
            {review}
          </Markdown>
        </div>

      </main>
    </div>
  );
};

export default App;