import { create } from "zustand";

const useGraphStore = create((set) => ({
  bfsSteps: [],
  currentStepIndex: 0,
  setBfsSteps: (steps) => set({ bfsSteps: steps, currentStepIndex: 0 }),
  incrementStep: () =>
    set((state) => ({
      currentStepIndex:
        state.currentStepIndex < state.bfsSteps.length - 1
          ? state.currentStepIndex + 1
          : state.currentStepIndex,
    })),
  resetTraversal: () => set({ bfsSteps: [], currentStepIndex: 0 }),

  speed: 500,
  setSpeed: (val) => set({ speed: val }),
  startNode: "A",
  setStartNode: (val) => set({ startNode: val }),
  isRunning: false,
  setIsRunning: (val) => set({ isRunning: val }),
  paused: false,
  setPaused: (val) => set({ paused: val }),
}));

export default useGraphStore;
