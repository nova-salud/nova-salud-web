import { useMemo, useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Input, Select } from '@/shared/components/ui/form'
import { SortOrder } from '@/core/types/query-params.type'
import UserTable from '../components/UserTable'
import UserDetailSidebar from '../components/UserDetailSidebar'
import UserFormSidebar from '../components/UserFormSidebar'
import UserPasswordSidebar from '../components/UserPasswordSidebar'
import { useCreateUser, useUpdateUser, useUpdateUserPassword, useUpdateUserStatus, useUsers } from '../hooks'
import { type UserResponseDto, type FindUsersDto, type CreateUserDto, type UpdateUserDto, type UpdateUserPasswordDto, USER_ROLE_OPTIONS } from '../types'

const USER_STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

type UserSidebarMode = 'create' | 'edit' | 'detail' | 'password' | null

const UsersPage = () => {
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')
  const [isActive, setIsActive] = useState('')
  const [selectedUser, setSelectedUser] = useState<UserResponseDto | null>(null)
  const [sidebarMode, setSidebarMode] = useState<UserSidebarMode>(null)

  const query = useMemo<FindUsersDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'username',
    sortOrder: SortOrder.ASC,
    username: username.trim() || undefined,
    role: role as UserResponseDto['role'] || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [username, role, isActive])

  const { data, isLoading, error, refetch } = useUsers(query)

  const {
    create,
    isLoading: isCreatingUser,
  } = useCreateUser()

  const {
    update,
    isLoading: isUpdatingUser,
  } = useUpdateUser()

  const {
    updatePassword,
    isLoading: isUpdatingPassword,
  } = useUpdateUserPassword()

  const {
    updateStatus,
    isLoading: isUpdatingStatus,
  } = useUpdateUserStatus()

  const handleCloseSidebars = () => {
    setSidebarMode(null)
  }

  const handleOpenCreateSidebar = () => {
    setSelectedUser(null)
    setSidebarMode('create')
  }

  const handleOpenDetailSidebar = (user: UserResponseDto) => {
    setSelectedUser(user)
    setSidebarMode('detail')
  }

  const handleOpenEditSidebar = (user: UserResponseDto) => {
    setSelectedUser(user)
    setSidebarMode('edit')
  }

  const handleOpenPasswordSidebar = (user: UserResponseDto) => {
    setSelectedUser(user)
    setSidebarMode('password')
  }

  const handleCreateUser = async (dto: CreateUserDto) => {
    const result = await create(dto)

    if (!result) {
      return
    }

    await refetch()
    handleCloseSidebars()
  }

  const handleUpdateUser = async (id: number, dto: UpdateUserDto) => {
    const result = await update(id, dto)

    if (!result) {
      return
    }

    setSelectedUser(result)
    await refetch()
    setSidebarMode('detail')
  }

  const handleUpdateUserPassword = async (
    id: number,
    dto: UpdateUserPasswordDto,
  ) => {
    const success = await updatePassword(id, dto)

    if (!success) {
      return
    }

    handleCloseSidebars()
  }

  const handleToggleUserStatus = async (user: UserResponseDto) => {
    const success = await updateStatus(user.id, !user.isActive)

    if (!success) {
      return
    }

    const updatedUser: UserResponseDto = {
      ...user,
      isActive: !user.isActive,
    }

    setSelectedUser(updatedUser)
    await refetch()
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
            onClick={handleOpenCreateSidebar}
          >
            Nuevo usuario
          </Button>
        }
      >
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                label="Usuario"
                placeholder="Buscar por usuario"
                value={username}
                onChange={setUsername}
              />

              <Select
                label="Rol"
                value={role}
                onChange={setRole}
                options={[
                  { label: 'Todos', value: '' },
                  ...USER_ROLE_OPTIONS,
                ]}
              />

              <Select
                label="Estado"
                value={isActive}
                onChange={setIsActive}
                options={USER_STATUS_OPTIONS}
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <UserTable
            items={data}
            isLoading={isLoading}
            onViewDetail={handleOpenDetailSidebar}
          />
        </div>
      </PageContainer>

      <UserDetailSidebar
        user={selectedUser}
        isOpen={sidebarMode === 'detail'}
        onClose={handleCloseSidebars}
        onEdit={handleOpenEditSidebar}
        onChangePassword={handleOpenPasswordSidebar}
        onToggleStatus={handleToggleUserStatus}
        isUpdatingStatus={isUpdatingStatus}
      />

      <UserFormSidebar
        isOpen={sidebarMode === 'create'}
        mode="create"
        isLoading={isCreatingUser}
        onClose={handleCloseSidebars}
        onCreate={handleCreateUser}
      />

      <UserFormSidebar
        isOpen={sidebarMode === 'edit'}
        mode="edit"
        user={selectedUser}
        isLoading={isUpdatingUser}
        onClose={handleCloseSidebars}
        onUpdate={handleUpdateUser}
      />

      <UserPasswordSidebar
        isOpen={sidebarMode === 'password'}
        user={selectedUser}
        isLoading={isUpdatingPassword}
        onClose={handleCloseSidebars}
        onSubmit={handleUpdateUserPassword}
      />
    </>
  )
}

export default UsersPage