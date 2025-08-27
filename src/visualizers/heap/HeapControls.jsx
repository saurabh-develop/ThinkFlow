import React, { useState } from "react";
import { Button } from "@/components/ui/Button.jsx";
import { Input } from "@/components/ui/input.jsx";

const HeapControls = ({ heap, setHeap, insert, deleteRoot, isMinHeap }) => {
  const [value, setValue] = useState("");

  const handleInsert = () => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      insert(num);
      setValue("");
    }
  };

  const handleRandom = () => {
    const randomArr = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 100)
    );
    const newHeap = [];

    randomArr.forEach((num) => {
      newHeap.push(num);
      heapifyUp(newHeap, isMinHeap);
    });

    setHeap(newHeap);
  };

  const heapifyUp = (arr, isMin) => {
    let idx = arr.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const shouldSwap = isMin
        ? arr[idx] < arr[parentIdx]
        : arr[idx] > arr[parentIdx];
      if (shouldSwap) {
        [arr[idx], arr[parentIdx]] = [arr[parentIdx], arr[idx]];
        idx = parentIdx;
      } else break;
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Input
        placeholder="Enter value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-[120px] bg-white/10 border-white/20 text-white placeholder-white/50"
      />
      <Button onClick={handleInsert}>Insert</Button>
      <Button variant="destructive" onClick={deleteRoot}>
        Delete Root
      </Button>
      <Button
        className="bg-purple-600 hover:bg-purple-700"
        onClick={handleRandom}
      >
        Randomize
      </Button>
    </div>
  );
};

export default HeapControls;
