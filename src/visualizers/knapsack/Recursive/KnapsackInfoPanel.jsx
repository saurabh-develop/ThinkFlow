const KnapsackInfoPanel = ({ values, weights, capacity }) => {
  return (
    <div className="mb-4 p-4 rounded-md bg-white/5 text-white border border-white/10 backdrop-blur text-center text-lg">
      <div>
        🎒 <strong>Knapsack Input:</strong>
      </div>
      <div className="mt-1">
        <span className="text-purple-300 ">Values:</span> [{values.join(", ")}]
        <span className="text-purple-300"> Weights:</span> [{weights.join(", ")}
        ]<span className="text-purple-300"> Capacity:</span> {capacity}
      </div>
    </div>
  );
};
export default KnapsackInfoPanel;
