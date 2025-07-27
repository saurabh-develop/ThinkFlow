import React, { useState } from "react";

const LinkedListControls = ({
  onInsert,
  onReverse,
  onSearch,
  onDelete,
  listType,
  setListType,
}) => {
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [deleteValue, setDeleteValue] = useState("");

  const handleInsert = (pos) => {
    if (value.trim()) {
      onInsert(value.trim(), pos);
      setValue("");
    }
  };

  return (
    <div className="bg-[#1e1e2f]/80 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl mb-6 w-full">
      {/* Type & Reverse Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 w-full">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-sm font-medium">
          {["singly", "doubly", "circular"].map((type) => (
            <button
              key={type}
              onClick={() => setListType(type)}
              className={`px-4 py-2 rounded-full transition-all ${
                listType === type
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-300 hover:bg-white/20"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} List
            </button>
          ))}
        </div>

        <button
          onClick={onReverse}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold shadow hover:opacity-90 transition w-full sm:w-auto"
        >
          🔁 Reverse List
        </button>
      </div>

      {/* Insert */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mb-4 w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-purple-300 outline-none border border-white/10 w-full sm:w-60"
        />
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <button
            onClick={() => handleInsert("head")}
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-500 transition w-full sm:w-auto"
          >
            Insert at Head
          </button>
          <button
            onClick={() => handleInsert("tail")}
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-500 transition w-full sm:w-auto"
          >
            Insert at Tail
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mb-4 w-full">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search value"
          className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-purple-300 outline-none border border-white/10 w-full sm:w-60"
        />
        <button
          onClick={() => {
            if (searchValue.trim()) {
              onSearch(searchValue.trim());
              setSearchValue("");
            }
          }}
          className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-500 transition w-full sm:w-auto"
        >
          🔍 Search Node
        </button>
      </div>

      {/* Delete */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full">
        <input
          type="text"
          value={deleteValue}
          onChange={(e) => setDeleteValue(e.target.value)}
          placeholder="Delete value"
          className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-purple-300 outline-none border border-white/10 w-full sm:w-60"
        />
        <button
          onClick={() => {
            if (deleteValue.trim()) {
              onDelete(deleteValue.trim());
              setDeleteValue("");
            }
          }}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500 transition w-full sm:w-auto"
        >
          🗑️ Delete Node
        </button>
      </div>
    </div>
  );
};

export default LinkedListControls;
