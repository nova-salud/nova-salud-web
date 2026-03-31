import { Menu } from 'lucide-react'
import { useAuth } from '@/shared/hooks/useAuth'
import { useSidebar } from '@/shared/hooks/useSidebar'

const AppNavbar = () => {
  const { clearSession } = useAuth()
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-20 flex h-17.5 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Abrir menú lateral"
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
        >
          <Menu size={18} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={clearSession}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}

export default AppNavbar