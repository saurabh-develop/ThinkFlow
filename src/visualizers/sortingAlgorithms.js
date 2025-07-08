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

export const insertionSortSteps = (arr) => {
  const steps = [];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      sortedIndices: [],
      line: 1,
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];

      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        sortedIndices: [],
        line: 2,
      });

      j--;
    }

    arr[j + 1] = key;

    steps.push({
      array: [...arr],
      comparing: [j + 1],
      sortedIndices: [],
      line: 3,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    sortedIndices: Array.from({ length: arr.length }, (_, i) => i),
    line: 0,
  });

  return steps;
};

export const selectionSortSteps = (arr) => {
  const steps = [];
  const n = arr.length;
  const array = [...arr];

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    steps.push({
      array: [...array],
      comparing: [i],
      sortedIndices: [...Array(i).keys()],
      line: 1,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        comparing: [j, minIndex],
        sortedIndices: [...Array(i).keys()],
        line: 3,
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;

        steps.push({
          array: [...array],
          comparing: [j, minIndex],
          sortedIndices: [...Array(i).keys()],
          line: 4,
        });
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];

      steps.push({
        array: [...array],
        comparing: [i, minIndex],
        sortedIndices: [...Array(i).keys()],
        line: 8,
      });
    }

    steps.push({
      array: [...array],
      comparing: [],
      sortedIndices: [...Array(i + 1).keys()],
      line: 9,
    });
  }

  steps.push({
    array: [...array],
    comparing: [],
    sortedIndices: [...Array(n).keys()],
    line: 0,
  });

  return steps;
};
