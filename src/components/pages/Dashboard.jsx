import React from "react";
import { motion } from "framer-motion";

const dataStructures = [
  {
    title: "Array",
    path: "/array",
    description:
      "Store elements in contiguous memory for fast access and iteration.",
  },
  {
    title: "Linked List",
    path: "/linkedList",
    description:
      "Linear structure with dynamic memory; ideal for frequent insertions and deletions.",
  },
  {
    title: "Stack",
    path: "/stack",
    description:
      "LIFO data structure used for backtracking, parsing, and more.",
  },
  {
    title: "Queue",
    path: "/queue",
    description: "FIFO structure ideal for scheduling and task management.",
  },
  {
    title: "Heap",
    path: "/heap",
    description:
      "Binary tree-based structure optimized for priority-based retrieval.",
  },
  {
    title: "Binary Tree",
    path: "/binarytree",
    description: "Hierarchical structure with nodes having up to two children.",
  },
  {
    title: "AVL Tree",
    path: "/avltree",
    description:
      "Self-balancing binary search tree ensuring O(log n) operations.",
  },
];

const algorithms = [
  // Sorting Algorithms
  {
    title: "Bubble Sort",
    path: "/bubbleSort",
    description:
      "Repeatedly swaps adjacent elements to bubble up the largest element.",
  },
  {
    title: "Insertion Sort",
    path: "/insertionSort",
    description:
      "Builds the final sorted array one item at a time by inserting elements.",
  },
  {
    title: "Selection Sort",
    path: "/selectionSort",
    description:
      "Selects the smallest element from unsorted and places it at the beginning.",
  },
  {
    title: "Merge Sort",
    path: "/mergeSort",
    description:
      "Divide and conquer algorithm that splits arrays and merges them sorted.",
  },
  {
    title: "Quick Sort",
    path: "/quickSort",
    description:
      "Efficient sorting using divide-and-conquer and partitioning techniques.",
  },
  // Graph Algorithms
  {
    title: "BFS (Breadth-First Search)",
    path: "/bfsTraversal",
    description:
      "Explores nodes level by level, ideal for shortest path in unweighted graphs.",
  },
  {
    title: "DFS (Depth-First Search)",
    path: "/dfsTraversal",
    description:
      "Traverses as deep as possible before backtracking, useful in topological sort.",
  },
  {
    title: "Dijkstra's Algorithm",
    path: "/dijkstra",
    description:
      "Finds the shortest path from a source to all vertices in a weighted graph.",
  },
  {
    title: "Topological Sort",
    path: "/toposort",
    description: "Linear ordering of vertices in a DAG based on dependencies.",
  },
  // Dynamic Programming
  {
    title: "Tabulation",
    path: "/tabulation",
    description:
      "Optimize value while respecting weight constraints using dynamic programming.",
  },
  {
    title: "Longest Common Subsequence (LCS)",
    path: "/lcs",
    description:
      "Find the longest subsequence common to two sequences using DP.",
  },
  {
    title: "Matrix Chain Multiplication",
    path: "/matrixChain",
    description: "Optimize the cost of matrix multiplication order using DP.",
  },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen pt-[64px] px-4 sm:px-8 py-10">
      <main className="w-full max-w-7xl mx-auto space-y-14">
        {/* Section: Data Structures */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text"
          >
            Data Structures
          </motion.h2>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dataStructures.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl border border-white/10 backdrop-blur bg-white/5 px-8 py-12 text-center shadow-lg cursor-pointer transition-all hover:shadow-purple-500/30 hover:ring-1 hover:ring-purple-400"
                  onClick={() => (window.location.href = item.path)}
                >
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Algorithms */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text"
          >
            Algorithms
          </motion.h2>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {algorithms.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl border border-white/10 backdrop-blur bg-white/5 px-8 py-12 text-center shadow-lg cursor-pointer transition-all hover:shadow-purple-500/30 hover:ring-1 hover:ring-purple-400"
                  onClick={() => (window.location.href = item.path)}
                >
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
