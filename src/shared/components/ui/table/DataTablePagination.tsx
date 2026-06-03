import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Select } from '../form'

type Props = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  onPaginationChange: (page: number, pageSize: number) => void
  pageSizeOptions?: number[]
}

export const DataTablePagination = ({
  page,
  pageSize,
  total,
  totalPages,
  onPaginationChange,
  pageSizeOptions = [10, 20, 50, 100],
}: Props) => {
  const startItem =
    total === 0
      ? 0
      : (page - 1) * pageSize + 1

  const endItem = Math.min(page * pageSize, total)

  return (
    <div className="border-t border-slate-200 px-4 py-3 md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xs text-slate-500 md:text-sm">
          Mostrando{' '}
          <span className="font-medium text-slate-700">
            {startItem}
          </span>
          -
          <span className="font-medium text-slate-700">
            {endItem}
          </span>{' '}
          de{' '}
          <span className="font-medium text-slate-700">
            {total}
          </span>{' '}
          registros
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="whitespace-nowrap text-xs text-slate-500 md:text-sm">
              Filas:
            </span>

            <div className="w-20">
              <Select
                name="pageSize"
                value={pageSize}
                className="h-8"
                options={pageSizeOptions.map((size) => ({
                  label: String(size),
                  value: size,
                }))}
                onChange={(value) =>
                  onPaginationChange(1, Number(value))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                onPaginationChange(page - 1, pageSize)
              }
              disabled={page <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="min-w-16 text-center text-sm font-medium text-slate-600">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() =>
                onPaginationChange(page + 1, pageSize)
              }
              disabled={page >= totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}