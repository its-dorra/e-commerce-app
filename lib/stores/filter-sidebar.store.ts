import { create } from "zustand";
import scrollLock from "scroll-lock";

interface FilterStore {
  isFilterAsideOpen: boolean;
  toggle: () => void;
}

export const useToggleFilter = create<FilterStore>((set) => ({
  isFilterAsideOpen: false,
  toggle: () => {
    set((state) => {
      if (state.isFilterAsideOpen) {
        scrollLock.enablePageScroll();
      } else {
        scrollLock.disablePageScroll();
      }
      return { isFilterAsideOpen: !state.isFilterAsideOpen };
    });
  },
}));
