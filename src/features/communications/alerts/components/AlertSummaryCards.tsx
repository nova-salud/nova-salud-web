type Props = {
  high: number
  medium: number
  low: number
}

export const AlertSummaryCards = ({ high, medium, low }: Props) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="rounded-2xl bg-red-50 p-4">
      <p className="text-xs text-red-500">Críticas</p>
      <p className="text-xl font-semibold text-red-600">{high}</p>
    </div>
    <div className="rounded-2xl bg-amber-50 p-4">
      <p className="text-xs text-amber-500">Pendientes</p>
      <p className="text-xl font-semibold text-amber-600">{medium}</p>
    </div>
    <div className="rounded-2xl bg-slate-100 p-4">
      <p className="text-xs text-slate-500">Informativas</p>
      <p className="text-xl font-semibold text-slate-600">{low}</p>
    </div>
  </div>
)
