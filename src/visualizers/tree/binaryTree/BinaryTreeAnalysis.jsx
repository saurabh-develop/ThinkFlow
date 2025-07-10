import React from "react";

const BinaryTreeAnalysis = ({ tree }) => {
  if (!tree?.root) return null;

  const totalNodes = tree.countNodes();
  const height = tree.getHeight();
  const leafCount = tree.countLeafNodes();
  const internalCount = totalNodes - leafCount;
  const min = tree.findMin();
  const max = tree.findMax();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-6">
      <div className="bg-[#11111b] rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-2 text-white">
          📊 Basic Properties
        </h2>
        <p className="text-purple-200">
          Total Nodes:{" "}
          <span className="font-semibold text-white">{totalNodes}</span>
        </p>
        <p className="text-purple-200">
          Height: <span className="font-semibold text-white">{height}</span>
        </p>
        <p className="text-purple-200">
          Leaf Nodes:{" "}
          <span className="font-semibold text-white">{leafCount}</span>
        </p>
        <p className="text-purple-200">
          Internal Nodes:{" "}
          <span className="font-semibold text-white">{internalCount}</span>
        </p>
      </div>

      <div className="bg-[#11111b] rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-2 text-white">🔁 Traversals</h2>
        <p className="text-purple-200">Inorder:</p>
        <p className="text-white text-sm mb-2">
          {tree.traverseInOrder().join(", ")}
        </p>
        <p className="text-purple-200">Preorder:</p>
        <p className="text-white text-sm mb-2">
          {tree.traversePreOrder().join(", ")}
        </p>
        <p className="text-purple-200">Postorder:</p>
        <p className="text-white text-sm">
          {tree.traversePostOrder().join(", ")}
        </p>
      </div>

      <div className="bg-[#11111b] rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-2 text-white">📈 Value Range</h2>
        <p className="text-purple-200">
          Min Value: <span className="font-semibold text-white">{min}</span>
        </p>
        <p className="text-purple-200">
          Max Value: <span className="font-semibold text-white">{max}</span>
        </p>
      </div>
    </div>
  );
};

export default BinaryTreeAnalysis;
