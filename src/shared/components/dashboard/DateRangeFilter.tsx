import { useEffect, useState } from 'react'
import { cn } from '@/shared/utils'

export interface DateRange {
  startDate: string
  endDate: string
}

type Preset = '7d' | '30d' | 'custom'

interface Props {
  value: DateRange
  onChange: (range: DateRange) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function presetRange(preset: Exclude<Preset, 'custom'>): DateRange {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - (preset === '7d' ? 7 : 30))
  return { startDate: toISODate(start), endDate: toISODate(end) }
}

function detectPreset(value: DateRange): Preset {
  const today = toISODate(new Date())
  const d7 = toISODate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  const d30 = toISODate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
  if (value.endDate === today && value.startDate === d7) return '7d'
  if (value.endDate === today && value.startDate === d30) return '30d'
  return 'custom'
}

const PRESETS: { key: Preset; label: string }[] = [
  { key: '7d', label: 'Últimos 7 días' },
  { key: '30d', label: 'Últimos 30 días' },
  { key: 'custom', label: 'Rango personalizado' },
]

export function DateRangeFilter({ value, onChange }: Props) {
  const [preset, setPreset] = useState<Preset>(() => detectPreset(value))
  const [pending, setPending] = useState<DateRange>(value)

  // Sync when URL changes externally (back/forward navigation)
  useEffect(() => {
    const detected = detectPreset(value)
    setPreset(detected)
    if (detected === 'custom') setPending(value)
  }, [value.startDate, value.endDate])

  const handlePreset = (p: Preset) => {
    setPreset(p)
    if (p !== 'custom') {
      const range = presetRange(p)
      onChange(range)
    } else {
      setPending(value)
    }
  }

  const handleApply = () => {
    if (pending.startDate && pending.endDate) {
      onChange(pending)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => handlePreset(key)}
          className={cn(
            'px-3 py-1.5 text-sm rounded-xl border cursor-pointer transition-colors',
            preset === key
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
          )}
        >
          {label}
        </button>
      ))}

      {preset === 'custom' && (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={pending.startDate}
            max={pending.endDate}
            onChange={(e) => setPending(p => ({ ...p, startDate: e.target.value }))}
            className="px-3 py-1.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-slate-400"
          />
          <span className="text-sm text-slate-400">—</span>
          <input
            type="date"
            value={pending.endDate}
            min={pending.startDate}
            max={toISODate(new Date())}
            onChange={(e) => setPending(p => ({ ...p, endDate: e.target.value }))}
            className="px-3 py-1.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-slate-400"
          />
          <button
            onClick={handleApply}
            disabled={!pending.startDate || !pending.endDate}
            className="px-3 py-1.5 text-sm rounded-xl border cursor-pointer transition-colors bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  )
}
