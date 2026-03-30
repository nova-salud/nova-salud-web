import { ApiService } from '@/core/api/api.service'
import type { UserSession } from '@/core/types/user-session.type'
import type { LoginDto } from '../types/login.dto'
import type { LoginResponseDto } from '../types/login-response.dto'

class AuthService extends ApiService {
  async login(payload: LoginDto): Promise<UserSession> {
    const response = await this.post<LoginResponseDto, LoginDto>('/auth/login', payload)
    const { tokens: { accessToken}, authenticatedUser: { id, username, active} } = response


    return {
      token: accessToken,
      user: {
        id,
        username,
        active
      },
    }
  }
}

export const authService = new AuthService()