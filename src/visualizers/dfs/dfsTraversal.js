export function dfsTraversal(graph, startNode) {
  const steps = [];
  const visited = new Set();

  function dfs(node) {
    steps.push({
      type: "call",
      current: node,
      visited: Array.from(visited),
      currentLine: 0,
    });

    if (visited.has(node)) {
      steps.push({
        type: "return",
        current: node,
        visited: Array.from(visited),
        currentLine: 1,
      });
      return;
    }

    visited.add(node);
    steps.push({
      type: "visit",
      current: node,
      visited: Array.from(visited),
      currentLine: 2,
    });

    steps.push({
      type: "loop",
      current: node,
      visited: Array.from(visited),
      currentLine: 4,
    });

    for (const neighbor of graph[node] || []) {
      steps.push({
        type: "explore",
        current: neighbor,
        from: node,
        visited: Array.from(visited),
        currentLine: 5,
      });

      dfs(neighbor);
    }

    steps.push({
      type: "return",
      current: node,
      visited: Array.from(visited),
      currentLine: 6,
    });
  }

  dfs(startNode);
  return steps;
}
