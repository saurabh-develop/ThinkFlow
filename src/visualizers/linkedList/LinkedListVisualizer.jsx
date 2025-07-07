import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/pages/SideBar";
import LinkedListControls from "./LinkedListControls";
import {
  SinglyLinkedList,
  DoublyLinkedList,
  CircularLinkedList,
} from "./LinkedListLogic";
import LinkedListExplanation from "./LinkedListExplanation";

const LinkedListVisualizer = () => {
  const [listType, setListType] = useState("singly");
  const listRef = useRef(new SinglyLinkedList());
  const [visualList, setVisualList] = useState([]);
  const [highlighted, setHighlighted] = useState(null);
  const [animatingReverse, setAnimatingReverse] = useState(false);
  const [activeTab, setActiveTab] = useState("visualization");

  const getListClass = () => {
    switch (listType) {
      case "doubly":
        return DoublyLinkedList;
      case "circular":
        return CircularLinkedList;
      default:
        return SinglyLinkedList;
    }
  };

  const refresh = () => {
    setVisualList(listRef.current.toArray());
  };

  const handleInsert = (value, position) => {
    if (!value) return;
    const ListClass = getListClass();
    if (!(listRef.current instanceof ListClass)) {
      listRef.current = new ListClass();
    }
    if (position === "head") listRef.current.insertAtHead(value);
    else listRef.current.insertAtTail(value);
    refresh();
  };

  const handleReverse = async () => {
    setAnimatingReverse(true);
    await new Promise((res) => setTimeout(res, 500));
    listRef.current.reverse();
    refresh();
    setAnimatingReverse(false);
  };

  const handleSearch = async (value) => {
    const values = listRef.current.toArray();
    for (let i = 0; i < values.length; i++) {
      setHighlighted(i);
      await new Promise((res) => setTimeout(res, 400));
      if (values[i] === value) {
        alert(`✅ ${value} found at index ${i}`);
        setHighlighted(null);
        return;
      }
    }
    alert(`❌ ${value} not found.`);
    setHighlighted(null);
  };

  const handleDelete = (value) => {
    listRef.current.delete(value);
    refresh();
  };

  return (
    <div className="flex min-h-screen text-white">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Linked List Visualizer
        </h1>

        {/* Tab Switch */}
        <div className="flex w-full max-w-xl mx-auto mb-8 rounded-xl overflow-hidden border border-white/10">
          <button
            className={`w-1/2 py-2 font-semibold transition-colors ${
              activeTab === "visualization"
                ? "bg-white/10 text-white"
                : "bg-transparent text-white/50"
            }`}
            onClick={() => setActiveTab("visualization")}
          >
            Visualization
          </button>
          <button
            className={`w-1/2 py-2 font-semibold transition-colors ${
              activeTab === "explanation"
                ? "bg-white/10 text-white"
                : "bg-transparent text-white/50"
            }`}
            onClick={() => setActiveTab("explanation")}
          >
            Explanation
          </button>
        </div>

        {activeTab === "visualization" && (
          <>
            <LinkedListControls
              listType={listType}
              setListType={setListType}
              onInsert={handleInsert}
              onReverse={handleReverse}
              onSearch={handleSearch}
              onDelete={handleDelete}
            />

            <div className="overflow-x-auto">
              <div className="flex items-end justify-start mt-10 gap-6 min-w-fit">
                {visualList.map((val, idx) => {
                  const isHead = idx === 0;
                  const isTail = idx === visualList.length - 1;

                  return (
                    <React.Fragment key={idx}>
                      <div className="relative flex flex-col items-center">
                        {/* Labels */}
                        {isHead && (
                          <span className="text-xs mb-1 text-green-400 font-semibold">
                            HEAD
                          </span>
                        )}
                        {isTail && (
                          <span className="text-xs mb-1 text-pink-400 font-semibold">
                            TAIL
                          </span>
                        )}

                        {/* Node */}
                        <motion.div
                          animate={
                            highlighted === idx
                              ? {
                                  scale: [1, 1.2, 1],
                                  backgroundColor: "#facc15",
                                }
                              : {}
                          }
                          transition={{ duration: 0.4 }}
                          className={`px-5 py-2 rounded-2xl font-bold text-sm sm:text-base shadow-lg transition-all duration-300 min-w-[48px] text-center ${
                            highlighted === idx
                              ? "text-black"
                              : "bg-[#8b3dff] text-white"
                          }`}
                        >
                          {val}
                        </motion.div>
                      </div>

                      {/* Arrows */}
                      {idx !== visualList.length - 1 && (
                        <div className="text-yellow-400 flex flex-col items-center">
                          {listType === "doubly" ? (
                            <>
                              <motion.span
                                animate={{ rotate: animatingReverse ? 180 : 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                ⇄
                              </motion.span>
                            </>
                          ) : (
                            <motion.span
                              animate={{ rotate: animatingReverse ? 180 : 0 }}
                              transition={{ duration: 0.5 }}
                              className="text-4xl"
                            >
                              →
                            </motion.span>
                          )}
                        </div>
                      )}
                      {listType === "circular" &&
                        idx === visualList.length - 1 &&
                        visualList.length > 1 && (
                          <div className="text-yellow-400 text-xl -ml-2">↻</div>
                        )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#1e1e2f]/60 backdrop-blur-md text-white shadow-lg mt-10">
              <h2 className="text-2xl font-bold text-center text-purple-400 mb-4">
                ⏱️ Time Complexity
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="text-purple-300 border-b border-purple-600">
                      <th className="py-2 px-4">Operation</th>
                      <th className="py-2 px-4">Singly</th>
                      <th className="py-2 px-4">Doubly</th>
                      <th className="py-2 px-4">Circular</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        op: "Access (by index)",
                        s: "O(n)",
                        d: "O(n)",
                        c: "O(n)",
                      },
                      { op: "Search", s: "O(n)", d: "O(n)", c: "O(n)" },
                      {
                        op: "Insert at Head",
                        s: "O(1)",
                        d: "O(1)",
                        c: "O(1)",
                      },
                      {
                        op: "Insert at Tail",
                        s: "O(n)",
                        d: "O(1)",
                        c: "O(1)",
                      },
                      {
                        op: "Insert at Index",
                        s: "O(n)",
                        d: "O(n)",
                        c: "O(n)",
                      },
                      { op: "Delete Head", s: "O(1)", d: "O(1)", c: "O(1)" },
                      { op: "Delete Tail", s: "O(n)", d: "O(1)", c: "O(n)" },
                      {
                        op: "Delete by Value",
                        s: "O(n)",
                        d: "O(n)",
                        c: "O(n)",
                      },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className={
                          i % 2 === 0 ? "bg-[#2a2a40]/50" : "bg-[#2a2a40]/30"
                        }
                      >
                        <td className="py-2 px-4">{row.op}</td>
                        <td className="py-2 px-4 text-purple-200">{row.s}</td>
                        <td className="py-2 px-4 text-purple-200">{row.d}</td>
                        <td className="py-2 px-4 text-purple-200">{row.c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {activeTab === "explanation" && <LinkedListExplanation />}
      </main>
    </div>
  );
};

export default LinkedListVisualizer;
