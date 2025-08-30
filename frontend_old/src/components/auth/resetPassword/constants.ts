/**
 * UI text constants for reset password components
 * Moved from passwordReset.ts mock data to component constants
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
 * Default form values for password reset
 */
export const defaultResetPasswordFormValues = {
  password: '',
  confirmPassword: '',
}