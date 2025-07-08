import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/pages/SideBar";
import SelectionSortControls from "./SelectionSortControls";
import SelectionSortCode from "./SelectionSortCode";
import SelectionSortExplanation from "./SelectionSortExplanation";
import { selectionSortSteps } from "../sortingAlgorithms";

const SelectionSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(350);
  const [isSorting, setIsSorting] = useState(false);
  const [activeTab, setActiveTab] = useState("visualization");
  const timeoutRef = useRef(null);
  const current = steps[currentStep] || {};
  const maxVal = Math.max(...array);

  useEffect(() => {
    randomizeArray();
  }, []);

  const randomizeArray = () => {
    const newArr = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArr);
    setSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
  };

  const handleSort = () => {
    if (isSorting || steps.length > 0) return;
    const newSteps = selectionSortSteps(array.slice());
    setSteps(newSteps);
    setCurrentStep(0);
    setIsSorting(true);
  };

  useEffect(() => {
    if (isSorting && currentStep < steps.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setArray(steps[currentStep + 1]?.array || []);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsSorting(false);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentStep, isSorting, steps, speed]);

  return (
    <div className="flex min-h-screen text-white">
      <Sidebar />
      <main className="flex-1 px-4 sm:px-8 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text">
          📌 Selection Sort Visualizer
        </h2>

        {/* Tabs */}
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

        {activeTab === "visualization" && (
          <>
            {/* Controls */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <SelectionSortControls
                onSort={handleSort}
                onReset={randomizeArray}
                setSpeed={setSpeed}
                setArray={(arr) => {
                  setArray(arr);
                  setSteps([]);
                  setIsSorting(false);
                  setCurrentStep(0);
                }}
              />
              <button
                onClick={() => setIsSorting((prev) => !prev)}
                className={`${
                  isSorting
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-2 rounded-lg shadow backdrop-blur border border-white/10 transition-all`}
              >
                {isSorting ? "Pause" : "Resume"}
              </button>
            </div>

            {/* Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Bar Graph */}
              <div className="h-70 bg-white/5 backdrop-blur rounded-xl p-4 flex items-end gap-[2px] shadow-inner">
                {array.map((value, i) => {
                  const isComparing = current.comparing?.includes(i);
                  const isSwapping = current.swapping?.includes(i);
                  const isSorted = current.sortedIndices?.includes(i);
                  const barHeight = (value / maxVal) * 100;

                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col justify-end items-center relative"
                      style={{ height: `${barHeight}%` }}
                    >
                      <div
                        className={`w-full rounded-t transition-all duration-300 ${
                          isSorted
                            ? "bg-green-400"
                            : isSwapping
                            ? "bg-red-400"
                            : isComparing
                            ? "bg-yellow-400"
                            : "bg-purple-400"
                        }`}
                        style={{ height: "100%" }}
                      ></div>
                      <div className="absolute -top-5 text-xs text-white/80">
                        {value}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Code View */}
              <SelectionSortCode currentLine={current?.line || 0} />
            </div>

            {/* Time Complexity */}
            <div className="mt-16 w-full max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text text-center">
                Time Complexity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-white/90">
                {[
                  {
                    op: "Best Case (Sorted)",
                    best: "O(n^2)",
                    avg: "O(n^2)",
                    worst: "O(n^2)",
                  },
                  {
                    op: "Average Case",
                    best: "O(n^2)",
                    avg: "O(n^2)",
                    worst: "O(n^2)",
                  },
                  {
                    op: "Worst Case (Reversed)",
                    best: "O(n^2)",
                    avg: "O(n^2)",
                    worst: "O(n^2)",
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

        {activeTab === "explanation" && <SelectionSortExplanation />}
      </main>
    </div>
  );
};

export default SelectionSortVisualizer;
