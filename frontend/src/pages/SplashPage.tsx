import { useEffect, useState } from 'react'
import { useThemeStore } from '../stores/themeStore'
import { FaChessKing } from 'react-icons/fa'
import { FaChessQueen } from 'react-icons/fa'
import { FaChessRook } from 'react-icons/fa'
import { FaChessBishop } from 'react-icons/fa'
import { FaChessKnight } from 'react-icons/fa'
import { FaChessPawn } from 'react-icons/fa'

interface SplashPageProps {
  onLoadingComplete: () => void
}

export const SplashPage: React.FC<SplashPageProps> = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('Initializing Chess Training Game...')
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  const getThemeColors = (primary: string) => {
    const colorMap = {
      cyan: {
        gradient: 'from-cyan-400 to-cyan-500',
        progress: 'from-cyan-400 to-cyan-600',
        spinner: 'border-cyan-300'
      },
      yellow: {
        gradient: 'from-yellow-400 to-yellow-500',
        progress: 'from-yellow-400 to-yellow-600',
        spinner: 'border-yellow-300'
      },
      purple: {
        gradient: 'from-purple-400 to-purple-500',
        progress: 'from-purple-400 to-purple-600',
        spinner: 'border-purple-300'
      },
      green: {
        gradient: 'from-green-400 to-green-500',
        progress: 'from-green-400 to-green-600',
        spinner: 'border-green-300'
      },
      red: {
        gradient: 'from-red-400 to-red-500',
        progress: 'from-red-400 to-red-600',
        spinner: 'border-red-300'
      }
    }
    return colorMap[primary as keyof typeof colorMap] || colorMap.cyan
  }

  const colors = getThemeColors(theme.primary)

  useEffect(() => {
    const steps = [
      'Loading game assets...',
      'Initializing chess engine...',
      'Setting up user interface...',
      'Preparing training modules...',
      'Ready to play!'
    ]

    let currentStepIndex = 0
    let progress = 0

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5 // Random progress increment
      setLoadingProgress(Math.min(progress, 100))
      
      if (progress > 25 * (currentStepIndex + 1) && currentStepIndex < steps.length - 1) {
        currentStepIndex++
        setCurrentStep(steps[currentStepIndex])
      }
      
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          onLoadingComplete()
        }, 500)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${theme.background} flex items-center justify-center z-50`}>
      <div className={`text-center ${theme.text} space-y-8`}>
        {/* Game Logo/Title */}
        <div className="space-y-2">
          <div className={`text-6xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
            <FaChessKing className="w-4 h-4 inline" /> <FaChessQueen className="w-4 h-4 inline" /> <FaChessRook className="w-4 h-4 inline" /> <FaChessBishop className="w-4 h-4 inline" /> <FaChessKnight className="w-4 h-4 inline" /> <FaChessPawn className="w-4 h-4 inline" />
          </div>
          <h1 className="text-4xl font-bold">
            Chess Training Game
          </h1>
          <p className="text-lg opacity-90">
            Master Your Chess Skills
          </p>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4 w-96 max-w-[90vw]">
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className={`bg-gradient-to-r ${colors.progress} h-3 rounded-full transition-all duration-300`}
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-base opacity-80">
            {currentStep}
          </p>
          <p className="text-sm opacity-60">
            {Math.round(loadingProgress)}% complete
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-4 ${colors.spinner} border-t-transparent`} />
        </div>
      </div>
    </div>
  )
}