import React from "react";
import { motion } from "framer-motion";

const boxClass =
  "bg-white/10 border border-white/20 text-white text-sm font-mono rounded-md px-3 py-2 min-w-[40px] text-center shadow transition-all duration-500";

const ArrayBox = ({ values, highlight }) => {
  return (
    <motion.div
      className={`flex gap-1 justify-center flex-wrap ${
        highlight ? "bg-purple-600/30 scale-105" : ""
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {values.map((val, i) => (
        <motion.div
          key={i}
          className={`bg-white/10 border border-white/20 text-white text-sm font-mono rounded-md px-3 py-2 min-w-[40px] text-center shadow ${
            highlight ? "border-purple-500 bg-purple-700/40" : ""
          }`}
          layout
        >
          {val}
        </motion.div>
      ))}
    </motion.div>
  );
};

const Arrow = () => (
  <div className="text-center my-2">
    <span className="text-white text-xl">↓</span>
  </div>
);

// Recursive tree renderer with animation
const MergeSortTreeView = ({ node }) => {
  if (!node) return null;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <ArrayBox values={node.array} highlight={node.highlight} />

      {node.left && node.right && (
        <motion.div
          className="text-center my-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <span className="text-white text-xl">↓</span>
        </motion.div>
      )}

      <div className="flex gap-4 mt-2 w-full justify-center flex-wrap">
        {node.left && <MergeSortTreeView node={node.left} />}
        {node.right && <MergeSortTreeView node={node.right} />}
      </div>
    </motion.div>
  );
};

export default MergeSortTreeView;
