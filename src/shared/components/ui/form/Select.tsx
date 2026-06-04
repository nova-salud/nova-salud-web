import { ChevronDown } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/shared/utils'
import { useClickOutside } from '@/shared/hooks'

type Option = {
  label: string
  value: string | number
}

type Props = {
  label?: string
  name: string
  error?: string
  value?: string | number
  defaultValue?: string | number
  options: Option[]
  disabled?: boolean
  required?: boolean
  placeholder?: string
  showDefaultOption?: boolean
  onChange?: (value: string) => void
  className?: string
}

type SelectPosition = {
  top: number
  left: number
  width: number
}

const VIEWPORT_PADDING = 8
const DROPDOWN_OFFSET = 4
const ESTIMATED_DROPDOWN_HEIGHT = 240

const getSelectPosition = (rect: DOMRect): SelectPosition => {
  const viewportHeight = window.innerHeight

  let top = rect.bottom + window.scrollY + DROPDOWN_OFFSET

  if (rect.bottom + ESTIMATED_DROPDOWN_HEIGHT > viewportHeight) {
    top =
      rect.top +
      window.scrollY -
      ESTIMATED_DROPDOWN_HEIGHT -
      DROPDOWN_OFFSET
  }

  return {
    top,
    left: Math.max(VIEWPORT_PADDING, rect.left + window.scrollX),
    width: rect.width,
  }
}

export const Select = ({
  name,
  label,
  error,
  value,
  defaultValue,
  options,
  disabled = false,
  required = false,
  placeholder = 'Seleccione',
  showDefaultOption = false,
  className,
  onChange,
}: Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<SelectPosition | null>(null)

  const isControlled = value !== undefined

  const [internalValue, setInternalValue] = useState<string>(() => {
    if (
      defaultValue !== undefined &&
      defaultValue !== null &&
      defaultValue !== ''
    ) {
      return String(defaultValue)
    }

    if (!showDefaultOption && options.length > 0) {
      return String(options[0].value)
    }

    return ''
  })

  useEffect(() => {
    if (isControlled) {
      return
    }

    if (
      defaultValue !== undefined &&
      defaultValue !== null
    ) {
       
      setInternalValue(String(defaultValue))
    }
  }, [defaultValue, isControlled])

  const effectiveValue = useMemo(() => {
    if (isControlled) {
      return String(value ?? '')
    }

    return internalValue
  }, [isControlled, value, internalValue])

  const selectedOption = useMemo(() => {
    return options.find(
      (option) => String(option.value) === effectiveValue,
    )
  }, [options, effectiveValue])

  const closeSelect = () => {
    setIsOpen(false)
    setPosition(null)
  }

  useClickOutside([triggerRef, menuRef], closeSelect)

  const handleToggle = () => {
    if (disabled || !triggerRef.current) {
      return
    }

    if (isOpen) {
      closeSelect()
      return
    }

    const rect = triggerRef.current.getBoundingClientRect()

    setPosition(getSelectPosition(rect))
    setIsOpen(true)
  }

  const handleSelect = (selectedValue: string) => {
    if (!isControlled) {
      setInternalValue(selectedValue)
    }

    onChange?.(selectedValue)
    closeSelect()
  }

  return (
    <>
      <label className="flex flex-col gap-1.5">
        {label && (
          <span className="text-xs font-medium text-slate-500">
            {label}
            {required && (
              <span className="text-red-600"> *</span>
            )}
          </span>
        )}

        <input
          type="hidden"
          name={name}
          value={effectiveValue}
          required={required}
        />

        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            'flex h-11 w-full items-center justify-between rounded-xl border px-3 text-sm outline-none transition',
            'border-slate-200 bg-white text-slate-900',
            'focus:border-[#0B1739] focus:ring-2 focus:ring-[#0B1739]/10',
            disabled &&
              'cursor-not-allowed bg-slate-100 text-slate-400',
            error &&
              'border-red-300 focus:border-red-500 focus:ring-red-500/10',
              className
          )}
        >
          <span
            className={cn(
              !selectedOption && 'text-slate-400',
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>

          <ChevronDown
            size={16}
            className={cn(
              'transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {error && (
          <span className="text-xs text-red-500">
            {error}
          </span>
        )}
      </label>

      {isOpen &&
        position &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            className="z-9999 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg"
          >
            {showDefaultOption && (
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={cn(
                  'flex w-full items-center px-3 py-2 text-left text-sm transition-colors',
                  !effectiveValue
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-700 hover:bg-slate-50',
                )}
              >
                {placeholder}
              </button>
            )}

            {options.map((option) => {
              const isSelected =
                String(option.value) === effectiveValue

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    handleSelect(String(option.value))
                  }
                  className={cn(
                    'flex w-full items-center px-3 py-2 text-left text-sm transition-colors',
                    isSelected
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50',
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>,
          document.body,
        )}
    </>
  )
}