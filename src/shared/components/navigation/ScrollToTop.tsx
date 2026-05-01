import { useEffect } from 'react'
import { useLocation } from 'react-router'

export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const el = document.getElementById('main-scroll')

    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname])

  return null
}