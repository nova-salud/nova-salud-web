import { Menu } from 'lucide-react'
import { useSidebar } from '@/shared/hooks/useSidebar'
import NotificationDropdown from '@/features/communications/notifications/components/NotificationDropdown'

const AppNavbar = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
        >
          <Menu size={18} />
        </button>

        <img
          src="/logos/logo.png"
          alt="Grupo Nueva Pescanova"
          className="h-8 w-auto object-contain lg:hidden"
        />
      </div>

      <NotificationDropdown />

    </header>
  )
}

export default AppNavbar