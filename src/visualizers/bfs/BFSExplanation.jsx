import React from "react";
import ExplanationSection from "../ExplanationSection";

const codeSnippets = {
  javascript: `// JavaScript - BFS using Queue
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }
}`,
  cpp: `// C++ - BFS using Queue and STL
#include <iostream>
#include <queue>
#include <unordered_map>
#include <vector>
using namespace std;

void bfs(unordered_map<char, vector<char>>& graph, char start) {
  unordered_map<char, bool> visited;
  queue<char> q;
  q.push(start);

  while (!q.empty()) {
    char node = q.front();
    q.pop();

    if (!visited[node]) {
      visited[node] = true;
      for (char neighbor : graph[node]) {
        if (!visited[neighbor]) {
          q.push(neighbor);
        }
      }
    }
  }
}`,
  java: `// Java - BFS using Queue
import java.util.*;

public class BFS {
  public static void bfs(Map<Character, List<Character>> graph, char start) {
    Set<Character> visited = new HashSet<>();
    Queue<Character> queue = new LinkedList<>();
    queue.add(start);

    while (!queue.isEmpty()) {
      char node = queue.poll();
      if (!visited.contains(node)) {
        visited.add(node);
        for (char neighbor : graph.get(node)) {
          if (!visited.contains(neighbor)) {
            queue.add(neighbor);
          }
        }
      }
    }
  }
}`,
};

const BFSExplanation = () => {
  return (
    <ExplanationSection
      title="🔁 Breadth-First Search (BFS)"
      description={[
        "Breadth-First Search (BFS) is a graph traversal algorithm that explores all neighbors at the current depth before moving on to nodes at the next depth level.",
        "It uses a queue to keep track of the next node to visit, and a visited set to avoid revisiting nodes.",
      ]}
      applications={[
        "Finding shortest path in unweighted graphs",
        "Level order traversal in trees",
        "Crawling web pages",
        "Solving puzzles like sliding tiles or word ladders",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default BFSExplanation;
