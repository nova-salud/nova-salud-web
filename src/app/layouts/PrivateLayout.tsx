import { Outlet } from 'react-router'
import AppNavbar from '@/shared/components/navigation/AppNavbar'
import AppSidebar from '@/shared/components/navigation/AppSidebar'

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-[#EEF2F7] text-slate-900">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppNavbar />

          <main className="flex-1 p-5 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default PrivateLayout