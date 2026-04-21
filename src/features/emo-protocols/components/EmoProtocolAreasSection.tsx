import type { EmployeeAreaResponseDto } from '@/features/employees/types/employee-area-response.dto'
import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import { useState } from 'react'

type Props = {
  areas: EmployeeAreaResponseDto[]
  onAssignArea: () => void
  onUnassignArea: (areaId: number) => void | Promise<void>
}

const EmoProtocolAreasSection = ({
  areas,
  onAssignArea,
  onUnassignArea,
}: Props) => {
  const [removingAreaId, setRemovingAreaId] = useState<number | null>(null)

  const handleRemove = async (areaId: number) => {
    try {
      setRemovingAreaId(areaId)
      await onUnassignArea(areaId)
    } finally {
      setRemovingAreaId(null)
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Áreas asignadas</h2>
          <p className="text-sm text-slate-500">
            Áreas que utilizan este protocolo EMO.
          </p>
        </div>

        <Button
          type="button"
          className="w-auto"
          onClick={onAssignArea}
        >
          Asignar área
        </Button>
      </div>

      {areas.length === 0 ? (
        <div className="text-sm text-slate-500">
          No hay áreas asignadas.
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {areas.map((area) => {
            const isRemoving = removingAreaId === area.id

            return (
              <div
                key={area.id}
                className={cn(
                  'inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition',
                  isRemoving && 'opacity-60',
                )}
              >
                <span>{area.name}</span>

                <button
                  type="button"
                  onClick={() => void handleRemove(area.id)}
                  disabled={isRemoving}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed"
                  aria-label={`Desasignar ${area.name}`}
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

export default EmoProtocolAreasSection