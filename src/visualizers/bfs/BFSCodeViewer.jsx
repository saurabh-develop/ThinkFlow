import React from "react";
import { motion } from "framer-motion";
import useGraphStore from "./useGraphStore";

const codeLines = [
  "function bfs(graph, start) {",
  "  const visited = new Set();",
  "  const queue = [start];",
  "  while (queue.length) {",
  "    const node = queue.shift();",
  "    if (!visited.has(node)) {",
  "      visited.add(node);",
  "      for (const neighbor of graph[node]) {",
  "        if (!visited.has(neighbor)) {",
  "          queue.push(neighbor);",
  "        }",
  "      }",
  "    }",
  "  }",
  "}",
];

const BFSCodeViewer = () => {
  const { currentStepIndex, bfsSteps } = useGraphStore();

  const lineMap = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };

  const current = bfsSteps[currentStepIndex]?.currentLine ?? -1;

  return (
    <div className="w-full sm:w-1/2 p-4 bg-white/5 rounded-xl border border-white/10 text-sm font-mono">
      {codeLines.map((line, idx) => (
        <motion.pre
          key={idx}
          className={`transition-all px-2 py-1 rounded ${
            idx === current ? "bg-purple-700 text-white" : "text-white/70"
          }`}
        >
          {line}
        </motion.pre>
      ))}
    </div>
  );
};

export default BFSCodeViewer;
