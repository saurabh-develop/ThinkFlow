import React, { useState } from "react";

const codeSnippets = {
  javascript: `// JavaScript Array Example
let arr = [1, 2, 3];

arr.push(4);       // [1, 2, 3, 4]
arr.pop();         // [1, 2, 3]
arr.splice(1, 1);  // [1, 3]
console.log(arr[0]); // 1`,
  cpp: `// C++ Array Example
#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3};

    cout << arr[0] << endl; // 1
    // C++ arrays are fixed-size, use vector for dynamic arrays
    return 0;
}`,
  java: `// Java Array Example
public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};

        System.out.println(arr[0]); // 1
    }
}`,
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white transition"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const ArrayExplanation = () => {
  const [lang, setLang] = useState("javascript");

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto space-y-8">
      {/* Explanation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          📖 What is an Array?
        </h2>
        <p className="text-purple-200 text-sm">
          An <span className="text-white font-semibold">Array</span> is a linear
          data structure used to store a collection of elements, typically of
          the same type, in contiguous memory locations. It allows constant-time
          access using indices.
        </p>

        <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow">
          <h3 className="text-white font-semibold mb-2">
            💡 Real-World Examples:
          </h3>
          <ul className="list-disc list-inside text-sm text-purple-200 space-y-1">
            <li>Storing scores of players in a game</li>
            <li>Daily temperatures stored as a list</li>
            <li>Image pixels stored in an array for processing</li>
          </ul>
        </div>
      </div>

      {/* Code Tabs */}
      <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow space-y-4 mt-10">
        <h3 className="text-white text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          🔧 Array Code Implementation
        </h3>

        {/* Language Tabs */}
        <div className="flex space-x-2 text-sm font-semibold">
          {["javascript", "cpp", "java"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded ${
                lang === l
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-300 hover:bg-white/20"
              }`}
            >
              {l === "javascript" ? "JavaScript" : l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="relative bg-black/30 p-4 rounded-lg text-xs text-purple-200 shadow-inner whitespace-pre-wrap overflow-x-auto">
          <CopyButton text={codeSnippets[lang]} />
          <pre>{codeSnippets[lang]}</pre>
        </div>
      </div>
    </div>
  );
};

export default ArrayExplanation;
