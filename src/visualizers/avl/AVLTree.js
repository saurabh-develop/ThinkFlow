class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }

  clone() {
    const newNode = new AVLNode(this.value);
    newNode.height = this.height;
    newNode.left = this.left ? this.left.clone() : null;
    newNode.right = this.right ? this.right.clone() : null;
    return newNode;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
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
    while (node.left) node = node.left;
    return node.value;
  }

  findMax(node = this.root) {
    if (!node) return null;
    while (node.right) node = node.right;
    return node.value;
  }

  getBalanceFactors(node = this.root, map = {}) {
    if (!node) return map;
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    const balanceFactor = leftHeight - rightHeight;
    map[node.value] = balanceFactor;
    this.getBalanceFactors(node.left, map);
    this.getBalanceFactors(node.right, map);
    return map;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rightRotate(y, rotations) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    if (rotations) rotations.push(`Right Rotation at node ${y.value}`);
    return x;
  }

  leftRotate(x, rotations) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    if (rotations) rotations.push(`Left Rotation at node ${x.value}`);
    return y;
  }

  insert(value, rotations = []) {
    this.root = this._insert(this.root, value, rotations);
  }

  _insert(node, value, rotations) {
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value, rotations);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value, rotations);
    } else {
      return node; // No duplicates
    }

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    const balance = this.getBalance(node);

    // Rotations
    if (balance > 1 && value < node.left.value)
      return this.rightRotate(node, rotations);
    if (balance < -1 && value > node.right.value)
      return this.leftRotate(node, rotations);
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left, rotations);
      return this.rightRotate(node, rotations);
    }
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right, rotations);
      return this.leftRotate(node, rotations);
    }

    return node;
  }

  delete(value, rotations = []) {
    this.root = this._delete(this.root, value, rotations);
  }

  _delete(root, value, rotations) {
    if (!root) return null;

    if (value < root.value) {
      root.left = this._delete(root.left, value, rotations);
    } else if (value > root.value) {
      root.right = this._delete(root.right, value, rotations);
    } else {
      if (!root.left || !root.right) {
        return root.left || root.right || null;
      }

      const minNode = this._getMinValueNode(root.right);
      root.value = minNode.value;
      root.right = this._delete(root.right, minNode.value, rotations);
    }

    root.height =
      1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));

    const balance = this.getBalance(root);

    if (balance > 1 && this.getBalance(root.left) >= 0)
      return this.rightRotate(root, rotations);
    if (balance > 1 && this.getBalance(root.left) < 0) {
      root.left = this.leftRotate(root.left, rotations);
      return this.rightRotate(root, rotations);
    }
    if (balance < -1 && this.getBalance(root.right) <= 0)
      return this.leftRotate(root, rotations);
    if (balance < -1 && this.getBalance(root.right) > 0) {
      root.right = this.rightRotate(root.right, rotations);
      return this.leftRotate(root, rotations);
    }

    return root;
  }

  _getMinValueNode(node) {
    let current = node;
    while (current.left) current = current.left;
    return current;
  }

  inOrder() {
    const result = [];
    this._inOrder(this.root, result);
    return result;
  }

  _inOrder(node, result) {
    if (!node) return;
    this._inOrder(node.left, result);
    result.push(node.value);
    this._inOrder(node.right, result);
  }

  preOrder() {
    const result = [];
    this._preOrder(this.root, result);
    return result;
  }

  _preOrder(node, result) {
    if (!node) return;
    result.push(node.value);
    this._preOrder(node.left, result);
    this._preOrder(node.right, result);
  }

  postOrder() {
    const result = [];
    this._postOrder(this.root, result);
    return result;
  }

  _postOrder(node, result) {
    if (!node) return;
    this._postOrder(node.left, result);
    this._postOrder(node.right, result);
    result.push(node.value);
  }

  clone() {
    const newTree = new AVLTree();
    newTree.root = this.root ? this.root.clone() : null;
    return newTree;
  }
}

export default AVLTree;
