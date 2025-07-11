export function dijkstraTraversal(adj, start) {
  const steps = [];

  const dist = {};
  const visited = new Set();
  const prev = {};
  const pq = [];

  for (const node in adj) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[start] = 0;

  pq.push({ node: start, distance: 0 });

  while (pq.length > 0) {
    pq.sort((a, b) => a.distance - b.distance);

    const { node: current } = pq.shift();
    if (visited.has(current)) continue;
    visited.add(current);
    steps.push({
      current,
      visited: new Set([...visited]),
      queue: [...pq],
      distances: { ...dist },
      previous: { ...prev },
      relaxing: null,
    });

    for (const neighborObj of adj[current]) {
      const { node: neighbor, weight } = neighborObj;
      if (dist[current] + weight < dist[neighbor]) {
        dist[neighbor] = dist[current] + weight;
        prev[neighbor] = current;
        pq.push({ node: neighbor, distance: dist[neighbor] });

        steps.push({
          current,
          visited: new Set([...visited]),
          queue: [...pq],
          distances: { ...dist },
          previous: { ...prev },
          relaxing: { from: current, to: neighbor },
        });
      }
    }
  }

  return steps;
}
