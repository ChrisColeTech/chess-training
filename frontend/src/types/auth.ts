export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  data: {
    user: {
      id: string
      username: string
      email: string
      chess_elo: number
      puzzle_rating: number
      preferences: Record<string, any>
    }
    tokens: {
      accessToken: string
      refreshToken: string
    }
  }
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
  confirmPassword?: string
}

export interface RegisterResponse {
  success: boolean
  data: {
    user: {
      id: string
      username: string
      email: string
      chess_elo: number
      puzzle_rating: number
    }
    tokens: {
      accessToken: string
      refreshToken: string
    }
  }
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthUser {
  id: string
  username: string
  email: string
  chess_elo: number
  puzzle_rating: number
  preferences: Record<string, any>
}