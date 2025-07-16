import React, { useState, useEffect } from "react";
import useRecursiveSteps from "./useRecursiveSteps";
import RecursiveTreeCanvas from "./RecursiveTreeCanvas";
import RecursiveControls from "./RecursiveControls";
import KnapsackInfoPanel from "./KnapsackInfoPanel";
import RecursionExplanation from "./RecursionExplanation";

const KnapsackRecursiveVisualizer = () => {
  const [weights, setWeights] = useState([1, 3, 4, 5]);
  const [values, setValues] = useState([1, 4, 5, 7]);
  const [capacity, setCapacity] = useState(7);
  const [treeData, setTreeData] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("visualization");

  const handleGenerateTree = ({ weights, values, capacity }) => {
    setWeights(weights);
    setValues(values);
    setCapacity(capacity);
    const { root, traversal } = useRecursiveSteps(weights, values, capacity);
    setTreeData(root);
    setSteps(traversal);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && Array.isArray(steps) && currentStep < steps.length - 1) {
      const id = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(id);
    }
  }, [isPlaying, currentStep, steps]);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
        🎯 Knapsack Recursive Tree Visualizer
      </h1>

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
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg">
            <RecursiveControls
              weights={weights}
              values={values}
              capacity={capacity}
              setWeights={setWeights}
              setValues={setValues}
              setCapacity={setCapacity}
              onGenerateTree={handleGenerateTree}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onReset={handleReset}
            />
          </div>

          <div className="mt-6">
            <KnapsackInfoPanel
              values={values}
              weights={weights}
              capacity={capacity}
            />
          </div>

          <div className="mt-8 border border-white/5 rounded-lg shadow-inner bg-[#1a1a2f] p-4 sm:p-6">
            {treeData ? (
              <RecursiveTreeCanvas
                root={treeData}
                highlightNode={steps.length > 0 ? steps[currentStep] : null}
              />
            ) : (
              <div className="text-center text-white/50 py-20">
                🔍 Enter weights and values, then click <b>Generate Tree</b> to
                begin.
              </div>
            )}
          </div>
          <div className="mt-6 border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all">
            <p>
              ⏱️ <strong>Time Complexity:</strong>
            </p>
            <ul className="list-disc list-inside leading-relaxed">
              <li>
                <b>Time Complexity:</b> T(n, W) = 2ⁿ (Exponential)
              </li>
              <li>
                <b>Space Complexity:</b> O(n) (recursive call stack)
              </li>
              <li className="text-white/60">
                With memoization: O(n × W) time and space
              </li>
            </ul>
          </div>
        </>
      )}

      {activeTab === "explanation" && <RecursionExplanation />}
    </div>
  );
};

export default KnapsackRecursiveVisualizer;
