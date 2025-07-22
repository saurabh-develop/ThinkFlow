import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Shuffle,
  Share2,
  FunctionSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("DS");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);
  const timerRef = useRef(null);
  const manuallyToggled = useRef(false);

  const categories = {
    DS: {
      label: "Structures",
      title: "Data Structures",
      links: [
        { label: "Array", path: "/array" },
        { label: "Linked List", path: "/linkedList" },
        { label: "Stack", path: "/stack" },
        { label: "Queue", path: "/queue" },
        { label: "Heap", path: "/heap" },
        { label: "Binary Tree", path: "/binarytree" },
        { label: "AVL Tree", path: "/avltree" },
      ],
    },
    Sort: {
      label: "Sorting",
      title: "Sorting Algorithms",
      links: [
        { label: "Bubble Sort", path: "/bubbleSort" },
        { label: "Insertion Sort", path: "/insertionSort" },
        { label: "Selection Sort", path: "/selectionSort" },
        { label: "Merge Sort", path: "/mergeSort" },
        { label: "Quick Sort", path: "/quickSort" },
      ],
    },
    Graph: {
      label: "Graphs",
      title: "Graph Algorithms",
      links: [
        { label: "BFS", path: "/bfsTraversal" },
        { label: "DFS", path: "/dfsTraversal" },
        { label: "Dijkstra", path: "/dijkstra" },
      ],
    },
    DP: {
      label: "DP",
      title: "Dynamic Programming",
      links: [
        { label: "Recursion", path: "/recursion" },
        { label: "Tabulation", path: "/tabulation" },
      ],
    },
  };

  const iconMap = {
    DS: <Box size={20} />,
    Sort: <Shuffle size={20} />,
    Graph: <Share2 size={20} />,
    DP: <FunctionSquare size={20} />,
  };

  const resetTimer = () => {
    if (manuallyToggled.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, 10000);
  };

  useEffect(() => {
    const node = sidebarRef.current;
    if (!node) return;

    const handleInteraction = () => resetTimer();

    node.addEventListener("mouseenter", handleInteraction);
    node.addEventListener("mousemove", handleInteraction);
    node.addEventListener("click", handleInteraction);

    resetTimer();

    return () => {
      node.removeEventListener("mouseenter", handleInteraction);
      node.removeEventListener("mousemove", handleInteraction);
      node.removeEventListener("click", handleInteraction);
      clearTimeout(timerRef.current);
    };
  }, []);

  const handleManualCollapse = () => {
    setIsCollapsed(true);
    manuallyToggled.current = true;
  };

  const handleManualExpand = () => {
    setIsCollapsed(false);
    manuallyToggled.current = true;
  };

  return (
    <div className="flex min-h-screen text-white relative" ref={sidebarRef}>
      {/* Thin Sidebar */}
      <div className="w-20 bg-[#15151f] border-r border-white/10 flex flex-col items-center py-6 gap-6 relative">
        {Object.keys(categories).map((key) => (
          <div key={key} className="flex flex-col items-center gap-1">
            <button
              onClick={() => setSelected(key)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                selected === key
                  ? "bg-gradient-to-br from-[#8b3dff] to-[#e84aff] text-white ring-2 ring-white/20"
                  : "hover:bg-white/10 text-white/60"
              }`}
            >
              {iconMap[key]}
            </button>
            <span
              className={`text-[10px] ${
                selected === key
                  ? "text-purple-400 font-medium"
                  : "text-white/40"
              }`}
            >
              {categories[key].label}
            </span>
          </div>
        ))}

        {/* Expand Button */}
        <button
          onClick={handleManualExpand}
          className={`absolute top-4 right-[-12px] z-10 p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-opacity ${
            isCollapsed
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Wide Sidebar */}
      <aside
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-64 opacity-100"
        } bg-[#0d0d15] px-4 py-6 border-r border-white/10 shadow-lg overflow-y-auto relative`}
      >
        {/* Collapse Button */}
        <button
          onClick={handleManualCollapse}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text">
          ThinkFlow
        </div>

        <h4 className="text-sm font-bold text-purple-400 uppercase mb-4 tracking-widest text-center">
          {categories[selected].title}
        </h4>

        <ul className="flex flex-col gap-3">
          {categories[selected].links.map((item, idx) => (
            <li
              key={idx}
              onClick={() => navigate(item.path)}
              className={`group cursor-pointer text-base px-3 py-2 rounded-lg transition-all flex items-center gap-3
                ${
                  location.pathname === item.path
                    ? "bg-white/10 text-white"
                    : "hover:bg-white/10"
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition ${
                  location.pathname === item.path
                    ? "bg-purple-500 opacity-100"
                    : "bg-purple-500 opacity-0 group-hover:opacity-100"
                }`}
              />
              {item.label}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
