import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useAuthStore } from '@/shared/store/auth.store'

const AppProvider = ({ children }: PropsWithChildren) => {
  const hydrateSession = useAuthStore((state) => state.hydrateSession)

  useEffect(() => {
    hydrateSession()
  }, [hydrateSession])

  return children
}

export default AppProvider