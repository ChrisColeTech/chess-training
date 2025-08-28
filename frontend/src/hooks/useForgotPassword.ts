import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { soundFX } from '@/utils/soundEffects'
import { simulateDelay, generateMockResetResponse, generateEmailSentData } from '@/data/passwordReset'
import type { 
  ForgotPasswordForm, 
  UseForgotPasswordReturn, 
  ForgotPasswordState,
  PasswordResetService 
} from '@/types/forgotPassword'
import { forgotPasswordSchema } from '@/types/forgotPassword'

/**
 * Mock Password Reset Service - Production would use real API
 */
class MockPasswordResetService implements PasswordResetService {
  async sendResetEmail(email: string) {
    // Simulate network delay
    await simulateDelay()
    
    // Generate mock response
    const response = generateMockResetResponse(email)
    
    // Simulate additional processing time for failures
    if (!response.success) {
      await simulateDelay(200, 800)
    }
    
    return response
  }
}

/**
 * Custom hook for Forgot Password page business logic
 * Handles all form logic, API calls, state management, and navigation
 */
export const useForgotPassword = (): UseForgotPasswordReturn => {
  const navigate = useNavigate()
  const passwordResetService = new MockPasswordResetService()

  // Local state
  const [state, setState] = useState<ForgotPasswordState>({
    isLoading: false,
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
      isLoading: true,
      emailValue: data.email,
    }))
    
    try {
      // Call password reset service
      const result = await passwordResetService.sendResetEmail(data.email)
      
      if (result.success) {
        // Success: Play success sound and set email sent state
        soundFX.playSuccess()
        
        setState(prev => ({
          ...prev,
          isEmailSent: true,
          isLoading: false,
        }))
        
        // Log for development
        console.log('Password reset email sent to:', data.email)
        console.log('Request ID:', result.requestId)
        
        // Generate email sent data for additional context
        const emailData = generateEmailSentData(data.email)
        console.log('Email delivery info:', emailData)
        
      } else {
        // Failure: Play error sound and set error message
        soundFX.playError()
        
        setState(prev => ({
          ...prev,
          error: result.message || 'Failed to send reset email. Please try again.',
          isLoading: false,
        }))
      }
      
    } catch (err) {
      // Handle unexpected errors
      soundFX.playError()
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email. Please try again.'
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }))
      
      console.error('Password reset error:', err)
    }
  }, [passwordResetService])

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
    isLoading: state.isLoading,
    isEmailSent: state.isEmailSent,
    error: state.error,
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