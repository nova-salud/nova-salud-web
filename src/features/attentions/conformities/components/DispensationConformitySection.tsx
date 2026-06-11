import { useState, useRef } from 'react'
import { format } from 'date-fns'
import { Button, Input, Modal, SignatureInput } from '@/shared/components'
import { useAttentionConformity, useCreateAttentionConformity } from '../hooks'

type Props = {
  attentionId: number
}

const DispensationConformitySection = ({ attentionId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [signature, setSignature] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const { data: conformity, isLoading, refetch } = useAttentionConformity(attentionId)
  const { createConformity, isLoading: isCreating, error: createError } = useCreateAttentionConformity()

  const handleOpen = () => {
    setSignature('')
    setIsOpen(true)
  }

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const fullName = (data.get('fullName') as string).trim()
    if (!fullName) return

    const result = await createConformity({
      attentionId,
      fullName,
      signatureData: signature || undefined,
    })

    if (!result) return
    setIsOpen(false)
    await refetch()
  }

  if (isLoading) {
    return (
      <div className="mt-4 animate-pulse">
        <div className="h-12 w-full rounded-xl bg-slate-200" />
      </div>
    )
  }

  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-700">Conformidad del trabajador</p>
          <p className="text-xs text-slate-400">Firma de conformidad por los medicamentos recibidos.</p>
        </div>

        {conformity ? (
          <span className="rounded-xl bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Conformidad registrada
          </span>
        ) : (
          <Button type="button" className="w-auto text-xs" onClick={handleOpen}>
            Firmar conformidad
          </Button>
        )}
      </div>

      {conformity && (
        <div className="mt-3 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Nombre</p>
            <p className="text-sm text-slate-700">{conformity.fullName}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fecha</p>
            <p className="text-sm text-slate-700">
              {format(new Date(conformity.signedAt), 'dd/MM/yyyy HH:mm')}
            </p>
          </div>
          {conformity.signatureData && (
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Firma</p>
              <img
                src={conformity.signatureData}
                alt="Firma"
                className="mt-1 h-12 rounded border border-slate-200 bg-white"
              />
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Firmar conformidad"
        description="El trabajador firma para confirmar que recibió los medicamentos dispensados."
      >
        {createError && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {createError}
          </div>
        )}

        <form
          ref={formRef}
          className="space-y-5"
          onSubmit={(e) => void handleSubmit(e)}
        >
          <Input
            type="text"
            label="Nombre completo del trabajador"
            name="fullName"
            placeholder="Ingresa el nombre completo"
            required
          />

          <SignatureInput
            label="Firma del trabajador"
            value={signature}
            onChange={setSignature}
            height={150}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" className="w-auto" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-auto"
              isLoading={isCreating}
              loadingText="Guardando..."
            >
              Confirmar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default DispensationConformitySection
