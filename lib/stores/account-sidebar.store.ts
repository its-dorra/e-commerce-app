import { create } from "zustand";
import scrollLock from "scroll-lock";

interface AccountSidebarStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAccountSidebarStore = create<AccountSidebarStore>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => {
    set((state) => {
      if (state.isSidebarOpen) {
        scrollLock.enablePageScroll();
      } else {
        scrollLock.disablePageScroll;
      }
      return { isSidebarOpen: !state.isSidebarOpen };
    });
  },
}));
