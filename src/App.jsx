import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavOnlyLayout from "./components/layout/NavOnlyLayout.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";

// Pages
import HomePage from "./components/pages/Home.jsx";
import Contact from "./components/pages/Contact.jsx";
import Dashboard from "./components/pages/Dashboard";

// Visualizers
import StackVisualizer from "./visualizers/stack/StackVisualizer.jsx";
import QueueVisualizer from "./visualizers/queue/QueueVisualizer.jsx";
import HeapVisualizer from "./visualizers/heap/HeapVisualizer.jsx";
import BinaryTreeVisualizer from "./visualizers/tree/binaryTree/BinaryTreeVisualizer.jsx";
import LinkedListVisualizer from "./visualizers/linkedList/LinkedListVisualizer.jsx";
import ArrayVisualizer from "./visualizers/array/arrayStructure/ArrayVisualizer.jsx";
import BubbleSortVisualizer from "./visualizers/array/sortingAlgos/bubbleSort/BubbleSortVisualiser.jsx";
import InsertionSortVisualizer from "./visualizers/array/sortingAlgos/insertionSort/InsertionSortVisualizer.jsx";
import SelectionSortVisualizer from "./visualizers/array/sortingAlgos/selectionSort/SelectionSortVisualizer.jsx";
import MergeSortVisualizer from "./visualizers/array/sortingAlgos/mergeSort/MergeSortVisualizer.jsx";
import QuickSortVisualizer from "./visualizers/array/sortingAlgos/quickSort/QuickSortVisualizer.jsx";
import BFSVisualizer from "./visualizers/bfs/BFSVisualizer.jsx";
import AVLFlowVisualizer from "./visualizers/tree/avl/AVLVisualizer.jsx";
import DFSVisualizer from "./visualizers/dfs/DFSVisualizer.jsx";
import DijkstraVisualizer from "./visualizers/dijkstra/DijkstraVisualizer.jsx";
import KnapsackTabulationVisualizer from "./visualizers/knapsack/Tabulation/KnapsackTabulationVisualizer.jsx";
import KnapsackRecursiveVisualizer from "./visualizers/knapsack/Recursive/KnapsackRecursiveVisualizer.jsx";

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
          {/* Data Structure */}
          <Route path="/array" element={<ArrayVisualizer />} />
          <Route path="/linkedList" element={<LinkedListVisualizer />} />
          <Route path="/stack" element={<StackVisualizer />} />
          <Route path="/queue" element={<QueueVisualizer />} />
          <Route path="/heap" element={<HeapVisualizer />} />
          <Route path="/binarytree" element={<BinaryTreeVisualizer />} />
          <Route path="/avltree" element={<AVLFlowVisualizer />} />
          {/* Algorithms */}
          {/* Sorting Algos */}
          <Route path="/bubbleSort" element={<BubbleSortVisualizer />} />
          <Route path="/insertionSort" element={<InsertionSortVisualizer />} />
          <Route path="/selectionSort" element={<SelectionSortVisualizer />} />
          <Route path="/mergeSort" element={<MergeSortVisualizer />} />
          <Route path="/quickSort" element={<QuickSortVisualizer />} />
          {/* Graph Algos */}
          <Route path="/bfsTraversal" element={<BFSVisualizer />} />
          <Route path="/dfsTraversal" element={<DFSVisualizer />} />
          <Route path="/dijkstra" element={<DijkstraVisualizer />} />
          {/* DP Algos */}
          <Route path="/recursion" element={<KnapsackRecursiveVisualizer />} />
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
