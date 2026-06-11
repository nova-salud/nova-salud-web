import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { CreateUserDto, FindUsersDto, UpdateUserDto, UpdateUserPasswordDto, UpdateUserStatusDto, UserResponseDto } from '../types'

class UserService extends ApiService {
  async findAll(
    query: FindUsersDto,
  ): Promise<PaginatedResponse<UserResponseDto>> {
    return await this.getPaginated<UserResponseDto>(
      '/users',
      { params: query },
    )
  }

  async findById(id: number): Promise<UserResponseDto> {
    return await this.get<UserResponseDto>(`/users/${id}`)
  }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    return await this.post<UserResponseDto>('/users', dto)
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    return await this.patch<UserResponseDto>(`/users/${id}`, dto)
  }

  async updatePassword(
    id: number,
    dto: UpdateUserPasswordDto,
  ): Promise<{ message: string }> {
    return await this.patch<{ message: string }>(
      `/users/${id}/password`,
      dto,
    )
  }

  async updateStatus(
    id: number,
    dto: UpdateUserStatusDto,
  ): Promise<{ message: string }> {
    return await this.patch<{ message: string }>(
      `/users/${id}/status`,
      dto,
    )
  }
}

export const userService = new UserService()