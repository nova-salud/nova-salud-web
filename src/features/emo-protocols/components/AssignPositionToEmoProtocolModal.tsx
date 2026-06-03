import { useMemo, useState } from 'react'
import { Button, SearchSelect } from '@/shared/components/ui/form'
import { useAssignOrUnassignEmoProtocolPosition } from '../hooks'
import type { EmoProtocolResponseDto } from '../types'
import { SortOrder } from '@/core/types/query-params.type'
import type { FindEmployeePositionsDto } from '@/features/employees/types/find-employee-positions.dto'
import { useEmployeePositions } from '@/features/employees/hooks/use-employee-positions'
import type { EmployeePositionResponseDto } from '@/features/employees/types/employee-position-response.dto'
import Modal from '@/shared/components/ui/modal/Modal'

type Props = {
  isOpen: boolean
  emoProtocol: EmoProtocolResponseDto
  onClose: () => void
  onSuccess: () => void
}

const AssignPositionToEmoProtocolModal = ({
  isOpen,
  emoProtocol,
  onClose,
  onSuccess,
}: Props) => {
  const [positionId, setPositionId] = useState('')

  const query = useMemo<FindEmployeePositionsDto>(() => ({
    page: 1,
    pageSize: 100,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    isActive: true,
  }), [])

  const { data: positions, isLoading: isLoadingPositions } = useEmployeePositions(query)

  const { isLoading, error, assignOrUnassignPosition } = useAssignOrUnassignEmoProtocolPosition({
    successMessage: 'Puesto asignado correctamente',
  })

  const assignedPositionIds = emoProtocol?.positions.map((p) => p.id) ?? []

  const options = positions
    .filter((position) => !assignedPositionIds.includes(position.id))
    .map((position: EmployeePositionResponseDto) => ({
      label: position.name,
      value: String(position.id),
    }))

  const handleSubmit = async () => {
    if (!emoProtocol || !positionId) return

    const result = await assignOrUnassignPosition(emoProtocol.id, Number(positionId))

    if (!result) return

    setPositionId('')
    onSuccess()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asignar puesto"
      description="Selecciona un puesto para asignarlo al protocolo."
      size="sm"
    >
      <div className="space-y-4">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <SearchSelect
          label="Puesto"
          value={positionId}
          onChange={setPositionId}
          options={[
            { label: 'Seleccione un puesto', value: '' },
            ...options,
          ]}
          disabled={isLoadingPositions}
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

export default AssignPositionToEmoProtocolModal
