import React from "react";
import ExplanationSection from "../ExplanationSection.jsx"; 

const codeSnippets = {
  javascript: `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,

  cpp: `int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return i + 1;
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,

  java: `int partition(int[] arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}

void quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
};

const QuickSortExplanation = () => {
  return (
    <ExplanationSection
      title="⚡ Quick Sort Algorithm"
      description={[
        "Quick Sort is a divide-and-conquer sorting algorithm that selects a pivot and partitions the array into two subarrays — one with elements less than the pivot, and the other with greater elements.",
        "The subarrays are then recursively sorted. It is known for its average-case time efficiency and is widely used in practice.",
      ]}
      applications={[
        "Efficient general-purpose sorting",
        "Large datasets where in-place sorting is needed",
        "Systems where recursion depth can be controlled",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default QuickSortExplanation;
