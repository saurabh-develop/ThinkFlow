import React, { useState, useEffect, useRef } from "react";
import ItemInfoPanel from "./ItemInfoPanel.jsx";
import DPTable from "./DPTable.jsx";
import KnapsackControls from "./KnapsackControls.jsx";
import useTabulationSteps from "./useTabulationSteps.js";
import CodeViewer from "./CodeViewer.jsx";
import TabulationExplanation from "./TabulationExplanation.jsx";

const DEFAULT_ITEMS = [
  { weight: 1, value: 1 },
  { weight: 3, value: 4 },
  { weight: 4, value: 5 },
  { weight: 5, value: 7 },
];
const DEFAULT_CAPACITY = 7;

const KnapsackTabulationVisualizer = () => {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [capacity, setCapacity] = useState(DEFAULT_CAPACITY);
  const [delay, setDelay] = useState(800);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("visualization");

  const steps = useTabulationSteps(items, capacity);
  const intervalRef = useRef(null);
  const current = steps[stepIndex];

  // Animation effect
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStepIndex((prev) => {
          if (prev + 1 < steps.length) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, delay);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, delay, steps.length]);

  const handlePlayPause = () => {
    if (stepIndex >= steps.length - 1) {
      setStepIndex(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    if (stepIndex + 1 < steps.length) {
      setStepIndex(stepIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleCustomInput = ({ weights, values, capacity }) => {
    const newItems = weights.map((w, i) => ({
      weight: w,
      value: values[i] || 0,
    }));
    setItems(newItems);
    setCapacity(capacity);
    setStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="flex min-h-screen text-white">
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 py-10 text-white w-full">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text text-center">
          DP Tabulation Visualizer
        </h1>

        {/* Tabs */}
        <div className="flex w-full max-w-xl mx-auto mb-8 rounded-xl overflow-hidden border border-white/10 text-sm sm:text-base">
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

        {activeTab === "visualization" && (
          <div className="p-4 flex flex-col gap-6 w-full max-w-7xl">
            {/* Controls */}
            <KnapsackControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onReset={handleReset}
              onSpeedChange={setDelay}
              onCustomInput={handleCustomInput}
            />

            {/* Item Info */}
            <ItemInfoPanel
              items={items}
              currentItemIndex={current?.i - 1}
              capacity={capacity}
            />

            {/* DP Table + Code Viewer */}
            <div className="w-full flex flex-col lg:flex-row gap-6 justify-center items-stretch">
              <div className="flex-1 overflow-x-auto">
                <DPTable
                  table={current.table}
                  highlight={{ i: current.i, w: current.w }}
                  items={items}
                />
              </div>
              <div className="flex-1 overflow-x-auto">
                <CodeViewer activeLine={current.codeLine} />
              </div>
            </div>
            <div className="mt-6 border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all">
              <p>
                ⏱️ <strong>Time Complexity:</strong>
              </p>
              <ul className="list-disc list-inside leading-relaxed">
                <li>
                  <b>Time Complexity:</b> T(n, W) = n x W
                </li>
                <li>
                  <b>Space Complexity:</b> O(n x W)
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "explanation" && (
          <div className="w-full max-w-4xl px-2 sm:px-4">
            <TabulationExplanation />
          </div>
        )}
      </main>
    </div>
  );
};

export default KnapsackTabulationVisualizer;
