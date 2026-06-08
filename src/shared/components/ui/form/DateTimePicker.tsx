import { useEffect, useState } from 'react'
import { Label } from './Label'
import { Input } from './Input'
import { Select } from './Select'

// 12h slots: 12:00, 12:30, 01:00, 01:30 … 11:30
const TIME_OPTIONS_24H = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0')
  const m = i % 2 === 0 ? '00' : '30'
  return { label: `${h}:${m}`, value: `${h}:${m}` }
})

const TIME_OPTIONS_12H = Array.from({ length: 24 }, (_, i) => {
  const h12 = i === 0 ? 12 : Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  const value = `${String(h12).padStart(2, '0')}:${m}`
  return { label: value, value }
})

const PERIOD_OPTIONS = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
]

const to24h = (time12: string, period: 'AM' | 'PM'): string => {
  const [hStr, m] = time12.split(':')
  let h = Number(hStr)
  if (period === 'AM') h = h === 12 ? 0 : h
  else h = h === 12 ? 12 : h + 12
  return `${String(h).padStart(2, '0')}:${m}`
}

const to12hParts = (time24: string): { time: string; period: 'AM' | 'PM' } => {
  const [hStr, m] = time24.split(':')
  let h = Number(hStr)
  const period: 'AM' | 'PM' = h < 12 ? 'AM' : 'PM'
  h = h % 12 === 0 ? 12 : h % 12
  return { time: `${String(h).padStart(2, '0')}:${m}`, period }
}

type Props = {
  label?: string
  value: string
  onChange: (value: string) => void
  minDate?: string
  disabled?: boolean
  amPm?: boolean
}

const splitValue = (iso: string): { date: string; time: string } => {
  if (!iso) return { date: '', time: '' }
  const [date, timePart] = iso.split('T')
  const time = timePart ? timePart.slice(0, 5) : ''
  return { date: date ?? '', time }
}

export const DateTimePicker = ({ label, value, onChange, minDate, disabled = false, amPm = false }: Props) => {
  const init = splitValue(value)

  const initTime12 = amPm && init.time ? to12hParts(init.time).time : init.time
  const initPeriod = amPm && init.time ? to12hParts(init.time).period : 'AM'

  const [date, setDate] = useState(init.date)
  const [time, setTime] = useState(initTime12)
  const [period, setPeriod] = useState<'AM' | 'PM'>(initPeriod)

  useEffect(() => {
    const parsed = splitValue(value)
    if (amPm && parsed.time) {
      const { time: t12, period: p } = to12hParts(parsed.time)
      setDate(parsed.date)
      setTime(t12)
      setPeriod(p)
    } else {
      setDate(parsed.date)
      setTime(parsed.time)
    }
  }, [value, amPm])

  const emit = (d: string, t: string, p: 'AM' | 'PM') => {
    if (!d || !t) { onChange(''); return }
    const time24 = amPm ? to24h(t, p) : t
    onChange(`${d}T${time24}`)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDate(newDate)
    const resolvedTime = time || (amPm ? '12:00' : '00:00')
    if (!time) setTime(resolvedTime)
    emit(newDate, resolvedTime, period)
  }

  const handleTimeChange = (newTime: string) => {
    setTime(newTime)
    emit(date, newTime, period)
  }

  const handlePeriodChange = (newPeriod: string) => {
    const p = newPeriod as 'AM' | 'PM'
    setPeriod(p)
    emit(date, time, p)
  }

  const timeOptions = amPm ? TIME_OPTIONS_12H : TIME_OPTIONS_24H

  return (
    <div className="flex flex-col gap-1.5">
      {label ? <Label>{label}</Label> : null}

      <div className={`grid gap-3 ${amPm ? 'md:grid-cols-3' : 'grid-cols-2'}`}>
        <Input
          label=""
          name="__datetimepicker_date__"
          type="date"
          value={date}
          min={minDate}
          disabled={disabled}
          onChange={handleDateChange}
        />

        <div className="grid grid-cols-2 gap-3 md:contents">
          <Select
            name="__datetimepicker_time__"
            label=" "
            value={time}
            options={timeOptions}
            placeholder="Hora"
            showDefaultOption
            disabled={disabled || !date}
            onChange={handleTimeChange}
          />

          {amPm ? (
            <Select
              name="__datetimepicker_period__"
              label=" "
              value={period}
              options={PERIOD_OPTIONS}
              disabled={disabled || !date}
              onChange={handlePeriodChange}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default DateTimePicker
