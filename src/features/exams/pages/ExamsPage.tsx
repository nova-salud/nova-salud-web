import { useState } from 'react'
import { Button, PageContainer } from '@/shared/components'
import { useDisclosure } from '@/shared/hooks'
import { ExamFilter } from '../components/ExamFilter'
import ExamTable from '../components/ExamTable'
import ExamFormSidebar from '../components/ExamFormModal'
import { useExams, useCreateExam, useUpdateExam } from '../hooks'
import type { ExamResponseDto, CreateExamDto, UpdateExamDto } from '../types'

type OverlayKey = 'create' | 'edit'

const ExamsPage = () => {
  const { data, isLoading, error, refetch, pagination, onChangeFilters } = useExams()
  const overlays = useDisclosure<OverlayKey>()
  const [selected, setSelected] = useState<ExamResponseDto | null>(null)

  const { isLoading: isCreating, createExam } = useCreateExam()
  const { isLoading: isUpdating, updateExam } = useUpdateExam()

  const handleCreate = async (dto: CreateExamDto) => {
    const result = await createExam(dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  const handleUpdate = async (id: number, dto: UpdateExamDto) => {
    const result = await updateExam(id, dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  const handleOpenEdit = (exam: ExamResponseDto) => {
    setSelected(exam)
    overlays.open('edit')
  }

  return (
    <>
      <PageContainer
        title="Exámenes"
        description="Administra el catálogo de exámenes del sistema."
        action={(
          <Button type="button" className="w-auto" onClick={() => overlays.open('create')}>
            Nuevo examen
          </Button>
        )}
      >
        <div className="space-y-5">
          <ExamFilter onChangeFilters={onChangeFilters} />

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <ExamTable
            items={data}
            isLoading={isLoading}
            pagination={pagination}
            onEdit={handleOpenEdit}
          />
        </div>
      </PageContainer>

      <ExamFormSidebar
        isOpen={overlays.isOpen('create')}
        mode="create"
        isLoading={isCreating}
        onClose={overlays.close}
        onCreate={handleCreate}
      />

      <ExamFormSidebar
        isOpen={overlays.isOpen('edit')}
        mode="edit"
        exam={selected}
        isLoading={isUpdating}
        onClose={overlays.close}
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default ExamsPage
