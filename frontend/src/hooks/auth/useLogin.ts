import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { soundFX } from '../../utils/soundEffects'

interface LoginData {
  email: string
  password: string
}

export const useLogin = () => {
  const [error, setError] = useState<string>('')
  const { login: authLogin, isLoading } = useAuth()
  const navigate = useNavigate()

  const login = useCallback(async (data: LoginData) => {
    soundFX.playClick()
    setError('')
    
    try {
      // 1. Process authentication
      await authLogin(data.email, data.password)
      
      // 2. Success animation (300ms as per document 14)
      soundFX.playSuccess()
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // 3. Navigate to dashboard
      navigate('/dashboard', { replace: true })
      
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed. Please try again.'
      setError(errorMessage)
      soundFX.playError()
    }
  }, [authLogin, navigate])

  const clearError = useCallback(() => {
    setError('')
  }, [])

  return {
    login,
    error,
    isLoading,
    clearError
  }
}