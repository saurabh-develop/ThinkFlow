import ExplanationSection from "@/visualizers/ExplanationSection.jsx";
import React from "react";

const codeSnippets = {
  javascript: `// JavaScript - Recursive 0/1 Knapsack
function knapsack(weights, values, w, i) {
  if (i < 0 || w <= 0) return 0;

  // Exclude current item
  let exclude = knapsack(weights, values, w, i - 1);

  // Include current item if it fits
  if (weights[i] <= w) {
    let include = values[i] + knapsack(weights, values, w - weights[i], i - 1);
    return Math.max(include, exclude);
  }

  return exclude;
}
`,
  cpp: `// C++ - Recursive 0/1 Knapsack
int knapsack(vector<int>& weights, vector<int>& values, int w, int i) {
  if (i < 0 || w <= 0) return 0;

  int exclude = knapsack(weights, values, w, i - 1);

  if (weights[i] <= w) {
    int include = values[i] + knapsack(weights, values, w - weights[i], i - 1);
    return max(include, exclude);
  }

  return exclude;
}
`,
  java: `// Java - Recursive 0/1 Knapsack
int knapsack(int[] weights, int[] values, int w, int i) {
  if (i < 0 || w <= 0) return 0;

  int exclude = knapsack(weights, values, w, i - 1);

  if (weights[i] <= w) {
    int include = values[i] + knapsack(weights, values, w - weights[i], i - 1);
    return Math.max(include, exclude);
  }

  return exclude;
}
`,
};

const RecursionExplanation = () => {
  return (
    <ExplanationSection
      title="🔁 Recursive 0/1 Knapsack"
      description={[
        "This recursive solution explores all combinations of including or excluding each item to determine the maximum value within the given capacity.",
        "It has exponential time complexity due to repeated subproblem evaluations, which can be optimized using memoization or DP.",
      ]}
      applications={[
        "Solving decision problems involving inclusion/exclusion",
        "Understanding dynamic programming via recursion",
        "Teaching divide and conquer/backtracking",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default RecursionExplanation;
