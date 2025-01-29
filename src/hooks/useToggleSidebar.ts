import { create } from 'zustand'

interface SidebarState {
    isSidebarOpen: boolean
    closeSidebar: () => void
    openSidebar: () => void
}
export const useToggleSidebar = create<SidebarState>((set) => ({
    isSidebarOpen: false,
    closeSidebar: () => set({ isSidebarOpen: false }),
    openSidebar: () => set({ isSidebarOpen: true }),
}))
