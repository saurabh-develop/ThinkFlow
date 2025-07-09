import React from "react";

const codeLines = [
  "for (let i = 1; i < arr.length; i++) {",
  "  let key = arr[i];",
  "  let j = i - 1;",
  "  while (j >= 0 && arr[j] > key) {",
  "    arr[j + 1] = arr[j];",
  "    j--;",
  "  }",
  "  arr[j + 1] = key;",
  "}",
];

const InsertionSortCode = ({ currentLine }) => {
  return (
    <div className="bg-white/5 backdrop-blur p-4 rounded-xl text-sm text-purple-200 shadow-inner h-70 overflow-auto">
      <pre className="whitespace-pre-wrap">
        {codeLines.map((line, index) => (
          <div
            key={index}
            className={`transition-all px-2 py-1 rounded-md ${
              currentLine === index
                ? "bg-purple-700 text-white font-semibold"
                : "text-purple-300"
            }`}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default InsertionSortCode;
