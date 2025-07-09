import ExplanationSection from "@/visualizers/ExplanationSection";
import React from "react";

const codeSnippets = {
  javascript: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
  cpp: `void bubbleSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; ++i) {
    for (int j = 0; j < n - i - 1; ++j) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
      }
    }
  }
}`,
  java: `public void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`,
};

const BubbleSortExplanation = () => {
  return (
    <ExplanationSection
      title="🔁 What is Bubble Sort?"
      description={[
        "Bubble Sort is a simple comparison-based algorithm where each pair of adjacent elements is compared, and the elements are swapped if they are in the wrong order.",
        "This process continues until no swaps are needed, indicating the array is sorted. Smaller elements 'bubble up' to the top with each pass.",
      ]}
      applications={[
        "Teaching sorting basics and algorithm analysis",
        "When simplicity is more important than efficiency",
        "Small datasets where performance isn’t critical",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default BubbleSortExplanation;
