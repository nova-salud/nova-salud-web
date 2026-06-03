import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Input, Select } from '@/shared/components/ui/form'
import { SortOrder } from '@/core/types/query-params.type'
import UserSimpleTable from '../components/UserSimpleTable'
import UserFormSidebar from '../components/UserFormSidebar'
import { useCreateUser, useUsers } from '../hooks'
import {
  type UserResponseDto,
  type FindUsersDto,
  type CreateUserDto,
  USER_ROLE_OPTIONS,
} from '../types'

const UsersPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const query = useMemo<FindUsersDto>(() => ({
    page: 1,
    pageSize: 30,
    sortBy: 'username',
    sortOrder: SortOrder.ASC,
    username: username.trim() || undefined,
    role: role as UserResponseDto['role'] || undefined,
  }), [username, role])

  const { data, isLoading, error, refetch } = useUsers(query)
  const { create, isLoading: isCreatingUser } = useCreateUser()

  const handleViewDetail = (user: UserResponseDto) => {
    void navigate(`/employees/${user.id}`)
  }

  const handleCreateUser = async (dto: CreateUserDto) => {
    const result = await create(dto)
    if (!result) return
    await refetch()
    setIsCreateOpen(false)
  }

  return (
    <>
      <PageContainer
        title="Usuarios"
        description="Administra los usuarios y roles del sistema."
        action={
          <Button
            type="button"
            className="w-auto"
            onClick={() => setIsCreateOpen(true)}
          >
            Nuevo usuario
          </Button>
        }
      >
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Usuario"
                placeholder="Buscar por usuario"
                value={username}
                onChange={setUsername}
              />

              <Select
                name="rol"
                label="Rol"
                value={role}
                onChange={setRole}
                options={[
                  { label: 'Todos', value: '' },
                  ...USER_ROLE_OPTIONS,
                ]}
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <UserSimpleTable
            items={data}
            isLoading={isLoading}
            onViewDetail={handleViewDetail}
          />
        </div>
      </PageContainer>

      <UserFormSidebar
        isOpen={isCreateOpen}
        mode="create"
        isLoading={isCreatingUser}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateUser}
      />
    </>
  )
}

export default UsersPage
