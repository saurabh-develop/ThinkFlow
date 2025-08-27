import React from "react";
import { motion } from "motion/react";
import useDFSStore from "./useDFSStore";

const codeLines = [
  "function dfs(node, visited) {",
  "  if (visited.has(node)) return;",
  "  visited.add(node);",
  "",
  "  for (const neighbor of graph[node]) {",
  "    dfs(neighbor, visited);",
  "  }",
  "}",
];

const lineMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 4,
  4: 5,
};

const DFSCodeViewer = () => {
  const { dfsSteps, currentStepIndex } = useDFSStore();

  const current =
    dfsSteps[currentStepIndex]?.currentLine ?? lineMap[currentStepIndex] ?? -1;

  return (
    <div className="w-full overflow-x-auto max-w-full p-2">
      <div className="min-w-[300px] w-full bg-white/5 rounded-xl border border-white/10 text-sm font-mono shadow-lg backdrop-blur">
        {codeLines.map((line, idx) => (
          <motion.pre
            key={idx}
            className={`transition-all px-4 py-1 whitespace-pre-wrap break-words rounded ${
              idx === current ? "bg-purple-700 text-white" : "text-white/70"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {line}
          </motion.pre>
        ))}
      </div>
    </div>
  );
};

export default DFSCodeViewer;
