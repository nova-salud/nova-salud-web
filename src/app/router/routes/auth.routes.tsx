import type { RouteObject } from 'react-router'
import PublicLayout from '@/app/layouts/PublicLayout'
import LoginPage from '@/features/auth/pages/LoginPage'

export const authRoutes: RouteObject = {
  element: <PublicLayout />,
  children: [
    {
      path: '/login',
      element: <LoginPage />,
    }
  ],
}