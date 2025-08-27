import React, { useEffect, useRef, useState } from "react";
import QuickSortControls from "./QuickSortControls";
import QuickSortTreeView from "./QuickSortTreeView";
import QuickSortExplanation from "./QuickSortExplanation";
import { generateQuickTreeSteps } from "./generateQuickTree";

const QuickSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [treeSteps, setTreeSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [activeTab, setActiveTab] = useState("visualization");
  const timeoutRef = useRef(null);

  useEffect(() => {
    const arr = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(arr);
  }, []);

  const handleSort = () => {
    const steps = generateQuickTreeSteps(array);
    setTreeSteps(steps);
    setCurrentStep(0);
    setIsSorting(true);
  };

  useEffect(() => {
    if (isSorting && currentStep < treeSteps.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else {
      setIsSorting(false);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentStep, isSorting, speed, treeSteps]);

  const handleSetArray = (arr) => {
    if (!Array.isArray(arr) || arr.length < 2) return;
    setArray(arr);
    setTreeSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
  };

  const handleReset = () => {
    const arr = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(arr);
    setTreeSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-gradient-to-br from-[#0d0d15] to-[#1a1a2e] px-4 sm:px-6 lg:px-8">
      <main className="flex-1 py-8 sm:py-12 w-full max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text">
          Quick Sort Visualizer
        </h1>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row w-full max-w-md mx-auto mb-8 rounded-xl overflow-hidden border border-white/10">
          {["visualization", "explanation"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-white/10 text-white"
                  : "bg-transparent text-white/50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "visualization" && (
          <>
            {/* Controls */}
            <QuickSortControls
              onSort={handleSort}
              onReset={handleReset}
              setSpeed={setSpeed}
              onSetArray={handleSetArray}
            />

            {/* Visualization */}
            <div className="mt-10 sm:mt-12 overflow-x-auto">
              <QuickSortTreeView
                node={treeSteps.length > 0 ? treeSteps[currentStep] : { array }}
              />
            </div>

            {/* Time Complexity */}
            <div className="mt-14 sm:mt-16 w-full max-w-5xl mx-auto px-2">
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text text-center">
                Time Complexity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base text-white/90">
                {[
                  {
                    op: "Best Case",
                    best: "O(n log n)",
                    avg: "O(n log n)",
                    worst: "O(n^2)",
                  },
                  {
                    op: "Space",
                    best: "O(log n)",
                    avg: "O(log n)",
                    worst: "O(n)",
                  },
                ].map(({ op, best, avg, worst }, i) => (
                  <div
                    key={i}
                    className="border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all"
                  >
                    <div className="font-semibold text-purple-300 mb-2 text-base">
                      {op}
                    </div>
                    <div>
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

        {activeTab === "explanation" && (
          <div className="px-2 sm:px-4 md:px-6">
            <QuickSortExplanation />
          </div>
        )}
      </main>
    </div>
  );
};

export default QuickSortVisualizer;
