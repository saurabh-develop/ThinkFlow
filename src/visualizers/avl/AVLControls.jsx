import React, { useState } from "react";

const AVLControls = ({
  avlTree,
  setAvlTree,
  setDeletedNode,
  setRotationHistory,
  onReset,
}) => {
  const [input, setInput] = useState("");

  const handleInsert = () => {
    if (!input) return;
    const value = parseInt(input);
    if (isNaN(value)) return;
    const clone = avlTree.clone();
    const rotationLog = [];
    clone.insert(value, rotationLog);
    setRotationHistory(rotationLog);
    setAvlTree(clone);
    setInput("");
  };

  const handleReset = () => {
    setInput("");
    if (onReset) onReset();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter value"
        className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white w-60"
      />
      <button
        onClick={handleInsert}
        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        Insert
      </button>
      <button
        onClick={handleReset}
        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold"
      >
        Reset
      </button>
    </div>
  );
};

export default AVLControls;
