import Modal from '@/shared/components/ui/modal/Modal'

type Props = {
  isOpen: boolean
  title?: string
  signatureData: string | null
  onClose: () => void
}

const SignaturePreviewModal = ({
  isOpen,
  title = 'Vista previa de firma',
  signatureData,
  onClose,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description="Visualiza la firma registrada."
      size="md"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        {signatureData ? (
          <img
            src={signatureData}
            alt="Firma"
            className="mx-auto max-h-72 w-full object-contain"
          />
        ) : (
          <div className="py-10 text-center text-sm text-slate-500">
            No hay firma registrada.
          </div>
        )}
      </div>
    </Modal>
  )
}

export default SignaturePreviewModal