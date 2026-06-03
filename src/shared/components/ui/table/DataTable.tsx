import type { ReactNode } from 'react'
import { DataTableSkeleton } from './DataTableSkeleton'
import { DataTablePagination } from './DataTablePagination'

export type Pagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  onPaginationChange: (page: number, pageSize: number) => void
}

type Props<T> = {
  data: T[]
  isLoading?: boolean
  columns: string[]
  renderRow: (item: T) => ReactNode
  renderActions?: (item: T) => ReactNode
  onRowDoubleClick?: (item: T) => void
  emptyMessage?: string
  skeletonRows?: number
  pagination?: Pagination
}

export const DataTable = <T,>({
  data,
  isLoading = false,
  columns,
  renderRow,
  renderActions,
  onRowDoubleClick,
  emptyMessage = 'No se encontraron registros.',
  skeletonRows = 5,
  pagination,
}: Props<T>) => {
  const totalColumns = renderActions
    ? columns.length + 1
    : columns.length

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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

              {renderActions && (
                <th className="w-16 px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <DataTableSkeleton
                columns={totalColumns}
                skeletonRows={skeletonRows}
              />
            ) : !data.length ? (
              <tr className="border-t border-slate-100">
                <td
                  colSpan={totalColumns}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={String((item as { id?: string | number }).id)}
                  onDoubleClick={() => onRowDoubleClick?.(item)}
                  className="border-t border-slate-100 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {renderRow(item)}

                  {renderActions && (
                    <td className="w-16 px-6 py-5 text-center">
                      {renderActions(item)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && !isLoading && data.length > 0 && (
        <DataTablePagination {...pagination} />
      )}
    </div>
  )
}