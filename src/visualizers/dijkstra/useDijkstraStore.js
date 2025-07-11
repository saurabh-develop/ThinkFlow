import { create } from "zustand";

const useDijkstraStore = create((set) => ({
  startNode: "A",
  setStartNode: (start) => set({ startNode: start }),

  dijkstraSteps: [],
  setDijkstraSteps: (steps) => set({ dijkstraSteps: steps }),

  currentStepIndex: 0,
  incrementStep: () =>
    set((state) => ({
      currentStepIndex: state.currentStepIndex + 1,
    })),

  resetTraversal: () =>
    set({
      currentStepIndex: 0,
      dijkstraSteps: [],
      isRunning: false,
      paused: false,
      finalStep: null,
    }),

  speed: 500,
  setSpeed: (val) => set({ speed: val }),

  isRunning: false,
  setIsRunning: (flag) => set({ isRunning: flag }),

  paused: false,
  setPaused: (flag) => set({ paused: flag }),

  finalStep: null,
  setFinalStep: (step) => set({ finalStep: step }),
}));

export default useDijkstraStore;
