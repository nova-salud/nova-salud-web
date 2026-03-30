import { authStorage } from './auth-storage'
import type { UserSession } from '@/core/types/user-session.type'

export const authSession = {
  get(): UserSession | null {
    return authStorage.getSession()
  },

  getToken(): string | null {
    return authStorage.getSession()?.token ?? null
  },

  set(session: UserSession): void {
    authStorage.setSession(session)
  },

  clear(): void {
    authStorage.clearSession()
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}