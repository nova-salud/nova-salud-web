import { useMemo } from 'react'
import { useAuth } from '@/shared/hooks/useAuth'
import { useSidebar } from '@/shared/hooks/useSidebar'

const AppNavbar = () => {
  const { clearSession } = useAuth()
  const { toggleSidebar } = useSidebar()

  const currentDate = useMemo(() => {
    return new Intl.DateTimeFormat('es-PE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date())
  }, [])

  return (
    <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Abrir menú lateral"
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
        >
          ☰
        </button>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span className="capitalize">{currentDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative text-lg text-amber-500"
          aria-label="Notificaciones"
        >
          🔔
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            7
          </span>
        </button>

        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700">
          Planta Principal
        </div>

        <button
          type="button"
          onClick={clearSession}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Salir
        </button>
      </div>
    </header>
  )
}

export default AppNavbar