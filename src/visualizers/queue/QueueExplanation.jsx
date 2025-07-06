import React, { useState } from "react";

const codeSnippets = {
  javascript: `// JavaScript Queue using Array
let queue = [];
queue.push(1); // enqueue
queue.push(2);
queue.shift(); // dequeue
console.log(queue);`,
  cpp: `// C++ Queue using STL
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(1); // enqueue
    q.push(2);
    q.pop();   // dequeue
    cout << q.front(); // 2
}`,
  java: `// Java Queue using LinkedList
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.add(1); // enqueue
        q.add(2);
        q.remove(); // dequeue
        System.out.println(q.peek()); // 2
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

const QueueExplanation = () => {
  const [lang, setLang] = useState("javascript");

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto space-y-8">
      {/* Explanation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          📖 What is a Queue?
        </h2>
        <p className="text-purple-200 text-sm">
          A <span className="text-white font-semibold">Queue</span> is a linear
          data structure that follows the{" "}
          <span className="text-white font-semibold">FIFO</span> (First-In,
          First-Out) principle. The first element added is the first to be
          removed.
        </p>

        <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow">
          <h3 className="text-white font-semibold mb-2">
            💡 Real-World Examples:
          </h3>
          <ul className="list-disc list-inside text-sm text-purple-200 space-y-1">
            <li>Customer service queues</li>
            <li>Task scheduling in OS</li>
            <li>Print jobs sent to a printer</li>
          </ul>
        </div>
      </div>

      {/* Code Tabs */}
      <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow space-y-4 mt-10">
        <h3 className="text-white text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          🔧 Queue Code Implementation
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

export default QueueExplanation;
