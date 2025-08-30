/**
 * Type definitions for ResetPassword functionality
 * Supports comprehensive password reset flow with validation
 */

import { z } from 'zod'

// Validation schema for reset password form
export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Form data type
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

// Password requirement validation interface
export interface PasswordRequirement {
  regex: RegExp
  text: string
}

// Reset password page state
export interface ResetPasswordState {
  showPassword: boolean
  showConfirmPassword: boolean
  isLoading: boolean
  isSuccess: boolean
  error: string | null
  isValidToken: boolean | null
}

// Hook return interface
export interface UseResetPasswordReturn {
  // Form state
  formState: ResetPasswordState
  passwordValue: string
  
  // Form instance
  form: any // UseFormReturn type
  
  // Handlers
  handleSubmit: (data: ResetPasswordForm) => Promise<void>
  handleTogglePassword: () => void
  handleToggleConfirmPassword: () => void
  handleBackToLogin: () => void
  handleRequestNewLink: () => void
  handleContinueToLogin: () => void
  
  // Validation
  passwordRequirements: PasswordRequirement[]
  
  // Error handling
  clearError: () => void
}

// Token validation result
export interface TokenValidationResult {
  isValid: boolean
  error?: string
}

// Reset password API response
export interface ResetPasswordResponse {
  success: boolean
  message?: string
  error?: string
}

// Hook configuration
export interface ResetPasswordConfig {
  token?: string
  navigate: (path: string, options?: { replace?: boolean }) => void
}