import React from "react";
import useDFSStore from "./useDFSStore.js";
import { dfsTraversal } from "./dfsTraversal.js";

const DFSControls = ({ nodeIds, edgeList }) => {
  const {
    startNode,
    setStartNode,
    setDfsSteps,
    setIsRunning,
    resetTraversal,
    setSpeed,
    setPaused,
    paused,
  } = useDFSStore();

  const handleRun = () => {
    const adjList = getAdjList();
    const steps = dfsTraversal(adjList, startNode);
    console.log("DFS Steps:", steps);
    if (!steps.length) {
      alert("No traversal steps found. Check your graph connections.");
      return;
    }
    setDfsSteps(steps);
    setIsRunning(true);
    setPaused(false);
  };

  const handleReset = () => {
    resetTraversal();
    setIsRunning(false);
    setPaused(false);
  };

  const handlePause = () => {
    setPaused((prev) => !prev);
  };

  const getAdjList = () => {
    const adj = {};
    nodeIds.forEach((id) => (adj[id] = []));
    edgeList.forEach(({ source, target }) => {
      adj[source].push(target);
      adj[target].push(source);
    });
    return adj;
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white/5 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-md text-white">
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
        {/* Start Node Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm text-white/70 whitespace-nowrap">
            Start Node:
          </label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            className="flex-1 sm:flex-none bg-white/10 text-white px-3 py-2 rounded-md text-sm border border-white/20 min-w-[100px]"
          >
            {nodeIds?.map((id) => (
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
            onClick={handleRun}
            className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow text-sm sm:text-base"
          >
            Run
          </button>
          <button
            onClick={handlePause}
            className={`px-5 py-2 rounded-lg transition-all shadow text-sm sm:text-base ${
              paused
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 transition-all shadow text-sm sm:text-base"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default DFSControls;
