import React from "react";
import ExplanationSection from "../ExplanationSection.jsx";

const mergeSortCodeSnippets = {
  javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,

  cpp: `vector<int> merge(vector<int>& left, vector<int>& right) {
  vector<int> result;
  int i = 0, j = 0;
  while (i < left.size() && j < right.size()) {
    if (left[i] < right[j]) result.push_back(left[i++]);
    else result.push_back(right[j++]);
  }
  while (i < left.size()) result.push_back(left[i++]);
  while (j < right.size()) result.push_back(right[j++]);
  return result;
}

vector<int> mergeSort(vector<int> arr) {
  if (arr.size() <= 1) return arr;
  int mid = arr.size() / 2;
  vector<int> left(arr.begin(), arr.begin() + mid);
  vector<int> right(arr.begin() + mid, arr.end());
  return merge(mergeSort(left), mergeSort(right));
}`,

  java: `public static int[] mergeSort(int[] arr) {
  if (arr.length <= 1) return arr;
  int mid = arr.length / 2;
  int[] left = Arrays.copyOfRange(arr, 0, mid);
  int[] right = Arrays.copyOfRange(arr, mid, arr.length);
  return merge(mergeSort(left), mergeSort(right));
}

public static int[] merge(int[] left, int[] right) {
  int[] result = new int[left.length + right.length];
  int i = 0, j = 0, k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result[k++] = left[i++];
    else result[k++] = right[j++];
  }
  while (i < left.length) result[k++] = left[i++];
  while (j < right.length) result[k++] = right[j++];
  return result;
}`,
};

const mergeSortDescription = [
  "Merge Sort is a stable and efficient divide-and-conquer sorting algorithm.",
  "It splits the array into halves recursively, sorts each half, and then merges them.",
  "The merge operation combines two sorted arrays into one sorted result.",
];

const mergeSortApplications = [
  "Sorting linked lists (as merge sort works well with linked structures)",
  "External sorting where data is too large to fit in memory",
  "Parallel algorithms and multi-threaded environments",
];

const MergeSortExplanation = () => {
  return (
    <ExplanationSection
      title="🧬 What is Merge Sort?"
      description={mergeSortDescription}
      applications={mergeSortApplications}
      codeSnippets={mergeSortCodeSnippets}
    />
  );
};

export default MergeSortExplanation;
