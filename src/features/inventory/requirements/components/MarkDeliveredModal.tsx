import { useState } from 'react'
import { InputFile, Textarea } from '@/shared/components/ui/form'
import { useMarkRequirementDelivered } from '../hooks/useMarkRequirementDelivered'

type Props = {
  requirementId: number
  onSuccess: () => void
  onClose: () => void
}

export const MarkDeliveredModal = ({ requirementId, onSuccess, onClose }: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [deliveryNote, setDeliveryNote] = useState('')
  const { markDelivered, isLoading, error } = useMarkRequirementDelivered()

  const handleSubmit = async () => {
    if (!file) return

    const result = await markDelivered(requirementId, file, deliveryNote.trim() || undefined)

    if (result) {
      onSuccess()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-semibold text-slate-900">Marcar como entregado</h2>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <InputFile
          label="Documento de evidencia"
          allowedExtensions={['pdf']}
          value={file}
          onChange={setFile}
        />

        <Textarea
          label="Observación de entrega"
          placeholder="Ej: Compra realizada y entregada a farmacia."
          value={deliveryNote}
          onChange={setDeliveryNote}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={isLoading || !file}
            className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Guardando...' : 'Marcar como entregado'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MarkDeliveredModal
