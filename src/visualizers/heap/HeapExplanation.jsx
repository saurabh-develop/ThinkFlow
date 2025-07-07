import React from "react";
import ExplanationSection from "../ExplanationSection.jsx"; 

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

const HeapExplanation = () => {
  return (
    <ExplanationSection
      title="🏔️ What is a Heap?"
      description={[
        "A Heap is a special binary tree-based data structure that satisfies the Heap Property.",
        "In a MinHeap, each parent node is less than or equal to its children, while in a MaxHeap, each parent node is greater than or equal to its children.",
      ]}
      applications={[
        "Priority Queues (Task Scheduling)",
        "Dijkstra’s Shortest Path Algorithm",
        "Heap Sort",
        "Memory Management",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default HeapExplanation;
