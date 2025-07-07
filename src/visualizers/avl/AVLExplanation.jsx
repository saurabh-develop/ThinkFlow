import React from "react";
import ExplanationSection from "../ExplanationSection.jsx"; 

const codeSnippets = {
  javascript: `// JavaScript AVL Tree Node and Insert
class AVLNode {
  constructor(value) {
    this.value = value;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}
// ...rest of the AVL logic
function insert(node, key) {
  // Insert logic + rotations
  return node;
}`,
  cpp: `// C++ AVL Tree Insert
struct Node {
  int key, height;
  Node *left, *right;
  Node(int val) : key(val), height(1), left(NULL), right(NULL) {}
};
// ...rest of insert + rotate logic`,
  java: `// Java AVL Tree Insert
class Node {
  int key, height;
  Node left, right;

  Node(int d) {
    key = d;
    height = 1;
  }
}
// ...rest of insert + rotate logic`,
};

const AVLExplanation = () => {
  return (
    <ExplanationSection
      title="🌳 What is an AVL Tree?"
      description={[
        "An AVL Tree is a self-balancing binary search tree (BST) where the height difference between left and right subtrees (balance factor) is at most 1.",
        "It maintains O(log n) time complexity for insertions, deletions, and lookups, which makes it ideal for performance-critical applications.",
      ]}
      applications={[
        "Databases and file systems for balanced indexing",
        "Memory management in operating systems",
        "Routing protocols and load balancing",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default AVLExplanation;
