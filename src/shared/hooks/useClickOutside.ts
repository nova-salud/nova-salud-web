import { useEffect, useRef } from 'react'

export const useClickOutside = (
  refs: React.RefObject<HTMLElement | null>[],
  onClickOutside: () => void,
  enabled = true,
) => {
  const skipFirstEventRef = useRef(true)

  useEffect(() => {
    if (!enabled) return

    skipFirstEventRef.current = true

    const handleClickOutside = (event: MouseEvent) => {
      if (skipFirstEventRef.current) {
        skipFirstEventRef.current = false
        return
      }

      const target = event.target as Node

      if (!document.contains(target)) return

      const clickedInside = refs.some((ref) =>
        ref.current?.contains(target),
      )

      if (!clickedInside) {
        onClickOutside()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [refs, onClickOutside, enabled])
}