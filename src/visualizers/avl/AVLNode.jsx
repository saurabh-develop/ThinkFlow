import React from "react";

const AVLNode = ({ value, height, isHighlighted }) => {
  return (
    <div
      className={`rounded-full w-14 h-14 flex items-center justify-center text-white font-semibold text-sm border-2 ${
        isHighlighted ? "border-pink-400" : "border-purple-400"
      } bg-white/10 backdrop-blur`}
    >
      <div className="relative">
        <span>{value}</span>
        {height !== undefined && (
          <div className="absolute -top-4 right-0 bg-purple-600 text-white text-[10px] px-1 rounded shadow">
            h: {height}
          </div>
        )}
      </div>
    </div>
  );
};

export default AVLNode;
