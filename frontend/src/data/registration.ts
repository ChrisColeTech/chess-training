import { User, Crown } from 'lucide-react'
import { GiSwordsPower } from 'react-icons/gi'
import type { SkillLevelOption } from '@/types/register'

/**
 * Registration Mock Data
 * Following DRY - Data separation from page component
 * Based on ARCHITECTURE.md requirements for data extraction
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

// Mock registration validation messages
export const registrationMessages = {
  success: 'Account created successfully! Welcome to Chess Training.',
  emailTaken: 'This email is already registered. Please try signing in instead.',
  usernameTaken: 'This display name is already taken. Please choose another.',
  weakPassword: 'Password is too weak. Please choose a stronger password.',
  serverError: 'Registration failed. Please try again later.',
  networkError: 'Unable to connect. Please check your internet connection.'
}

// Mock registration form placeholders
export const registrationPlaceholders = {
  displayName: 'ChessMaster2024',
  email: 'chess.master@example.com',
  password: '••••••••••',
  confirmPassword: '••••••••••'
}

// Default form values
export const defaultRegistrationValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  skillLevel: 'beginner' as const,
  agreeToTerms: false
}

// Registration validation rules (for display purposes)
export const passwordRequirements = [
  'At least 8 characters long',
  'Include uppercase and lowercase letters', 
  'Include at least one number',
  'Include at least one special character'
]