import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';

const App = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const codeSnippet = `function hello() {
  console.log("Hello, Prism!");
}`;

  return (
    <div className="h-full w-full bg-[#1e1e1e]">
      <main className="h-full p-6 flex gap-4">
        
        {/* Left Panel */}
        <div className="relative h-full basis-1/2 rounded-xl bg-black p-4 font-mono text-sm">
          <pre className="h-full w-full overflow-auto">
            <code className="language-javascript rounded-xl">
              {codeSnippet}
            </code>
          </pre>
          
          <button 
            type="button"
            className="absolute bottom-4 right-4 rounded-xl bg-[rgb(219,219,255)] px-8 py-2 font-bold text-black select-none cursor-pointer transition hover:bg-white"
          >
            Review
          </button>
        </div>

        {/* Right Panel */}
        <div className="h-full basis-1/2 rounded-xl bg-[#343434]">
          {/* Other content would go here */}
        </div>

      </main>
    </div>
  );
};

export default App;