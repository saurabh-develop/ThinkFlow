import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SortingVisualizer from "./visualizers/array/SortingVisualizer";
import GraphVisualizer from "./visualizers/GraphVisualizer";
import DPVisualizer from "./visualizers/DPVisualizer";
import Heap from "./dataStructure/heapStructure/Heap";
import AVLTree from "./dataStructure/treeStructure/AVLTree";
import BinaryTree from "./dataStructure/treeStructure/BinaryTree";
import Navbar from "./components/layout/NavBar.jsx";
import HomePage from "./components/pages/Home.jsx";
import "./App.css";
import Contact from "./components/pages/Contact.jsx";
import Dashboard from "./components/pages/Dashboard";
import ArrayVisualizer from "./visualizers/array/ArrayVisualizer";
import StackVisualizer from "./visualizers/stack/StackVisualizer";
import QueueVisualizer from "./visualizers/queue/QueueVisualizer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col bg-gradient-to-br from-[#0d0d15] to-[#1a1a27] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/graphs" element={<GraphVisualizer />} />
          <Route path="/dp" element={<DPVisualizer />} />
          <Route path="/stack" element={<StackVisualizer />} />
          <Route path="/queue" element={<QueueVisualizer />} />
          <Route path="/array" element={<ArrayVisualizer />} />
          <Route path="/heap" element={<Heap />} />
          <Route path="/avltree" element={<AVLTree />} />
          <Route path="/binarytree" element={<BinaryTree />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
