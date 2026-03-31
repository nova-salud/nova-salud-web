import type { RouteObject } from 'react-router'
import AuthGuard from '@/app/router/guards/auth.guard'
import PrivateLayout from '@/app/layouts/PrivateLayout'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import MedicationsPage from '@/features/inventory/medications/pages/MedicationsPage'
import DeliveriesPage from '@/features/inventory/deliveries/pages/DeliveriesPage'

export const appRoutes: RouteObject = {
  element: <AuthGuard />,
  children: [
    {
      element: <PrivateLayout />,
      children: [
        {
          path: '/',
          element: <DashboardPage />,
        },
        {
          path: '/medications',
          element: <MedicationsPage />,
        },
        {
          path: '/deliveries',
          element: <DeliveriesPage />,
        }
      ],
    },
  ],
}