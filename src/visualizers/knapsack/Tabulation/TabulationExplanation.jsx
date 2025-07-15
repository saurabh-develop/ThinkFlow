import React from "react";
import ExplanationSection from "../../ExplanationSection.jsx";

const codeSnippets = {
  javascript: `// JavaScript 0/1 Knapsack (Tabulation)
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      const weight = weights[i - 1];
      const value = values[i - 1];
      const exclude = dp[i - 1][w];
      const include = w >= weight ? value + dp[i - 1][w - weight] : 0;
      dp[i][w] = Math.max(include, exclude);
    }
  }

  return dp[n][capacity];
}`,

  cpp: `// C++ 0/1 Knapsack (Tabulation)
int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
  int n = weights.size();
  vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));

  for (int i = 1; i <= n; i++) {
    for (int w = 0; w <= capacity; w++) {
      int weight = weights[i - 1];
      int value = values[i - 1];
      int exclude = dp[i - 1][w];
      int include = (w >= weight) ? value + dp[i - 1][w - weight] : 0;
      dp[i][w] = max(include, exclude);
    }
  }

  return dp[n][capacity];
}`,

  java: `// Java 0/1 Knapsack (Tabulation)
int knapsack(int[] weights, int[] values, int capacity) {
  int n = weights.length;
  int[][] dp = new int[n + 1][capacity + 1];

  for (int i = 1; i <= n; i++) {
    for (int w = 0; w <= capacity; w++) {
      int weight = weights[i - 1];
      int value = values[i - 1];
      int exclude = dp[i - 1][w];
      int include = (w >= weight) ? value + dp[i - 1][w - weight] : 0;
      dp[i][w] = Math.max(include, exclude);
    }
  }

  return dp[n][capacity];
}`,
};

const TabulationExplanation = () => {
  return (
    <ExplanationSection
      title="🎒 What is 0/1 Knapsack?"
      description={[
        "The 0/1 Knapsack Problem is a dynamic programming problem where each item can be included or excluded only once.",
        "The goal is to maximize the total value without exceeding the knapsack's weight capacity.",
        "Tabulation is a bottom-up approach where we build a DP table based on item and capacity combinations.",
      ]}
      applications={[
        "Budget allocation problems",
        "Resource optimization",
        "Investment planning",
        "Memory optimization in systems",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default TabulationExplanation;
