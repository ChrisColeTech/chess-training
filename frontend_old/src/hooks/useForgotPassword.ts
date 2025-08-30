import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { soundFX } from '@/utils/soundEffects'
import { useAuth } from '@/hooks/auth/useAuth'
import type { 
  ForgotPasswordForm, 
  UseForgotPasswordReturn, 
  ForgotPasswordState
} from '@/types/forgotPassword'
import { forgotPasswordSchema } from '@/types/forgotPassword'

/**
 * Custom hook for Forgot Password page business logic
 * Handles all form logic, API calls, state management, and navigation
 */
export const useForgotPassword = (): UseForgotPasswordReturn => {
  const navigate = useNavigate()
  const { forgotPassword, isForgotPasswordPending, forgotPasswordError } = useAuth()

  // Local state (excluding isLoading as it comes from useAuth)
  const [state, setState] = useState<Omit<ForgotPasswordState, 'isLoading'>>({
    isEmailSent: false,
    error: null,
    emailValue: '',
  })

  // React Hook Form setup
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const { register, handleSubmit, formState: { errors }, watch } = form
  const emailValue = watch('email')

  /**
   * Handle form submission with business logic
   */
  const handleFormSubmit = useCallback(async (data: ForgotPasswordForm): Promise<void> => {
    // Play click sound
    soundFX.playClick()
    
    // Clear previous errors and set loading state
    setState(prev => ({
      ...prev,
      error: null,
      emailValue: data.email,
    }))
    
    try {
      // Call password reset API
      const result = await forgotPassword(data.email)
      
      // Success: Play success sound and set email sent state
      soundFX.playSuccess()
      
      setState(prev => ({
        ...prev,
        isEmailSent: true,
      }))
      
      // Log for development
      console.log('Password reset email sent to:', data.email)
      console.log('API response:', result)
      
    } catch (err: any) {
      // Handle unexpected errors
      soundFX.playError()
      
      const errorMessage = err.message || 'Failed to send reset email. Please try again.'
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
      }))
      
      console.error('Password reset error:', err)
    }
  }, [forgotPassword])

  /**
   * Handle "Send Another Email" action
   */
  const handleSendAnotherEmail = useCallback((): void => {
    soundFX.playClick()
    
    // Reset to form state
    setState(prev => ({
      ...prev,
      isEmailSent: false,
      error: null,
    }))
  }, [])

  /**
   * Handle navigation back to login
   */
  const handleBackToLogin = useCallback((): void => {
    soundFX.playClick()
    navigate('/auth/login')
  }, [navigate])

  /**
   * Clear error message
   */
  const clearError = useCallback((): void => {
    setState(prev => ({
      ...prev,
      error: null,
    }))
  }, [])

  return {
    // Form state
    isLoading: isForgotPasswordPending,
    isEmailSent: state.isEmailSent,
    error: state.error || forgotPasswordError?.message,
    emailValue: state.emailValue || emailValue,
    
    // Form methods
    register,
    handleSubmit,
    formErrors: errors,
    watch,
    
    // Presentation handlers (all business logic extracted to hook)
    handleFormSubmit,
    handleSendAnotherEmail,
    handleBackToLogin,
    
    // Error handling
    clearError,
  }
}