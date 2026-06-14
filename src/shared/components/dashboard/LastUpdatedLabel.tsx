import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

type Props = { timestamp: number }

const formatElapsed = (ms: number): string => {
  if (ms < 60_000) return 'Hace unos segundos'
  const mins = Math.floor(ms / 60_000)
  if (mins === 1) return 'Hace 1 min'
  if (mins < 60) return `Hace ${mins} min`
  return `Hace ${Math.floor(mins / 60)} h`
}

export const LastUpdatedLabel = ({ timestamp }: Props) => {
  const [, setTick] = useState(0)

  useEffect(() => {
    if (!timestamp) return
    const id = setInterval(() => setTick(t => t + 1), 30_000)
    return () => clearInterval(id)
  }, [timestamp])

  if (!timestamp) return null

  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-400">
      <RefreshCw className="h-3 w-3" />
      {formatElapsed(Date.now() - timestamp)}
    </span>
  )
}
