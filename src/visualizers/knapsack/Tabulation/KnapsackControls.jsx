import React, { useState } from "react";

const KnapsackControls = ({
  isPlaying,
  onPlayPause,
  onNext,
  onReset,
  onSpeedChange,
  onCustomInput,
}) => {
  const [weightInput, setWeightInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [capacityInput, setCapacityInput] = useState("");

  const handleSubmit = () => {
    const weights = weightInput
      .split(",")
      .map((w) => parseInt(w.trim()))
      .filter((n) => !isNaN(n));
    const values = valueInput
      .split(",")
      .map((v) => parseInt(v.trim()))
      .filter((n) => !isNaN(n));
    const capacity = parseInt(capacityInput);
    const validCapacity = !isNaN(capacity) && capacity > 0 ? capacity : 10;

    const defaultWeights = [2, 3, 4, 5];
    const defaultValues = [3, 4, 5, 6];

    onCustomInput({
      weights: weights.length ? weights : defaultWeights,
      values: values.length ? values : defaultValues,
      capacity: validCapacity,
    });
  };

  const baseBtn =
    "px-4 py-2 rounded-lg font-medium transition shadow text-white";

  return (
    <div className="w-full bg-white/5 backdrop-blur rounded-xl p-4 space-y-4 shadow-md text-white">
      <div className="flex flex-wrap justify-center gap-4">
        <input
          type="text"
          value={weightInput}
          onChange={(e) => setWeightInput(e.target.value)}
          placeholder="Weights (e.g. 2,3,4)"
          className="bg-[#1e1e2f] border border-white/10 px-4 py-2 rounded-lg w-48"
        />
        <input
          type="text"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder="Values (e.g. 3,4,5)"
          className="bg-[#1e1e2f] border border-white/10 px-4 py-2 rounded-lg w-48"
        />
        <input
          type="number"
          value={capacityInput}
          onChange={(e) => setCapacityInput(e.target.value)}
          placeholder="Capacity (e.g. 10)"
          className="bg-[#1e1e2f] border border-white/10 px-4 py-2 rounded-lg w-36"
        />
        <button
          onClick={handleSubmit}
          className={`${baseBtn} bg-green-600 hover:bg-green-700`}
        >
          Load Items
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <button
          onClick={onPlayPause}
          className={`${baseBtn} bg-purple-600 hover:bg-purple-700`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={onNext}
          className={`${baseBtn} bg-blue-600 hover:bg-blue-700`}
        >
          Next
        </button>
        <button
          onClick={onReset}
          className={`${baseBtn} bg-red-600 hover:bg-red-700`}
        >
          Reset
        </button>

        {/* Speed Slider */}
        <div className="flex flex-col items-center text-sm">
          <label className="mb-1 text-purple-300">Speed</label>
          <input
            type="range"
            min="1"
            max="250"
            defaultValue={50}
            onChange={(e) => onSpeedChange(500 - Number(e.target.value))}
            className="w-44 appearance-none h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default KnapsackControls;
