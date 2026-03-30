import { useAuthStore } from '@/shared/store/auth.store'

export const useAuth = () => {
  const {
    session,
    token,
    isAuthenticated,
    hydrateSession,
    setSession,
    clearSession
  } = useAuthStore((state) => state)

  return {
    session,
    token,
    user: session?.user ?? null,
    isAuthenticated,
    hydrateSession,
    setSession,
    clearSession,
  }
}