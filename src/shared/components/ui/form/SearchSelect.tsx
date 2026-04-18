import { useCallback, useRef, useState } from 'react'
import { cn } from '@/shared/utils'
import { Label } from './Label'
import { useClickOutside } from '@/shared/hooks/useClickOutside'

type Option = {
  label: string
  value: string | number
}

type Props = {
  label?: string
  error?: string
  value: string | number
  options: Option[]
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export const SearchSelect = ({
  label,
  error,
  value,
  options,
  onChange,
  placeholder = 'Buscar...',
  disabled = false,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const selected = options.find((option) => String(option.value) === String(value))

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase()),
  )

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setQuery('')
  }, [])

  useClickOutside(containerRef, handleClose)

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      {label && <Label>{label}</Label>}

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return
          setIsOpen((prev) => !prev)
          setQuery('')
        }}
        className={cn(
          'flex h-11 w-full items-center justify-between rounded-xl border px-3 text-sm outline-none transition',
          'border-slate-200 bg-white text-slate-900',
          'focus:border-slate-300 focus:ring-1 focus:ring-slate-200',
          disabled && 'cursor-not-allowed opacity-60',
          error && 'border-red-300 focus:border-red-400 focus:ring-red-100',
        )}
      >
        <span className={cn(!selected && 'text-slate-400')}>
          {selected?.label || 'Seleccione'}
        </span>

        <span className="text-slate-400 text-xs">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-300 focus:ring-1 focus:ring-slate-200"
            />
          </div>

          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-slate-500">
                Sin resultados
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(String(option.value))
                    handleClose()
                  }}
                  className={cn(
                    'block w-full px-3 py-2 text-left text-sm transition hover:bg-slate-50',
                    String(option.value) === String(value) &&
                      'bg-slate-100 font-medium text-slate-900',
                  )}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}