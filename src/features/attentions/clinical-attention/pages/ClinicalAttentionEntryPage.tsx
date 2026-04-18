import { useState } from 'react'
import { useNavigate } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Input } from '@/shared/components/ui/form'
import { Search, FileText, PlusCircle, UserRound } from 'lucide-react'
import { useEmployeeClinicalLookup } from '../hooks/useEmployeeClinicalLookup'

const ClinicalAttentionEntryPage = () => {
  const navigate = useNavigate()
  const [dni, setDni] = useState('')

  const {
    employee,
    clinicalHistory,
    isLoading,
    error,
    search,
    clearResult,
  } = useEmployeeClinicalLookup()

  const handleSearch = async () => {
    const cleanDni = dni.trim()

    if (cleanDni.length !== 8) {
      return
    }

    await search(cleanDni)
  }

  const handleGoToCreateClinicalHistory = () => {
    if (!employee) {
      return
    }

    navigate(`/clinical-histories/new?employeeId=${employee.id}`)
  }

  const handleGoToClinicalHistory = () => {
    if (!employee) {
      return
    }

    navigate(`/clinical-histories/${employee.id}`)
  }

  return (
    <PageContainer
      title="Atención clínica"
      description="Busca al trabajador por DNI para abrir o crear su historia clínica."
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="w-full md:max-w-sm">
                <Input
                  label="DNI"
                  placeholder="Ingresa el DNI del trabajador"
                  value={dni}
                  onChange={(value) => {
                    setDni(value)
                    clearResult()
                  }}
                  maxLength={8}
                />
              </div>

              <Button
                type="submit"
                className="w-auto flex items-center justify-center h-11 px-5 text-base"
                onClick={() => void handleSearch()}
                isLoading={isLoading}
                loadingText="Buscando..."
                disabled={dni.trim().length !== 8}
              >
                <span className="inline-flex items-center gap-2">
                  <Search size={16} />
                  Buscar trabajador
                </span>
              </Button>
            </div>
          </form>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {employee ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <UserRound size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {employee.fullName}
                    </h2>
                    <p className="text-sm text-slate-500">
                      DNI: {employee.dni}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-x-6 gap-y-3 text-sm w-full mt-2">
                  <div>
                    <p className="text-xs text-slate-400">Empresa</p>
                    <p className="text-slate-700">{employee.company || '—'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Área</p>
                    <p className="text-slate-700">{employee.area?.name ?? '—'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Puesto</p>
                    <p className="text-slate-700">{employee.position ?? '—'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Estado</p>
                    <p className="text-slate-700">
                      {employee.isActive ? 'Activo' : 'Inactivo'}
                    </p>
                  </div>
                </div>
              </div>


              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Estado clínico
                  </p>
                  <p className="text-xs text-slate-500">
                    {clinicalHistory ? 'Historia clínica registrada' : 'Sin historia clínica'}
                  </p>
                </div>

                {clinicalHistory ? (
                  <Button
                    type="button"
                    className="w-auto"
                    onClick={handleGoToClinicalHistory}
                  >
                    <span className="inline-flex items-center gap-2">
                      <FileText size={16} />
                      Ver
                    </span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="w-auto"
                    onClick={handleGoToCreateClinicalHistory}
                  >
                    <span className="inline-flex items-center gap-2">
                      <PlusCircle size={16} />
                      Crear
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </PageContainer >
  )
}

export default ClinicalAttentionEntryPage