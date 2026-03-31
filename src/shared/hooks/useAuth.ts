import { useAuthStore } from '@/shared/store/auth.store'

export const useAuth = () => {
  const session = useAuthStore((state) => state.session)
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isHydrated = useAuthStore((state) => state.isHydrated)
  const hydrateSession = useAuthStore((state) => state.hydrateSession)
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)

  return {
    session,
    token,
    user: session?.user ?? null,
    isAuthenticated,
    isHydrated,
    hydrateSession,
    setSession,
    clearSession,
  }
}