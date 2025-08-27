import React, { useEffect, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import useDFSStore from "./useDFSStore.js";
import { dfsTraversal } from "./dfsTraversal.js";
import DFSControls from "./DFSControls.jsx";
import DFSCodeViewer from "./DFSCodeViewer.jsx";
import DFSExplanation from "./DFSExplanation.jsx";
import DFSStackDisplay from "./DFSStackDisplay.jsx";

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
  { id: "e1", source: "A", target: "B" },
  { id: "e2", source: "A", target: "C" },
  { id: "e3", source: "B", target: "D" },
  { id: "e4", source: "B", target: "E" },
  { id: "e5", source: "C", target: "F" },
  { id: "e6", source: "C", target: "G" },
];

const DFSVisualizer = () => {
  const {
    startNode,
    setStartNode,
    dfsSteps,
    setDfsSteps,
    currentStepIndex,
    incrementStep,
    resetTraversal,
    speed,
    setSpeed,
    isRunning,
    setIsRunning,
    paused,
    setPaused,
  } = useDFSStore();

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

  const computeStack = () => {
    const stack = [];
    for (let i = 0; i <= currentStepIndex; i++) {
      const step = dfsSteps[i];
      if (step.type === "call") {
        stack.push(step.current);
      } else if (step.type === "return") {
        const idx = stack.lastIndexOf(step.current);
        if (idx !== -1) stack.splice(idx, 1);
      }
    }
    return stack;
  };

  const applyStepStyles = () => {
    const step = dfsSteps[currentStepIndex];
    const stack = computeStack();
    const updatedNodes = nodes.map((n) => {
      if (stack.includes(n.id)) {
        return {
          ...n,
          style: {
            ...baseNodeStyle,
            background: "#f59e0b",
            color: "#fff",
            border: "2px solid #d97706",
          },
        };
      } else if (step?.visited?.includes(n.id)) {
        return {
          ...n,
          style: {
            ...baseNodeStyle,
            background: "#22c55e",
            color: "#fff",
            border: "2px solid #16a34a",
          },
        };
      } else if (step?.current === n.id) {
        return {
          ...n,
          style: {
            ...baseNodeStyle,
            background: "#d946ef",
            color: "#fff",
            border: "2px solid #a855f7",
          },
        };
      } else {
        return { ...n, style: baseNodeStyle };
      }
    });

    const updatedEdges = edges.map((e) => {
      if (
        step?.type === "explore" &&
        e.source === step.from &&
        e.target === step.current
      ) {
        return {
          ...e,
          animated: true,
          style: { stroke: "#e84aff", strokeWidth: 3 },
        };
      }
      return {
        ...e,
        animated: false,
        style: { stroke: "#fff", strokeWidth: 1 },
      };
    });

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  useEffect(() => {
    if (!isRunning || paused || currentStepIndex >= dfsSteps.length) return;
    applyStepStyles();
    timeoutRef.current = setTimeout(() => {
      incrementStep();
    }, speed);
    return () => clearTimeout(timeoutRef.current);
  }, [currentStepIndex, isRunning, paused, dfsSteps.length]);

  const handleRun = () => {
    const adj = getAdjList();
    const steps = dfsTraversal(adj, startNode);
    setDfsSteps(steps);
    setIsRunning(true);
    setPaused(false);
  };

  const handleReset = () => {
    resetTraversal();
    setNodes(initialNodes.map((n) => ({ ...n, style: baseNodeStyle })));
    setEdges(initialEdges);
    setIsRunning(false);
    setPaused(false);
    clearTimeout(timeoutRef.current);
  };

  return (
    <ReactFlowProvider>
      <div className="flex flex-col min-h-screen text-white bg-gradient-to-br from-[#0d0d15] to-[#1a1a2e] px-4">
        <main className="flex-1 py-10 w-full max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text">
            DFS Traversal Visualizer
          </h1>

          <div className="flex w-full max-w-xl mx-auto mb-8 rounded-xl overflow-hidden border border-white/10">
            {"visualization explanation".split(" ").map((tab) => (
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
              <DFSControls
                startNode={startNode}
                setStartNode={setStartNode}
                onRun={handleRun}
                onReset={handleReset}
                speed={speed}
                setSpeed={setSpeed}
                nodeIds={nodes.map((n) => n.id)}
                edgeList={edges}
              />

              <div className="flex flex-col lg:flex-row gap-8 mt-10">
                <div className="h-[60vh] w-full lg:w-3/5 bg-[#1e1e2f] rounded-xl border border-white/10 relative">
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
                </div>

                <div className="flex flex-col gap-6 w-full lg:w-2/5">
                  <DFSStackDisplay />
                  <div className="bg-[#1e1e2f] border border-white/10 rounded-xl p-4 overflow-x-auto max-w-full">
                    <DFSCodeViewer />
                  </div>
                </div>
              </div>

              <div className="mt-16 w-full max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text text-center">
                  Time Complexity
                </h2>
                <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all">
                  <p className="text-white/80 text-sm leading-6">
                    The time complexity of Depth-First Search (DFS) is{" "}
                    <strong className="text-white">O(V + E)</strong>, where V is
                    the number of vertices and E is the number of edges. Each
                    node and edge is visited once during traversal.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === "explanation" && <DFSExplanation />}
        </main>
      </div>
    </ReactFlowProvider>
  );
};

export default DFSVisualizer;
