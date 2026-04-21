import { useEffect, useState } from 'react'
import { Button, Input, Textarea } from '@/shared/components/ui/form'
import { useEmitClinicalHistoryConclusion } from '../hooks'
import type {
  ClinicalHistoryEmoCycleResponseDto,
  ClinicalHistoryConclusion,
  EmitClinicalHistoryConclusionDto,
} from '../types'
import { EMO_CONCLUSION_CLASSNAME, EMO_CONCLUSION_LABEL } from '../types/clinical-history-emo-cycle-response.dto'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import SignatureInput from '@/shared/components/ui/signature/SignatureInput'
import { useAuth } from '@/shared/hooks/useAuth'

type Props = {
  isOpen: boolean
  cycle: ClinicalHistoryEmoCycleResponseDto | null
  onClose: () => void
  onSuccess: () => void
}

const CONCLUSION_OPTIONS: ClinicalHistoryConclusion[] = [
  'APTO',
  'APTO_CON_RESTRICCIONES',
  'NO_APTO',
]

const EmitClinicalHistoryConclusionSidebar = ({
  isOpen,
  cycle,
  onClose,
  onSuccess,
}: Props) => {
  const { user } = useAuth()

  const [conclusion, setConclusion] = useState<ClinicalHistoryConclusion>('APTO')
  const [restrictions, setRestrictions] = useState('')
  const [doctorFullName, setDoctorFullName] = useState('')
  const [doctorSignatureData, setDoctorSignatureData] = useState<string>('')

  const {
    isLoading,
    error,
    emitClinicalHistoryConclusion,
  } = useEmitClinicalHistoryConclusion()

  useEffect(() => {
    if (!isOpen || !cycle) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConclusion(cycle.conclusion ?? 'APTO')
    setRestrictions(cycle.restrictions ?? '')
    setDoctorFullName('')
    setDoctorSignatureData('')
  }, [isOpen, cycle])

  const requiresRestrictions = conclusion === 'APTO_CON_RESTRICCIONES'

  const handleSubmit = async () => {
    if (!cycle) return

    const dto: EmitClinicalHistoryConclusionDto = {
      conclusion,
      restrictions: restrictions.trim() || undefined,
      doctorEmployeeId: user!.id,
      doctorFullName: doctorFullName.trim(),
      doctorSignatureData: doctorSignatureData.trim(),
    }

    const result = await emitClinicalHistoryConclusion(cycle.id, dto)

    if (!result) return

    onSuccess()
    onClose()
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Emitir conclusión médica"
      description="Registra la conclusión del doctor para este ciclo EMO."
    >
      {!cycle ? null : (
        <div className="space-y-5">
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Ciclo EMO
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700">
              #{cycle.id}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Conclusión</p>

            <div className="flex flex-wrap gap-2">
              {CONCLUSION_OPTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setConclusion(item)}
                  className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${conclusion === item
                    ? EMO_CONCLUSION_CLASSNAME[item]
                    : 'border-slate-200 bg-white text-slate-600'
                    }`}
                >
                  {EMO_CONCLUSION_LABEL[item]}
                </button>
              ))}
            </div>
          </div>

          {conclusion === 'APTO_CON_RESTRICCIONES' && (
            <Textarea
              label="Restricciones"
              value={restrictions}
              onChange={setRestrictions}
              placeholder="Describe las restricciones médicas"
              rows={4}
            />
          )}

          <Input
            label="Nombre completo del doctor"
            value={doctorFullName}
            onChange={setDoctorFullName}
            placeholder="Ej. Jhon Doe"
          />

          <SignatureInput
            label="Firma del doctor"
            value={doctorSignatureData}
            onChange={setDoctorSignatureData}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              type="button"
              className="w-auto"
              onClick={() => void handleSubmit()}
              isLoading={isLoading}
              loadingText="Guardando..."
              disabled={
                !doctorFullName.trim() ||
                !doctorSignatureData.trim() ||
                (requiresRestrictions && !restrictions.trim())
              }
            >
              Emitir conclusión
            </Button>
          </div>
        </div>
      )}
    </Sidebar>
  )
}

export default EmitClinicalHistoryConclusionSidebar