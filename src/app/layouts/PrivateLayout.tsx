import { Outlet } from 'react-router'
import AppSidebar from '@/shared/components/navigation/AppSidebar'
import { ScrollToTop } from '@/shared/components/navigation/ScrollToTop'
import AppNavbar from '@/shared/components/navigation/AppNavbar'

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-[#EEF2F7] text-slate-900 lg:h-screen lg:overflow-hidden">
      <div className="flex min-h-screen flex-col lg:h-full lg:flex-row">

        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col lg:h-full">
          <AppNavbar />

          <main id="main-scroll" className="flex-1 overflow-y-auto p-5 lg:p-6">
            <ScrollToTop />
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  )
}

export default PrivateLayout