import React from "react";

const SelectionSortCode = ({ currentLine }) => {
  const lines = [
    "for (i = 0; i < n - 1; i++) {",
    "  minIndex = i;",
    "  for (j = i + 1; j < n; j++) {",
    "    if (arr[j] < arr[minIndex]) {",
    "      minIndex = j;",
    "    }",
    "  }",
    "  if (minIndex !== i) {",
    "    swap(arr[i], arr[minIndex]);",
    "  }",
    "}",
  ];

  return (
    <div className="bg-[#1e1e2f] text-white/90 p-4 rounded-xl h-70 overflow-auto shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-purple-300">
        🧠 Selection Sort Code
      </h3>
      <pre className="text-sm leading-6 font-mono">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`px-3 py-1 rounded-md transition-all ${
              currentLine === idx + 1
                ? "bg-purple-700/60 text-purple-300 font-semibold"
                : ""
            }`}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default SelectionSortCode;
