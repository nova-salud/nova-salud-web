import { RoleEnum } from '@/core/enums/role.enum'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useAuth } from '@/shared/hooks/useAuth'
import { SSTDashboardPage } from './SSTDashboardPage'

type DashboardType = 'MEDICAL' | 'SST' | 'MANAGEMENT' | 'EMPLOYEE'

function getDashboardType(role: RoleEnum): DashboardType {
  if (
    role === RoleEnum.OCCUPATIONAL_DOCTOR ||
    role === RoleEnum.NURSE
  ) return 'MEDICAL'

  if (
    role === RoleEnum.SST ||
    role === RoleEnum.SUPERVISOR || 
    role === RoleEnum.ADMIN
  ) return 'SST'

  if (
    role === RoleEnum.HR ||
    role === RoleEnum.MANAGEMENT
  ) return 'MANAGEMENT'

  return 'EMPLOYEE'
}

const dashboardMap: Record<DashboardType, React.ComponentType> = {
  MEDICAL: () => <div>Médico</div>,
  SST: SSTDashboardPage,
  MANAGEMENT: () => <div>Management</div>,
  EMPLOYEE: () => <div>Employee</div>,
}

const DashboardPage = () => {
  const { user } = useAuth()

  const type = getDashboardType(user?.role ?? RoleEnum.EMPLOYEE)
  const Dashboard = dashboardMap[type]

  return (
    <PageContainer>
      <Dashboard />
    </PageContainer>
  )
}

export default DashboardPage