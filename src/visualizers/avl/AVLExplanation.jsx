import React, { useState } from "react";

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

function getHeight(node) {
  return node ? node.height : 0;
}

function getBalance(node) {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function rotateRight(y) {
  const x = y.left;
  const T2 = x.right;

  x.right = y;
  y.left = T2;

  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));

  return x;
}

function rotateLeft(x) {
  const y = x.right;
  const T2 = y.left;

  y.left = x;
  x.right = T2;

  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));

  return y;
}

function insert(node, key) {
  if (!node) return new AVLNode(key);
  if (key < node.value) node.left = insert(node.left, key);
  else if (key > node.value) node.right = insert(node.right, key);
  else return node;

  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  const balance = getBalance(node);

  // Left Left
  if (balance > 1 && key < node.left.value) return rotateRight(node);

  // Right Right
  if (balance < -1 && key > node.right.value) return rotateLeft(node);

  // Left Right
  if (balance > 1 && key > node.left.value) {
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }

  // Right Left
  if (balance < -1 && key < node.right.value) {
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }

  return node;
}`,

  cpp: `// C++ AVL Tree Insert
#include <iostream>
#include <algorithm>
using namespace std;

struct Node {
  int key, height;
  Node *left, *right;
  Node(int val) : key(val), height(1), left(NULL), right(NULL) {}
};

int height(Node* n) {
  return n ? n->height : 0;
}

int getBalance(Node* n) {
  return n ? height(n->left) - height(n->right) : 0;
}

Node* rotateRight(Node* y) {
  Node* x = y->left;
  Node* T2 = x->right;

  x->right = y;
  y->left = T2;

  y->height = max(height(y->left), height(y->right)) + 1;
  x->height = max(height(x->left), height(x->right)) + 1;

  return x;
}

Node* rotateLeft(Node* x) {
  Node* y = x->right;
  Node* T2 = y->left;

  y->left = x;
  x->right = T2;

  x->height = max(height(x->left), height(x->right)) + 1;
  y->height = max(height(y->left), height(y->right)) + 1;

  return y;
}

Node* insert(Node* node, int key) {
  if (!node) return new Node(key);
  if (key < node->key) node->left = insert(node->left, key);
  else if (key > node->key) node->right = insert(node->right, key);
  else return node;

  node->height = 1 + max(height(node->left), height(node->right));
  int balance = getBalance(node);

  if (balance > 1 && key < node->left->key) return rotateRight(node);
  if (balance < -1 && key > node->right->key) return rotateLeft(node);
  if (balance > 1 && key > node->left->key) {
    node->left = rotateLeft(node->left);
    return rotateRight(node);
  }
  if (balance < -1 && key < node->right->key) {
    node->right = rotateRight(node->right);
    return rotateLeft(node);
  }

  return node;
}`,

  java: `// Java AVL Tree Insert
class Node {
  int key, height;
  Node left, right;

  Node(int d) {
    key = d;
    height = 1;
  }
}

class AVLTree {
  int height(Node n) {
    return (n == null) ? 0 : n.height;
  }

  int getBalance(Node n) {
    return (n == null) ? 0 : height(n.left) - height(n.right);
  }

  Node rotateRight(Node y) {
    Node x = y.left;
    Node T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;

    return x;
  }

  Node rotateLeft(Node x) {
    Node y = x.right;
    Node T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(height(x.left), height(x.right)) + 1;
    y.height = Math.max(height(y.left), height(y.right)) + 1;

    return y;
  }

  Node insert(Node node, int key) {
    if (node == null) return new Node(key);
    if (key < node.key) node.left = insert(node.left, key);
    else if (key > node.key) node.right = insert(node.right, key);
    else return node;

    node.height = 1 + Math.max(height(node.left), height(node.right));
    int balance = getBalance(node);

    if (balance > 1 && key < node.left.key) return rotateRight(node);
    if (balance < -1 && key > node.right.key) return rotateLeft(node);
    if (balance > 1 && key > node.left.key) {
      node.left = rotateLeft(node.left);
      return rotateRight(node);
    }
    if (balance < -1 && key < node.right.key) {
      node.right = rotateRight(node.right);
      return rotateLeft(node);
    }

    return node;
  }
}`,
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white transition"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const AVLExplanation = () => {
  const [lang, setLang] = useState("javascript");

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto space-y-8">
      {/* Explanation */}
      <div className="space-y-4 text-left">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          🌳 What is an AVL Tree?
        </h2>
        <p className="text-purple-200 text-sm leading-relaxed">
          An <span className="text-white font-semibold">AVL Tree</span> is a
          self-balancing binary search tree (BST) where the difference in height
          of left and right subtrees (known as the{" "}
          <span className="text-white font-semibold">balance factor</span>) is
          at most 1 for all nodes.
        </p>
        <p className="text-purple-200 text-sm leading-relaxed">
          It ensures <span className="text-white font-semibold">O(log n)</span>{" "}
          time complexity for insertions, deletions, and lookups, making it
          ideal for performance-critical applications.
        </p>

        {/* Real-world usage */}
        <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow">
          <h3 className="text-white font-semibold mb-2">
            💡 Real-World Applications:
          </h3>
          <ul className="list-disc list-inside text-sm text-purple-200 space-y-1">
            <li>Databases and file systems for balanced indexing</li>
            <li>Memory management in operating systems</li>
            <li>Routing protocols and load balancing</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow space-y-4">
        <h3 className="text-white text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          🧠 AVL Tree Code Implementation
        </h3>

        {/* Language Tabs */}
        <div className="flex space-x-2 text-sm font-semibold">
          {["javascript", "cpp", "java"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded ${
                lang === l
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-300 hover:bg-white/20"
              }`}
            >
              {l === "javascript" ? "JavaScript" : l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="relative bg-black/30 p-4 rounded-lg text-xs text-purple-200 shadow-inner whitespace-pre-wrap overflow-x-auto">
          <CopyButton text={codeSnippets[lang]} />
          <pre>{codeSnippets[lang]}</pre>
        </div>
      </div>
    </div>
  );
};

export default AVLExplanation;
