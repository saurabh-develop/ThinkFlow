import React from "react";

const ItemInfoPanel = ({ items, currentItemIndex, capacity }) => {
  const weights = items.map((item) => item.weight);
  const values = items.map((item) => item.value);

  return (
    <div className="w-full max-w-5xl mx-auto mb-10">
      <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text text-center">
        📦 Knapsack Details
      </h2>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-inner backdrop-blur text-white text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Weights Array */}
          <div>
            <h3 className="text-purple-400 font-semibold mb-2">Weights</h3>
            <div className="flex flex-wrap gap-2">
              {weights.map((w, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-md ${
                    currentItemIndex === i
                      ? "bg-purple-600 font-bold"
                      : "bg-white/10"
                  }`}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Values Array */}
          <div>
            <h3 className="text-purple-400 font-semibold mb-2">Values</h3>
            <div className="flex flex-wrap gap-2">
              {values.map((v, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-md ${
                    currentItemIndex === i
                      ? "bg-purple-600 font-bold"
                      : "bg-white/10"
                  }`}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Capacity */}
          <div>
            <h3 className="text-purple-400 font-semibold mb-2">Capacity</h3>
            <div className="px-4 py-2 bg-white/10 rounded-md font-bold text-white text-center">
              {capacity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfoPanel;
