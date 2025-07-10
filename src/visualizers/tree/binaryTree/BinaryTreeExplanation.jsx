import React from "react";
import ExplanationSection from "../../ExplanationSection.jsx";

const codeSnippets = {
  javascript: `// Binary Tree Node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Insertion (Level Order)
function insert(root, value) {
  const newNode = new TreeNode(value);
  if (!root) return newNode;

  const queue = [root];
  while (queue.length) {
    const current = queue.shift();
    if (!current.left) {
      current.left = newNode;
      break;
    } else queue.push(current.left);

    if (!current.right) {
      current.right = newNode;
      break;
    } else queue.push(current.right);
  }

  return root;
}
`,
  cpp: `// Binary Tree Node
#include <iostream>
#include <queue>
using namespace std;

struct TreeNode {
  int val;
  TreeNode *left, *right;
  TreeNode(int v) : val(v), left(NULL), right(NULL) {}
};

TreeNode* insert(TreeNode* root, int val) {
  TreeNode* newNode = new TreeNode(val);
  if (!root) return newNode;

  queue<TreeNode*> q;
  q.push(root);
  while (!q.empty()) {
    TreeNode* curr = q.front(); q.pop();
    if (!curr->left) {
      curr->left = newNode;
      break;
    } else q.push(curr->left);

    if (!curr->right) {
      curr->right = newNode;
      break;
    } else q.push(curr->right);
  }

  return root;
}
`,
  java: `// Binary Tree Node
class TreeNode {
  int val;
  TreeNode left, right;
  TreeNode(int v) {
    val = v;
    left = right = null;
  }
}

import java.util.*;
class BinaryTree {
  public TreeNode insert(TreeNode root, int val) {
    TreeNode newNode = new TreeNode(val);
    if (root == null) return newNode;

    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
      TreeNode curr = q.poll();
      if (curr.left == null) {
        curr.left = newNode;
        break;
      } else q.offer(curr.left);

      if (curr.right == null) {
        curr.right = newNode;
        break;
      } else q.offer(curr.right);
    }

    return root;
  }
}
`,
};

const BinaryTreeExplanation = () => {
  return (
    <ExplanationSection
      title="🌲 What is a Binary Tree?"
      description={[
        "A Binary Tree is a hierarchical data structure where each node has at most two children, commonly referred to as the left and right child.",
        "It’s the foundation for more advanced trees like BSTs, AVL Trees, and Heaps, and is widely used in parsing, expression trees, and search algorithms.",
      ]}
      applications={[
        "Expression evaluation in compilers",
        "Routing tables and network structure",
        "Hierarchical data modeling (e.g., XML/JSON parsing)",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default BinaryTreeExplanation;
