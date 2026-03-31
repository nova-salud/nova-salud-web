import type { RouteObject } from 'react-router'
import AuthGuard from '@/app/router/guards/auth.guard'
import PrivateLayout from '@/app/layouts/PrivateLayout'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import MedicationsPage from '@/features/inventory/medications/pages/MedicationsPage'
import DeliveriesPage from '@/features/inventory/deliveries/pages/DeliveriesPage'
import DeliveryDetailPage from '@/features/inventory/deliveries/pages/DeliveryDetailPage'
import MovementsPage from '@/features/inventory/movements/pages/MovementsPage'
import MedicationDetailPage from '@/features/inventory/medications/pages/MedicationDetailPage'

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
          path: '/medications/:id',
          element: <MedicationDetailPage />,
        },
        {
          path: '/deliveries',
          element: <DeliveriesPage />,
        },
        {
          path: '/deliveries/:id',
          element: <DeliveryDetailPage />,
        },
        {
          path: '/movements',
          element: <MovementsPage />,
        }
      ],
    },
  ],
}