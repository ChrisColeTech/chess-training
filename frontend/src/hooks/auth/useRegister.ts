import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../../services/apiClient'
import { soundFX } from '../../utils/soundEffects'

interface RegisterData {
  username: string
  email: string
  password: string
}

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const register = useCallback(async (data: RegisterData) => {
    soundFX.playClick()
    setError('')
    setIsLoading(true)
    
    try {
      await apiClient.post('/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password
      })
      
      soundFX.playSuccess()
      setSuccess(true)
      
      // Auto-redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/auth/login', { replace: true })
      }, 2000)
      
    } catch (error: any) {
      console.error('Registration failed:', error)
      const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.'
      setError(errorMessage)
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  const clearError = useCallback(() => {
    setError('')
  }, [])

  return {
    register,
    isLoading,
    error,
    success,
    clearError
  }
}