import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavOnlyLayout from "./components/layout/NavOnlyLayout.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";

// Pages
import HomePage from "./components/pages/Home.jsx";
import Contact from "./components/pages/Contact.jsx";
import Dashboard from "./components/pages/Dashboard";

// Visualizers
import StackVisualizer from "./visualizers/stack/StackVisualizer";
import QueueVisualizer from "./visualizers/queue/QueueVisualizer";
import HeapVisualizer from "./visualizers/heap/HeapVisualizer";

import BinaryTreeVisualizer from "./visualizers/tree/binaryTree/BinaryTreeVisualizer.jsx";
import LinkedListVisualizer from "./visualizers/linkedList/LinkedListVisualizer";
import ArrayVisualizer from "./visualizers/array/arrayStructure/ArrayVisualizer";
import BubbleSortVisualizer from "./visualizers/array/sortingAlgos/bubbleSort/BubbleSortVisualiser";
import InsertionSortVisualizer from "./visualizers/array/sortingAlgos/insertionSort/InsertionSortVisualizer";
import SelectionSortVisualizer from "./visualizers/array/sortingAlgos/selectionSort/SelectionSortVisualizer";
import MergeSortVisualizer from "./visualizers/array/sortingAlgos/mergeSort/MergeSortVisualizer";
import QuickSortVisualizer from "./visualizers/array/sortingAlgos/quickSort/QuickSortVisualizer";
import BFSVisualizer from "./visualizers/bfs/BFSVisualizer";
import AVLFlowVisualizer from "./visualizers/tree/avl/AVLVisualizer.jsx";
import DFSVisualizer from "./visualizers/dfs/DFSVisualizer.jsx";
import DijkstraVisualizer from "./visualizers/dijkstra/DijkstraVisualizer.jsx";
import KnapsackTabulationVisualizer from "./visualizers/knapsack/Tabulation/KnapsackTabulationVisualizer.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout for Navbar only (no Sidebar) */}
        <Route element={<NavOnlyLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Layout for Navbar + Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/array" element={<ArrayVisualizer />} />
          <Route path="/linkedList" element={<LinkedListVisualizer />} />
          <Route path="/stack" element={<StackVisualizer />} />
          <Route path="/queue" element={<QueueVisualizer />} />
          <Route path="/heap" element={<HeapVisualizer />} />
          <Route path="/binarytree" element={<BinaryTreeVisualizer />} />
          <Route path="/avltree" element={<AVLFlowVisualizer />} />
          <Route path="/bubbleSort" element={<BubbleSortVisualizer />} />
          <Route path="/insertionSort" element={<InsertionSortVisualizer />} />
          <Route path="/selectionSort" element={<SelectionSortVisualizer />} />
          <Route path="/mergeSort" element={<MergeSortVisualizer />} />
          <Route path="/quickSort" element={<QuickSortVisualizer />} />
          <Route path="/bfsTraversal" element={<BFSVisualizer />} />
          <Route path="/dfsTraversal" element={<DFSVisualizer />} />
          <Route path="/dijkstra" element={<DijkstraVisualizer />} />
          <Route
            path="/tabulation"
            element={<KnapsackTabulationVisualizer />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
