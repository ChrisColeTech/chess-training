import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface BackToLoginLinkProps {
  onBackToLogin: () => void
  theme: any
}

/**
 * BackToLoginLink - Link component for navigation back to login
 * Handles ONLY presentation logic - all business logic in useForgotPassword hook
 */
export const BackToLoginLink: React.FC<BackToLoginLinkProps> = ({
  onBackToLogin,
  theme,
}) => {
  return (
    <div className="text-center">
      <button
        onClick={onBackToLogin}
        className={`inline-flex items-center text-sm ${theme.text} opacity-60 hover:opacity-100 transition-opacity`}
      >
        <ArrowLeft size={14} className="mr-2" />
        Back to Login
      </button>
    </div>
  )
}