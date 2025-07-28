import React from "react";

const QueueBox = ({ value, isFront, isRear }) => {
  return (
    <div className="relative px-6 py-4 rounded-lg bg-purple-700 text-white shadow-md text-lg transition-all duration-300">
      {value}
      {isFront && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-green-400 font-bold">
          Front
        </div>
      )}
      {isRear && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-pink-400 font-bold">
          Rear
        </div>
      )}
    </div>
  );
};

export default QueueBox;
