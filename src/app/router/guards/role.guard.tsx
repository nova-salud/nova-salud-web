import { Navigate, Outlet } from 'react-router'
import type { RoleEnum } from '@/core/enums/role.enum'
import { useAuth } from '@/shared/hooks/useAuth'
import NotAuthorizedPage from '@/shared/pages/NotAuthorizedPage'

type Props = {
  roles?: RoleEnum[]
}

const RoleGuard = ({ roles }: Props) => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!roles || roles.length === 0) {
    return <Outlet />
  }

  if (!user?.role) {
    return <NotAuthorizedPage />
  }

  if (!roles.includes(user.role)) {
    return <NotAuthorizedPage />
  }

  return <Outlet />
}

export default RoleGuard