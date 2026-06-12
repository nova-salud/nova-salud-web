import { useNavigate } from 'react-router'
import { useDisclosure } from '@/shared/hooks'
import { Button, PageContainer } from '@/shared/components'
import { useCreateUser, useUsers } from '../hooks'
import {
  type UserResponseDto,
  type CreateUserDto,
} from '../types'
import { UserFilter, UserFormSidebar, UsersTable } from '../components'

type UserOverlayKey = 'create'

const UsersPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error, refetch, onChangeFilters, pagination } = useUsers()
  const { create, isLoading: isCreatingUser } = useCreateUser()

  const overlays = useDisclosure<UserOverlayKey>()

  const handleViewDetail = (user: UserResponseDto) => {
    void navigate(`/users/${user.id}`)
  }

  const handleCreateUser = async (dto: CreateUserDto) => {
    const result = await create(dto)
    if (!result) return
    await refetch()
    overlays.close()
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
            onClick={() => overlays.open('create')}
          >
            Nuevo usuario
          </Button>
        }
      >
        <div className="space-y-5">
          <UserFilter onChangeFilters={onChangeFilters} />

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <UsersTable
            users={data}
            isLoading={isLoading}
            onViewDetail={handleViewDetail}
            pagination={pagination}
          />
        </div>
      </PageContainer>

      <UserFormSidebar
        isOpen={overlays.isOpen('create')}
        mode="create"
        isLoading={isCreatingUser}
        onClose={overlays.close}
        onCreate={handleCreateUser}
      />
    </>
  )
}

export default UsersPage
