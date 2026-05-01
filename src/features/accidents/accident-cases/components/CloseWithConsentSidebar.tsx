import { Button, Input } from '@/shared/components/ui/form'
import { useState } from 'react'
import { useCloseAccidentCaseWithConsent } from '../hooks/useCloseAccidentCaseWithConsent'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import SignatureInput from '@/shared/components/ui/signature/SignatureInput'

type Props = {
  isOpen: boolean
  onClose: () => void
  accidentCaseId: number
  onSuccess: () => void
}

export const CloseWithConsentSidebar = ({
  isOpen,
  onClose,
  accidentCaseId,
  onSuccess,
}: Props) => {
  const [fullName, setFullName] = useState('')
  const [signatureData, setSignatureData] = useState<string | undefined>()

  const {
    closeWithConsent,
    isLoading,
    error,
  } = useCloseAccidentCaseWithConsent()

  const handleSubmit = async () => {
    if (!fullName.trim()) return
    if (!signatureData) return

    await closeWithConsent(accidentCaseId, {
      fullName: fullName.trim(),
      signatureData,
    })

    onSuccess()
    onClose()
    setFullName('')
    setSignatureData(undefined)
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Alta con consentimiento"
      description="El trabajador debe firmar para cerrar el caso."
      size="md"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>

          <Button onClick={handleSubmit} isLoading={isLoading}>
            Firmar y cerrar
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Nombre completo"
          value={fullName}
          onChange={setFullName}
        />

        <SignatureInput
          value={signatureData}
          onChange={setSignatureData}
          height={180}
        />
      </div>
    </Sidebar>
  )
}