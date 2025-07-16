import React, { useState } from "react";

const RecursiveControls = ({ onGenerateTree }) => {
  const [weights, setWeights] = useState("1, 3, 4, 5");
  const [values, setValues] = useState("1, 4, 5, 7");
  const [capacity, setCapacity] = useState("7");

  const handleSubmit = () => {
    const weightArr = weights
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));

    const valueArr = values
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));

    const cap = parseInt(capacity);

    if (!weightArr.length || !valueArr.length || isNaN(cap)) {
      alert("Please enter valid inputs.");
      return;
    }

    onGenerateTree({
      weights: weightArr,
      values: valueArr,
      capacity: cap,
    });
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur rounded-xl p-4 flex flex-wrap justify-center items-end gap-6 mt-6 shadow-md">
      <div className="flex flex-col text-white gap-1">
        <label className="text-sm text-white/70 font-medium">Weights</label>
        <input
          type="text"
          value={weights}
          onChange={(e) => setWeights(e.target.value)}
          placeholder="e.g. 1, 3, 4, 5"
          className="bg-[#1e1e2f] border border-white/10 px-4 py-2 rounded-lg text-white w-56"
        />
      </div>

      <div className="flex flex-col text-white gap-1">
        <label className="text-sm text-white/70 font-medium">Values</label>
        <input
          type="text"
          value={values}
          onChange={(e) => setValues(e.target.value)}
          placeholder="e.g. 1, 4, 5, 7"
          className="bg-[#1e1e2f] border border-white/10 px-4 py-2 rounded-lg text-white w-56"
        />
      </div>

      <div className="flex flex-col text-white gap-1">
        <label className="text-sm text-white/70 font-medium">Capacity</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="e.g. 7"
          className="bg-[#1e1e2f] border border-white/10 px-4 py-2 rounded-lg text-white w-40"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 h-fit rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
      >
        Generate Tree
      </button>
    </div>
  );
};

export default RecursiveControls;
