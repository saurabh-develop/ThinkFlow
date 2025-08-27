import React from "react";
import { motion } from "motion/react";

const DPTable = ({ table, highlight, items }) => {
  const capacity = table[0].length - 1;

  return (
    <div className="overflow-auto border border-gray-700 rounded-xl p-4 bg-[#1e1e2f] shadow-lg">
      <div className="text-white font-semibold mb-2">
        DP Table (Rows: Items, Columns: Capacity)
      </div>

      <table className="table-auto border-collapse text-center text-white">
        <thead>
          <tr>
            <th className="w-24 bg-[#151521] border border-gray-600">
              Item ↓ / W →
            </th>
            {[...Array(capacity + 1).keys()].map((w) => (
              <th
                key={w}
                className="w-12 h-12 border border-gray-600 bg-[#1f1f2f]"
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {table.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-2 py-1 border border-gray-600 bg-[#1f1f2f] text-sm text-left">
                {rowIndex === 0 ? (
                  <span className="text-gray-400">No item</span>
                ) : (
                  <div className="text-purple-400">
                    #{rowIndex} (W: {items[rowIndex - 1]?.weight}, V:{" "}
                    {items[rowIndex - 1]?.value})
                  </div>
                )}
              </td>

              {row.map((val, colIndex) => {
                const isHighlighted =
                  highlight.i === rowIndex && highlight.w === colIndex;

                return (
                  <td
                    key={colIndex}
                    className={`border border-gray-600 w-12 h-12 transition-all duration-200 ${
                      isHighlighted
                        ? "bg-purple-700 text-white font-bold shadow-md"
                        : "bg-[#2a2a3d] text-gray-200"
                    }`}
                  >
                    <motion.div layout>{val}</motion.div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DPTable;
