import { create } from "zustand";

interface FilterStore {
  isFilterAsideOpen: boolean;
  toggle: () => void;
}

export const useToggleFilter = create<FilterStore>((set) => ({
  isFilterAsideOpen: false,
  toggle: () =>
    set((state) => ({ isFilterAsideOpen: !state.isFilterAsideOpen })),
}));
