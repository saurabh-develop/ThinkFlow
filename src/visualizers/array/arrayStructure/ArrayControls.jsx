import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ArrayControls = ({ array, setArray, animatePath }) => {
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");

  const handleInsert = (pos) => {
    const num = parseInt(value);
    if (isNaN(num)) return;

    const i = parseInt(index);
    let newArr = [...array];

    if (pos === "start") {
      animatePath(0, () => {
        newArr.unshift(num);
        setArray(newArr);
        setValue("");
        setIndex("");
      });
    } else if (pos === "end") {
      animatePath(newArr.length, () => {
        newArr.push(num);
        setArray(newArr);
        setValue("");
        setIndex("");
      });
    } else if (!isNaN(i) && i >= 0 && i <= newArr.length) {
      animatePath(i, () => {
        newArr.splice(i, 0, num);
        setArray(newArr);
        setValue("");
        setIndex("");
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
        setValue("");
        setIndex("");
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
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-[100px] bg-white/10 border-white/20 text-white placeholder-white/50"
        />
        <Input
          placeholder="Index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          className="w-[100px] bg-white/10 border-white/20 text-white placeholder-white/50"
        />

        <Button onClick={() => handleInsert("start")}>Insert Start</Button>
        <Button onClick={() => handleInsert("end")}>Insert End</Button>
        <Button onClick={() => handleInsert("index")}>Insert at Index</Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete at Index
        </Button>
        <Button variant="secondary" onClick={handleUpdate}>
          Update at Index
        </Button>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={handleRandom}
        >
          Randomize
        </Button>
      </div>
    </div>
  );
};

export default ArrayControls;
