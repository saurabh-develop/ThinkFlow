import React from "react";
import ExplanationSection from "../ExplanationSection";

const codeSnippets = {
  javascript: `// JavaScript - DFS using recursion
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);

  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}`,
  cpp: `// C++ - DFS using recursion
#include <iostream>
#include <unordered_map>
#include <vector>
#include <unordered_set>
using namespace std;

void dfs(unordered_map<char, vector<char>>& graph, char node, unordered_set<char>& visited) {
  if (visited.count(node)) return;
  visited.insert(node);
  cout << node << " ";

  for (char neighbor : graph[node]) {
    dfs(graph, neighbor, visited);
  }
}`,
  java: `// Java - DFS using recursion
import java.util.*;

public class DFS {
  public static void dfs(Map<Character, List<Character>> graph, char node, Set<Character> visited) {
    if (visited.contains(node)) return;
    visited.add(node);
    System.out.print(node + " ");

    for (char neighbor : graph.get(node)) {
      dfs(graph, neighbor, visited);
    }
  }
}`,
};

const DFSExplanation = () => {
  return (
    <ExplanationSection
      title="🧭 Depth-First Search (DFS)"
      description={[
        "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along a branch before backtracking.",
        "It is often implemented recursively and uses a visited set to track visited nodes.",
      ]}
      applications={[
        "Cycle detection in graphs",
        "Topological sorting",
        "Pathfinding and backtracking problems",
        "Solving mazes and puzzles",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default DFSExplanation;
