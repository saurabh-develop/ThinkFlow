import React, { useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import AVLControls from "./AVLControls";
import AVLTree from "./AVLTree";
import AVLExplanation from "./AVLExplanation";
import AVLAnalysis from "./AVLAnalysis";

const AnimatedNode = ({ data }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg relative text-white ${
        data.highlighted ? "bg-yellow-400 text-black" : "bg-[#8b3dff]"
      }`}
    >
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </motion.div>
  );
};

const nodeTypes = {
  custom: AnimatedNode,
};

const generateGraph = (
  root,
  x = 0,
  y = 0,
  depth = 0,
  parent = null,
  nodes = [],
  edges = [],
  highlightSet = new Set()
) => {
  if (!root) return { nodes, edges };
  const id = String(root.value);
  const spacingX = 150;
  const spacingY = 100;

  const node = {
    id,
    type: "custom",
    position: { x, y },
    data: {
      label: root.value,
      highlighted: highlightSet.has(root.value),
    },
  };

  nodes.push(node);

  if (parent) {
    edges.push({
      id: `${parent}-${id}`,
      source: parent,
      target: id,
      animated: true,
      style: { stroke: "#aaa" },
    });
  }

  if (root.left) {
    generateGraph(
      root.left,
      x - spacingX / (depth + 1),
      y + spacingY,
      depth + 1,
      id,
      nodes,
      edges,
      highlightSet
    );
  }
  if (root.right) {
    generateGraph(
      root.right,
      x + spacingX / (depth + 1),
      y + spacingY,
      depth + 1,
      id,
      nodes,
      edges,
      highlightSet
    );
  }

  return { nodes, edges };
};

const AVLFlowVisualizer = () => {
  const [tree, setTree] = useState(new AVLTree());
  const [deletedNode, setDeletedNode] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [traversalType, setTraversalType] = useState("inorder");
  const [traversalHistory, setTraversalHistory] = useState([]);
  const [rotationHistory, setRotationHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("visualization");

  const refreshGraph = (highlight = []) => {
    const highlightSet = new Set(highlight);
    const { nodes, edges } = generateGraph(
      tree.root,
      0,
      0,
      0,
      null,
      [],
      [],
      highlightSet
    );
    setNodes(nodes);
    setEdges(edges);
  };

  useEffect(() => {
    refreshGraph();
  }, [tree]);

  const handleTraversal = async (type) => {
    let result = [];
    switch (type) {
      case "inorder":
        result = tree.inOrder();
        break;
      case "preorder":
        result = tree.preOrder();
        break;
      case "postorder":
        result = tree.postOrder();
        break;
      default:
        break;
    }
    setTraversalType(type);
    setTraversalHistory(result);

    for (let i = 0; i < result.length; i++) {
      refreshGraph([result[i]]);
      await new Promise((r) => setTimeout(r, 700));
    }
    refreshGraph([]);
  };

  const handleReset = () => {
    setTree(new AVLTree());
    setTraversalHistory([]);
    setRotationHistory([]);
    refreshGraph();
  };

  return (
    <div className="flex min-h-screen text-white">
      <main className="flex-1 px-4 sm:px-8 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          AVL Tree Visualizer
        </h1>

        {/* Tab Switch */}
        <div className="flex w-full max-w-xl mx-auto mb-8 rounded-xl overflow-hidden border border-white/10">
          <button
            className={`w-1/3 py-2 font-semibold transition-colors ${
              activeTab === "visualization"
                ? "bg-white/10 text-white"
                : "bg-transparent text-white/50"
            }`}
            onClick={() => setActiveTab("visualization")}
          >
            Visualization
          </button>
          <button
            className={`w-1/3 py-2 font-semibold transition-colors ${
              activeTab === "analysis"
                ? "bg-white/10 text-white"
                : "bg-transparent text-white/50"
            }`}
            onClick={() => setActiveTab("analysis")}
          >
            Analysis
          </button>
          <button
            className={`w-1/3 py-2 font-semibold transition-colors ${
              activeTab === "explanation"
                ? "bg-white/10 text-white"
                : "bg-transparent text-white/50"
            }`}
            onClick={() => setActiveTab("explanation")}
          >
            Explanation
          </button>
        </div>

        {activeTab === "visualization" && (
          <>
            <AVLControls
              avlTree={tree}
              setAvlTree={setTree}
              setDeletedNode={setDeletedNode}
              setRotationHistory={(history) =>
                setRotationHistory((prev) => [...prev, ...history])
              }
              onReset={handleReset}
            />

            <div className="flex justify-center gap-4 my-4">
              <button
                onClick={() => handleTraversal("inorder")}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
              >
                In-Order
              </button>
              <button
                onClick={() => handleTraversal("preorder")}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
              >
                Pre-Order
              </button>
              <button
                onClick={() => handleTraversal("postorder")}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
              >
                Post-Order
              </button>
            </div>

            <div className="text-center mb-4">
              <p className="mb-1 font-semibold">
                {traversalType.charAt(0).toUpperCase() + traversalType.slice(1)}{" "}
                Traversal:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {traversalHistory.map((val, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-700 rounded-full text-sm"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-[400px] mt-10 rounded-lg bg-[#11111b]">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                panOnScroll
                zoomOnScroll
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
              >
                <Controls />
              </ReactFlow>
            </div>
            <div className="mt-6 mb-6 max-w-xl mx-auto">
              <h3 className="font-bold mt-2 mb-2">Rotation History:</h3>
              <ul className="space-y-2 text-sm">
                {rotationHistory.map((entry, idx) => (
                  <li
                    key={idx}
                    className="bg-purple-900/40 px-4 py-2 rounded-xl"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-16 w-full max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text text-center">
                Time Complexity
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-white/90">
                {[
                  {
                    op: "Insert",
                    best: "O(log n)",
                    avg: "O(log n)",
                    worst: "O(log n)",
                  },
                  {
                    op: "Delete Root",
                    best: "O(log n)",
                    avg: "O(log n)",
                    worst: "O(log n)",
                  },
                  {
                    op: "Peek",
                    best: "O(1)",
                    avg: "O(log n)",
                    worst: "O(log n)",
                  },
                ].map(({ op, best, avg, worst }, i) => (
                  <div
                    key={i}
                    className="border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all"
                  >
                    <div className="font-semibold text-purple-300 mb-2 text-base">
                      {op}
                    </div>
                    <div className="text-base">
                      <p>
                        <span className="text-purple-400">Best:</span> {best}
                      </p>
                      <p>
                        <span className="text-purple-400">Avg:</span> {avg}
                      </p>
                      <p>
                        <span className="text-purple-400">Worst:</span> {worst}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "analysis" && <AVLAnalysis tree={tree} />}

        {activeTab === "explanation" && <AVLExplanation />}
      </main>
    </div>
  );
};

export default AVLFlowVisualizer;
