import React, { useState } from "react";
import ArrayControls from "./ArrayControls";
import ArrayBox from "./ArrayBox";
import Sidebar from "@/components/pages/SideBar";
import ArrayExplanation from "./ArrayExplanation";

const ArrayVisualizer = () => {
  const [array, setArray] = useState([5, 3, 8, 1]);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [pathIndices, setPathIndices] = useState([]);
  const [activeTab, setActiveTab] = useState("visualization");

  const animatePath = (targetIndex, callback) => {
    const steps = Array.from({ length: targetIndex + 1 }, (_, i) => i);

    let i = 0;
    const interval = setInterval(() => {
      setPathIndices(steps.slice(0, i + 1));

      if (i === steps.length - 1) {
        clearInterval(interval);
        setHighlightIndex(targetIndex);
        setTimeout(() => {
          callback?.();
          setHighlightIndex(null);
          setPathIndices([]);
        }, 600);
      }
      i++;
    }, 300);
  };

  return (
    <div className="flex min-h-screen text-white">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-8 py-10 text-white">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text text-center">
          Array Visualizer
        </h1>

        {/* Tab Switch */}
        <div className="flex w-full max-w-xl mx-auto mb-8 rounded-xl overflow-hidden border border-white/10">
          <button
            className={`w-1/2 py-2 font-semibold transition-colors ${
              activeTab === "visualization"
                ? "bg-white/10 text-white"
                : "bg-transparent text-white/50"
            }`}
            onClick={() => setActiveTab("visualization")}
          >
            Visualization
          </button>
          <button
            className={`w-1/2 py-2 font-semibold transition-colors ${
              activeTab === "explanation"
                ? "bg-white/10 text-white"
                : "bg-transparent text-white/50"
            }`}
            onClick={() => setActiveTab("explanation")}
          >
            Explanation
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "visualization" && (
          <>
            {/* Controls */}
            <div className="w-full max-w-5xl mx-auto">
              <ArrayControls
                array={array}
                setArray={setArray}
                animatePath={animatePath}
              />
            </div>

            {/* Boxes */}
            <div className="flex justify-center mt-12 flex-wrap gap-4 max-w-5xl mx-auto">
              {array.map((value, index) => (
                <ArrayBox
                  key={index}
                  value={value}
                  index={index}
                  highlight={highlightIndex === index}
                  pathIndex={
                    pathIndices.includes(index)
                      ? pathIndices.indexOf(index)
                      : undefined
                  }
                />
              ))}
            </div>

            {/* Time Complexity Section */}
            <div className="mt-16 w-full max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text text-center">
                Time Complexity
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm text-white/90">
                {[
                  { op: "Access", best: "O(1)", avg: "O(1)", worst: "O(1)" },
                  { op: "Search", best: "O(1)", avg: "O(n)", worst: "O(n)" },
                  { op: "Insert", best: "O(1)", avg: "O(n)", worst: "O(n)" },
                  { op: "Delete", best: "O(1)", avg: "O(n)", worst: "O(n)" },
                ].map(({ op, best, avg, worst }, i) => (
                  <div
                    key={i}
                    className="border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all"
                  >
                    <div className="font-semibold text-purple-300 mb-2 text-base">
                      {op}
                    </div>
                    <div className="text-base">
                      <p>
                        <span className="text-purple-400">Best:</span> {best}
                      </p>
                      <p>
                        <span className="text-purple-400">Avg:</span> {avg}
                      </p>
                      <p>
                        <span className="text-purple-400">Worst:</span> {worst}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "explanation" && <ArrayExplanation />}
      </main>
    </div>
  );
};

export default ArrayVisualizer;
