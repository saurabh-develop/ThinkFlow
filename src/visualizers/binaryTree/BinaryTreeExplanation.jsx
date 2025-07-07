import React, { useState } from "react";

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

const BinaryTreeExplanation = () => {
  const [lang, setLang] = useState("javascript");

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto space-y-8">
      {/* Explanation Section */}
      <div className="space-y-4 text-left">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          🌲 What is a Binary Tree?
        </h2>
        <p className="text-purple-200 text-sm leading-relaxed">
          A <span className="text-white font-semibold">Binary Tree</span> is a
          hierarchical data structure where each node has at most two children,
          commonly referred to as the <strong>left</strong> and{" "}
          <strong>right</strong> child.
        </p>
        <p className="text-purple-200 text-sm leading-relaxed">
          It’s the foundation for more advanced trees like BSTs, AVL Trees, and
          Heaps, and is widely used in parsing, expression trees, and search
          algorithms.
        </p>

        {/* Real-world Applications */}
        <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow">
          <h3 className="text-white font-semibold mb-2">
            💡 Real-World Applications:
          </h3>
          <ul className="list-disc list-inside text-sm text-purple-200 space-y-1">
            <li>Expression evaluation in compilers</li>
            <li>Routing tables and network structure</li>
            <li>Hierarchical data modeling (e.g., XML/JSON parsing)</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow space-y-4">
        <h3 className="text-white text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          🔧 Binary Tree Insertion Code
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

        {/* Code Snippet */}
        <div className="relative bg-black/30 p-4 rounded-lg text-xs text-purple-200 shadow-inner whitespace-pre-wrap overflow-x-auto">
          <CopyButton text={codeSnippets[lang]} />
          <pre>{codeSnippets[lang]}</pre>
        </div>
      </div>
    </div>
  );
};

export default BinaryTreeExplanation;
