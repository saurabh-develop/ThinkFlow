const useRecursiveSteps = (weights, values, capacity) => {
  const steps = [];
  const memo = new Map();

  const buildTree = (i, w) => {
    const key = `${i},${w}`;
    if (memo.has(key)) return memo.get(key);

    if (i < 0 || w <= 0) {
      const node = {
        key,
        i,
        w,
        value: 0,
        left: null,
        right: null,
        decision: "base",
      };
      steps.push(node);
      memo.set(key, node);
      return node;
    }

    const left = buildTree(i - 1, w);
    let right = null,
      include = 0;

    if (weights[i] <= w) {
      right = buildTree(i - 1, w - weights[i]);
      include = values[i] + right.value;
    }

    const exclude = left.value;
    const result = Math.max(include, exclude);

    const node = {
      key,
      i,
      w,
      value: result,
      left,
      right,
      decision: result === include ? "include" : "exclude",
    };

    steps.push(node);
    memo.set(key, node);
    return node;
  };

  const root = buildTree(weights.length - 1, capacity);
  return { root, traversal: steps };
};

export default useRecursiveSteps;
