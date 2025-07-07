import React from "react";

const AVLAnalysis = ({ tree }) => {
  if (!tree?.root) return null;

  const totalNodes = tree.countNodes();
  const height = tree.getHeight();
  const leafCount = tree.countLeafNodes();
  const internalCount = totalNodes - leafCount;
  const min = tree.findMin();
  const max = tree.findMax();
  const balanceFactors = tree.getBalanceFactors();

  const isBalanced = Object.values(balanceFactors).every(
    (bf) => Math.abs(bf) <= 1
  );
  const isPerfectlyBalanced = Object.values(balanceFactors).every(
    (bf) => bf === 0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-6">
      <div className="bg-[#11111b] rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-2">Basic Properties</h2>
        <p>
          Total Nodes: <span className="font-semibold">{totalNodes}</span>
        </p>
        <p>
          Height: <span className="font-semibold">{height}</span>
        </p>
        <p>
          Leaf Nodes: <span className="font-semibold">{leafCount}</span>
        </p>
        <p>
          Internal Nodes: <span className="font-semibold">{internalCount}</span>
        </p>
      </div>

      <div className="bg-[#11111b] rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-2">Balance Analysis</h2>
        <p>
          Is AVL Balanced:{" "}
          <span className={isBalanced ? "text-green-400" : "text-red-500"}>
            {isBalanced ? "Yes" : "No"}
          </span>
        </p>
        <p>
          Perfectly Balanced:{" "}
          <span
            className={
              isPerfectlyBalanced ? "text-green-400" : "text-yellow-500"
            }
          >
            {isPerfectlyBalanced ? "Yes" : "No"}
          </span>
        </p>
        <p>Balance Factor:</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {Object.entries(balanceFactors).map(([key, val]) => (
            <div
              key={key}
              className="bg-[#1e1e2f] px-3 py-1 rounded flex justify-between"
            >
              <span>Node {key}</span>
              <span className="font-bold">{val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#11111b] rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-2">Value Range</h2>
        <p>
          Min Value: <span className="font-semibold">{min}</span>
        </p>
        <p>
          Max Value: <span className="font-semibold">{max}</span>
        </p>
      </div>
    </div>
  );
};

export default AVLAnalysis;
