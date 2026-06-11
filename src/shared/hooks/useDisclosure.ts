import { useState, useCallback } from 'react'

export const useDisclosure = <T extends string>() => {
  const [active, setActive] = useState<T | null>(null)

  const open = useCallback((key: T) => {
    setActive(key)
  }, [])

  const close = useCallback(() => {
    setActive(null)
  }, [])

  const isOpen = useCallback(
    (key: T) => active === key,
    [active],
  )

  return {
    active,
    open,
    close,
    isOpen,
  }
}