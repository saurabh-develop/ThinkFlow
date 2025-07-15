import React, { useState } from "react";

const BubbleSortControls = ({
  onSort,
  onReset,
  setSpeed,
  setArray,
  isSorting,
  setIsSorting, 
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = () => {
    try {
      const cleaned = input
        .replace(/\[|\]/g, "")
        .split(",")
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n));

      if (cleaned.length > 1) {
        setArray(cleaned);
      } else {
        alert("Please enter at least two valid numbers.");
      }
    } catch {
      alert("Invalid input format. Use: [3, 1, 4, 2]");
    }
  };

  const randomize = () => {
    const random = Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(random);
    setInput("");
  };

  const baseBtn =
    "px-4 py-2 rounded-lg font-medium transition-all shadow text-white";

  return (
    <div className="w-full bg-white/5 backdrop-blur rounded-xl p-4 flex flex-wrap justify-center items-center gap-4 mt-6 shadow-md">
      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="[5, 3, 8, 1]"
        className="bg-[#1e1e2f] border border-white/10 px-4 py-2 rounded-lg text-white w-56"
      />

      <button
        onClick={handleInputChange}
        className={`${baseBtn} bg-purple-600 hover:bg-purple-700`}
      >
        Set Array
      </button>

      <button
        onClick={randomize}
        className={`${baseBtn} bg-white/10 hover:bg-white/20`}
      >
        Randomize
      </button>

      <button
        onClick={onReset}
        className={`${baseBtn} bg-white/10 hover:bg-white/20`}
      >
        Reset
      </button>

      <button
        onClick={onSort}
        className={`${baseBtn} bg-purple-500 hover:bg-purple-600`}
      >
        Sort
      </button>

      {/* Speed */}
      <div className="flex flex-col items-center text-white text-sm">
        <label htmlFor="speed" className="mb-1 text-purple-300">
          Speed
        </label>
        <input
          type="range"
          min="1"
          max="250"
          defaultValue="50"
          onChange={(e) => setSpeed(500 - Number(e.target.value))}
          className="w-44 appearance-none h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 accent-purple-500"
        />
      </div>

      {/* Pause/Resume */}
      <button
        onClick={() => setIsSorting((prev) => !prev)}
        className={`${baseBtn} ${
          isSorting
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isSorting ? "Pause" : "Resume"}
      </button>
    </div>
  );
};

export default BubbleSortControls;
