import React, { useState } from "react";
import HeapControls from "./HeapControls";
import HeapNode from "./HeapNode";
import Sidebar from "@/components/pages/SideBar";
import HeapExplanation from "./HeapExplanation";

const HeapVisualizer = () => {
  const [heap, setHeap] = useState([]);
  const [isMinHeap, setIsMinHeap] = useState(true);
  const [activeTab, setActiveTab] = useState("visualization");

  const insert = (value) => {
    const newHeap = [...heap, value];
    heapifyUp(newHeap, isMinHeap);
    setHeap(newHeap);
  };

  const deleteRoot = () => {
    if (heap.length === 0) return;
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    heapifyDown(newHeap, isMinHeap);
    setHeap(newHeap);
  };

  const heapifyUp = (arr, isMin) => {
    let idx = arr.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const shouldSwap = isMin
        ? arr[idx] < arr[parentIdx]
        : arr[idx] > arr[parentIdx];
      if (shouldSwap) {
        [arr[idx], arr[parentIdx]] = [arr[parentIdx], arr[idx]];
        idx = parentIdx;
      } else break;
    }
  };

  const heapifyDown = (arr, isMin, start = 0) => {
    let idx = start;
    const length = arr.length;
    while (true) {
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let swapIdx = idx;

      if (
        left < length &&
        (isMin ? arr[left] < arr[swapIdx] : arr[left] > arr[swapIdx])
      ) {
        swapIdx = left;
      }
      if (
        right < length &&
        (isMin ? arr[right] < arr[swapIdx] : arr[right] > arr[swapIdx])
      ) {
        swapIdx = right;
      }
      if (swapIdx === idx) break;

      [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
      idx = swapIdx;
    }
  };

  const reheapify = (arr, isMin) => {
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
      heapifyDown(arr, isMin, i);
    }
  };

  return (
    <div className="flex min-h-screen text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center px-4 sm:px-8 py-10 text-white">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text text-center">
          Heap Visualizer
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
        {/* Tabs */}
        {activeTab === "visualization" && (
          <>
            <div className="mb-6">
              <button
                onClick={() => {
                  const newMode = !isMinHeap;
                  const rebuilt = [...heap];
                  reheapify(rebuilt, newMode);
                  setHeap(rebuilt);
                  setIsMinHeap(newMode);
                }}
                className="px-4 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition"
              >
                Toggle to {isMinHeap ? "MaxHeap" : "MinHeap"}
              </button>
            </div>

            <div className="w-full max-w-3xl mx-auto">
              <HeapControls
                heap={heap}
                setHeap={setHeap}
                insert={insert}
                deleteRoot={deleteRoot}
              />
            </div>

            <div className="relative w-full max-w-6xl h-[600px] mt-12">
              {heap.map((value, index) => {
                const level = Math.floor(Math.log2(index + 1));
                const posInLevel = index - (2 ** level - 1);
                const nodesInLevel = 2 ** level;
                const leftPercent =
                  ((posInLevel + 1) / (nodesInLevel + 1)) * 100;
                const topOffset = level * 110;

                const parentIndex = Math.floor((index - 1) / 2);
                const parentLevel = Math.floor(Math.log2(parentIndex + 1));
                const parentPos = parentIndex - (2 ** parentLevel - 1);
                const parentLeftPercent =
                  ((parentPos + 1) / (2 ** parentLevel + 1)) * 100;
                const parentTop = parentLevel * 110;

                return (
                  <React.Fragment key={index}>
                    {index !== 0 && (
                      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <line
                          x1={`${parentLeftPercent}%`}
                          y1={`${parentTop + 50}`}
                          x2={`${leftPercent}%`}
                          y2={`${topOffset}`}
                          stroke="#a855f7"
                          strokeWidth="2"
                        />
                      </svg>
                    )}

                    <div
                      className="absolute"
                      style={{
                        left: `${leftPercent}%`,
                        top: `${topOffset}px`,
                        transform: "translate(-50%, 0)",
                      }}
                    >
                      <HeapNode value={value} />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="mt-16 w-full max-w-3xl text-center">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text">
                Array Representation
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {heap.map((value, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white"
                  >
                    <div className="font-semibold text-purple-300 text-sm">
                      Index {index}
                    </div>
                    <div className="text-lg">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 w-full max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text text-center">
                Time Complexity
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-white/90">
                {[
                  {
                    op: "Insert",
                    best: "O(1)",
                    avg: "O(log n)",
                    worst: "O(log n)",
                  },
                  {
                    op: "Delete Root",
                    best: "O(log n)",
                    avg: "O(log n)",
                    worst: "O(log n)",
                  },
                  { op: "Peek", best: "O(1)", avg: "O(1)", worst: "O(1)" },
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
        {activeTab === "explanation" && <HeapExplanation />}
      </main>
    </div>
  );
};

export default HeapVisualizer;
