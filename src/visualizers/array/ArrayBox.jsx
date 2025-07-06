import { motion } from "framer-motion";

const ArrayBox = ({ value, index, highlight, pathIndex }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`relative bg-white/10 border backdrop-blur-lg rounded-xl px-6 py-4 text-center shadow transition-all duration-300 ${
        highlight
          ? "border-purple-500 ring-2 ring-purple-500 shadow-purple-400/40"
          : pathIndex !== undefined
          ? "border-purple-500 ring-2 ring-purple-500 shadow-blue-400/30"
          : "border-white/20 hover:shadow-purple-400"
      }`}
    >
      {/* Final Action Ping */}
      {highlight && (
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
      )}

      {/* Step Path Indicator */}
      {pathIndex !== undefined && (
        <div className="absolute top-1 left-1 text-xs border-purple-500 bg-blue-900/60 px-1 rounded">
          Step {pathIndex + 1}
        </div>
      )}

      <div className="text-xl font-semibold">{value}</div>
      <div className="text-sm text-purple-400 mt-1">Index {index}</div>
    </motion.div>
  );
};

export default ArrayBox;
