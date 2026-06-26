import { useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import type { DayButtonProps } from 'react-day-picker'
import { es } from 'date-fns/locale'
import { format, isValid, parseISO, isBefore, isAfter, addDays } from 'date-fns'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/shared/utils'

export interface DateRangeValue {
  from: string
  to: string
}

interface Props {
  labelFrom?: string
  labelTo?: string
  value: DateRangeValue
  onChange: (value: DateRangeValue) => void
}

function toDate(iso: string): Date | undefined {
  if (!iso) return undefined
  const d = parseISO(iso)
  return isValid(d) ? d : undefined
}

function toISO(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

function formatDisplay(iso: string): string {
  const d = toDate(iso)
  return d ? format(d, 'dd/MM/yyyy') : ''
}

function sameDay(a: Date, b: Date) {
  return toISO(a) === toISO(b)
}

const NavPrev = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className="cursor-pointer rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
    <ChevronLeft size={16} />
  </button>
)

const NavNext = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className="cursor-pointer rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
    <ChevronRight size={16} />
  </button>
)

const DayButton = ({ modifiers, ...props }: DayButtonProps) => {
  const isStart = modifiers.rangeStart as boolean | undefined
  const isEnd = modifiers.rangeEnd as boolean | undefined
  const isMiddle = modifiers.rangeMiddle as boolean | undefined
  const isToday = modifiers.today as boolean | undefined
  const isOutside = modifiers.outside as boolean | undefined

  return (
    <button
      {...props}
      className={cn(
        'flex h-9 w-9 cursor-pointer items-center justify-center text-sm transition-colors',
        isStart || isEnd
          ? 'rounded-xl bg-[#0B1739] font-medium text-white hover:bg-[#0B1739]/90'
          : isMiddle
            ? 'rounded-none text-slate-700 hover:bg-[#0B1739]/10'
            : 'rounded-xl text-slate-700 hover:bg-slate-100',
        isToday && !isStart && !isEnd && 'font-bold text-[#0B1739]',
        isOutside && 'opacity-30',
      )}
    />
  )
}

export const DateRangeInput = ({
  labelFrom = 'Desde',
  labelTo = 'Hasta',
  value,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'picking'>('idle')
  const [pickingFrom, setPickingFrom] = useState<Date | undefined>()
  const [hover, setHover] = useState<Date | undefined>()
  const containerRef = useRef<HTMLDivElement>(null)

  const resetPicking = () => {
    setPhase('idle')
    setPickingFrom(undefined)
    setHover(undefined)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setPhase('idle')
        setPickingFrom(undefined)
        setHover(undefined)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDayClick = (day: Date) => {
    if (phase === 'idle') {
      setPickingFrom(day)
      setPhase('picking')
      setHover(undefined)
    } else {
      if (pickingFrom && isBefore(day, pickingFrom)) {
        setPickingFrom(day)
        setHover(undefined)
        return
      }
      if (pickingFrom && sameDay(day, pickingFrom)) {
        setPickingFrom(day)
        setHover(undefined)
        return
      }
      onChange({ from: toISO(pickingFrom!), to: toISO(day) })
      setOpen(false)
      resetPicking()
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    resetPicking()
    onChange({ from: '', to: '' })
  }

  const handleOpenToggle = () => {
    setOpen((o) => {
      if (!o) {
        setPhase('idle')
        setPickingFrom(undefined)
        setHover(undefined)
      }
      return !o
    })
  }

  const committedFrom = toDate(value.from)
  const committedTo = toDate(value.to)

  const displayedFrom = phase === 'idle' ? committedFrom : pickingFrom
  const displayedTo =
    phase === 'idle'
      ? committedTo
      : hover && pickingFrom && isAfter(hover, pickingFrom)
        ? hover
        : undefined

  // Build modifiers
  const modifiers: Record<string, Date | Date[] | { from: Date; to: Date }> = {}
  const modifiersClassNames: Record<string, string> = {}

  if (displayedFrom) {
    modifiers.rangeStart = displayedFrom
    modifiersClassNames.rangeStart = displayedTo ? 'bg-[#0B1739]/10 rounded-l-xl' : ''
  }
  if (displayedTo) {
    modifiers.rangeEnd = displayedTo
    modifiersClassNames.rangeEnd = 'bg-[#0B1739]/10 rounded-r-xl'
  }
  if (displayedFrom && displayedTo && !sameDay(displayedFrom, displayedTo)) {
    const middleFrom = addDays(displayedFrom, 1)
    const middleTo = addDays(displayedTo, -1)
    if (!isBefore(middleTo, middleFrom)) {
      modifiers.rangeMiddle = { from: middleFrom, to: middleTo }
      modifiersClassNames.rangeMiddle = 'bg-[#0B1739]/10'
    }
  }

  const hasValue = !!value.from || !!value.to

  const displayText =
    value.from && value.to
      ? `${formatDisplay(value.from)} — ${formatDisplay(value.to)}`
      : ''

  const triggerLabel =
    phase === 'picking' && pickingFrom
      ? `Desde ${formatDisplay(toISO(pickingFrom))}...`
      : displayText || 'Seleccionar rango de fechas'

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate-500">
        {labelFrom} / {labelTo}
      </span>

      <button
        type="button"
        onClick={handleOpenToggle}
        className={cn(
          'flex h-11 w-full items-center gap-2 rounded-xl border px-3 text-sm outline-none transition',
          'border-slate-200 bg-white',
          open && 'border-[#0B1739] ring-2 ring-[#0B1739]/10',
          !open && 'hover:border-slate-300',
        )}
      >
        <CalendarDays size={15} className="shrink-0 text-slate-400" />
        <span className={cn('flex-1 text-left', hasValue || phase === 'picking' ? 'text-slate-900' : 'text-slate-400')}>
          {triggerLabel}
        </span>
        {hasValue && (
          <span role="button" onClick={handleClear} className="text-slate-300 hover:text-slate-500">
            <X size={14} />
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
          <DayPicker
            locale={es}
            numberOfMonths={2}
            components={{ PreviousMonthButton: NavPrev, NextMonthButton: NavNext, DayButton }}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            onDayMouseEnter={(day) => { if (phase === 'picking') setHover(day) }}
            onDayMouseLeave={() => setHover(undefined)}
            onDayClick={handleDayClick}
            classNames={{
              root: 'text-sm',
              months: 'flex gap-6',
              month: 'flex flex-col',
              month_caption: 'flex justify-center items-center py-1 mb-2',
              caption_label: 'text-sm font-semibold text-slate-700',
              nav: 'absolute top-3 inset-x-3 flex items-center justify-between',
              weekdays: 'flex',
              weekday: 'w-9 text-center text-xs text-slate-400 pb-1',
              weeks: 'flex flex-col gap-0.5',
              week: 'flex',
              day: 'w-9 h-9',
              day_button: '',
              today: '',
              outside: '',
              hidden: 'invisible',
            }}
          />
        </div>
      )}
    </div>
  )
}
