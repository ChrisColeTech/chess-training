import type { EmailConfig, PasswordResetResponse, EmailSentData } from '@/types/forgotPassword'

/**
 * Mock email configuration for password reset
 */
export const mockEmailConfig: EmailConfig = {
  provider: 'Mock Email Service',
  deliveryTime: {
    min: 500,   // 0.5 seconds
    max: 2000,  // 2 seconds
  },
  failureRate: 0.1, // 10% chance of failure for realistic testing
}

/**
 * Mock email templates
 */
export const emailTemplates = {
  passwordReset: {
    subject: 'Chess Training - Password Reset Request',
    preview: 'Click here to reset your password',
    expiryTime: '15 minutes',
    supportEmail: 'support@chesstraining.com',
  }
}

/**
 * Mock registered email domains for testing
 */
export const mockRegisteredEmails = [
  'demo@example.com',
  'player@chesstraining.com',
  'user@test.com',
  'master@chess.com',
  'trainer@example.org',
]

/**
 * Mock password reset service responses
 */
export const generateMockResetResponse = (email: string): PasswordResetResponse => {
  // Simulate random failures for realistic testing
  if (Math.random() < mockEmailConfig.failureRate) {
    return {
      success: false,
      message: 'Failed to send reset email. Please try again.',
      error: 'SMTP_CONNECTION_FAILED'
    }
  }

  // Check if it's a known test email that should "fail"
  const testFailureEmails = ['fail@test.com', 'error@example.com']
  if (testFailureEmails.includes(email.toLowerCase())) {
    return {
      success: false,
      message: 'Email address not found in our system.',
      error: 'EMAIL_NOT_FOUND'
    }
  }

  // Success response
  return {
    success: true,
    message: 'Password reset email sent successfully',
    requestId: `reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

/**
 * Mock email sent data generator
 */
export const generateEmailSentData = (email: string): EmailSentData => {
  const deliveryTime = Math.random() * 
    (mockEmailConfig.deliveryTime.max - mockEmailConfig.deliveryTime.min) + 
    mockEmailConfig.deliveryTime.min

  return {
    email,
    timestamp: Date.now(),
    estimatedDeliveryTime: deliveryTime < 1000 
      ? `${Math.round(deliveryTime)}ms` 
      : `${Math.round(deliveryTime / 1000)}s`
  }
}

/**
 * Mock validation messages
 */
export const validationMessages = {
  emailRequired: 'Email address is required',
  emailInvalid: 'Please enter a valid email address',
  emailTooLong: 'Email address is too long',
  rateLimited: 'Too many requests. Please wait before trying again.',
}

/**
 * Mock success messages
 */
export const successMessages = {
  emailSent: (email: string) => 
    `We've sent password reset instructions to ${email}. Please check your inbox.`,
  fallbackMessage: 
    'If an account with that email exists, you\'ll receive password reset instructions shortly.',
  checkSpam: 
    'Don\'t see the email? Check your spam folder or try again.',
}

/**
 * Mock error messages
 */
export const errorMessages = {
  networkError: 'Network error. Please check your connection and try again.',
  serverError: 'Server temporarily unavailable. Please try again later.',
  rateLimited: 'Too many password reset requests. Please wait a few minutes.',
  invalidEmail: 'Please enter a valid email address.',
  emailNotFound: 'No account found with this email address.',
  genericError: 'Something went wrong. Please try again.',
}

/**
 * Mock delay simulation for realistic UX
 */
export const simulateDelay = async (
  min: number = mockEmailConfig.deliveryTime.min,
  max: number = mockEmailConfig.deliveryTime.max
): Promise<void> => {
  const delay = Math.random() * (max - min) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * Password requirements configuration
 */
export const passwordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true,
}

/**
 * Redirect delay after successful password reset
 */
export const REDIRECT_DELAY = 2000

/**
 * Mock token validation function
 */
export const validateResetToken = async (token: string): Promise<{ valid: boolean; error?: string }> => {
  // Simulate API delay
  await simulateDelay(300, 1000)
  
  // Mock validation logic
  if (!token || token.length < 10) {
    return { valid: false, error: 'Invalid reset token' }
  }
  
  // Simulate expired token
  if (token.includes('expired')) {
    return { valid: false, error: 'Reset token has expired' }
  }
  
  return { valid: true }
}

/**
 * Mock password reset function
 */
export const resetPassword = async (token: string, password: string): Promise<{ success: boolean; error?: string }> => {
  // Simulate API delay
  await simulateDelay(500, 1500)
  
  // Mock reset logic
  if (!token || token.length < 10) {
    return { success: false, error: 'Invalid reset token' }
  }
  
  if (password.length < passwordRequirements.minLength) {
    return { success: false, error: 'Password does not meet requirements' }
  }
  
  return { success: true }
}

/**
 * UI text constants for reset password components
 */
export const UI_TEXT = {
  // Top-level properties for component compatibility
  INVALID_TITLE: 'Invalid Reset Link',
  INVALID_DESCRIPTION: 'This password reset link is invalid or has expired.',
  EXPIRY_INFO: 'Reset links expire after 15 minutes for security.',
  REQUEST_NEW_LINK: 'Request New Reset Link',
  BACK_TO_LOGIN: 'Back to Login',
  VALIDATING: 'Validating...',
  FORM_TITLE: 'Reset Your Password',
  FORM_DESCRIPTION: 'Enter your new password below',
  NEW_PASSWORD: 'New Password',
  PASSWORD_REQUIREMENTS: 'Password Requirements',
  CONFIRM_PASSWORD: 'Confirm Password',
  UPDATING: 'Updating...',
  UPDATE_PASSWORD: 'Update Password',
  SUCCESS_TITLE: 'Password Reset Successful',
  SUCCESS_DESCRIPTION: 'Your password has been updated successfully',
  SUCCESS_INFO: 'You can now log in with your new password.',
  CONTINUE_TO_LOGIN: 'Continue to Login',
  
  // Nested structure for organized access
  loading: {
    title: 'Validating Reset Token',
    description: 'Please wait while we verify your password reset request...',
    steps: [
      'Checking token validity',
      'Verifying security',
      'Preparing form'
    ]
  },
  form: {
    title: 'Reset Your Password',
    description: 'Enter your new password below',
    passwordLabel: 'New Password',
    confirmLabel: 'Confirm Password',
    submitButton: 'Reset Password'
  },
  success: {
    title: 'Password Reset Successful',
    description: 'Your password has been updated successfully',
    redirectMessage: 'Redirecting to login page...'
  },
  error: {
    invalidToken: 'This reset link is invalid or has expired',
    expired: 'This reset link has expired',
    generic: 'Something went wrong. Please try again.'
  }
}

/**
 * Success messages for password reset components
 */
export const SUCCESS_MESSAGES = {
  passwordReset: 'Your password has been successfully updated!',
  redirecting: 'Redirecting you to the login page...',
  loginPrompt: 'You can now log in with your new password.'
}