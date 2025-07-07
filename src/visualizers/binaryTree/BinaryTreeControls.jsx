import React, { useState } from "react";

const BinaryTreeControls = ({ onInsert, onTraverse, onReset }) => {
  const [value, setValue] = useState("");
  const [parent, setParent] = useState("");
  const [side, setSide] = useState("left");

  const handleInsert = () => {
    if (value === "") return;
    if (parent === "" && side !== "") {
      alert("Provide parent value for left/right insert.");
      return;
    }
    onInsert(Number(value), parent, side);
    setValue("");
    setParent("");
    setSide("left");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
      <input
        type="number"
        placeholder="Node value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-3 py-2 rounded bg-[#1e1e2f] text-white border border-white/10"
      />
      <input
        type="number"
        placeholder="Parent value"
        value={parent}
        onChange={(e) => setParent(e.target.value)}
        className="px-3 py-2 rounded bg-[#1e1e2f] text-white border border-white/10"
      />
      <select
        value={side}
        onChange={(e) => setSide(e.target.value)}
        className="px-3 py-2 rounded bg-[#1e1e2f] text-white border border-white/10"
      >
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
      <button
        onClick={handleInsert}
        className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700"
      >
        Insert
      </button>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
      >
        Reset
      </button>
    </div>
  );
};

export default BinaryTreeControls;
