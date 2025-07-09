import ExplanationSection from "@/visualizers/ExplanationSection";
import React from "react";

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

const ArrayExplanation = () => {
  return (
    <ExplanationSection
      title="📖 What is an Array?"
      description={[
        "An Array is a linear data structure used to store a collection of elements, typically of the same type, in contiguous memory locations.",
        "It allows constant-time access using indices, making it efficient for random access operations.",
      ]}
      applications={[
        "Storing scores of players in a game",
        "Daily temperatures stored as a list",
        "Image pixels stored in an array for processing",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default ArrayExplanation;
