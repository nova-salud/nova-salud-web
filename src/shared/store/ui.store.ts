import { create } from 'zustand'

type UiState = {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  collapseSidebar: () => void
  expandSidebar: () => void
  toggleSidebarCollapsed: () => void
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  sidebarCollapsed: false,

  openSidebar: () => {
    set({ sidebarOpen: true })
  },

  closeSidebar: () => {
    set({ sidebarOpen: false })
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }))
  },

  collapseSidebar: () => {
    set({ sidebarCollapsed: true })
  },

  expandSidebar: () => {
    set({ sidebarCollapsed: false })
  },

  toggleSidebarCollapsed: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
  },
}))