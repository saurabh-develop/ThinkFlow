import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const StackControls = ({ push, pop, reset }) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <Input
        placeholder="Enter value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-[140px] bg-white/10 border-white/20 text-white placeholder-white/50"
      />
      <Button
        onClick={() => {
          push(value);
          setValue("");
        }}
      >
        Push
      </Button>
      <Button variant="destructive" onClick={pop}>
        Pop
      </Button>
      <Button variant="secondary" onClick={reset}>
        Reset
      </Button>
    </div>
  );
};

export default StackControls;
