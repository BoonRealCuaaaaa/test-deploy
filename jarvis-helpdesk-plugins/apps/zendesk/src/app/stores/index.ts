import { create } from 'zustand';

import { createExampleSlice, ExampleSlice } from './slices/example';

type AppStore = ExampleSlice;

const useAppStore = create<AppStore>((...args) => ({
  ...createExampleSlice(...args),
}));

export default useAppStore;
