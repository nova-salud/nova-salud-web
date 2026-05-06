import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import NavItem from './NavItem'
import { useSidebar } from '@/shared/hooks/useSidebar'
import { useAuth } from '@/shared/hooks/useAuth'
import { navigationConfig } from '@/app/router/navigation.config'
import { cn } from '@/shared/utils'
import { RoleEnum } from '@/core/enums/role.enum'
import SidebarUserMenu from './SidebarUserMenu'

const AppSidebar = () => {
  const {
    sidebarOpen,
    sidebarCollapsed,
    closeSidebar,
    toggleSidebarCollapsed,
  } = useSidebar()
  const { user, clearSession } = useAuth()

  const desktopWidthClass = sidebarCollapsed ? 'lg:w-[92px]' : 'lg:w-[230px]'

  const filteredSections = navigationConfig
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        !item.roles || item.roles.includes(user?.role ?? RoleEnum.EMPLOYEE)
      ),
    }))
    .filter(section => section.items.length > 0)

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
        <div className="border-b border-slate-200 px-3 py-4">
          <div className="relative flex items-center justify-center">
            {!sidebarCollapsed ? (
              <>
                <img
                  src="/logos/logo.png"
                  alt="Grupo Nueva Pescanova"
                  className="h-8 w-auto object-contain"
                />

                <button
                  type="button"
                  onClick={toggleSidebarCollapsed}
                  aria-label="Colapsar menú lateral"
                  className="absolute right-0 hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 lg:inline-flex"
                >
                  <PanelLeftClose size={18} />
                </button>
              </>
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
          </div>
        </div>

        <div className="sidebar flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-7">
            {filteredSections.map((section) => (
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

        {user && <SidebarUserMenu
          user={user}
          sidebarCollapsed={sidebarCollapsed}
          onLogout={clearSession}
        />}
      </aside>
    </>
  )
}

export default AppSidebar