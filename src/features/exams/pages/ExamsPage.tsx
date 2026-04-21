import { SortOrder } from '@/core/types/query-params.type'
import { Button, Input, Select } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useState, useMemo } from 'react'
import { useExams, useCreateExam, useUpdateExam } from '../hooks'
import type { ExamResponseDto, FindExamsDto, CreateExamDto, UpdateExamDto } from '../types'
import ExamTable from '../components/ExamTable'
import ExamFormSidebar from '../components/ExamFormModal'

type ExamSidebarMode = 'create' | 'edit' | null

const EXAM_STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

const ExamsPage = () => {
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState('')
  const [selectedExam, setSelectedExam] = useState<ExamResponseDto | null>(null)
  const [sidebarMode, setSidebarMode] = useState<ExamSidebarMode>(null)

  const query = useMemo<FindExamsDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    search: name.trim() || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [name, isActive])

  const { data, isLoading, error, refetch } = useExams(query)

  const {
    isLoading: isCreatingExam,
    createExam,
  } = useCreateExam()

  const {
    isLoading: isUpdatingExam,
    updateExam,
  } = useUpdateExam()

  const handleCloseSidebars = () => {
    setSidebarMode(null)
  }

  const handleOpenCreateSidebar = () => {
    setSelectedExam(null)
    setSidebarMode('create')
  }

  const handleOpenEditSidebar = (exam: ExamResponseDto) => {
    setSelectedExam(exam)
    setSidebarMode('edit')
  }

  const handleCreateExam = async (dto: CreateExamDto) => {
    const result = await createExam(dto)

    if (!result) {
      return
    }

    await refetch()
    handleCloseSidebars()
  }

  const handleUpdateExam = async (
    id: number,
    dto: UpdateExamDto,
  ) => {
    const result = await updateExam(id, dto)

    if (!result) {
      return
    }

    setSelectedExam(result)
    await refetch()
    handleCloseSidebars()
  }

  return (
    <>
      <PageContainer
        title="Exámenes"
        description="Administra el catálogo de exámenes del sistema."
        action={(
          <Button
            type="button"
            className="w-auto"
            onClick={handleOpenCreateSidebar}
          >
            Nuevo examen
          </Button>
        )}
      >
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
              <Input
                label="Nombre"
                placeholder="Buscar por nombre"
                value={name}
                onChange={setName}
              />

              <Select
                label="Estado"
                value={isActive}
                onChange={setIsActive}
                options={EXAM_STATUS_OPTIONS}
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <ExamTable
            items={data}
            isLoading={isLoading}
            onEdit={handleOpenEditSidebar}
          />
        </div>
      </PageContainer>

      <ExamFormSidebar
        isOpen={sidebarMode === 'create'}
        mode="create"
        isLoading={isCreatingExam}
        onClose={handleCloseSidebars}
        onCreate={handleCreateExam}
      />

      <ExamFormSidebar
        isOpen={sidebarMode === 'edit'}
        mode="edit"
        exam={selectedExam}
        isLoading={isUpdatingExam}
        onClose={handleCloseSidebars}
        onUpdate={handleUpdateExam}
      />
    </>
  )
}

export default ExamsPage