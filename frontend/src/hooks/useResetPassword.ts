/**
 * useResetPassword Hook - ALL BUSINESS LOGIC FOR RESET PASSWORD PAGE
 * Follows SRP: Page handles only presentation, hook handles all business logic
 */

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import type { 
  ResetPasswordForm, 
  ResetPasswordState, 
  UseResetPasswordReturn,
  ResetPasswordConfig
} from '@/types/resetPassword'
import { resetPasswordSchema } from '@/types/resetPassword'
import { 
  passwordRequirements as passwordReqs,
  validateResetToken,
  resetPassword,
  REDIRECT_DELAY
} from '@/data/passwordReset'
import { soundFX } from '@/utils/soundEffects'

/**
 * Custom hook for ResetPassword page business logic
 * Extracts ALL handlers, state management, and business logic from the page component
 */
export const useResetPassword = (config: ResetPasswordConfig): UseResetPasswordReturn => {
  const { token } = useParams<{ token: string }>()
  const { navigate } = config
  
  // Form management
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const passwordValue = form.watch('password') || ''

  // State management
  const [formState, setFormState] = useState<ResetPasswordState>({
    showPassword: false,
    showConfirmPassword: false,
    isLoading: false,
    isSuccess: false,
    error: null,
    isValidToken: null
  })

  // Token validation effect
  useEffect(() => {
    const performTokenValidation = async () => {
      if (!token) {
        setFormState(prev => ({
          ...prev,
          isValidToken: false,
          error: 'No reset token provided'
        }))
        return
      }

      try {
        const result = await validateResetToken(token)
        setFormState(prev => ({
          ...prev,
          isValidToken: result.valid,
          error: result.error || null
        }))
      } catch (err) {
        setFormState(prev => ({
          ...prev,
          isValidToken: false,
          error: 'Failed to validate reset token. Please try again.'
        }))
      }
    }

    performTokenValidation()
  }, [token])

  // Form submission handler
  const handleSubmit = async (data: ResetPasswordForm): Promise<void> => {
    soundFX.playClick()
    setFormState(prev => ({
      ...prev,
      error: null,
      isLoading: true
    }))
    
    try {
      if (!token) {
        throw new Error('No reset token available')
      }

      const result = await resetPassword(token, data.password)
      
      if (result.success) {
        soundFX.playSuccess()
        setFormState(prev => ({
          ...prev,
          isSuccess: true,
          isLoading: false
        }))
        
        // Auto redirect to login after delay
        setTimeout(() => {
          navigate('/auth/login', { replace: true })
        }, REDIRECT_DELAY)
      } else {
        throw new Error(result.error || 'Failed to reset password')
      }
    } catch (err) {
      soundFX.playError()
      setFormState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to reset password. Please try again.',
        isLoading: false
      }))
    }
  }

  // Password visibility toggle handlers
  const handleTogglePassword = (): void => {
    setFormState(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }))
  }

  const handleToggleConfirmPassword = (): void => {
    setFormState(prev => ({
      ...prev,
      showConfirmPassword: !prev.showConfirmPassword
    }))
  }

  // Navigation handlers
  const handleBackToLogin = (): void => {
    soundFX.playClick()
    navigate('/auth/login')
  }

  const handleRequestNewLink = (): void => {
    soundFX.playClick()
    navigate('/auth/forgot-password')
  }

  const handleContinueToLogin = (): void => {
    soundFX.playClick()
    navigate('/auth/login')
  }

  // Error handling
  const clearError = (): void => {
    setFormState(prev => ({
      ...prev,
      error: null
    }))
  }

  // Convert password requirements object to array format
  const passwordRequirements = [
    {
      regex: new RegExp(`.{${passwordReqs.minLength},}`),
      text: `At least ${passwordReqs.minLength} characters`
    },
    ...(passwordReqs.requireUppercase ? [{
      regex: /[A-Z]/,
      text: 'At least one uppercase letter'
    }] : []),
    ...(passwordReqs.requireLowercase ? [{
      regex: /[a-z]/,
      text: 'At least one lowercase letter'
    }] : []),
    ...(passwordReqs.requireNumbers ? [{
      regex: /[0-9]/,
      text: 'At least one number'
    }] : []),
    ...(passwordReqs.requireSymbols ? [{
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      text: 'At least one special character'
    }] : [])
  ]

  return {
    // Form state
    formState,
    passwordValue,
    
    // Form instance for component use
    form,
    
    // Handlers (all business logic extracted here)
    handleSubmit,
    handleTogglePassword,
    handleToggleConfirmPassword,
    handleBackToLogin,
    handleRequestNewLink,
    handleContinueToLogin,
    
    // Validation
    passwordRequirements,
    
    // Error handling
    clearError
  }
}