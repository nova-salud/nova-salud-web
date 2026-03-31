import type { ReactNode } from 'react'

type Props<T> = {
  data: T[]
  isLoading?: boolean
  columns: string[]
  renderRow: (item: T) => ReactNode
  emptyMessage?: string
}

const DataTable = <T,>({
  data,
  isLoading = false,
  columns,
  renderRow,
  emptyMessage = 'No se encontraron registros.',
}: Props<T>) => {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Cargando...</p>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-50">
            <tr className="text-left">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{data.map(renderRow)}</tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable