import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/shared/hooks/useAuth'
import LoadingScreen from '@/shared/components/feedback/LoadingScreen'

const AuthGuard = () => {
  const location = useLocation()
  const { isAuthenticated, isHydrated } = useAuth()

  if (!isHydrated) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default AuthGuard