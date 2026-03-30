import { navigationConfig } from './navigation.config'
import NavItem from './NavItem'
import { useSidebar } from '@/shared/hooks/useSidebar'
import { useAuth } from '@/shared/hooks/useAuth'

const AppSidebar = () => {
  const { sidebarOpen, closeSidebar } = useSidebar()
  const { user } = useAuth()

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
        className={[
          'fixed left-0 top-0 z-40 flex h-screen w-[290px] flex-col border-r border-slate-200 bg-[#F9FAFB] transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:static lg:translate-x-0',
        ].join(' ')}
      >
        <div className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-blue-600 text-sm font-semibold text-white shadow-sm">
              T
            </div>

            <div>
              <h1 className="text-[22px] font-semibold text-slate-900">
                Nova Peru SST
              </h1>
              <p className="text-[11px] uppercase tracking-[0.08em] text-slate-400">
                Medico-Ocupacional
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-7">
            {navigationConfig.map((section) => (
              <div key={section.label}>
                <p className="mb-3 px-2 text-[11px] font-semibold tracking-[0.18em] text-slate-400">
                  {section.label}
                </p>

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavItem
                      key={item.path}
                      label={item.label}
                      path={item.path}
                      badge={item.badge}
                      onClick={closeSidebar}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xs font-semibold text-emerald-700">
              DR
            </div>

            <div className="min-w-0">
              <p className="truncate text-base font-medium text-slate-900">
                {user?.username ?? 'Usuario'}
              </p>
              <p className="text-xs text-slate-400">
                Médico Ocupacional
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default AppSidebar