const App = () => {
  return (
    <div className="h-full w-full">
      <main className="h-full p-6 flex gap-4">
        {/* Left */}
        <div className="h-full basis-1/2 rounded-xl bg-black relative">
          <div></div>
          <div className="absolut bottom-4 right-4 bg-blue-300 text-black rounded-xl px-8 py-2 font-bold cursor-pointer select-none">
            Review
          </div>
        </div>

        {/* Right */}
        <div className="h-full basis-1/2 rounded-xl bg-[#343434]"></div>
      </main>
    </div>
  );
};

export default App;
