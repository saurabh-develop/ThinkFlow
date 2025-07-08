import React, { useState } from "react";

const QuickSortControls = ({ onSort, onReset, setSpeed, onSetArray }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = () => {
    const parts = inputValue.split(",").map((n) => parseInt(n.trim()));
    if (parts.some(isNaN)) return;
    onSetArray(parts);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md text-white">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex gap-4">
          <button
            onClick={onSort}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow"
          >
            Start Sort
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 transition-all shadow"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm text-white/70">Speed:</label>
          <input
            type="range"
            min="100"
            max="1500"
            step="100"
            defaultValue="500"
            className="w-40 accent-purple-500"
            onChange={(e) => setSpeed(Number(500 - e.target.value))}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <input
          type="text"
          placeholder="Enter numbers (e.g. 5,3,8,1)"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/40 text-sm text-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={handleInput}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all shadow"
        >
          Set Array
        </button>
      </div>
    </div>
  );
};

export default QuickSortControls;
