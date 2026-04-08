import { Navigate, Outlet } from 'react-router'
import type { RoleEnum } from '@/core/enums/role.enum'
import { useAuth } from '@/shared/hooks/useAuth'

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
    return <Navigate to="/" replace />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RoleGuard