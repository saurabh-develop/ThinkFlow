import React, { useEffect, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "@/components/pages/SideBar";
import BFSControls from "./BFSControls";
import BFSExplanation from "./BFSExplanation";
import { bfsTraversal } from "./bfsLogic";
import BFSCodeViewer from "./BFSCodeViewer";
import useGraphStore from "./useGraphStore";

const baseNodeStyle = {
  width: 50,
  height: 50,
  borderRadius: "9999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  background: "#fff",
  color: "#000",
};

const initialNodes = [
  {
    id: "A",
    position: { x: 300, y: 50 },
    data: { label: "A" },
    style: baseNodeStyle,
  },
  {
    id: "B",
    position: { x: 150, y: 150 },
    data: { label: "B" },
    style: baseNodeStyle,
  },
  {
    id: "C",
    position: { x: 450, y: 150 },
    data: { label: "C" },
    style: baseNodeStyle,
  },
  {
    id: "D",
    position: { x: 100, y: 250 },
    data: { label: "D" },
    style: baseNodeStyle,
  },
  {
    id: "E",
    position: { x: 200, y: 250 },
    data: { label: "E" },
    style: baseNodeStyle,
  },
  {
    id: "F",
    position: { x: 400, y: 250 },
    data: { label: "F" },
    style: baseNodeStyle,
  },
  {
    id: "G",
    position: { x: 500, y: 250 },
    data: { label: "G" },
    style: baseNodeStyle,
  },
];

const initialEdges = [
  { id: "e1", source: "A", target: "B", animated: true },
  { id: "e2", source: "A", target: "C", animated: true },
  { id: "e3", source: "B", target: "D", animated: true },
  { id: "e4", source: "B", target: "E", animated: true },
  { id: "e5", source: "C", target: "F", animated: true },
  { id: "e6", source: "C", target: "G", animated: true },
];

const BFSVisualizer = () => {
  const {
    startNode,
    setStartNode,
    bfsSteps,
    setBfsSteps,
    currentStepIndex,
    incrementStep,
    resetTraversal,
    speed,
    setSpeed,
    isRunning,
    setIsRunning,
  } = useGraphStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeTab, setActiveTab] = useState("visualization");
  const timeoutRef = useRef(null);

  const getAdjList = () => {
    const adj = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e) => {
      adj[e.source].push(e.target);
      adj[e.target].push(e.source);
    });
    return adj;
  };

  const applyStepStyles = () => {
    const step = bfsSteps[currentStepIndex];
    const updated = nodes.map((n) => {
      if (step.visited.includes(n.id)) {
        return {
          ...n,
          style: {
            ...baseNodeStyle,
            background: "#22c55e",
            color: "#fff",
            border: "2px solid #16a34a",
          },
        };
      } else if (step.current === n.id) {
        return {
          ...n,
          style: {
            ...baseNodeStyle,
            background: "#d946ef",
            color: "#fff",
            border: "2px solid #a855f7",
          },
        };
      } else if (step.queue.includes(n.id)) {
        return {
          ...n,
          style: {
            ...baseNodeStyle,
            background: "#facc15",
            color: "#000",
            border: "2px solid #eab308",
          },
        };
      } else {
        return { ...n, style: baseNodeStyle };
      }
    });

    setNodes(updated);
  };

  useEffect(() => {
    if (!isRunning || currentStepIndex >= bfsSteps.length) {
      setIsRunning(false);
      return;
    }
    applyStepStyles();
    timeoutRef.current = setTimeout(() => {
      incrementStep();
    }, speed);
    return () => clearTimeout(timeoutRef.current);
  }, [currentStepIndex, isRunning]);

  const handleRun = () => {
    const adj = getAdjList();
    const steps = bfsTraversal(adj, startNode);
    setBfsSteps(steps);
    setIsRunning(true);
  };

  const handleReset = () => {
    resetTraversal();
    setNodes(initialNodes.map((n) => ({ ...n, style: baseNodeStyle })));
    setEdges(initialEdges);
    setIsRunning(false);
    clearTimeout(timeoutRef.current);
  };

  return (
    <ReactFlowProvider>
      <div className="flex min-h-screen text-white">
        <Sidebar />
        <main className="flex-1 px-4 sm:px-8 py-10">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text">
            🌐 BFS Traversal Visualizer
          </h2>

          {/* Tabs */}
          <div className="flex w-full max-w-xl mx-auto mb-8 rounded-xl overflow-hidden border border-white/10">
            {["visualization", "explanation"].map((tab) => (
              <button
                key={tab}
                className={`w-1/2 py-2 font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-white/10 text-white"
                    : "bg-transparent text-white/50"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "visualization" && (
            <>
              <BFSControls
                startNode={startNode}
                setStartNode={setStartNode}
                onRun={handleRun}
                onReset={handleReset}
                speed={speed}
                setSpeed={setSpeed}
                nodeIds={nodes.map((n) => n.id)}
              />
              <div className="flex flex-col lg:flex-row gap-8 mt-10">
                <div className="h-[70vh] w-full lg:w-3/5 bg-[#1e1e2f] rounded-xl border border-white/10 relative">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={(params) =>
                      setEdges((eds) => [...eds, { ...params, animated: true }])
                    }
                    fitView
                  >
                    <Controls />
                  </ReactFlow>

                  {/* Visual queue display */}
                  <div className="absolute bottom-2 left-2 right-2 flex gap-2 flex-wrap justify-center">
                    {bfsSteps[currentStepIndex]?.queue?.map((id) => (
                      <div
                        key={id}
                        className="px-3 py-1 rounded-full bg-yellow-500 text-black font-bold border border-yellow-700 shadow"
                      >
                        {id}
                      </div>
                    ))}
                  </div>
                </div>
                <BFSCodeViewer />
              </div>

              {/* Time Complexity Section */}
              <div className="mt-16 w-full max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e84aff] to-[#8b3dff] text-transparent bg-clip-text text-center">
                  Time Complexity
                </h2>
                <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all">
                  <p className="text-white/80 text-sm leading-6">
                    The time complexity of Breadth-First Search (BFS) is{" "}
                    <strong className="text-white">O(V + E)</strong>, where V is
                    the number of vertices and E is the number of edges. Each
                    vertex is visited once, and each edge is considered once
                    during the traversal.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === "explanation" && <BFSExplanation />}
        </main>
      </div>
    </ReactFlowProvider>
  );
};

export default BFSVisualizer;
