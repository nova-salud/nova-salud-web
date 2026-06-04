import { cn } from '@/shared/utils'
import { Eye, EyeOff } from 'lucide-react'
import { type HTMLProps, useCallback, useEffect, useRef, useState } from 'react'

export type InputType = 'text' | 'number' | 'password' | 'date' | 'email' | 'tel' | 'time' | 'datetime-local'

export interface InputValidation {
  message: string
  regex: RegExp
}

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  name: string
  type: InputType
  validations?: InputValidation[]
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  disabled = false,
  required = false,
  validations = [],
  className,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string | null>(null)
  const [showText, setShowText] = useState(false)

  const toggleShowText = () => setShowText(!showText)

  const normalizeValue = useCallback((raw: unknown) => {
    const v = String(raw ?? '')

    if (!v) return ''

    if (type === 'time') {
      if (v.includes('T') || v.includes('Z')) {
        try {
          const d = new Date(v)
          const hh = String(d.getHours()).padStart(2, '0')
          const mm = String(d.getMinutes()).padStart(2, '0')
          return `${hh}:${mm}`
        } catch { return '' }
      }
      return v.slice(0, 5)
    }

    if (type === 'datetime-local') {
      try {
        const d = new Date(v)
        if (!Number.isFinite(d.getTime())) return ''
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const hh = String(d.getHours()).padStart(2, '0')
        const mm = String(d.getMinutes()).padStart(2, '0')
        return `${y}-${m}-${day}T${hh}:${mm}`
      } catch { return '' }
    }

    return v
  }, [type])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    const valueTrim = value.trim()
    onChange?.(event)

    if (valueTrim === '') {
      setError(
        required ? 'Este campo es requerido' : null
      )
      return
    }

    const validation = validations.find((val) => !val.regex.test(valueTrim))

    if (validation) {
      setError(validation.message)
      return
    }

    setError(null)
  }

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.value = normalizeValue(value ?? '')
    }
  }, [value, normalizeValue])

  const handleShowText = () => {
    if (disabled || props.readOnly) return
    toggleShowText()
  }

  return (
    <label
      htmlFor={props.name}
      className={cn('flex flex-col gap-1.5', className)}
    >
      <span className="text-xs font-medium text-slate-500">{label} {required && <span className='text-red-600'>*</span>}</span>

      <div className='relative'>
        <input
          {...props}
          className={cn(
            'h-11 w-full rounded-xl border px-3 text-sm outline-none transition',
            'border-slate-200 bg-white text-slate-900',
            'focus:border-[#0B1739] focus:ring-2 focus:ring-[#0B1739]/10',
            error && 'border-[#b80000] input-shake',
            className
          )}
          ref={inputRef}
          type={
            type === 'password' ? showText ? 'text' : 'password' : type
          }
          disabled={disabled}
          required={required}
          onChange={handleChange}
          step={0.01}
        />
        {
          type === 'password' && (
            <div onClick={handleShowText} className='[&>svg]:size-5 cursor-pointer absolute inset-y-0 right-2 flex items-center text-gray-500'>
              {showText
                ? <Eye />
                : <EyeOff />
              }
            </div>
          )
        }
      </div>

      <span className={cn(
        'text-red-600 text-xs font-semibold -mt-1',
        error && 'error'
      )}>{error}</span>
    </label>
  )
}

export default Input
