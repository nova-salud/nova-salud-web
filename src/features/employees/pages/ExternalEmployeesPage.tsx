import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Input } from '@/shared/components/ui/form'
import { SortOrder } from '@/core/types/query-params.type'
import { RoleEnum } from '@/core/enums/role.enum'
import ExternalEmployeeTable from '../components/ExternalEmployeeTable'
import { useUsers } from '@/features/users/hooks/useUsers'
import type { FindUsersDto } from '@/features/users/types/find-users.dto'
import type { UserResponseDto } from '@/features/users/types/user-response.dto'

const ExternalEmployeesPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  const query = useMemo<FindUsersDto>(() => ({
    page: 1,
    pageSize: 50,
    sortBy: 'username',
    sortOrder: SortOrder.ASC,
    role: RoleEnum.EMPLOYEE_EXT,
    username: username.trim() || undefined,
  }), [username])

  const { data, isLoading, error } = useUsers(query)

  const handleViewDetail = (user: UserResponseDto) => {
    void navigate(`/employees/${user.id}`)
  }

  return (
    <PageContainer
      title="Externos"
      description="Empleados externos sincronizados desde RRHH."
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <Input
            label="Buscar"
            placeholder="Buscar por usuario / nombre"
            value={username}
            onChange={setUsername}
          />
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <ExternalEmployeeTable
          items={data}
          isLoading={isLoading}
          onViewDetail={handleViewDetail}
        />
      </div>
    </PageContainer>
  )
}

export default ExternalEmployeesPage
