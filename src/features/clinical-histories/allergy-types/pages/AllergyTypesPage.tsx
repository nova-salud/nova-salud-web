import { useState, useMemo } from 'react'
import { SortOrder } from '@/core/types/query-params.type'
import { Button, Input, Select } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { cn } from '@/shared/utils'
import { DataTable } from '@/shared/components/ui/table/DataTable'
import { useAllergyTypes, useCreateAllergyType, useUpdateAllergyType } from '../hooks'
import type { AllergyTypeResponseDto, CreateAllergyTypeDto, FindAllergyTypesDto, UpdateAllergyTypeDto } from '../types'
import AllergyTypeFormSidebar from '../components/AllergyTypeFormSidebar'

type SidebarMode = 'create' | 'edit' | null

const STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

const AllergyTypesPage = () => {
  const [search, setSearch] = useState('')
  const [isActive, setIsActive] = useState('')
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(null)
  const [selected, setSelected] = useState<AllergyTypeResponseDto | null>(null)

  const query = useMemo<FindAllergyTypesDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    search: search.trim() || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [search, isActive])

  const { data, isLoading, error, refetch } = useAllergyTypes(query)
  const { isLoading: isCreating, createAllergyType } = useCreateAllergyType()
  const { isLoading: isUpdating, updateAllergyType } = useUpdateAllergyType()

  const handleCreate = async (dto: CreateAllergyTypeDto) => {
    const result = await createAllergyType(dto)
    if (!result) return
    await refetch()
    setSidebarMode(null)
  }

  const handleUpdate = async (id: number, dto: UpdateAllergyTypeDto) => {
    const result = await updateAllergyType(id, dto)
    if (!result) return
    await refetch()
    setSidebarMode(null)
  }

  return (
    <>
      <PageContainer
        title="Tipos de alergia"
        description="Administra los tipos de alergia disponibles para el historial clínico."
        action={(
          <Button type="button" className="w-auto" onClick={() => { setSelected(null); setSidebarMode('create') }}>
            Nuevo tipo
          </Button>
        )}
      >
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Nombre"
                name="search"
                type="text"
                placeholder="Buscar por nombre"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                name="status"
                label="Estado"
                value={isActive}
                onChange={setIsActive}
                options={STATUS_OPTIONS}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <DataTable
            data={data}
            isLoading={isLoading}
            emptyMessage="No se encontraron tipos de alergia."
            columns={['Nombre', 'Estado', 'Acciones']}
            renderRow={(item) => (
              <>
                <td className="px-6 py-5 font-medium text-slate-900">{item.name}</td>
                <td className="px-6 py-5">
                  <span className={cn(
                    'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                    item.isActive
                      ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-slate-50 text-slate-500',
                  )}>
                    {item.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-auto rounded-xl px-3 py-2 text-xs"
                    onClick={() => { setSelected(item); setSidebarMode('edit') }}
                  >
                    Editar
                  </Button>
                </td>
              </>
            )}
          />
        </div>
      </PageContainer>

      <AllergyTypeFormSidebar
        isOpen={sidebarMode === 'create'}
        mode="create"
        isLoading={isCreating}
        onClose={() => setSidebarMode(null)}
        onCreate={handleCreate}
      />

      <AllergyTypeFormSidebar
        isOpen={sidebarMode === 'edit'}
        mode="edit"
        allergyType={selected}
        isLoading={isUpdating}
        onClose={() => setSidebarMode(null)}
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default AllergyTypesPage
