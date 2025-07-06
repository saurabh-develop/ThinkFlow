import React, { useState } from "react";

const codeSnippets = {
  javascript: `// JavaScript Heap Example
  // MinHeap
  class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    insert(val) {
      this.heap.push(val);
      this.heapifyUp();
    }
  
    heapifyUp() {
      let idx = this.heap.length - 1;
      while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        if (this.heap[idx] < this.heap[parentIdx]) {
          [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
          idx = parentIdx;
        } else break;
      }
    }
  }
  
  // MaxHeap
  class MaxHeap {
    constructor() {
      this.heap = [];
    }
  
    insert(val) {
      this.heap.push(val);
      this.heapifyUp();
    }
  
    heapifyUp() {
      let idx = this.heap.length - 1;
      while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        if (this.heap[idx] > this.heap[parentIdx]) {
          [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
          idx = parentIdx;
        } else break;
      }
    }
  }`,

  cpp: `// C++ Heap Example
  #include <iostream>
  #include <vector>
  #include <algorithm>
  using namespace std;
  
  // MinHeap
  class MinHeap {
    vector<int> heap;
  
  public:
    void insert(int val) {
      heap.push_back(val);
      int idx = heap.size() - 1;
      while (idx > 0) {
        int parent = (idx - 1) / 2;
        if (heap[idx] < heap[parent]) {
          swap(heap[idx], heap[parent]);
          idx = parent;
        } else break;
      }
    }
  };
  
  // MaxHeap
  class MaxHeap {
    vector<int> heap;
  
  public:
    void insert(int val) {
      heap.push_back(val);
      int idx = heap.size() - 1;
      while (idx > 0) {
        int parent = (idx - 1) / 2;
        if (heap[idx] > heap[parent]) {
          swap(heap[idx], heap[parent]);
          idx = parent;
        } else break;
      }
    }
  };`,

  java: `// Java Heap Example using PriorityQueue
  import java.util.PriorityQueue;
  
  public class HeapExample {
    public static void main(String[] args) {
      // MinHeap
      PriorityQueue<Integer> minHeap = new PriorityQueue<>();
      minHeap.add(3);
      minHeap.add(1);
      minHeap.add(5);
      System.out.println(minHeap.poll()); // 1
  
      // MaxHeap
      PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
      maxHeap.add(3);
      maxHeap.add(1);
      maxHeap.add(5);
      System.out.println(maxHeap.poll()); // 5
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

const HeapExplanation = () => {
  const [lang, setLang] = useState("javascript");

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto space-y-8">
      {/* Explanation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          🏔️ What is a Heap?
        </h2>
        <p className="text-purple-200 text-sm leading-relaxed">
          A <span className="text-white font-semibold">Heap</span> is a special
          binary tree-based data structure that satisfies the{" "}
          <span className="text-white font-semibold">Heap Property</span>. In a{" "}
          <span className="text-white font-semibold">MinHeap</span>, each parent
          node is less than or equal to its children, while in a{" "}
          <span className="text-white font-semibold">MaxHeap</span>, each parent
          node is greater than or equal to its children.
        </p>

        <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow">
          <h3 className="text-white font-semibold mb-2">
            💡 Real-World Examples:
          </h3>
          <ul className="list-disc list-inside text-sm text-purple-200 space-y-1">
            <li>Priority Queues (Task Scheduling)</li>
            <li>Dijkstra’s Shortest Path Algorithm</li>
            <li>Heap Sort</li>
            <li>Memory Management</li>
          </ul>
        </div>
      </div>

      {/* Code Tabs */}
      <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow space-y-4 mt-10">
        <h3 className="text-white text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          🔧 Heap Code Implementation
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

export default HeapExplanation;
