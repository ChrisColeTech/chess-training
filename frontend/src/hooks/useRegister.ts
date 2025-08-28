import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores/authStore'
import { soundFX } from '@/utils/soundEffects'
import { registerSchema } from '@/types/register'
import type { RegisterForm } from '@/types/register'

/**
 * Register Page Business Logic Hook
 * Following SRP - ALL business logic extracted from page component
 * Based on ARCHITECTURE.md requirements for zero inline handlers
 */
export function useRegister() {
  const navigate = useNavigate()
  const { register: registerUser, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form management
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      skillLevel: 'beginner',
      agreeToTerms: false,
    },
  })

  // Business Logic Handlers (extracted from page component)
  const handleSubmit = async (data: RegisterForm) => {
    soundFX.playClick()
    clearError()
    
    const success = await registerUser({
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      skillLevel: data.skillLevel
    })
    
    if (success) {
      soundFX.playSuccess()
      console.log('Registration successful')
      // Small delay to show success state before navigation
      await new Promise(resolve => setTimeout(resolve, 300))
      navigate('/dashboard', { replace: true })
    } else {
      soundFX.playError()
    }
  }

  const handleTogglePassword = () => {
    soundFX.playClick()
    setShowPassword(!showPassword)
  }

  const handleToggleConfirmPassword = () => {
    soundFX.playClick()
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSignInNavigation = () => {
    soundFX.playClick()
    navigate('/auth/login')
  }

  // Watch form values for reactive UI
  const selectedSkillLevel = form.watch('skillLevel')

  return {
    // Form state
    form,
    selectedSkillLevel,
    showPassword,
    showConfirmPassword,
    
    // Auth state
    isLoading,
    error,
    
    // Presentation handlers (contain business logic)
    handleSubmit: form.handleSubmit(handleSubmit),
    handleTogglePassword,
    handleToggleConfirmPassword,
    handleSignInNavigation,
    
    // Utilities
    clearError
  }
}