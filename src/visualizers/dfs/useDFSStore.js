import { create } from "zustand";

const useDFSStore = create((set) => ({
  nodes: [],
  edges: [],
  setNodes: (newNodes) => set({ nodes: newNodes }),
  setEdges: (newEdges) => set({ edges: newEdges }),

  paused: false,
  setPaused: (valOrUpdater) =>
    set((state) => ({
      paused:
        typeof valOrUpdater === "function"
          ? valOrUpdater(state.paused)
          : valOrUpdater,
    })),

  dfsSteps: [],
  currentStepIndex: 0,
  setDfsSteps: (steps) => set({ dfsSteps: steps, currentStepIndex: 0 }),
  incrementStep: () =>
    set((state) => ({
      currentStepIndex:
        state.currentStepIndex < state.dfsSteps.length - 1
          ? state.currentStepIndex + 1
          : state.currentStepIndex,
    })),
  resetTraversal: () => set({ dfsSteps: [], currentStepIndex: 0 }),

  speed: 500,
  setSpeed: (val) => set({ speed: val }),
  startNode: "A",
  setStartNode: (val) => set({ startNode: val }),
  isRunning: false,
  setIsRunning: (val) => set({ isRunning: val }),
}));

export default useDFSStore;
