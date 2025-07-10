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
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Start Node */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-white/70">Start Node:</label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            className="bg-white/10 text-white px-3 py-2 rounded-md text-sm border border-white/20"
          >
            {nodeIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-white/70">Speed:</label>
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
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onRun}
            className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow"
          >
            Run
          </button>
          {!paused ? (
            <button
              onClick={() => setPaused((p) => !p)}
              className="px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black transition-all shadow"
              disabled={!isRunning}
            >
              Pause
            </button>
          ) : (
            <button
              onClick={() => setPaused(false)}
              className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow"
            >
              Resume
            </button>
          )}

          <button
            onClick={onReset}
            className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 transition-all shadow"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BFSControls;
