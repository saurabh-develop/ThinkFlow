import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ArrayControls = ({ array, setArray, animatePath }) => {
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");

  const resetInputs = () => {
    setValue("");
    setIndex("");
  };

  const handleInsert = (pos) => {
    const num = parseInt(value);
    const i = parseInt(index);
    if (isNaN(num)) return;

    const newArr = [...array];

    if (pos === "start") {
      animatePath(0, () => {
        newArr.unshift(num);
        setArray(newArr);
        resetInputs();
      });
    } else if (pos === "end") {
      animatePath(newArr.length, () => {
        newArr.push(num);
        setArray(newArr);
        resetInputs();
      });
    } else if (!isNaN(i) && i >= 0 && i <= newArr.length) {
      animatePath(i, () => {
        newArr.splice(i, 0, num);
        setArray(newArr);
        resetInputs();
      });
    }
  };

  const handleDelete = () => {
    const i = parseInt(index);
    if (!isNaN(i) && i >= 0 && i < array.length) {
      animatePath(i, () => {
        const newArr = [...array];
        newArr.splice(i, 1);
        setArray(newArr);
        setIndex("");
      });
    }
  };

  const handleUpdate = () => {
    const i = parseInt(index);
    const num = parseInt(value);
    if (!isNaN(i) && i >= 0 && i < array.length && !isNaN(num)) {
      animatePath(i, () => {
        const newArr = [...array];
        newArr[i] = num;
        setArray(newArr);
        resetInputs();
      });
    }
  };

  const handleRandom = () => {
    const randomArr = Array.from({ length: array.length }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(randomArr);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Input
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        />
        <Input
          placeholder="Index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          className="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        />
        <Button onClick={() => handleInsert("start")} className="w-full">
          Insert Start
        </Button>
        <Button onClick={() => handleInsert("end")} className="w-full">
          Insert End
        </Button>
        <Button onClick={() => handleInsert("index")} className="w-full">
          Insert at Index
        </Button>
        <Button variant="destructive" onClick={handleDelete} className="w-full">
          Delete at Index
        </Button>
        <Button variant="secondary" onClick={handleUpdate} className="w-full">
          Update at Index
        </Button>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={handleRandom}
        >
          Randomize
        </Button>
      </div>
    </div>
  );
};

export default ArrayControls;
