import React from 'react'

interface PageFooterProps {
  theme: any
}

/**
 * PageFooter - Footer component with branding
 * Handles ONLY presentation logic - all business logic in useForgotPassword hook
 */
export const PageFooter: React.FC<PageFooterProps> = ({ theme }) => {
  return (
    <div className="text-center">
      <p className={`text-xs ${theme.text} opacity-40`}>
        Secure password reset powered by Chess Training
      </p>
    </div>
  )
}