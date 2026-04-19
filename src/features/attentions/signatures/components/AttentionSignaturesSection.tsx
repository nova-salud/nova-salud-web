import { useMemo, useState } from 'react'
import { useSignatures } from '../hooks/useSignatures'
import { Button } from '@/shared/components/ui/form'
import SignatureFormModal from './SignatureFormModal'
import { format } from 'date-fns'
import { useAuth } from '@/shared/hooks/useAuth'

type Props = {
  attentionId: number
}

const AttentionSignaturesSection = ({ attentionId }: Props) => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const {
    data: signatures,
    isLoading,
    error,
    refetch,
  } = useSignatures(attentionId)

  const canSign = useMemo(() => {
    if (!user) return false
    return !signatures.map(s => s.employeeId).includes(user.id)
  }, [signatures, user])


  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Firmas
          </h2>
          <p className="text-sm text-slate-500">
            Firmas registradas en la atención
          </p>
        </div>

        {canSign && (
          <Button className="w-auto" onClick={() => setIsOpen(true)}>
            Firmar
          </Button>
        )}
      </div>

      {error ? (
        <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="text-sm text-slate-500">
          Cargando firmas...
        </div>
      ) : signatures.length === 0 ? (
        <div className="text-sm text-slate-500">
          No hay firmas registradas
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {signatures.map((sig) => (
            <div
              key={sig.id}
              className="grid gap-4 py-4 md:grid-cols-[220px_1fr]"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">
                  {sig.fullName}
                </p>
                <p className="text-xs text-slate-500">
                  {sig.signedAt
                    ? format(new Date(sig.signedAt), 'dd/MM/yyyy HH:mm')
                    : '-'}
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                {sig.signatureData ? (
                  <img
                    src={sig.signatureData}
                    alt="Firma"
                    className="h-28 w-full object-contain"
                  />
                ) : (
                  <div className="flex h-28 items-center justify-center text-sm text-slate-500">
                    Sin imagen de firma
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <SignatureFormModal
        isOpen={isOpen}
        attentionId={attentionId}
        onClose={() => setIsOpen(false)}
        onSuccess={() => void refetch()}
      />
    </div>
  )
}

export default AttentionSignaturesSection