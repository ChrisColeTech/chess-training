import { z } from 'zod'
import { User, Crown } from 'lucide-react'
import { GiSwordsPower } from 'react-icons/gi'

/**
 * Register Page Type Definitions
 * Following SRP - Interface definitions extracted from page component
 * Based on ARCHITECTURE.md requirements for proper type separation
 */

// Registration form schema
export const registerSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters').max(30, 'Display name must be less than 30 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms of service'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Form type inference
export type RegisterForm = z.infer<typeof registerSchema>

// Skill level type
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

// Skill level configuration interface
export interface SkillLevelOption {
  value: SkillLevel
  label: string
  description: string
  icon: typeof User | typeof Crown | typeof GiSwordsPower
  rating: string
}

// Registration request interface
export interface RegisterRequest {
  displayName: string
  email: string
  password: string
  skillLevel: SkillLevel
}

// Registration response interface
export interface RegisterResponse {
  success: boolean
  user?: {
    id: string
    displayName: string
    email: string
    skillLevel: SkillLevel
  }
  token?: string
  error?: string
}