/**
 * Reset Password Form Default Values  
 * Constants extracted from useResetPassword hook for better maintainability
 */

import type { ResetPasswordForm } from '@/types/resetPassword'

/**
 * Default form values for password reset
 * Extracted from useResetPassword hook line 36-39
 */
export const defaultResetPasswordFormValues: ResetPasswordForm = {
  password: '',
  confirmPassword: '',
}

/**
 * Reset password form initial state
 * Extracted from useResetPassword hook line 45-52
 */
export const defaultResetPasswordState = {
  showPassword: false,
  showConfirmPassword: false,
  isLoading: false,
  isSuccess: false,
  error: null,
  isValidToken: null
} as const