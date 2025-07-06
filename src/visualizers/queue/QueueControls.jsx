import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const QueueControls = ({ enqueue, dequeue, reset }) => {
  const [value, setValue] = useState("");

  const handleEnqueue = () => {
    if (value.trim() === "") return;
    enqueue(value);
    setValue("");
  };

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <Input
        placeholder="Enter value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-[140px] bg-white/10 border-white/20 text-white placeholder-white/50"
      />
      <Button onClick={handleEnqueue}>Enqueue</Button>
      <Button variant="destructive" onClick={dequeue}>
        Dequeue
      </Button>
      <Button variant="secondary" onClick={reset}>
        Reset
      </Button>
    </div>
  );
};

export default QueueControls;
