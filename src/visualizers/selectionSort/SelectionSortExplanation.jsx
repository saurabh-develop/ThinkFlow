import React from "react";
import ExplanationSection from "../ExplanationSection.jsx";

const selectionSortCodeSnippets = {
  javascript: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
  cpp: `void selectionSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx != i) {
      swap(arr[i], arr[minIdx]);
    }
  }
}`,
  java: `public void selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx != i) {
      int temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
}`,
};

const selectionSortDescription = [
  "Selection Sort is a simple comparison-based sorting algorithm.",
  "It repeatedly selects the minimum element from the unsorted part of the array and places it at the beginning.",
  "The algorithm maintains two subarrays: one already sorted and one unsorted. It keeps growing the sorted subarray from left to right.",
];

const selectionSortApplications = [
  "Teaching basic sorting concepts",
  "When memory writes are costly (due to fewer swaps)",
  "Sorting small datasets efficiently",
];

const SelectionSortExplanation = () => {
  return (
    <ExplanationSection
      title="🔽 What is Selection Sort?"
      description={selectionSortDescription}
      applications={selectionSortApplications}
      codeSnippets={selectionSortCodeSnippets}
    />
  );
};

export default SelectionSortExplanation;
