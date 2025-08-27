import React, { useEffect, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import DijkstraControls from "./DijkstraControls";
import DijkstraCodeViewer from "./DijkstraCodeViewer";
import DijkstraExplanation from "./DijkstraExplanation";
import DijkstraTable from "./DijkstraTable";
import useDijkstraStore from "./useDijkstraStore";
import { dijkstraTraversal } from "./dijkstraLogic";

const baseNodeStyle = {
  width: 25,
  height: 25,
  borderRadius: "9999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  background: "#fff",
  color: "#000",
  fontSize: "0.6rem",
};

const initialNodes = [
  {
    id: "A",
    position: { x: -100, y: 50 },
    data: { label: "A" },
    style: baseNodeStyle,
  },
  {
    id: "B",
    position: { x: 0, y: 0 },
    data: { label: "B" },
    style: baseNodeStyle,
  },
  {
    id: "C",
    position: { x: 100, y: 50 },
    data: { label: "C" },
    style: baseNodeStyle,
  },
  {
    id: "D",
    position: { x: -100, y: 150 },
    data: { label: "D" },
    style: baseNodeStyle,
  },
  {
    id: "E",
    position: { x: 0, y: 150 },
    data: { label: "E" },
    style: baseNodeStyle,
  },
  {
    id: "F",
    position: { x: 100, y: 150 },
    data: { label: "F" },
    style: baseNodeStyle,
  },
  {
    id: "G",
    position: { x: -50, y: 250 },
    data: { label: "G" },
    style: baseNodeStyle,
  },
  {
    id: "H",
    position: { x: 50, y: 250 },
    data: { label: "H" },
    style: baseNodeStyle,
  },
];

const initialEdges = [
  { id: "e1", source: "A", target: "B", animated: true, label: "3" },
  { id: "e2", source: "A", target: "D", animated: true, label: "2" },
  { id: "e3", source: "B", target: "C", animated: true, label: "1" },
  { id: "e4", source: "B", target: "E", animated: true, label: "4" },
  { id: "e5", source: "C", target: "F", animated: true, label: "6" },
  { id: "e6", source: "D", target: "E", animated: true, label: "2" },
  { id: "e7", source: "E", target: "F", animated: true, label: "3" },
  { id: "e8", source: "E", target: "G", animated: true, label: "1" },
  { id: "e9", source: "F", target: "H", animated: true, label: "1" },
  { id: "e10", source: "G", target: "H", animated: true, label: "5" },
];

const DijkstraVisualizer = () => {
  const {
    startNode,
    setStartNode,
    dijkstraSteps,
    setDijkstraSteps,
    currentStepIndex,
    incrementStep,
    resetTraversal,
    speed,
    setSpeed,
    isRunning,
    setIsRunning,
    paused,
    setPaused,
  } = useDijkstraStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeTab, setActiveTab] = useState("visualization");
  const { finalStep, setFinalStep } = useDijkstraStore();
  const timeoutRef = useRef(null);

  const getAdjList = () => {
    const adj = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e) => {
      const weight = parseInt(e.label || "1");
      adj[e.source].push({ node: e.target, weight });
      adj[e.target].push({ node: e.source, weight });
    });
    return adj;
  };

  const applyStepStyles = () => {
    const step = dijkstraSteps[currentStepIndex];
    const updatedNodes = nodes.map((n) => {
      if (step.visited.has(n.id)) {
        return {
          ...n,
          style: { ...baseNodeStyle, background: "#22c55e", color: "#fff" },
        };
      } else if (step.current === n.id) {
        return {
          ...n,
          style: { ...baseNodeStyle, background: "#d946ef", color: "#fff" },
        };
      } else if (step.queue.includes(n.id)) {
        return {
          ...n,
          style: { ...baseNodeStyle, background: "#f59e0b", color: "#fff" },
        };
      } else {
        return { ...n, style: baseNodeStyle };
      }
    });
    setNodes(updatedNodes);

    const updatedEdges = edges.map((e) => {
      const isRelaxing =
        step.relaxing &&
        ((e.source === step.relaxing.from && e.target === step.relaxing.to) ||
          (e.source === step.relaxing.to && e.target === step.relaxing.from));
      return {
        ...e,
        style: isRelaxing ? { stroke: "#f43f5e", strokeWidth: 3 } : {},
      };
    });
    setEdges(updatedEdges);
  };

  useEffect(() => {
    if (!isRunning || paused || currentStepIndex >= dijkstraSteps.length)
      return;
    applyStepStyles();
    timeoutRef.current = setTimeout(() => incrementStep(), speed);
    return () => clearTimeout(timeoutRef.current);
  }, [currentStepIndex, isRunning, paused, speed]);

  useEffect(() => {
    if (
      !isRunning &&
      !paused &&
      dijkstraSteps.length > 0 &&
      currentStepIndex >= dijkstraSteps.length
    ) {
      setFinalStep(dijkstraSteps[dijkstraSteps.length - 1]);
    }
  }, [isRunning, paused, currentStepIndex, dijkstraSteps]);

  const handleRun = () => {
    if (paused) {
      setIsRunning(true);
      setPaused(false);
      return;
    }

    if (isRunning) return;

    const steps = dijkstraTraversal(getAdjList(), startNode);
    setDijkstraSteps(steps);
    setFinalStep(null);
    setIsRunning(true);
    setPaused(false);
  };

  const handleReset = () => {
    resetTraversal();
    setNodes(initialNodes.map((n) => ({ ...n, style: baseNodeStyle })));
    setEdges(initialEdges);
    setIsRunning(false);
    setPaused(false);
    setFinalStep(null);
    clearTimeout(timeoutRef.current);
  };

  const handlePause = () => {
    setPaused(true);
    clearTimeout(timeoutRef.current);
  };

  return (
    <ReactFlowProvider>
      <div className="flex flex-col min-h-screen text-white bg-gradient-to-br from-[#0d0d15] to-[#1a1a2e] px-4">
        <main className="flex-1 py-10 w-full max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text">
            Dijkstra Traversal Visualizer
          </h1>

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
              <DijkstraControls
                startNode={startNode}
                setStartNode={setStartNode}
                onRun={handleRun}
                onReset={handleReset}
                onPause={handlePause}
                speed={speed}
                setSpeed={setSpeed}
                paused={paused}
                setPaused={setPaused}
                nodeIds={nodes.map((n) => n.id)}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">
                {/* Graph */}
                <div className="col-span-1 lg:col-span-5 h-[50vh] lg:h-[70vh] bg-[#1e1e2f] rounded-xl border border-white/10 overflow-hidden">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    defaultViewport={{ zoom: 0.4, x: 0, y: 0 }}
                  >
                    <Controls />
                  </ReactFlow>
                </div>

                {/* Table + Code */}
                <div className="col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh]">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg overflow-y-auto">
                    <DijkstraTable
                      steps={dijkstraSteps}
                      currentStepIndex={currentStepIndex}
                      finalStep={finalStep}
                    />
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-y-auto p-4">
                    <DijkstraCodeViewer />
                  </div>
                </div>
              </div>

              <div className="mt-16 w-full max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text text-center">
                  Time Complexity
                </h2>
                <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl px-4 py-4 text-center shadow hover:shadow-purple-400 transition-all">
                  <p>
                    ⏱️ <strong>Time Complexity:</strong> O((V + E) log V) using
                    Min-Heap (Priority Queue)
                  </p>
                  <p>
                    💾 <strong>Space Complexity:</strong> O(V + E)
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === "explanation" && <DijkstraExplanation />}
        </main>
        
      </div>
    </ReactFlowProvider>
  );
};

export default DijkstraVisualizer;
