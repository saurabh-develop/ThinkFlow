import React from "react";
import { motion } from "framer-motion";
import useDijkstraStore from "./useDijkstraStore";

const codeLines = [
  "function dijkstra(graph, start) {",
  "  const dist = {};",
  "  const visited = new Set();",
  "  const pq = [];",
  "",
  "  for (const node in graph) {",
  "    dist[node] = Infinity;",
  "  }",
  "  dist[start] = 0;",
  "  pq.push({ node: start, cost: 0 });",
  "",
  "  while (pq.length) {",
  "    pq.sort((a, b) => a.cost - b.cost);",
  "    const { node: current } = pq.shift();",
  "",
  "    if (visited.has(current)) continue;",
  "    visited.add(current);",
  "",
  "    for (const [neighbor, weight] of graph[current]) {",
  "      const newDist = dist[current] + weight;",
  "      if (newDist < dist[neighbor]) {",
  "        dist[neighbor] = newDist;",
  "        pq.push({ node: neighbor, cost: newDist });",
  "      }",
  "    }",
  "  }",
  "",
  "  return dist;",
  "}",
];

const lineMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
  9: 11,
  10: 12,
  11: 13,
  12: 15,
  13: 16,
  14: 18,
  15: 19,
  16: 20,
  17: 21,
  18: 22,
  19: 23,
  20: 26,
};

const DijkstraCodeViewer = () => {
  const { dijkstraSteps, currentStepIndex } = useDijkstraStore();

  const current =
    dijkstraSteps[currentStepIndex]?.currentLine ??
    lineMap[currentStepIndex] ??
    -1;

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

export default DijkstraCodeViewer;
