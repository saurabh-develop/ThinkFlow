import React from "react";

const BFSControls = ({
  startNode,
  setStartNode,
  onRun,
  onReset,
  speed,
  setSpeed,
  paused,
  setPaused,
  isRunning,
  nodeIds,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white/5 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-md text-white">
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
        {/* Start Node */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm text-white/70 whitespace-nowrap">
            Start Node:
          </label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            className="flex-1 sm:flex-none bg-white/10 text-white px-3 py-2 rounded-md text-sm border border-white/20 min-w-[100px]"
          >
            {nodeIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
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
        <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center sm:justify-end">
          <button
            onClick={onRun}
            className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow text-sm sm:text-base"
          >
            Run
          </button>
          {!paused ? (
            <button
              onClick={() => setPaused((p) => !p)}
              className="px-5 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black transition-all shadow text-sm sm:text-base"
              disabled={!isRunning}
            >
              Pause
            </button>
          ) : (
            <button
              onClick={() => setPaused(false)}
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow text-sm sm:text-base"
            >
              Resume
            </button>
          )}
          <button
            onClick={onReset}
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 transition-all shadow text-sm sm:text-base"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BFSControls;
