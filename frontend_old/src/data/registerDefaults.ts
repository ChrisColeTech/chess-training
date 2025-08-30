/**
 * Registration Form Default Values
 * Constants extracted from useRegister hook for better maintainability
 */

import type { RegisterForm } from '@/types/register'

/**
 * Default form values for registration
 * Extracted from useRegister hook line 24-31
 */
export const defaultRegisterFormValues: RegisterForm = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  skillLevel: 'beginner',
  agreeToTerms: false,
}

/**
 * Registration flow constants
 */
export const REGISTRATION_CONFIG = {
  SUCCESS_REDIRECT_DELAY: 300, // Delay before navigation after successful registration
  DEFAULT_REDIRECT_PATH: '/dashboard',
  REPLACE_HISTORY: true, // Whether to replace browser history on redirect
} as const