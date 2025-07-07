import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GraphVisualizer from "./visualizers/GraphVisualizer";
import DPVisualizer from "./visualizers/DPVisualizer";
import Navbar from "./components/layout/NavBar.jsx";
import HomePage from "./components/pages/Home.jsx";
import "./App.css";
import Contact from "./components/pages/Contact.jsx";
import Dashboard from "./components/pages/Dashboard";
import ArrayVisualizer from "./visualizers/array/ArrayVisualizer";
import StackVisualizer from "./visualizers/stack/StackVisualizer";
import QueueVisualizer from "./visualizers/queue/QueueVisualizer";
import HeapVisualizer from "./visualizers/heap/HeapVisualizer";
import AVLVisualizer from "./visualizers/avl/AVLVisualizer";
import BinaryTreeVisualizer from "./visualizers/binaryTree/BinaryTreeVisualizer";
import LinkedListVisualizer from "./visualizers/linkedList/LinkedListVisualizer";
import BubbleSortVisualizer from "./visualizers/bubbleSort/BubbleSortVisualiser";
import InsertionSortVisualizer from "./visualizers/insertionSort/InsertionSortVisualizer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col bg-gradient-to-br from-[#0d0d15] to-[#1a1a27] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bubbleSort" element={<BubbleSortVisualizer />} />
          <Route path="/insertionSort" element={<InsertionSortVisualizer />} />
          {/* <Route path="/graphs" element={<GraphVisualizer />} /> */}
          {/* <Route path="/dp" element={<DPVisualizer />} /> */}
          <Route path="/stack" element={<StackVisualizer />} />
          <Route path="/queue" element={<QueueVisualizer />} />
          <Route path="/array" element={<ArrayVisualizer />} />
          <Route path="/heap" element={<HeapVisualizer />} />
          <Route path="/avltree" element={<AVLVisualizer />} />
          <Route path="/binarytree" element={<BinaryTreeVisualizer />} />
          <Route path="/linkedList" element={<LinkedListVisualizer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
