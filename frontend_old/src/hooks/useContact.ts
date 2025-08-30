import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { soundFX } from '@/utils/soundEffects'
import { apiService } from '@/services/api'

// Local constants and utilities
const supportChannels = [
  { id: 'email', name: 'Email Support', description: 'Get help via email', responseTime: '24-48 hours' },
  { id: 'chat', name: 'Live Chat', description: 'Chat with our support team', responseTime: '5-10 minutes' },
  { id: 'community', name: 'Community Forum', description: 'Get help from the community', responseTime: 'Varies' }
]

const contactCategories = [
  { id: 'technical', name: 'Technical Issue', priority: 'high', description: 'Bug reports and technical problems' },
  { id: 'account', name: 'Account Support', priority: 'medium', description: 'Account-related questions' },
  { id: 'billing', name: 'Billing & Payments', priority: 'high', description: 'Payment and subscription issues' },
  { id: 'feature', name: 'Feature Request', priority: 'low', description: 'Suggest new features' },
  { id: 'general', name: 'General Question', priority: 'low', description: 'General questions and feedback' }
]

const getMockSystemInfo = () => ({
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  timestamp: new Date().toISOString()
})

const getDefaultFormData = () => ({
  selectedCategory: null,
  subject: '',
  message: '',
  email: 'user@example.com',
  includeSystemInfo: true,
  urgency: 'normal'
})

const priorityColorMap = {
  high: 'text-red-400',
  medium: 'text-yellow-400',
  low: 'text-green-400',
  default: 'text-gray-400'
}

const validationRules = {
  category: { required: true, message: 'Please select a category' },
  subject: { required: true, message: 'Subject is required' },
  message: { required: true, minLength: 10, message: 'Message must be at least 10 characters', shortMessage: 'Message is required' },
  email: { required: true, message: 'Valid email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
}
import type { 
  ContactFormData, 
  ContactFormErrors, 
  ContactSubmissionResponse, 
  UseContactReturn, 
  UseContactOptions 
} from '@/types/contact'

/**
 * Contact Hook - Contains ALL business logic for ContactPage
 * 
 * Handles form state, validation, submission, and all user interactions
 * following SRP compliance - NO business logic in the page component
 */
export const useContact = (options: UseContactOptions = {}): UseContactReturn => {
  const navigate = useNavigate()
  const {
    onSubmitSuccess,
    onSubmitError
  } = options

  // Form state
  const [formData, setFormData] = useState<ContactFormData>(getDefaultFormData())
  const [errors, setErrors] = useState<ContactFormErrors>({})
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<ContactSubmissionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Static data
  const systemInfo = getMockSystemInfo()
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Update form field with validation
   */
  const updateFormField = useCallback((field: keyof ContactFormData, value: any) => {
    soundFX.playClick()
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [errors])

  /**
   * Validate entire form
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: ContactFormErrors = {}
    
    // Category validation
    if (!formData.selectedCategory && validationRules.category.required) {
      newErrors.category = validationRules.category.message
    }
    
    // Subject validation
    if (!formData.subject.trim() && validationRules.subject.required) {
      newErrors.subject = validationRules.subject.message
    }
    
    // Message validation
    if (!formData.message.trim() && validationRules.message.required) {
      newErrors.message = validationRules.message.shortMessage
    } else if (formData.message.trim().length < validationRules.message.minLength) {
      newErrors.message = validationRules.message.message
    }
    
    // Email validation (though it's readonly in this mockup)
    if (!formData.email.trim() && validationRules.email.required) {
      newErrors.email = validationRules.email.message
    } else if (formData.email && !validationRules.email.pattern.test(formData.email)) {
      newErrors.email = validationRules.email.message
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  /**
   * Generate random ticket ID
   */
  const generateTicketId = useCallback((): string => {
    return `CS-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  }, [])

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    soundFX.playClick()
    
    if (!validateForm()) {
      soundFX.playError()
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Submit via API
      const result = await apiService.search.submitContactForm({
        category: formData.selectedCategory?.id || 'general',
        subject: formData.subject,
        message: formData.message,
        email: formData.email,
        includeSystemInfo: formData.includeSystemInfo,
        urgency: formData.urgency,
        systemInfo: formData.includeSystemInfo ? systemInfo : undefined
      })
      
      setSubmissionResult(result)
      setIsSubmitted(true)
      soundFX.playSuccess()
      
      if (onSubmitSuccess) {
        onSubmitSuccess(result)
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit your request. Please try again.'
      setError(errorMessage)
      soundFX.playError()
      
      if (onSubmitError) {
        onSubmitError(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, systemInfo, onSubmitSuccess, onSubmitError])

  /**
   * Clear form data
   */
  const clearForm = useCallback(() => {
    soundFX.playClick()
    setFormData(getDefaultFormData())
    setErrors({})
    setError(null)
  }, [])

  /**
   * Reset submission state for sending another message
   */
  const resetSubmissionState = useCallback(() => {
    soundFX.playClick()
    setIsSubmitted(false)
    setSubmissionResult(null)
    clearForm()
  }, [clearForm])

  /**
   * Get priority color for categories
   */
  const getPriorityColor = useCallback((priority: string): string => {
    return priorityColorMap[priority as keyof typeof priorityColorMap] || priorityColorMap.default
  }, [])

  /**
   * Handle navigation back to help center
   */
  const handleBackToHelp = useCallback(() => {
    soundFX.playClick()
    navigate('/help')
  }, [navigate])

  /**
   * Handle sending another message
   */
  const handleSendAnother = useCallback(() => {
    resetSubmissionState()
  }, [resetSubmissionState])

  /**
   * Handle quick help clicks
   */
  const handleQuickHelpClick = useCallback((path: string) => {
    soundFX.playClick()
    navigate(path)
  }, [navigate])

  /**
   * Handle support channel actions
   */
  const handleChannelAction = useCallback((channelId: string) => {
    soundFX.playClick()
    
    // In a real app, this would handle different channel actions
    switch (channelId) {
      case 'email':
        // Focus on the contact form (already on page)
        break
      case 'chat':
        // Would open live chat widget
        console.log('Opening live chat...')
        break
      case 'community':
        // Would navigate to community forum
        console.log('Navigating to community forum...')
        break
      default:
        console.log(`Unknown channel: ${channelId}`)
    }
  }, [])

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    soundFX.playClick()
    setError(null)
  }, [])

  // Return all state and handlers for the component
  return {
    // Form state
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    submissionResult,
    isLoading,
    
    // Static data
    supportChannels,
    contactCategories,
    systemInfo,
    
    // Form handlers
    updateFormField,
    validateForm,
    clearForm,
    resetSubmissionState,
    handleSubmit,
    
    // Utility functions
    getPriorityColor,
    generateTicketId,
    
    // Navigation handlers  
    handleBackToHelp,
    handleSendAnother,
    handleQuickHelpClick: (path: string) => handleQuickHelpClick(path),
    handleChannelAction,
    
    // Error handling
    error,
    clearError
  }
}