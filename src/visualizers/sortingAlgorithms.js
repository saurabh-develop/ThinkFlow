export const bubbleSortSteps = (arr) => {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  const sorted = new Set();

  for (let i = 0; i < n - 1; i++) {
    steps.push({
      array: [...a],
      comparing: [],
      swapping: false,
      sortedIndices: [...sorted],
      line: 1, // outer loop start
    });

    for (let j = 0; j < n - i - 1; j++) {
      // Step: comparing
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        swapping: false,
        sortedIndices: [...sorted],
        line: 3,
      });

      if (a[j] > a[j + 1]) {
        // Step: swapping
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          array: [...a],
          comparing: [j, j + 1],
          swapping: true,
          sortedIndices: [...sorted],
          line: 4,
        });
      }

      // Step: after inner loop iteration
      steps.push({
        array: [...a],
        comparing: [],
        swapping: false,
        sortedIndices: [...sorted],
        line: 2,
      });
    }

    // Step: Mark one more element as sorted
    sorted.add(n - 1 - i);
    steps.push({
      array: [...a],
      comparing: [],
      swapping: false,
      sortedIndices: [...sorted],
      line: 6,
    });
  }

  // Final element at index 0 is also sorted
  sorted.add(0);
  steps.push({
    array: [...a],
    comparing: [],
    swapping: false,
    sortedIndices: [...sorted],
    line: 6,
  });

  return steps;
};
