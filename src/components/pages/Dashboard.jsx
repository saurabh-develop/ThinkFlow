import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./SideBar";

const dataStructures = [
  {
    title: "Array",
    path: "/array",
    description:
      "Store elements in contiguous memory for fast access and iteration.",
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
  {
    title: "Array",
    path: "/sorting",
    description:
      "Visualize classic sorting techniques like QuickSort and MergeSort.",
  },
  {
    title: "Graph",
    path: "/graphs",
    description:
      "Explore traversal, shortest path, and connectivity algorithms.",
  },
  {
    title: "DP",
    path: "/dp",
    description:
      "Master Dynamic Programming with visual step-by-step solutions.",
  },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#0d0d15] text-white">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 py-10">
        <div className="max-w-6xl mx-auto space-y-14">
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
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
