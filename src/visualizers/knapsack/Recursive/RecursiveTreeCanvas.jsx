import React, { useRef, useLayoutEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion } from "framer-motion";

const NODE_WIDTH = 50;
const NODE_HEIGHT = 28;
const HORIZONTAL_GAP = 8;
const VERTICAL_GAP = 30;

const layoutTree = (node, depth = 0, xOffset = { x: 0 }) => {
  if (!node) return 0;

  const leftCount = layoutTree(node.left, depth + 1, xOffset);
  const x = xOffset.x;
  xOffset.x += 1;
  const rightCount = layoutTree(node.right, depth + 1, xOffset);

  node.x = x * (NODE_WIDTH + HORIZONTAL_GAP);
  node.y = depth * (NODE_HEIGHT + VERTICAL_GAP);

  return leftCount + rightCount + 1;
};

const decisionColorClass = {
  include: "bg-green-600/80 border-green-400",
  exclude: "bg-red-600/80 border-red-400",
  base: "bg-gray-500/40 border-gray-300",
};

const collectEdges = (node, edges = []) => {
  if (!node) return edges;
  if (node.left) {
    edges.push({ from: node, to: node.left });
    collectEdges(node.left, edges);
  }
  if (node.right) {
    edges.push({ from: node, to: node.right });
    collectEdges(node.right, edges);
  }
  return edges;
};

const renderTree = (node, highlightKey) => {
  if (!node) return null;

  const isHighlighted = highlightKey === node.key;
  const decisionClass = decisionColorClass[node.decision] || "bg-white/10";

  const AnimatedNode = isHighlighted ? motion.div : "div";

  return (
    <div key={node.key}>
      <AnimatedNode
        initial={isHighlighted ? { scale: 0.5, opacity: 0 } : false}
        animate={isHighlighted ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.3 }}
        className={`absolute flex flex-col items-center justify-center rounded-md text-[10px] px-1 py-[2px] transition-all duration-300
        ${isHighlighted ? "ring-2 ring-purple-500 scale-105" : ""}
        ${decisionClass}`}
        style={{
          left: node.x,
          top: node.y,
          width: NODE_WIDTH,
          height: NODE_HEIGHT + 15,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="text-[8px] text-purple-300">{`i:${node.i}, w:${node.w}`}</div>
        <div className="text-white font-semibold text-xs">
          val: {node.value}
        </div>
        <div className="text-[7px] text-white/60 italic">{node.decision}</div>
      </AnimatedNode>

      {renderTree(node.left, highlightKey)}
      {renderTree(node.right, highlightKey)}
    </div>
  );
};

const RecursiveTreeCanvas = ({ root, highlightNode }) => {
  const wrapperRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 1000 });

  if (!root) return null;
  layoutTree(root);

  const edges = collectEdges(root);

  useLayoutEffect(() => {
    let maxX = 0;
    let maxY = 0;

    const traverse = (node) => {
      if (!node) return;
      if (node.x > maxX) maxX = node.x;
      if (node.y > maxY) maxY = node.y;
      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);
    setCanvasSize({
      width: maxX + NODE_WIDTH + 100,
      height: maxY + NODE_HEIGHT + 100,
    });
  }, [root]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[400px] bg-transparent border border-white/5 rounded-md mt-4"
    >
      <TransformWrapper
        initialScale={0.8}
        centerOnInit
        centerZoomedOut
        minScale={0.1}
        maxScale={2}
        wheel={{ step: 40 }}
      >
        <TransformComponent>
          <div
            style={{
              position: "relative",
              width: canvasSize.width,
              height: canvasSize.height,
            }}
          >
            <svg
              className="absolute left-0 top-0"
              width={canvasSize.width}
              height={canvasSize.height}
              style={{ pointerEvents: "none" }}
            >
              {edges.map(({ from, to }, idx) => (
                <line
                  key={idx}
                  x1={from.x + NODE_WIDTH / 2}
                  y1={from.y + NODE_HEIGHT}
                  x2={to.x + NODE_WIDTH / 2}
                  y2={to.y}
                  stroke="#8884d8"
                  strokeWidth="1"
                />
              ))}
            </svg>
            {renderTree(root, highlightNode?.key)}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default RecursiveTreeCanvas;
