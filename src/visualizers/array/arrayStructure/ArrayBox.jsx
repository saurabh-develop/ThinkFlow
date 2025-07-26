import { motion } from "framer-motion";

const ArrayBox = ({ value, index, highlight, pathIndex }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`relative bg-white/10 border backdrop-blur-lg rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-center shadow transition-all duration-300
        ${
          highlight
            ? "border-purple-500 ring-2 ring-purple-500 shadow-purple-400/40"
            : pathIndex !== undefined
            ? "border-purple-500 ring-2 ring-purple-500 shadow-blue-400/30"
            : "border-white/20 hover:shadow-purple-400"
        }
      `}
    >
      {highlight && (
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
      )}

      {pathIndex !== undefined && (
        <div className="absolute top-1 left-1 text-xs border border-purple-500 bg-blue-900/60 px-1 rounded text-white">
          Step {pathIndex + 1}
        </div>
      )}

      <div className="text-lg sm:text-xl font-semibold text-white">{value}</div>
      <div className="text-xs sm:text-sm text-purple-400 mt-1">
        Index {index}
      </div>
    </motion.div>
  );
};

export default ArrayBox;
