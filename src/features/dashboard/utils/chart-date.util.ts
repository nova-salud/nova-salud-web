type LightweightChartTime = string | { year: number; month: number; day: number }

const pad = (n: number) => String(n).padStart(2, '0')

export const formatChartDate = (time: LightweightChartTime): string => {
  if (typeof time === 'string') {
    const [year, month, day] = time.split('-').map(Number)
    return `${pad(day)}-${pad(month)}-${year}`
  }
  return `${pad(time.day)}-${pad(time.month)}-${time.year}`
}
