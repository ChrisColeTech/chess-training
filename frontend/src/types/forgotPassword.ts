import { z } from 'zod'

// Zod Schema for form validation
export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Type derived from schema
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

// Hook state interface
export interface ForgotPasswordState {
  isLoading: boolean
  isEmailSent: boolean
  error: string | null
  emailValue: string
}

// API Response interfaces
export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetResponse {
  success: boolean
  message: string
  requestId?: string
  error?: string
}

// Email sent state data
export interface EmailSentData {
  email: string
  timestamp: number
  estimatedDeliveryTime: string
}

// Hook return interface
export interface UseForgotPasswordReturn {
  // Form state
  isLoading: boolean
  isEmailSent: boolean
  error: string | null
  emailValue: string
  
  // Form methods
  register: any // react-hook-form register function
  handleSubmit: any // react-hook-form handleSubmit function
  formErrors: any // react-hook-form errors object
  watch: any // react-hook-form watch function
  
  // Presentation handlers (all business logic extracted to hook)
  handleFormSubmit: (data: ForgotPasswordForm) => Promise<void>
  handleSendAnotherEmail: () => void
  handleBackToLogin: () => void
  
  // Error handling
  clearError: () => void
}

// Service interface
export interface PasswordResetService {
  sendResetEmail(email: string): Promise<PasswordResetResponse>
}

// Mock email configuration
export interface EmailConfig {
  provider: string
  deliveryTime: {
    min: number
    max: number
  }
  failureRate: number
}