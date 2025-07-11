import React from "react";
import ExplanationSection from "../ExplanationSection";

const codeSnippets = {
  javascript: `// JavaScript - Dijkstra's Algorithm
function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = new MinPriorityQueue();

  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const { element: current } = pq.dequeue();
    visited.add(current);

    for (let [neighbor, weight] of graph[current]) {
      if (!visited.has(neighbor)) {
        let newDist = distances[current] + weight;
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          pq.enqueue(neighbor, newDist);
        }
      }
    }
  }
  return distances;
}`,
  cpp: `// C++ - Dijkstra's Algorithm
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
using namespace std;

void dijkstra(unordered_map<char, vector<pair<char, int>>> &graph, char start) {
  unordered_map<char, int> dist;
  for (auto &p : graph) dist[p.first] = INT_MAX;
  dist[start] = 0;

  priority_queue<pair<int, char>, vector<pair<int, char>>, greater<>> pq;
  pq.push({0, start});

  while (!pq.empty()) {
    auto [d, node] = pq.top(); pq.pop();
    for (auto &[neighbor, weight] : graph[node]) {
      if (d + weight < dist[neighbor]) {
        dist[neighbor] = d + weight;
        pq.push({dist[neighbor], neighbor});
      }
    }
  }
}`,
  java: `// Java - Dijkstra's Algorithm
import java.util.*;

public class Dijkstra {
  public static Map<Character, Integer> dijkstra(Map<Character, List<Node>> graph, char start) {
    Map<Character, Integer> dist = new HashMap<>();
    for (char node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);
    dist.put(start, 0);

    PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(n -> n.weight));
    pq.add(new Node(start, 0));

    while (!pq.isEmpty()) {
      Node current = pq.poll();
      for (Node neighbor : graph.get(current.id)) {
        int newDist = dist.get(current.id) + neighbor.weight;
        if (newDist < dist.get(neighbor.id)) {
          dist.put(neighbor.id, newDist);
          pq.add(new Node(neighbor.id, newDist));
        }
      }
    }
    return dist;
  }

  static class Node {
    char id;
    int weight;
    Node(char id, int weight) {
      this.id = id;
      this.weight = weight;
    }
  }
}`,
};

const DijkstraExplanation = () => {
  return (
    <ExplanationSection
      title="📍 Dijkstra's Algorithm"
      description={[
        "Dijkstra’s algorithm is used to find the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights.",
        "It uses a priority queue to always extend the shortest discovered path.",
      ]}
      applications={[
        "GPS Navigation Systems",
        "Network Routing Protocols",
        "Shortest path in maps and games",
        "Project scheduling and planning",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default DijkstraExplanation;
