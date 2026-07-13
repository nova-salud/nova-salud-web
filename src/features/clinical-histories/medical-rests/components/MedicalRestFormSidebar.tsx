import { Sidebar } from '@/shared/components'
import { MedicalRestForm } from './MedicalRestForm'

type Props = {
  isOpen: boolean
  clinicalHistoryId: number
  accidentId?: number
  attentionId?: number
  onClose: () => void
  onSuccess: () => void
}

const MedicalRestFormSidebar = ({ isOpen, clinicalHistoryId, accidentId, attentionId, onClose, onSuccess }: Props) => {
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title="Registrar descanso médico"
      description="Ingresa las fechas del descanso médico y adjunta el documento PDF."
    >
      <MedicalRestForm
        key={isOpen ? 'open' : 'closed'}
        clinicalHistoryId={clinicalHistoryId}
        accidentId={accidentId}
        attentionId={attentionId}
        onCancel={onClose}
        onSuccess={() => {
          onSuccess()
          onClose()
        }}
      />
    </Sidebar>
  )
}

export default MedicalRestFormSidebar
