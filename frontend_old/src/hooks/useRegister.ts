import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/auth/useAuth'
import { soundFX } from '@/utils/soundEffects'
import { registerSchema } from '@/types/register'
import type { RegisterForm } from '@/types/register'
import { defaultRegisterFormValues, REGISTRATION_CONFIG } from '@/components/auth/register/constants'

/**
 * Register Page Business Logic Hook
 * Following SRP - ALL business logic extracted from page component
 * Based on ARCHITECTURE.md requirements for zero inline handlers
 */
export function useRegister() {
  const navigate = useNavigate()
  const { register: registerUser, isRegistering, registerError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form management
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultRegisterFormValues,
  })

  // Business Logic Handlers (extracted from page component)
  const handleSubmit = async (data: RegisterForm) => {
    soundFX.playClick()
    setError(null)
    
    try {
      await registerUser({
        username: data.displayName,
        email: data.email,
        password: data.password
        // Note: skillLevel would need to be handled in profile update later
        // as the API register endpoint may not support it directly
      })
      
      soundFX.playSuccess()
      console.log('Registration successful')
      // Small delay to show success state before navigation
      await new Promise(resolve => setTimeout(resolve, REGISTRATION_CONFIG.SUCCESS_REDIRECT_DELAY))
      navigate(REGISTRATION_CONFIG.DEFAULT_REDIRECT_PATH, { replace: REGISTRATION_CONFIG.REPLACE_HISTORY })
    } catch (err: any) {
      soundFX.playError()
      setError(err.message || 'Registration failed')
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
    isLoading: isRegistering,
    error: error || registerError?.message,
    
    // Presentation handlers (contain business logic)
    handleSubmit: form.handleSubmit(handleSubmit),
    handleTogglePassword,
    handleToggleConfirmPassword,
    handleSignInNavigation
  }
}