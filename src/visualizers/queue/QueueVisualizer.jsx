import React, { useState, useEffect, useRef } from "react";
import QueueBox from "./QueueBox";
import QueueControls from "./QueueControls";
import QueueExplanation from "./QueueExplanation";
import { motion, AnimatePresence } from "framer-motion";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("visualization");
  const [containerWidth, setContainerWidth] = useState("auto");
  const boxRowRef = useRef(null);

  const enqueue = (value) => {
    setQueue((prev) => [...prev, value]);
  };

  const dequeue = () => {
    setQueue((prev) => prev.slice(1));
  };

  const reset = () => {
    setQueue([]);
    setHighlightIndex(null);
  };

  return (
    <div className="flex min-h-screen text-white">
      <main className="flex-1 px-4 sm:px-8 py-10 text-white">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text text-center">
          Queue Visualizer
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
            <QueueControls enqueue={enqueue} dequeue={dequeue} reset={reset} />

            {/* Visual Queue */}
            <div className="relative flex justify-center mt-12">
              <div className="min-h-[140px] w-full max-w-5xl border border-purple-400 rounded-xl bg-white/5 backdrop-blur-sm flex items-center px-4 overflow-x-auto shadow-inner scroll-smooth">
                <div
                  ref={boxRowRef}
                  className="flex justify-start gap-4"
                  style={{ width: containerWidth }} // 💥 lock the width to prevent shift
                >
                  <AnimatePresence initial={false}>
                    {queue.map((value, index) => (
                      <motion.div
                        key={value + "-" + index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-none relative"
                        style={{ position: "relative" }}
                      >
                        <motion.div
                          layout
                          className="flex-none"
                          exit={{
                            opacity: 0,
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <QueueBox
                            value={value}
                            isFront={index === 0}
                            isRear={index === queue.length - 1}
                            highlight={index === highlightIndex}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Time Complexity */}
            <div className="mt-12 text-left max-w-xl mx-auto">
              <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Time Complexities
              </h2>
              <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all">
                <ul className="list-disc list-inside text-sm text-purple-200 space-y-1">
                  <li>
                    <span className="font-semibold text-white">Enqueue:</span>{" "}
                    O(1)
                  </li>
                  <li>
                    <span className="font-semibold text-white">Dequeue:</span>{" "}
                    O(1)
                  </li>
                  <li>
                    <span className="font-semibold text-white">Peek:</span> O(1)
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {activeTab === "explanation" && <QueueExplanation />}
      </main>
    </div>
  );
};

export default QueueVisualizer;
