import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../../services/apiClient'
import { soundFX } from '../../utils/soundEffects'

interface ResetPasswordData {
  email: string
  newPassword: string
}

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const resetPassword = useCallback(async (data: ResetPasswordData) => {
    soundFX.playClick()
    setError('')
    setIsLoading(true)
    
    try {
      await apiClient.post('/auth/reset-password', {
        email: data.email,
        newPassword: data.newPassword
      })
      
      soundFX.playSuccess()
      setSuccess(true)
      
      // Auto-redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/auth/login', { replace: true })
      }, 2000)
      
    } catch (error: any) {
      console.error('Password reset failed:', error)
      const errorMessage = error.response?.data?.error || 'Password reset failed. Please try again.'
      setError(errorMessage)
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  return {
    resetPassword,
    isLoading,
    error,
    success
  }
}