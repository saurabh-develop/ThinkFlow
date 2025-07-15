const useTabulationSteps = (items, capacity) => {
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  const steps = [];

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      const { weight, value } = items[i - 1];

      const exclude = dp[i - 1][w];
      let include = 0;

      steps.push({
        i,
        w,
        item: { ...items[i - 1] },
        codeLine: 5,
        table: dp.map((row) => [...row]),
        action: "exclude-eval",
        exclude,
      });

      steps.push({
        i,
        w,
        item: { ...items[i - 1] },
        codeLine: 6,
        table: dp.map((row) => [...row]),
        action: "condition-check",
        weight,
      });

      if (w >= weight) {
        include = value + dp[i - 1][w - weight];

        steps.push({
          i,
          w,
          item: { ...items[i - 1] },
          codeLine: 7,
          table: dp.map((row) => [...row]),
          action: "include-eval",
          include,
        });
      } else {
        steps.push({
          i,
          w,
          item: { ...items[i - 1] },
          codeLine: 9,
          table: dp.map((row) => [...row]),
          action: "include-zero",
          include: 0,
        });
      }

      dp[i][w] = Math.max(include, exclude);

      steps.push({
        i,
        w,
        item: { ...items[i - 1] },
        codeLine: 10,
        table: dp.map((row) => [...row]),
        action: "final-decision",
        include,
        exclude,
        decision: dp[i][w],
        isIncludeTaken: include > exclude,
      });
    }
  }

  return steps;
};

export default useTabulationSteps;
