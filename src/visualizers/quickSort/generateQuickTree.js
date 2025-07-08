export function generateQuickTreeSteps(originalArray) {
  const steps = [];

  // Main wrapper node
  const root = {
    array: [...originalArray],
    pivotIndex: null,
    left: null,
    right: null,
    sorted: [],
  };

  function quickSort(node) {
    const arr = node.array;
    const n = arr.length;

    if (n <= 1) {
      node.sorted = [...arr];
      return;
    }

    const pivotIndex = n - 1;
    const pivot = arr[pivotIndex];
    node.pivotIndex = pivotIndex;

    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < pivotIndex; i++) {
      if (arr[i] <= pivot) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }

    node.left = {
      array: leftArr,
      pivotIndex: null,
      left: null,
      right: null,
      sorted: [],
    };

    node.right = {
      array: rightArr,
      pivotIndex: null,
      left: null,
      right: null,
      sorted: [],
    };

    steps.push(deepCloneTree(root));

    quickSort(node.left);
    quickSort(node.right);

    node.sorted = [
      ...(node.left?.sorted || []),
      pivot,
      ...(node.right?.sorted || []),
    ];
  }

  quickSort(root);
  steps.push(deepCloneTree(root));

  return steps;
}

function deepCloneTree(node) {
  if (!node) return null;
  return {
    array: [...node.array],
    pivotIndex: node.pivotIndex,
    left: deepCloneTree(node.left),
    right: deepCloneTree(node.right),
    sorted: node.sorted ? [...node.sorted] : [],
  };
}
