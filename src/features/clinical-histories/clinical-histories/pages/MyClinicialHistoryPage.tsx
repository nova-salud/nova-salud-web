import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/shared/components'
import { useEmployeeDashboard } from '@/features/dashboard/hooks'

const MyClinicialHistoryPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useEmployeeDashboard()

  useEffect(() => {
    if (data?.employee?.id) {
      navigate(`/clinical-histories/${data.employee.id}`, { replace: true })
    }
  }, [data, navigate])

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
        No se pudo cargar la información del empleado.
      </div>
    )
  }

  if (!data.clinicalHistoryId) {
    return (
      <PageContainer title="Mi Historia Clínica">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          Aún no tienes historia clínica registrada. Contacta con el área médica.
        </div>
      </PageContainer>
    )
  }

  return null
}

export default MyClinicialHistoryPage
