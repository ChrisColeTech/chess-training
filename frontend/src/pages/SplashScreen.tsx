import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChessKing, FaChessQueen, FaChessRook, FaChessKnight, FaChessBishop, FaChessPawn } from 'react-icons/fa'
import { useThemeStore } from '../stores/themeStore'
import { useAuthStore } from '../stores/authStore'

export const SplashScreen: React.FC = () => {
  const [, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const { isAuthenticated } = useAuthStore()
  const theme = getCurrentTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          
          // Navigate based on auth state after splash
          setTimeout(() => {
            if (isAuthenticated) {
              navigate('/dashboard')
            } else {
              navigate('/login')
            }
          }, 500)
          
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isAuthenticated, navigate])

  return (
    <div className={`h-screen bg-gradient-to-br ${theme.background} flex flex-col items-center justify-center relative overflow-hidden`}>

      {/* Main Content */}
      <div className={`text-center ${theme.text} space-y-8`}>
        {/* Game Logo/Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            Chess Training Game
          </h1>
          <p className="text-lg opacity-90">
            Master Your Chess Skills
          </p>
        </div>

        {/* Animated Chess Pieces */}
        <div className="flex justify-center items-center space-x-6">
          <FaChessKing className="w-8 h-8 text-white/60 animate-bounce-fast" style={{ animationDelay: '0.2s' }} />
          <FaChessQueen className="w-8 h-8 text-white/60 animate-bounce-fast" style={{ animationDelay: '0.4s' }} />
          <FaChessRook className="w-8 h-8 text-white/60 animate-bounce-fast" style={{ animationDelay: '0.6s' }} />
          <FaChessBishop className="w-8 h-8 text-white/60 animate-bounce-fast" style={{ animationDelay: '0.8s' }} />
          <FaChessKnight className="w-8 h-8 text-white/60 animate-bounce-fast" style={{ animationDelay: '1.0s' }} />
          <FaChessPawn className="w-8 h-8 text-white/60 animate-bounce-fast" style={{ animationDelay: '1.2s' }} />
        </div>

        {/* Loading Progress */}
        <div className="space-y-4 w-96 max-w-[90vw]">
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className={`bg-gradient-to-r ${theme.primary} h-3 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-base opacity-80">
            Loading...
          </p>
          <p className="text-sm opacity-60">
            {Math.round(progress)}% complete
          </p>
        </div>
      </div>

    </div>
  )
}