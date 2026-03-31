import { create } from 'zustand'
import { authSession } from '@/core/auth/auth-session'
import type { UserSession } from '@/core/types/user-session.type'

type AuthState = {
  session: UserSession | null
  token: string | null
  isAuthenticated: boolean
  isHydrated: boolean
  hydrateSession: () => void
  setSession: (session: UserSession) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  token: null,
  isAuthenticated: false,
  isHydrated: false,

  hydrateSession: () => {
    const session = authSession.get()

    set({
      session,
      token: session?.token ?? null,
      isAuthenticated: !!session?.token,
      isHydrated: true,
    })
  },

  setSession: (session) => {
    authSession.set(session)

    set({
      session,
      token: session.token,
      isAuthenticated: true,
      isHydrated: true,
    })
  },

  clearSession: () => {
    authSession.clear()

    set({
      session: null,
      token: null,
      isAuthenticated: false,
      isHydrated: true,
    })
  },
}))