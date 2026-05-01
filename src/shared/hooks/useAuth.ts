import { RoleEnum } from '@/core/enums/role.enum'
import { useAuthStore } from '@/shared/store/auth.store'

export const useAuth = () => {
  const session = useAuthStore((state) => state.session)
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isHydrated = useAuthStore((state) => state.isHydrated)
  const hydrateSession = useAuthStore((state) => state.hydrateSession)
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)

  const isAdmin = session?.user.role === RoleEnum.ADMIN

  return {
    session,
    token,
    user: session?.user ?? null,
    isAuthenticated,
    isHydrated,
    isAdmin,
    hydrateSession,
    setSession,
    clearSession,
  }
}