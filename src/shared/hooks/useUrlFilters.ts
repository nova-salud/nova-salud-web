import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

function parseParamValue(value: string): string | number | boolean {
  if (value === 'true') return true
  if (value === 'false') return false
  const num = Number(value)
  if (!isNaN(num) && value.trim() !== '') return num
  return value
}

export function useUrlFilters<T extends Record<string, unknown>>() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => {
    const result: Partial<T> = {}
    searchParams.forEach((value, key) => {
      ;(result as Record<string, unknown>)[key] = parseParamValue(value)
    })
    return result
  }, [searchParams])

  const setFilters = useCallback(
    (newFilters: Partial<T>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          Object.entries(newFilters).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
              next.delete(key)
            } else {
              next.set(key, String(value))
            }
          })
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  return { filters, setFilters }
}
