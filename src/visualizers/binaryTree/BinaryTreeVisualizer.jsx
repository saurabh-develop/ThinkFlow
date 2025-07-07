import React, { useEffect, useState, useRef } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import Sidebar from "@/components/pages/SideBar";
import BinaryTreeControls from "./BinaryTreeControls";
import BinaryTreeAnalysis from "./BinaryTreeAnalysis";
import { BinaryTree } from "./BinaryTreeLogic";
import BinaryTreeExplanation from "./BinaryTreeExplanation";

const AnimatedNode = ({ data }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0 }}
    transition={{ duration: 0.3 }}
    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg text-white ${
      data.highlighted ? "bg-yellow-400 text-black" : "bg-[#8b3dff]"
    }`}
  >
    <Handle type="target" position={Position.Top} />
    {data.label}
    <Handle type="source" position={Position.Bottom} />
  </motion.div>
);

const nodeTypes = {
  custom: AnimatedNode,
};

const generateGraph = (
  node,
  x = 0,
  y = 0,
  depth = 0,
  parent = null,
  nodes = [],
  edges = [],
  highlightSet = new Set()
) => {
  if (!node) return { nodes, edges };

  const id = `${node.value}`;
  const spacingX = 150;
  const spacingY = 100;

  nodes.push({
    id,
    type: "custom",
    position: { x, y },
    data: {
      label: node.value,
      highlighted: highlightSet.has(node.value),
    },
  });

  if (parent) {
    edges.push({
      id: `${parent}-${id}`,
      source: parent,
      target: id,
      animated: true,
      style: { stroke: "#aaa" },
    });
  }

  if (node.left) {
    generateGraph(
      node.left,
      x - spacingX / (depth + 1),
      y + spacingY,
      depth + 1,
      id,
      nodes,
      edges,
      highlightSet
    );
  }

  if (node.right) {
    generateGraph(
      node.right,
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

const BinaryTreeFlowVisualizer = () => {
  const treeRef = useRef(new BinaryTree());
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [traversalType, setTraversalType] = useState("inorder");
  const [traversalHistory, setTraversalHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("visualization");

  const refreshGraph = (highlight = []) => {
    const highlightSet = new Set(highlight);
    const { nodes, edges } = generateGraph(
      treeRef.current.root,
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
  }, []);

  const handleTraversal = async (type) => {
    const tree = treeRef.current;
    let result = [];
    if (type === "inorder") result = tree.traverseInOrder();
    if (type === "preorder") result = tree.traversePreOrder();
    if (type === "postorder") result = tree.traversePostOrder();

    setTraversalType(type);
    setTraversalHistory(result);

    for (let i = 0; i < result.length; i++) {
      refreshGraph([result[i]]);
      await new Promise((r) => setTimeout(r, 700));
    }
    refreshGraph();
  };

  const handleReset = () => {
    setTree(new BinaryTree());
    setTraversalHistory([]);
    refreshGraph();
  };

  return (
    <div className="flex min-h-screen text-white">
      <Sidebar />
      <main className="flex-1 px-4 sm:px-8 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Binary Tree Visualizer
        </h1>

        {/* Tabs */}
        <div className="flex w-full max-w-xl mx-auto mb-8 rounded-xl overflow-hidden border border-white/10">
          {["visualization", "analysis", "explanation"].map((tab) => (
            <button
              key={tab}
              className={`w-1/3 py-2 font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-white/10 text-white"
                  : "bg-transparent text-white/50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "visualization" && (
          <>
            <BinaryTreeControls
              nodes={nodes}
              onInsert={(val, parentVal, side) => {
                treeRef.current.insertAt(val, Number(parentVal), side);
                refreshGraph();
              }}
              onTraverse={handleTraversal}
              onReset={() => {
                treeRef.current = new BinaryTree();
                setTraversalHistory([]);
                refreshGraph();
              }}
            />

            <div className="flex justify-center gap-4 my-4">
              {["inorder", "preorder", "postorder"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleTraversal(type)}
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 capitalize"
                >
                  {type}
                </button>
              ))}
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

            {/* Time Complexity Section */}
            <div className="mt-8 w-full md:col-span-3">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text text-center">
                Time Complexity
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-white/90">
                {[
                  {
                    op: "Insert",
                    best: "O(1)",
                    avg: "O(log n)",
                    worst: "O(n)",
                  },
                  {
                    op: "Search",
                    best: "O(1)",
                    avg: "O(log n)",
                    worst: "O(n)",
                  },
                  {
                    op: "Traversal (In/Pre/Post)",
                    best: "O(n)",
                    avg: "O(n)",
                    worst: "O(n)",
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

        {activeTab === "analysis" && (
          <BinaryTreeAnalysis tree={treeRef.current} />
        )}

        {activeTab === "explanation" && <BinaryTreeExplanation />}
      </main>
    </div>
  );
};

export default BinaryTreeFlowVisualizer;
