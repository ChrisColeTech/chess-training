import type { ComponentType } from 'react'

/**
 * Support Channel Interface
 * Represents different ways users can contact support
 */
export interface SupportChannel {
  id: string
  name: string
  description: string
  icon: ComponentType<any>
  responseTime: string
  availability: string
  action: string
  isEnabled: boolean
}

/**
 * Contact Category Interface
 * Categories for organizing support requests
 */
export interface ContactCategory {
  id: string
  label: string
  description: string
  icon: ComponentType<any>
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

/**
 * Contact Form Data Interface
 * Structure for form submission data
 */
export interface ContactFormData {
  selectedCategory: string
  subject: string
  message: string
  email: string
  attachFiles: boolean
  includeSystemInfo: boolean
}

/**
 * Form Validation Errors
 */
export interface ContactFormErrors {
  category?: string
  subject?: string
  message?: string
  email?: string
  [key: string]: string | undefined
}

/**
 * System Information Interface
 * Technical details included with support requests
 */
export interface SystemInfo {
  browser: string
  os: string
  screen: string
  accountType: string
  lastLogin: string
}

/**
 * Contact Submission Response
 */
export interface ContactSubmissionResponse {
  ticketId: string
  estimatedResponse: string
  isSuccess: boolean
  message?: string
}

/**
 * Contact Page State Interface
 * Complete state management for contact functionality
 */
export interface ContactState {
  // Form data
  formData: ContactFormData
  
  // Validation
  errors: ContactFormErrors
  isValid: boolean
  
  // UI state
  isSubmitting: boolean
  isSubmitted: boolean
  
  // Content data
  supportChannels: SupportChannel[]
  contactCategories: ContactCategory[]
  systemInfo: SystemInfo
  
  // Submission result
  submissionResult: ContactSubmissionResponse | null
}

/**
 * Contact Hook Return Interface
 * All functionality exposed by useContact hook
 */
export interface UseContactReturn {
  // State
  formData: ContactFormData
  errors: ContactFormErrors
  isSubmitting: boolean
  isSubmitted: boolean
  supportChannels: SupportChannel[]
  contactCategories: ContactCategory[]
  systemInfo: SystemInfo
  submissionResult: ContactSubmissionResponse | null
  
  // Form handlers
  updateFormField: (field: keyof ContactFormData, value: any) => void
  validateForm: () => boolean
  clearForm: () => void
  resetSubmissionState: () => void
  
  // Submission
  handleSubmit: (e: React.FormEvent) => Promise<void>
  
  // Utility functions
  getPriorityColor: (priority: string) => string
  generateTicketId: () => string
  
  // Navigation handlers
  handleBackToHelp: () => void
  handleSendAnother: () => void
  handleQuickHelpClick: (path: string) => void
  handleChannelAction: (channelId: string) => void
  
  // Error handling
  error: string | null
  clearError: () => void
}

/**
 * Contact Hook Options
 */
export interface UseContactOptions {
  onSubmitSuccess?: (response: ContactSubmissionResponse) => void
  onSubmitError?: (error: string) => void
  autoFillUserInfo?: boolean
}