import type { RouteObject } from 'react-router'
import AuthGuard from '@/app/router/guards/auth.guard'
import PrivateLayout from '@/app/layouts/PrivateLayout'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'

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
      ],
    },
  ],
}