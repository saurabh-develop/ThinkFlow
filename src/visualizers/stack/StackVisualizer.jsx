import React, { useState } from "react";
import StackControls from "./StackControls";
import StackBox from "./StackBox";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/pages/SideBar";
import CodeImplementation from "./CodeImplementation";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [topIndex, setTopIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("visualization");

  const push = (value) => {
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
    <div className="flex min-h-screen text-white">
      <Sidebar />

      <main className="flex-1 p-8 text-white text-center">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text">
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
                      exit={{ opacity: 0, y: 20 }}
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

        {activeTab === "explanation" && (
          <div className="max-w-3xl mx-auto text-left mt-10 space-y-6">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              What is a Stack?
            </h2>
            <p className="text-purple-200 text-sm leading-relaxed">
              A <span className="text-white font-semibold">Stack</span> is a
              linear data structure that follows the
              <span className="text-white font-semibold">
                {" "}
                LIFO (Last-In-First-Out){" "}
              </span>{" "}
              principle. This means the last element added to the stack is the
              first one to be removed.
            </p>

            <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow space-y-4">
              <h3 className="text-white font-semibold">
                📦 Real-World Examples of a Stack:
              </h3>
              <ul className="list-disc list-inside text-purple-200 text-sm space-y-1">
                <li>
                  <span className="text-white font-semibold">
                    Browser History:
                  </span>{" "}
                  When you visit a new page, it's pushed onto a history stack.
                  Pressing "Back" pops the last visited page.
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Undo/Redo Functionality:
                  </span>{" "}
                  Text editors like VS Code or Word maintain a stack of actions.
                  Undo pops the last action.
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Call Stack in Programming:
                  </span>{" "}
                  When a function is called, it’s pushed to the call stack. Once
                  it returns, it’s popped off.
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Stack of Plates:
                  </span>{" "}
                  Imagine a stack of dishes — you add to the top, and remove
                  from the top.
                </li>
              </ul>
            </div>
            <CodeImplementation />
          </div>
        )}
      </main>
    </div>
  );
};

export default StackVisualizer;
