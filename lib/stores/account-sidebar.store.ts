
import {create} from 'zustand'

interface AccountSidebarStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}


export const useAccountSidebarStore = create<AccountSidebarStore>(set => ({
  isSidebarOpen: false,
  toggleSidebar: () => {
    set(state => ({isSidebarOpen: !state.isSidebarOpen}));
  }
}));