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

  const current = bfsSteps[currentStepIndex]?.currentLine ?? -1;

  return (
    <div className="w-full sm:w-1/2 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 font-mono overflow-x-auto">
      {codeLines.map((line, idx) => (
        <motion.pre
          key={idx}
          className={`transition-all px-2 py-1 rounded text-xs sm:text-sm md:text-base whitespace-pre`}
        >
          <span
            className={`block ${
              idx === current
                ? "bg-purple-700 text-white rounded px-1"
                : "text-white/70"
            }`}
          >
            {line}
          </span>
        </motion.pre>
      ))}
    </div>
  );
};

export default BFSCodeViewer;
