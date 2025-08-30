import React from 'react'
import { Link } from 'react-router-dom'
import { Label } from "@/components/ui/label"
import { type Theme } from '@/stores/themeStore'

/**
 * Terms Agreement Component
 * Following SRP - Page-specific component extraction
 * Based on ARCHITECTURE.md component extraction requirements
 */

interface TermsAgreementProps {
  register: any // react-hook-form register function
  error?: string
  theme: Theme
}

export const TermsAgreement: React.FC<TermsAgreementProps> = ({
  register,
  error,
  theme
}) => {
  return (
    <div>
      <div className="flex items-start space-x-2">
        <input
          id="agreeToTerms"
          type="checkbox"
          className="mt-1 rounded border-white/20 bg-black/30 text-blue-500 focus:ring-white/20"
          {...register('agreeToTerms')}
        />
        <Label htmlFor="agreeToTerms" className={`text-sm ${theme.text} opacity-80 leading-relaxed`}>
          I agree to the{' '}
          <Link 
            to="/terms" 
            className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-semibold hover:opacity-80 transition-opacity`}
          >
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link 
            to="/privacy" 
            className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-semibold hover:opacity-80 transition-opacity`}
          >
            Privacy Policy
          </Link>
        </Label>
      </div>
      {error && (
        <p className="text-sm text-red-400 animate-slide-down mt-2">
          {error}
        </p>
      )}
    </div>
  )
}