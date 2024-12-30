import type { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ExampleSliceState = {
  count: number;
};

type ExampleSliceAction = {
  setCount: (value: number) => void;
};

export type ExampleSlice = ExampleSliceState & ExampleSliceAction;

const initialState: ExampleSliceState = {
  count: 0,
};

export const createExampleSlice: StateCreator<ExampleSliceState & ExampleSliceAction, [], [['zustand/immer', never]]> =
  immer((set) => ({
    ...initialState,
    setCount: (value: number) => {
      set((state) => {
        state.count = value;
      });
    },
  }));
