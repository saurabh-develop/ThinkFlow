import React, { useRef, useEffect } from "react";

const codeLines = [
  "for i = 1 to n:",
  "  for w = 0 to capacity:",
  "    weight = items[i - 1].weight",
  "    value = items[i - 1].value",
  "    exclude = dp[i - 1][w]",
  "    if w >= weight:",
  "      include = value + dp[i - 1][w - weight]",
  "    else:",
  "      include = 0",
  "    dp[i][w] = max(include, exclude)",
];

const CodeViewer = ({ activeLine }) => {
  return (
    <div className="bg-[#1e1e2f] border border-white/10 text-white rounded-xl p-4 w-full max-w-3xl shadow-xl">
      <h2 className="text-base sm:text-lg font-semibold text-purple-400 mb-3">
        Tabulation Code
      </h2>

      {/* Responsive scroll container */}
      <div className="overflow-x-auto overflow-y-auto max-h-[60vh] rounded-lg">
        <pre className="text-xs sm:text-sm font-mono space-y-1 min-w-[300px]">
          {codeLines.map((line, index) => {
            const lineNumber = index + 1;
            const isActive = lineNumber === activeLine;

            return (
              <div
                key={index}
                className={`flex items-center px-2 py-1 rounded-md transition-all duration-200 whitespace-pre ${
                  isActive
                    ? "bg-purple-700 text-white font-bold"
                    : "text-gray-400"
                }`}
              >
                {/* Line number with border for IDE feel */}
                <span className="text-gray-500 mr-3 w-8 text-right border-r border-gray-700 pr-2 select-none">
                  {String(lineNumber).padStart(2, "0")}
                </span>
                <span>{line}</span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer;
