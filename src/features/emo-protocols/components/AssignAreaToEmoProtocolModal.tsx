import { useState } from 'react'
import { useAssignOrUnassignEmoProtocolArea, useSearchAreas } from '../hooks'
import type { EmoProtocolResponseDto } from '../types'
import { Button, Modal, SearchSelect } from '@/shared/components'

type Props = {
  isOpen: boolean
  emoProtocol: EmoProtocolResponseDto
  onClose: () => void
  onSuccess: () => void
}

export const AssignAreaToEmoProtocolModal = ({
  isOpen,
  emoProtocol,
  onClose,
  onSuccess,
}: Props) => {
  const [areaId, setAreaId] = useState('')

  const { areas, isLoading: isLoadingAreas } = useSearchAreas()

  const {
    isLoading,
    error,
    assignOrUnassignArea,
  } = useAssignOrUnassignEmoProtocolArea({ successMessage: 'Área asignada correctamente' })

  const assignedAreaIds = emoProtocol?.areas.map(a => a.id) ?? []

  const options = areas
    .filter((area) => !assignedAreaIds.includes(area.id))
    .map((area) => ({
      label: area.name,
      value: String(area.id),
    }))

  const handleSubmit = async () => {
    if (!emoProtocol || !areaId) {
      return
    }

    const result = await assignOrUnassignArea(emoProtocol.id, Number(areaId))

    if (!result) {
      return
    }

    setAreaId('')
    onSuccess()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asignar o desasignar área"
      description="Selecciona un área para asignarla o quitarla del protocolo."
      size="sm"
    >
      <div className="space-y-4">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <SearchSelect
          label="Área"
          value={areaId}
          onChange={setAreaId}
          options={[
            { label: 'Seleccione un área', value: '' },
            ...options,
          ]}
          disabled={isLoadingAreas}
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
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  )
}