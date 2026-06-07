import { useState } from 'react'
import { Button } from '@/shared/components/ui/form'
import type { AccidentResponseDto } from '../../accidents/types'
import { AccidentInvestigationSidebar } from './AccidentInvestigationSidebar'

type Props = {
  accident: AccidentResponseDto
  isReadOnly?: boolean
  onRefresh?: () => void
}

export const AccidentInvestigationSection = ({
  accident,
  isReadOnly = false,
  onRefresh,
}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const investigation = accident.investigation

  const handleSuccess = () => {
    setIsSidebarOpen(false)
    onRefresh?.()
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Registro de investigación
        </h2>

        {!isReadOnly && (
          <Button variant="outline" onClick={() => setIsSidebarOpen(true)}>
            {investigation ? 'Editar' : 'Registrar investigación'}
          </Button>
        )}
      </div>

      {!investigation ? (
        <p className="text-sm text-slate-500">
          No se ha registrado una investigación para este accidente.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Responsable
            </p>
            <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {investigation.responsible}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Constatación / Hallazgos
            </p>
            <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 whitespace-pre-wrap">
              {investigation.findings}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Causa origen
            </p>
            <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 whitespace-pre-wrap">
              {investigation.rootCause}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Medidas correctivas
            </p>
            <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 whitespace-pre-wrap">
              {investigation.correctiveMeasures}
            </div>
          </div>
        </div>
      )}

      <AccidentInvestigationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        accidentId={accident.id}
        initialData={investigation ?? undefined}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
