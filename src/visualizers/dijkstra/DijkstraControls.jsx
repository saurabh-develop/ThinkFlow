import React from "react";

const DijkstraControls = ({
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
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Start Node */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-white/70 whitespace-nowrap">
            Start Node:
          </label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            className="flex-1 bg-white/10 text-white px-3 py-2 rounded-md text-sm border border-white/20"
          >
            {nodeIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        {/* Speed Control */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-sm text-white/70 whitespace-nowrap">
            Speed:
          </label>
          <input
            type="range"
            min="1"
            max="250"
            value={500 - speed}
            onChange={(e) => setSpeed(500 - Number(e.target.value))}
            className="w-full sm:w-44 appearance-none h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 accent-purple-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onRun}
            className="flex-1 px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow"
          >
            Run
          </button>

          {!isRunning && !paused ? (
            <button
              onClick={() => setPaused(true)}
              className="flex-1 px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black transition-all shadow"
            >
              Pause
            </button>
          ) : (
            <button
              onClick={() => setPaused(false)}
              className="flex-1 px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow"
            >
              Resume
            </button>
          )}

          <button
            onClick={onReset}
            className="flex-1 px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 transition-all shadow"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default DijkstraControls;
