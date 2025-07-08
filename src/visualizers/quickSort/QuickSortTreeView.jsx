import React from "react";
import { motion } from "framer-motion";

const QuickSortTreeView = ({ node, depth = 0 }) => {
  if (!node || !node.array) return null;

  return (
    <div className="flex flex-col items-center mb-10">
      <motion.div
        layout
        className="flex gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur shadow relative"
      >
        {node.array.map((val, i) => (
          <div className="flex flex-col items-center" key={i}>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold text-sm shadow-md transition-all ${
                i === node.pivotIndex
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-2 border-purple-300"
                  : "bg-white/10 text-white/80"
              }`}
            >
              {val}
            </div>
            {i === node.pivotIndex && (
              <div className="text-xs text-purple-400 mt-1">Pivot</div>
            )}
          </div>
        ))}
      </motion.div>

      {node.sorted && node.sorted.length > 1 && (
        <div className="mt-2 flex flex-wrap justify-center text-xs text-purple-300 font-medium">
          <span className="mr-2 text-white/50">Sorted:</span>
          {node.sorted.map((val, i) => (
            <div
              key={i}
              className="mx-[2px] px-2 py-1 rounded bg-white/10 border border-white/10 text-white"
            >
              {val}
            </div>
          ))}
        </div>
      )}

      {(node.left || node.right) && (
        <div className="flex mt-3 gap-4 w-full justify-around">
          {node.left && (
            <div className="flex-1 flex flex-col items-center border-l border-purple-600 pl-4">
              <div className="text-xs text-purple-500 mb-1">Left</div>
              <QuickSortTreeView node={node.left} depth={depth + 1} />
            </div>
          )}
          {node.right && (
            <div className="flex-1 flex flex-col items-center border-l border-purple-600 pl-4">
              <div className="text-xs text-purple-500 mb-1">Right</div>
              <QuickSortTreeView node={node.right} depth={depth + 1} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickSortTreeView;
