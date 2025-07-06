import React from "react";
import { motion } from "framer-motion";

const HeapNode = ({ value }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-semibold
                 border border-white/20 bg-white/10 backdrop-blur shadow-md hover:shadow-purple-500 transition-all"
    >
      {value}
    </motion.div>
  );
};

export default HeapNode;
