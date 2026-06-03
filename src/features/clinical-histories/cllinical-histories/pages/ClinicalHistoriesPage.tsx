import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { cn } from '@/shared/utils'
import { Button, Input, Select } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { DataTable } from '@/shared/components/ui/table/DataTable'
import { useEmployeeAreas } from '@/features/employees/hooks/use-employee-areas'
import { useClinicalHistories } from '../hooks/useClinicalHistories'

const COMPANY_OPTIONS = [
  { label: 'Todas', value: '' },
  { label: 'Empresa 1', value: 'empresa1' },
  { label: 'Empresa 2', value: 'empresa2' },
]

const STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

const EMO_CYCLE_STATUS_OPTIONS = [
  { label: 'Todos los ciclos', value: '' },
  { label: 'En progreso', value: 'IN_PROGRESS' },
  { label: 'Pendiente de conclusión', value: 'PENDING_DOCTOR_CONCLUSION' },
  { label: 'Pendiente de conformidad', value: 'PENDING_EMPLOYEE_CONFORMITY' },
  { label: 'Completado', value: 'COMPLETED' },
]

const CONCLUSION_OPTIONS = [
  { label: 'Todas las conclusiones', value: '' },
  { label: 'Apto', value: 'APTO' },
  { label: 'Apto con restricciones', value: 'APTO_CON_RESTRICCIONES' },
  { label: 'No apto', value: 'NO_APTO' },
]

const ClinicalHistoriesPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [areaId, setAreaId] = useState(searchParams.get('areaId') ?? '')
  const [company, setCompany] = useState(searchParams.get('company') ?? '')
  const [isActive, setIsActive] = useState(searchParams.get('isActive') ?? '')
  const [emoCycleStatus, setEmoCycleStatus] = useState(searchParams.get('emoCycleStatus') ?? '')
  const [conclusion, setConclusion] = useState(searchParams.get('conclusion') ?? '')

  const { data: areas } = useEmployeeAreas({ pageSize: 100, isActive: true })

  const areaOptions = useMemo(() => [
    { label: 'Todas', value: '' },
    ...areas.map(a => ({ label: a.name, value: String(a.id) })),
  ], [areas])

  const query = useMemo(() => ({
    page: 1,
    pageSize: 20,
    search: search.trim() || undefined,
    areaId: areaId ? Number(areaId) : undefined,
    company: company || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
    emoCycleStatus: emoCycleStatus || undefined,
    conclusion: conclusion || undefined,
  }), [search, areaId, company, isActive, emoCycleStatus, conclusion])

  const { data, isLoading, error } = useClinicalHistories(query)

  return (
    <PageContainer
      title="Historias Clínicas"
      description="Vista general de todas las historias clínicas registradas."
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Nombre o DNI"
              name="search"
              type="text"
              placeholder="Buscar trabajador"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              name='areaId'
              label="Área"
              value={areaId}
              onChange={setAreaId}
              options={areaOptions}
            />

            <Select
              name='company'
              label="Empresa"
              value={company}
              onChange={setCompany}
              options={COMPANY_OPTIONS}
            />

            <Select
              name='isActive'
              label="Estado historia"
              value={isActive}
              onChange={setIsActive}
              options={STATUS_OPTIONS}
            />

            <Select
              name='emoCycleStatus'
              label="Estado ciclo EMO"
              value={emoCycleStatus}
              onChange={setEmoCycleStatus}
              options={EMO_CYCLE_STATUS_OPTIONS}
            />

            <Select
              name='conclusion'
              label="Conclusión EMO"
              value={conclusion}
              onChange={setConclusion}
              options={CONCLUSION_OPTIONS}
            />
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <DataTable
          data={data}
          isLoading={isLoading}
          emptyMessage="No se encontraron historias clínicas."
          columns={['Trabajador', 'DNI', 'Empresa', 'Área', 'Estado', 'Acciones']}
          renderRow={(item) => (
            <>
              <td className="px-6 py-5 font-medium text-slate-900">
                {item.employeeFullName}
              </td>

              <td className="px-6 py-5 text-slate-500">
                {item.employeeDni}
              </td>

              <td className="px-6 py-5 text-slate-500">
                {item.employeeCompany}
              </td>

              <td className="px-6 py-5 text-slate-500">
                {item.areaName ?? '—'}
              </td>

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
                  onClick={() => navigate(`/clinical-histories/${item.employeeId}`)}
                  className="w-auto rounded-xl px-3 py-2 text-xs"
                >
                  Ver detalle
                </Button>
              </td>
            </>
          )}
        />
      </div>
    </PageContainer>
  )
}

export default ClinicalHistoriesPage
