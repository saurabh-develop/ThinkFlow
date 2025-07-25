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
    <div className="flex min-h-screen text-white">
      <main className="flex-1 px-4 sm:px-8 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text">
          ⚡ Quick Sort Visualizer
        </h2>

        {/* Tabs */}
        <div className="flex w-full max-w-xl mx-auto mb-8 rounded-xl overflow-hidden border border-white/10">
          {["visualization", "explanation"].map((tab) => (
            <button
              key={tab}
              className={`w-1/2 py-2 font-semibold transition-colors ${
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
            <QuickSortControls
              onSort={handleSort}
              onReset={handleReset}
              setSpeed={setSpeed}
              onSetArray={handleSetArray}
            />

            <div className="mt-12">
              <QuickSortTreeView
                node={treeSteps.length > 0 ? treeSteps[currentStep] : { array }}
              />
            </div>

            {/* Time Complexity */}
            <div className="mt-16 w-full max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text text-center">
                Time Complexity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-white/90">
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

        {activeTab === "explanation" && <QuickSortExplanation />}
      </main>
    </div>
  );
};

export default QuickSortVisualizer;
