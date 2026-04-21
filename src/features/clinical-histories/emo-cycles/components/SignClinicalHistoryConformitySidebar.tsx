import { useEffect, useState } from 'react'
import { Button, Input } from '@/shared/components/ui/form'
import SignatureInput from '@/shared/components/ui/signature/SignatureInput'
import { useSignClinicalHistoryConformity } from '../hooks'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { useParams } from 'react-router'

type Props = {
  isOpen: boolean
  cycle: ClinicalHistoryEmoCycleResponseDto | null
  onClose: () => void
  onSuccess: () => void
}

const SignClinicalHistoryConformitySidebar = ({
  isOpen,
  cycle,
  onClose,
  onSuccess,
}: Props) => {
  const { employeeId } = useParams()

  const [fullName, setFullName] = useState('')
  const [signatureData, setSignatureData] = useState('')

  const {
    isLoading,
    error,
    signClinicalHistoryConformity,
  } = useSignClinicalHistoryConformity()

  useEffect(() => {
    if (!isOpen) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFullName('')
    setSignatureData('')
  }, [isOpen])

  const handleSubmit = async () => {
    if (!cycle) return

    const result = await signClinicalHistoryConformity(cycle.id, {
      employeeId: Number(employeeId),
      fullName: fullName.trim(),
      signatureData: signatureData.trim(),
    })

    if (!result) return

    onSuccess()
    onClose()
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Firmar conformidad"
      description="Registra la firma de conformidad del trabajador para este ciclo EMO."
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

          <Input
            label="Nombre completo"
            value={fullName}
            onChange={setFullName}
            placeholder="Ingrese el nombre completo"
          />

          <SignatureInput
            label="Firma del trabajador"
            value={signatureData}
            onChange={setSignatureData}
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
                !fullName.trim() ||
                !signatureData.trim()
              }
            >
              Firmar conformidad
            </Button>
          </div>
        </div>
      )}
    </Sidebar>
  )
}

export default SignClinicalHistoryConformitySidebar