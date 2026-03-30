import { create } from 'zustand'
import { authSession } from '@/core/auth/auth-session'
import type { UserSession } from '@/core/types/user-session.type'

type AuthState = {
  session: UserSession | null
  token: string | null
  isAuthenticated: boolean
  hydrateSession: () => void
  setSession: (session: UserSession) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  token: null,
  isAuthenticated: false,

  hydrateSession: () => {
    const session = authSession.get()

    set({
      session,
      token: session?.token ?? null,
      isAuthenticated: !!session?.token,
    })
  },

  setSession: (session) => {
    authSession.set(session)

    set({
      session,
      token: session.token,
      isAuthenticated: true,
    })
  },

  clearSession: () => {
    authSession.clear()

    set({
      session: null,
      token: null,
      isAuthenticated: false,
    })
  },
}))