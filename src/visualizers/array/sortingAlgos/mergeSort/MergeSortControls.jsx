import React, { useState } from "react";

const MergeSortControls = ({ onSort, onReset, setSpeed, onSetArray }) => {
  const [customInput, setCustomInput] = useState("");

  const handleSetArray = () => {
    const parsed = customInput
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));
    if (parsed.length > 1) {
      onSetArray(parsed);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 backdrop-blur rounded-xl px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow">
      {/* Custom input */}
      <div className="flex flex-col sm:flex-row items-center gap-2 flex-1">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Enter comma-separated numbers"
          className="bg-black/20 border border-white/10 text-white px-3 py-2 rounded-md w-full sm:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/50"
        />
        <button
          onClick={handleSetArray}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition"
        >
          Set Array
        </button>
      </div>

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

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSort}
          className="bg-gradient-to-r from-[#e84aff] to-[#8b3dff] hover:opacity-90 text-white text-sm px-4 py-2 rounded-md transition"
        >
          Start Sort
        </button>
        <button
          onClick={onReset}
          className="bg-white/10 hover:bg-white/20 text-white/90 text-sm px-4 py-2 rounded-md transition"
        >
          Randomize
        </button>
      </div>
    </div>
  );
};

export default MergeSortControls;
