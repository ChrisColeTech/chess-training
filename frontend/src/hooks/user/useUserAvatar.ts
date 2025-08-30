import { useCallback } from 'react'
import { useAuth } from '../auth/useAuth'
import { getEloColorScheme, type EloColorScheme } from '../../constants/chessColors'

interface UserAvatarData {
  src?: string
  fallbackText: string
  username?: string
  email?: string
  chessElo?: number
  eloColorScheme: EloColorScheme
}

export const useUserAvatar = () => {
  const { user } = useAuth()

  const getUserAvatarData = useCallback((): UserAvatarData => {
    const eloRating = user?.chess_elo
    const eloColorScheme = getEloColorScheme(eloRating)

    if (!user) {
      return {
        fallbackText: 'G',
        username: 'Guest',
        eloColorScheme
      }
    }

    // Generate fallback text from username or email
    const getFallbackText = () => {
      if (user.username) {
        return user.username.charAt(0).toUpperCase()
      }
      if (user.email) {
        return user.email.charAt(0).toUpperCase()
      }
      return 'U'
    }

    // In the future, this would come from user profile
    const getAvatarSrc = () => {
      // For now, no avatar images - could be added later
      // return user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
      return undefined
    }

    return {
      src: getAvatarSrc(),
      fallbackText: getFallbackText(),
      username: user.username,
      email: user.email,
      chessElo: user.chess_elo,
      eloColorScheme
    }
  }, [user])

  const avatarData = getUserAvatarData()

  return {
    ...avatarData,
    isGuest: !user
  }
}