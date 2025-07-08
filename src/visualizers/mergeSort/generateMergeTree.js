let nodeId = 0;

function cloneTree(node, highlightId = null) {
  if (!node) return null;
  return {
    id: node.id,
    array: [...node.array],
    left: cloneTree(node.left, highlightId),
    right: cloneTree(node.right, highlightId),
    depth: node.depth,
    highlight: node.id === highlightId,
  };
}

function createMergeSortTree(arr, left, right, depth = 0) {
  const id = nodeId++;
  const node = {
    id,
    array: arr.slice(left, right + 1),
    left: null,
    right: null,
    depth,
  };

  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    node.left = createMergeSortTree(arr, left, mid, depth + 1);
    node.right = createMergeSortTree(arr, mid + 1, right, depth + 1);
  }

  return node;
}

export function generateMergeTreeSteps(array) {
  nodeId = 0;
  const arrCopy = [...array];
  const steps = [];

  const root = createMergeSortTree(arrCopy, 0, arrCopy.length - 1);

  function mergeSort(node, left, right) {
    steps.push(cloneTree(root, node.id)); 

    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    mergeSort(node.left, left, mid);
    mergeSort(node.right, mid + 1, right);

    const merged = [];
    let i = 0,
      j = 0;
    const leftArr = node.left?.array || [];
    const rightArr = node.right?.array || [];

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] < rightArr[j]) {
        merged.push(leftArr[i++]);
      } else {
        merged.push(rightArr[j++]);
      }
    }
    while (i < leftArr.length) merged.push(leftArr[i++]);
    while (j < rightArr.length) merged.push(rightArr[j++]);

    node.array = merged;

    steps.push(cloneTree(root, node.id));
  }

  mergeSort(root, 0, arrCopy.length - 1);
  return steps;
}
