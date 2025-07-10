import React, { useEffect, useRef } from "react";
import ReactFlow, { Controls, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import useDFSStore from "./useDFSStore";

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

const DFSGraph = () => {
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
  } = useDFSStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const timeoutRef = useRef(null);

  const getAdjList = () => {
    const adj = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e) => {
      adj[e.source].push(e.target);
    });
    return adj;
  };

  const applyStepStyles = () => {
    const step = dfsSteps[currentStepIndex];
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
      } else {
        return { ...n, style: baseNodeStyle };
      }
    });
    setNodes(updated);
  };

  useEffect(() => {
    if (!isRunning || currentStepIndex >= dfsSteps.length) {
      setIsRunning(false);
      return;
    }
    applyStepStyles();
    timeoutRef.current = setTimeout(() => {
      incrementStep();
    }, speed);
    return () => clearTimeout(timeoutRef.current);
  }, [currentStepIndex, isRunning]);

  return (
    <div className="mt-10 h-[70vh] w-full bg-[#1e1e2f] rounded-xl border border-white/10 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DFSGraph;
