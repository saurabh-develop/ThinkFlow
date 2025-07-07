export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      if (!current.left) {
        current.left = newNode;
        return;
      } else queue.push(current.left);

      if (!current.right) {
        current.right = newNode;
        return;
      } else queue.push(current.right);
    }
  }

  findNode(value, node = this.root) {
    if (!node) return null;
    if (node.value === value) return node;
    return this.findNode(value, node.left) || this.findNode(value, node.right);
  }

  insertAt(value, parentValue, side = "left") {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return true;
    }

    const parent = this.findNode(parentValue);
    if (!parent) return false;

    if (side === "left" && !parent.left) {
      parent.left = newNode;
      return true;
    } else if (side === "right" && !parent.right) {
      parent.right = newNode;
      return true;
    }

    return false;
  }

  traversePreOrder(node = this.root, result = []) {
    if (!node) return;
    result.push(node.value);
    this.traversePreOrder(node.left, result);
    this.traversePreOrder(node.right, result);
    return result;
  }

  traverseInOrder(node = this.root, result = []) {
    if (!node) return;
    this.traverseInOrder(node.left, result);
    result.push(node.value);
    this.traverseInOrder(node.right, result);
    return result;
  }

  traversePostOrder(node = this.root, result = []) {
    if (!node) return;
    this.traversePostOrder(node.left, result);
    this.traversePostOrder(node.right, result);
    result.push(node.value);
    return result;
  }

  countNodes(node = this.root) {
    if (!node) return 0;
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }

  countLeafNodes(node = this.root) {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;
    return this.countLeafNodes(node.left) + this.countLeafNodes(node.right);
  }

  getHeight(node = this.root) {
    if (!node) return 0;
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  findMin(node = this.root) {
    if (!node) return null;
    let min = node.value;
    if (node.left) min = Math.min(min, this.findMin(node.left));
    if (node.right) min = Math.min(min, this.findMin(node.right));
    return min;
  }

  findMax(node = this.root) {
    if (!node) return null;
    let max = node.value;
    if (node.left) max = Math.max(max, this.findMax(node.left));
    if (node.right) max = Math.max(max, this.findMax(node.right));
    return max;
  }

  getBalanceFactors() {
    const balances = {};
    const compute = (node) => {
      if (!node) return 0;

      const lh = compute(node.left);
      const rh = compute(node.right);
      const balance = lh - rh;
      balances[node.value] = balance;

      return 1 + Math.max(lh, rh);
    };

    compute(this.root);
    return balances;
  }
}
