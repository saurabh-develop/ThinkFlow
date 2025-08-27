import React from "react";
import { motion } from "motion/react";

const StackBox = ({ value, isTop, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-[180px] py-3 px-6 rounded-xl bg-white/10 border 
        ${
          isTop
            ? "border-purple-500 shadow-md shadow-purple-500/40"
            : "border-white/20"
        } 
        text-center text-lg font-semibold transition-all backdrop-blur-lg`}
    >
      {value}
      {isTop && <div className="text-xs mt-1 text-purple-400">Top</div>}
    </motion.div>
  );
};

export default StackBox;
