import { Button, Input } from '@/shared/components/ui/form'
import Modal from '@/shared/components/ui/modal/Modal'
import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { useCreateSignature } from '../hooks/useCreateSignature'
import { useAuth } from '@/shared/hooks/useAuth'
import { toastService } from '@/core/services/toast.service'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  attentionId: number
}

const SignatureFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  attentionId,
}: Props) => {
  const { user } = useAuth()
  const [fullName, setFullName] = useState('')
  const sigRef = useRef<SignatureCanvas | null>(null)

  const {
    createSignature,
    isLoading,
    error,
  } = useCreateSignature()

  const handleClear = () => {
    sigRef.current?.clear()
  }

  const handleSubmit = async () => {
    if(!user) return

    if (!sigRef.current || sigRef.current.isEmpty()) {
      toastService.error('Debe ingresar una firma')
      return
    }

    if (!fullName.trim()) {
      toastService.error('Debe ingresar el nombre')
      return
    }

    const signatureData = sigRef.current.toDataURL('image/png')

    const result = await createSignature({
      employeeId: user.id,
      attentionId,
      fullName: fullName.trim(),
      signatureData,
    })

    if (!result) return

    setFullName('')
    sigRef.current.clear()
    onSuccess()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Firma"
      description="Registra la firma del paciente"
    >
      <div className="space-y-4">
        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Nombre completo"
          placeholder="Ingrese el nombre completo"
          value={fullName}
          onChange={setFullName}
        />

        <div className="rounded-xl border border-slate-200 bg-white p-2">
          <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{
              className: 'w-full h-40 rounded-lg',
            }}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleClear}>
            Limpiar
          </Button>

          <Button
            onClick={() => void handleSubmit()}
            isLoading={isLoading}
            loadingText="Guardando..."
          >
            Guardar firma
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default SignatureFormModal