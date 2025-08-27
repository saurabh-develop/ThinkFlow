import React from "react";
import { motion } from "motion/react";

const RecursiveTreeNode = ({ node, highlighted }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`absolute px-4 py-2 rounded-xl shadow-md border text-sm text-white bg-white/10 backdrop-blur-sm border-white/10 z-10 transition-colors duration-300
        ${highlighted ? "bg-purple-600 scale-105 font-bold" : ""}`}
      style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
    >
      <div className="text-center">
        <div>
          i = {node.i}, w = {node.w}
        </div>
        <div className="text-purple-300 mt-1">val = {node.result}</div>
      </div>
    </motion.div>
  );
};

export default RecursiveTreeNode;
