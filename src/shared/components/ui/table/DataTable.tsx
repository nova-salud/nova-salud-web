import type { ReactNode } from 'react'
import { DataTableSkeleton } from './DataTableSkeleton'
import { DataTablePagination } from './DataTablePagination'
import { cn } from '@/shared/utils'

export type Pagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  onPaginationChange: (page: number, pageSize: number) => void
}

type Variant = 'card' | 'plain'

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
  variant?: Variant
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
  variant = 'card',
}: Props<T>) => {
  const totalColumns = renderActions
    ? columns.length + 1
    : columns.length

  const isPlain = variant === 'plain'

  return (
    <div
      className={cn(
        'overflow-hidden',
        isPlain ? '' : 'rounded-xl border-2 border-slate-300 bg-white shadow-lg',
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className={isPlain ? 'border-b border-slate-200' : 'bg-[#00587c]'}>
            <tr className="text-left">
              {columns.map((column) => (
                <th
                  key={column}
                  className={cn(
                    'px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.18em]',
                    isPlain ? 'text-slate-900' : 'text-white',
                  )}
                >
                  {column}
                </th>
              ))}

              {renderActions && (
                <th
                  className={cn(
                    'w-16 px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.18em]',
                    isPlain ? 'text-slate-900' : 'text-white',
                  )}
                >
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {isLoading ? (
              <DataTableSkeleton
                columns={totalColumns}
                skeletonRows={skeletonRows}
              />
            ) : !data.length ? (
              <tr className="border-t border-slate-200">
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
                  className="text-[13px] text-slate-700 hover:bg-slate-50 transition-colors"
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
