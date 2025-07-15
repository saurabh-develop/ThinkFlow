import React from "react";

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
    <div className="bg-[#1e1e2f] text-white rounded-xl p-4 w-full max-w-md shadow-xl">
      <h2 className="text-lg font-semibold text-purple-400 mb-2">
        Tabulation Code
      </h2>
      <pre className="text-sm font-mono space-y-1">
        {codeLines.map((line, index) => {
          const lineNumber = index + 1;
          const isActive = lineNumber === activeLine;

          return (
            <div
              key={index}
              className={`px-2 py-1 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-purple-700 text-white font-bold"
                  : "text-gray-400"
              }`}
            >
              <span className="text-gray-600 mr-2">
                {String(lineNumber).padStart(2, "0")}
              </span>
              {line}
            </div>
          );
        })}
      </pre>
    </div>
  );
};

export default CodeViewer;
