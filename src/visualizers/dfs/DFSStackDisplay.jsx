import React from "react";
import useDFSStore from "./useDFSStore.js";

const DFSStackDisplay = () => {
  const { dfsSteps, currentStepIndex } = useDFSStore();

  if (!dfsSteps || !Array.isArray(dfsSteps) || dfsSteps.length === 0) {
    return (
      <div className="p-4 bg-[#1e1e2f] border border-white/10 rounded-xl shadow w-full">
        <h3 className="text-lg font-semibold mb-3 text-white">📦 Call Stack</h3>
        <p className="text-white/50 italic">No steps to display.</p>
      </div>
    );
  }

  const stack = [];
  for (let i = 0; i <= currentStepIndex; i++) {
    const step = dfsSteps[i];
    if (!step || !step.type) continue;
    if (step.type === "call") {
      stack.push(step.current);
    } else if (step.type === "return") {
      stack.pop();
    }
  }

  return (
    <div className="p-4 bg-[#1e1e2f] border border-white/10 rounded-xl shadow w-full">
      <h3 className="text-lg font-semibold mb-3 text-white">📦 Call Stack</h3>
      <div className="flex flex-col gap-2">
        {stack.length === 0 ? (
          <p className="text-white/50 italic">Stack is empty.</p>
        ) : (
          stack
            .slice()
            .reverse()
            .map((node, idx) => (
              <div
                key={idx}
                className="px-3 py-2 rounded-md bg-purple-600 text-center text-white font-mono"
              >
                dfs({node})
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default DFSStackDisplay;
