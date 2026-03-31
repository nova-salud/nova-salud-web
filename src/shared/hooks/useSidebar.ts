import { useUiStore } from '@/shared/store/ui.store'

export const useSidebar = () => {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen)
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed)
  const openSidebar = useUiStore((state) => state.openSidebar)
  const closeSidebar = useUiStore((state) => state.closeSidebar)
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)
  const collapseSidebar = useUiStore((state) => state.collapseSidebar)
  const expandSidebar = useUiStore((state) => state.expandSidebar)
  const toggleSidebarCollapsed = useUiStore((state) => state.toggleSidebarCollapsed)

  return {
    sidebarOpen,
    sidebarCollapsed,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
    toggleSidebarCollapsed,
  }
}