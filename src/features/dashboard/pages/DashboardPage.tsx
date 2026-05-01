import { RoleEnum } from '@/core/enums/role.enum'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useAuth } from '@/shared/hooks/useAuth'
import { SSTDashboardPage } from './SSTDashboardPage'
import { MedicalDashboardPage } from './MedicalDashboardPage'
import { AdminDashboardPage } from './AdminDashboardPage'
import { useState } from 'react'
import { cn } from '@/shared/utils'
import { ManagementDashboardPage } from './ManagmentDashboardPage'

type DashboardType = 'MEDICAL' | 'SST' | 'MANAGEMENT' | 'EMPLOYEE' | 'ADMIN'

function getDashboardType(role: RoleEnum): DashboardType {
  if (role === RoleEnum.ADMIN) return 'ADMIN'

  if (
    role === RoleEnum.OCCUPATIONAL_DOCTOR ||
    role === RoleEnum.NURSE
  ) return 'MEDICAL'

  if (
    role === RoleEnum.SST ||
    role === RoleEnum.SUPERVISOR
  ) return 'SST'

  if (
    role === RoleEnum.HR ||
    role === RoleEnum.MANAGEMENT
  ) return 'MANAGEMENT'

  return 'EMPLOYEE'
}

const dashboardMap: Record<DashboardType, React.ComponentType> = {
  ADMIN: AdminDashboardPage,
  MEDICAL: MedicalDashboardPage,
  SST: SSTDashboardPage,
  MANAGEMENT: ManagementDashboardPage,
  EMPLOYEE: () => <div>Employee</div>,
}

const DashboardPage = () => {
  const { user, isAdmin } = useAuth()
  const [override, setOverride] = useState<DashboardType | null>(null)

  const type = override ?? getDashboardType(user?.role ?? RoleEnum.EMPLOYEE)
  const Dashboard = dashboardMap[type]

  return (
    <PageContainer>
      {isAdmin && (
        <div className="flex gap-2 mb-4">
          {(['ADMIN', 'SST', 'MEDICAL', 'MANAGEMENT'] as DashboardType[]).map((t) => (
            <button
              key={t}
              onClick={() => setOverride(t)}
              className={cn(
                'px-3 py-2 text-sm rounded-xl border cursor-pointer',
                type === t
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <Dashboard />
    </PageContainer>
  )
}

export default DashboardPage