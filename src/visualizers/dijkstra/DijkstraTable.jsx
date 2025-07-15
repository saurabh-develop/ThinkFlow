import React from "react";
import useDijkstraStore from "./useDijkstraStore";

const DijkstraTable = ({ steps, currentStepIndex }) => {
  const finalStep = useDijkstraStore((state) => state.finalStep);

  const step = steps?.[currentStepIndex] ?? finalStep;

  const allNodes = step?.distances
    ? Object.keys(step.distances).sort()
    : ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div className="overflow-auto border border-white/10 bg-white/5 rounded-xl p-4 shadow h-full">
      <h3 className="text-xl font-semibold mb-4 text-white/90">
        📊 Dijkstra Table
      </h3>
      <table className="w-full text-sm text-white/80 table-fixed border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-white/60 text-left">
            <th className="p-2">Vertex</th>
            <th className="p-2">Visited</th>
            <th className="p-2">Distance</th>
            <th className="p-2">Relaxed From</th>
          </tr>
        </thead>
        <tbody>
          {allNodes.map((node) => {
            const isCurrent = step?.current === node;
            const isInQueue = step?.queue?.includes(node);
            const isVisited = step?.visited?.has(node);
            const isRelaxed = step?.relaxing?.to === node;
            const distance = step?.distances?.[node] ?? "∞";
            const relaxedFrom =
              step?.relaxing?.to === node ? step.relaxing.from : "-";

            return (
              <tr
                key={node}
                className={`border-b border-white/10 ${
                  isCurrent
                    ? "bg-purple-700/30"
                    : isRelaxed
                    ? "bg-red-500/30"
                    : isInQueue
                    ? "bg-yellow-500/20"
                    : ""
                }`}
              >
                <td className="p-2 font-bold text-white">{node}</td>
                <td className="p-2">{isVisited ? "✅" : ""}</td>
                <td className="p-2">
                  {distance === Infinity ? "∞" : distance}
                </td>
                <td className="p-2">{relaxedFrom}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-white/70">
        ⏱️ <span className="font-semibold text-white">Time Complexity:</span>{" "}
        O((V + E) log V) using Min Heap
      </div>
    </div>
  );
};

export default DijkstraTable;
