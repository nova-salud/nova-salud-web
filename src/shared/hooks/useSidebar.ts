import { useUiStore } from '@/shared/store/ui.store'

export const useSidebar = () => {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen)
  const openSidebar = useUiStore((state) => state.openSidebar)
  const closeSidebar = useUiStore((state) => state.closeSidebar)
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)

  return {
    sidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  }
}