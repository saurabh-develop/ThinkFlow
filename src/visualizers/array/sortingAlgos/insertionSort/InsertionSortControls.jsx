import React, { useState } from "react";

const InsertionSortControls = ({
  onSort,
  onReset,
  setSpeed,
  setArray,
  algorithm = "insertion",
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

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
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
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
      >
        Set Array
      </button>

      <button
        onClick={randomize}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg"
      >
        Randomize
      </button>

      <button
        onClick={onReset}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg"
      >
        Reset
      </button>

      <button
        onClick={() => onSort(algorithm)}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        Sort
      </button>

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
    </div>
  );
};

export default InsertionSortControls;
