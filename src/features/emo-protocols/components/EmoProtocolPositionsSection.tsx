import { useState } from 'react'
import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import type { EmployeePositionResponseDto } from '@/features/employees/types/employee-position-response.dto'

type Props = {
  positions: EmployeePositionResponseDto[]
  onAssignPosition: () => void
  onUnassignPosition: (positionId: number) => void | Promise<void>
}

export const EmoProtocolPositionsSection = ({
  positions,
  onAssignPosition,
  onUnassignPosition,
}: Props) => {
  const [removingId, setRemovingId] = useState<number | null>(null)

  const handleRemove = async (positionId: number) => {
    try {
      setRemovingId(positionId)
      await onUnassignPosition(positionId)
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Puestos asignados</h2>
          <p className="text-sm text-slate-500">
            Puestos que utilizan este protocolo EMO.
          </p>
        </div>

        <Button
          type="button"
          className="w-auto"
          onClick={onAssignPosition}
        >
          Asignar puesto
        </Button>
      </div>

      {positions.length === 0 ? (
        <div className="text-sm text-slate-500">
          No hay puestos asignados.
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {positions.map((position) => {
            const isRemoving = removingId === position.id

            return (
              <div
                key={position.id}
                className={cn(
                  'inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition',
                  isRemoving && 'opacity-60',
                )}
              >
                <span>{position.name}</span>

                <button
                  type="button"
                  onClick={() => void handleRemove(position.id)}
                  disabled={isRemoving}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed"
                  aria-label={`Desasignar ${position.name}`}
                >
                  {isRemoving ? (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500" />
                  ) : (
                    <span className="text-sm leading-none">×</span>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}