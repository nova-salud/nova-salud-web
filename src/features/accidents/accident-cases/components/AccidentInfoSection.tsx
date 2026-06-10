import { format } from 'date-fns'
import { useState } from 'react'
import { Button } from '@/shared/components/ui/form'
import {
  ACCIDENT_STATUS_LABEL,
  ACCIDENT_TYPE_LABEL,
  ACCIDENT_SEVERITY_LABEL,
  ACCIDENT_FORM_LABEL,
  ACCIDENT_LABOR_RELATION_LABEL,
  type AccidentResponseDto,
} from '../../accidents/types'
import { AccidentClassificationSidebar } from './AccidentClassificationSidebar'

type Props = {
  accident: AccidentResponseDto
  isReadOnly?: boolean
  onRefresh?: () => void
}

export const AccidentInfoSection: React.FC<Props> = ({ accident, isReadOnly = false, onRefresh }) => {
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Información del accidente
        </h2>

        {!isReadOnly && (
          <Button variant="outline" onClick={() => setIsEditOpen(true)}>
            Editar clasificaciones
          </Button>
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Descripción
          </p>
          <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {accident.description || 'No registrado'}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Tipo
          </p>
          <div className="mt-1 text-sm text-slate-700">
            {ACCIDENT_TYPE_LABEL[accident.type]}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Estado
          </p>
          <div className="mt-1 text-sm text-slate-700">
            {ACCIDENT_STATUS_LABEL[accident.status]}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Fecha
          </p>
          <div className="mt-1 text-sm text-slate-700">
            {accident.occurredAt
              ? format(new Date(accident.occurredAt), 'dd/MM/yyyy HH:mm')
              : '-'}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Derivación
          </p>
          <div className="mt-1 text-sm text-slate-700">
            {accident.requiresExternalReferral ? 'Sí' : 'No'}
          </div>
        </div>

        {accident.requiresExternalReferral && (
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Centro de salud
            </p>
            <div className="mt-1 text-sm text-slate-700">
              {accident.healthcareCenter?.name || 'No registrado'}
            </div>
          </div>
        )}

        <div className="md:col-span-2 border-t border-slate-100 pt-4">
          <p className="text-sm font-medium text-slate-700 mb-3">Clasificaciones</p>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Gravedad
              </p>
              <div className="mt-1 text-sm text-slate-700">
                {accident.severityClassification
                  ? ACCIDENT_SEVERITY_LABEL[accident.severityClassification]
                  : 'No registrado'}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Forma
              </p>
              <div className="mt-1 text-sm text-slate-700">
                {accident.formClassification
                  ? ACCIDENT_FORM_LABEL[accident.formClassification]
                  : 'No registrado'}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Relación laboral
              </p>
              <div className="mt-1 text-sm text-slate-700">
                {accident.laborRelationClassification
                  ? ACCIDENT_LABOR_RELATION_LABEL[accident.laborRelationClassification]
                  : 'No registrado'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AccidentClassificationSidebar
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        accident={accident}
        onSuccess={() => {
          setIsEditOpen(false)
          onRefresh?.()
        }}
      />
    </div>
  )
}