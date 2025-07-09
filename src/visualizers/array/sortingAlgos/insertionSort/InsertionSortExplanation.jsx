import ExplanationSection from "@/visualizers/ExplanationSection";
import React from "react";

const codeSnippets = {
  javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  cpp: `void insertionSort(vector<int>& arr) {
  for (int i = 1; i < arr.size(); i++) {
    int key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
  java: `void insertionSort(int[] arr) {
  for (int i = 1; i < arr.length; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
};

const InsertionSortExplanation = () => {
  return (
    <ExplanationSection
      title="🔂 What is Insertion Sort?"
      description={[
        "Insertion Sort builds the final sorted array one element at a time.",
        "It’s efficient for small datasets and mostly sorted arrays.",
      ]}
      applications={[
        "Online sorting (insert as data arrives)",
        "Efficient for nearly sorted arrays",
        "Used in hybrid algorithms like TimSort",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default InsertionSortExplanation;
