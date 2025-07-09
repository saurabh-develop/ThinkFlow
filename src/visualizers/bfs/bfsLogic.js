export function bfsTraversal(graph, startNode) {
  const steps = [];
  const visited = new Set();
  const queue = [startNode];

  steps.push({
    current: null,
    visited: [],
    queue: [...queue],
    currentLine: 2,
  });

  while (queue.length > 0) {
    const node = queue.shift();
    steps.push({
      current: node,
      visited: Array.from(visited),
      queue: [...queue],
      currentLine: 4,
    });

    if (!visited.has(node)) {
      visited.add(node);
      steps.push({
        current: node,
        visited: Array.from(visited),
        queue: [...queue],
        currentLine: 6,
      });

      for (const neighbor of graph[node]) {
        steps.push({
          current: node,
          visited: Array.from(visited),
          queue: [...queue],
          currentLine: 8,
        });

        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          steps.push({
            current: node,
            visited: Array.from(visited),
            queue: [...queue],
            currentLine: 9,
          });
        }
      }
    }
  }

  return steps;
}
