import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { NotificationsProvider } from '@/features/communications/notifications/context/NotificationsContext'
import { AppNavbar, AppSidebar, ScrollToTop } from '@/shared/components'
import LoadingScreen from '@/shared/pages/LoadingScreen'

const PrivateLayout = () => {
  return (
    <NotificationsProvider>
      <div className="min-h-screen bg-[#EEF2F7] text-slate-900 lg:h-screen lg:overflow-hidden">
        <div className="flex min-h-screen flex-col lg:h-full lg:flex-row">

          <AppSidebar />

          <div className="flex min-w-0 flex-1 flex-col lg:h-full">
            <AppNavbar />

            <main id="main-scroll" className="flex-1 overflow-y-auto p-5 lg:p-6">
              <ScrollToTop />
              <Suspense fallback={<LoadingScreen />}>
                <Outlet />
              </Suspense>
            </main>
          </div>

        </div>
      </div>
    </NotificationsProvider>
  )
}

export default PrivateLayout