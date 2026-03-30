import { STORAGE_KEYS } from '@/core/constants/storage.constants'
import type { UserSession } from '@/core/types/user-session.type'

export const authStorage = {
  getSession(): UserSession | null {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION)

    if (!raw) {
      return null
    }

    try {
      return JSON.parse(raw) as UserSession
    } catch {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION)
      return null
    }
  },

  setSession(session: UserSession): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session))
  },

  clearSession(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION)
  },
}