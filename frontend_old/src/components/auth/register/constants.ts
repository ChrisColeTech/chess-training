import { User, Crown } from 'lucide-react'
import { GiSwordsPower } from 'react-icons/gi'
import type { SkillLevelOption } from '@/types/register'

/**
 * Registration Constants
 * Following DRY - Data separation from page component
 * Moved from registration.ts mock data to component constants
 */

// Skill level options for the registration form
export const skillLevelOptions: SkillLevelOption[] = [
  { 
    value: 'beginner' as const, 
    label: 'Beginner', 
    description: 'Learning the basics',
    icon: User,
    rating: '< 1200'
  },
  { 
    value: 'intermediate' as const, 
    label: 'Intermediate', 
    description: 'Tactical training focus',
    icon: Crown,
    rating: '1200 - 1800'
  },
  { 
    value: 'advanced' as const, 
    label: 'Advanced', 
    description: 'Deep analysis & theory',
    icon: GiSwordsPower,
    rating: '1800+'
  }
]

// Registration form placeholders
export const registrationPlaceholders = {
  displayName: 'ChessMaster2024',
  email: 'chess.master@example.com',
  password: '••••••••••',
  confirmPassword: '••••••••••'
}

// Registration validation rules (for display purposes)
export const passwordRequirements = [
  'At least 8 characters long',
  'Include uppercase and lowercase letters', 
  'Include at least one number',
  'Include at least one special character'
]

// Default form values for registration
export const defaultRegisterFormValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  skillLevel: 'beginner' as const,
  agreeToTerms: false,
}

// Registration flow constants
export const REGISTRATION_CONFIG = {
  SUCCESS_REDIRECT_DELAY: 300, // Delay before navigation after successful registration
  DEFAULT_REDIRECT_PATH: '/dashboard',
  REPLACE_HISTORY: true, // Whether to replace browser history on redirect
} as const