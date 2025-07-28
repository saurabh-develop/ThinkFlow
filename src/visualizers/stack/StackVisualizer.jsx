import React, { useState } from "react";
import StackControls from "./StackControls";
import StackBox from "./StackBox";
import { AnimatePresence, motion } from "framer-motion";
import CodeImplementation from "./CodeImplementation";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [topIndex, setTopIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("visualization");

  const push = (value) => {
    if (isNaN(value)) {
      reutrn;
    }
    const newStack = [...stack, value];
    setStack(newStack);
    setTopIndex(newStack.length - 1);
  };

  const pop = () => {
    const newStack = [...stack];
    newStack.pop();
    setStack(newStack);
    setTopIndex(newStack.length - 1);
  };

  const reset = () => {
    setStack([]);
    setTopIndex(null);
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-gradient-to-br from-[#0d0d15] to-[#1a1a2e] px-4">
      <main className="flex-1 py-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text">
          Stack Visualizer
        </h1>

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

        {/* Content switching based on tab */}
        {activeTab === "visualization" && (
          <>
            <StackControls push={push} pop={pop} reset={reset} />

            <div className="relative flex justify-center mt-10">
              <div className="min-h-[300px] max-h-[80vh] w-[160px] border border-purple-400 border-t-0 rounded-b-xl bg-white/5 backdrop-blur-sm flex flex-col-reverse items-center justify-start overflow-y-auto shadow-inner scroll-smooth">
                <AnimatePresence>
                  {stack.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StackBox
                        value={value}
                        isTop={index === topIndex}
                        index={index}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-12 text-left max-w-xl mx-auto">
              <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Time Complexities
              </h2>
              <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all">
                <ul className="list-disc list-inside text-sm text-purple-200 space-y-1">
                  <li>
                    <span className="font-semibold text-white">Push:</span> O(1)
                  </li>
                  <li>
                    <span className="font-semibold text-white">Pop:</span> O(1)
                  </li>
                  <li>
                    <span className="font-semibold text-white">Peek:</span> O(1)
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {activeTab === "explanation" && <CodeImplementation />}
      </main>
    </div>
  );
};

export default StackVisualizer;
