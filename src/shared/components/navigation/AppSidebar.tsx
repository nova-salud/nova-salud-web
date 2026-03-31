import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import NavItem from './NavItem'
import { useSidebar } from '@/shared/hooks/useSidebar'
import { useAuth } from '@/shared/hooks/useAuth'
import { navigationConfig } from '@/app/router/navigation.config'
import { cn } from '@/shared/utils'

const AppSidebar = () => {
  const {
    sidebarOpen,
    sidebarCollapsed,
    closeSidebar,
    toggleSidebarCollapsed,
  } = useSidebar()
  const { user } = useAuth()

  const desktopWidthClass = sidebarCollapsed ? 'lg:w-[92px]' : 'lg:w-[230px]'

  return (
    <>
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Cerrar menú lateral"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
        />
      ) : null}

      <aside
        className={cn([
          'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-[#F9FAFB] transition-all duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'w-72.5',
          desktopWidthClass,
          'lg:static lg:translate-x-0',
        ])}
      >
        <div className="border-b border-slate-200 h-17.5 px-3 py-3">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between gap-3'}`}>
            {!sidebarCollapsed ? (
              <h1 className="text-lg font-semibold text-slate-900">
                Nova Peru SST
              </h1>
            ) : (
              <button
                type="button"
                onClick={toggleSidebarCollapsed}
                aria-label="Expandir menú lateral"
                className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 lg:inline-flex"
              >
                <PanelLeftOpen size={18} />
              </button>
            )}

            {!sidebarCollapsed ? (
              <button
                type="button"
                onClick={toggleSidebarCollapsed}
                aria-label="Colapsar menú lateral"
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 lg:inline-flex"
              >
                <PanelLeftClose size={18} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-7">
            {navigationConfig.map((section) => (
              <div key={section.label}>
                {!sidebarCollapsed ? (
                  <p className="mb-3 px-2 text-[11px] font-semibold tracking-[0.18em] text-slate-400">
                    {section.label}
                  </p>
                ) : null}

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavItem
                      key={item.path}
                      label={item.label}
                      path={item.path}
                      icon={item.icon}
                      badge={item.badge}
                      collapsed={sidebarCollapsed}
                      onClick={closeSidebar}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 px-3 py-4">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xs font-semibold text-emerald-700">
                DR
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {user?.username ?? 'Usuario'}
                </p>
                <p className="text-xs text-slate-400">
                  Médico Ocupacional
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div
                title={user?.username ?? 'Usuario'}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xs font-semibold text-emerald-700"
              >
                DR
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default AppSidebar