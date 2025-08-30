import { Mail, MessageCircle, Users, Bug, Lightbulb, Shield, HelpCircle } from 'lucide-react'
import type { SupportChannel, ContactCategory, SystemInfo } from '@/types/contact'

/**
 * Available Support Channels
 */
export const supportChannels: SupportChannel[] = [
  {
    id: 'email',
    name: 'Email Support',
    description: 'Get detailed help with your account, technical issues, or feature questions.',
    icon: Mail,
    responseTime: '24-48 hours',
    availability: '24/7',
    action: 'Send Email',
    isEnabled: true
  },
  {
    id: 'chat',
    name: 'Live Chat',
    description: 'Chat with our support team for immediate assistance during business hours.',
    icon: MessageCircle,
    responseTime: '< 5 minutes',
    availability: '9 AM - 6 PM EST',
    action: 'Start Chat',
    isEnabled: false // Disabled for demo
  },
  {
    id: 'community',
    name: 'Community Forum',
    description: 'Ask questions and get help from other chess enthusiasts and moderators.',
    icon: Users,
    responseTime: '1-4 hours',
    availability: '24/7',
    action: 'Visit Forum',
    isEnabled: true
  }
]

/**
 * Contact Categories with Priority Levels
 */
export const contactCategories: ContactCategory[] = [
  {
    id: 'bug_report',
    label: 'Bug Report',
    description: 'Report technical issues or unexpected behavior',
    icon: Bug,
    priority: 'high'
  },
  {
    id: 'feature_request',
    label: 'Feature Request',
    description: 'Suggest new features or improvements',
    icon: Lightbulb,
    priority: 'medium'
  },
  {
    id: 'account_help',
    label: 'Account Help',
    description: 'Issues with login, subscription, or account settings',
    icon: Shield,
    priority: 'high'
  },
  {
    id: 'general_question',
    label: 'General Question',
    description: 'Questions about features, chess rules, or how to use the app',
    icon: HelpCircle,
    priority: 'medium'
  },
  {
    id: 'billing',
    label: 'Billing & Payments',
    description: 'Questions about subscriptions, payments, or refunds',
    icon: Mail,
    priority: 'urgent'
  },
  {
    id: 'feedback',
    label: 'General Feedback',
    description: 'Share your thoughts and suggestions',
    icon: MessageCircle,
    priority: 'low'
  }
]

/**
 * Mock System Information
 * In a real app, this would be dynamically gathered
 */
export const getMockSystemInfo = (): SystemInfo => ({
  browser: 'Chrome 118.0.0.0',
  os: 'macOS 14.1',
  screen: '1440x900',
  accountType: 'Premium',
  lastLogin: new Date().toLocaleDateString()
})

/**
 * Default Form Data
 */
export const getDefaultFormData = () => ({
  selectedCategory: '',
  subject: '',
  message: '',
  email: 'user@example.com', // Pre-filled from user account in real app
  attachFiles: false,
  includeSystemInfo: true
})

/**
 * Priority Color Mapping
 */
export const priorityColorMap = {
  urgent: 'border-red-500/50 bg-red-900/20',
  high: 'border-orange-500/50 bg-orange-900/20',
  medium: 'border-yellow-500/50 bg-yellow-900/20',
  low: 'border-green-500/50 bg-green-900/20',
  default: 'border-slate-500/50 bg-slate-700/20'
}

/**
 * Quick Help Options
 */
export const quickHelpOptions = [
  {
    id: 'help-articles',
    title: 'Browse Help Articles',
    description: 'Find answers to common questions',
    path: '/help'
  },
  {
    id: 'tutorials',
    title: 'Watch Tutorials',
    description: 'Learn through video guides',
    path: '/help/tutorials'
  }
]

/**
 * Form Validation Rules
 */
export const validationRules = {
  category: {
    required: true,
    message: 'Please select a category'
  },
  subject: {
    required: true,
    minLength: 1,
    message: 'Subject is required'
  },
  message: {
    required: true,
    minLength: 20,
    message: 'Please provide more details (at least 20 characters)',
    shortMessage: 'Message is required'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  }
}

/**
 * Response Time Information
 */
export const responseTimeInfo = {
  title: 'Expected Response Time',
  message: 'We typically respond within 24-48 hours during business days. For urgent issues, please use live chat during business hours (9 AM - 6 PM EST).'
}

/**
 * Success Messages
 */
export const successMessages = {
  submitted: {
    title: 'Message Sent!',
    message: 'Thank you for contacting us. We\'ve received your message and will get back to you within 24-48 hours.',
    actions: {
      sendAnother: 'Send Another',
      backToHelp: 'Back to Help'
    }
  }
}