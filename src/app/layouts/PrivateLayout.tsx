import { Outlet } from 'react-router'
import AppNavbar from '@/shared/components/navigation/AppNavbar'
import AppSidebar from '@/shared/components/navigation/AppSidebar'
import { useSidebar } from '@/shared/hooks/useSidebar'
import { cn } from '@/shared/utils'

const PrivateLayout = () => {
  const { sidebarCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-[#EEF2F7] text-slate-900">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppNavbar />

          <main
            className={cn([
              'flex-1 p-5 transition-all duration-300 lg:p-6',
              sidebarCollapsed ? 'lg:px-8' : 'lg:px-6',
            ])}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default PrivateLayout