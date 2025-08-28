import React from 'react'
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PageHeaderProps {
  isEmailSent: boolean
  emailValue: string
  theme: any
}

/**
 * PageHeader - Header component with dynamic content based on state
 * Handles ONLY presentation logic - all business logic in useForgotPassword hook
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  isEmailSent,
  emailValue,
  theme,
}) => {
  return (
    <CardHeader className="space-y-4 text-center">
      <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
        <div className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
          {isEmailSent ? '✉️' : '🔐'}
        </div>
      </div>
      <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
        {isEmailSent ? 'Check Your Email' : 'Reset Password'}
      </CardTitle>
      <CardDescription className={`${theme.text} opacity-80`}>
        {isEmailSent 
          ? `We've sent password reset instructions to ${emailValue}`
          : 'Enter your email address and we\'ll send you a link to reset your password'
        }
      </CardDescription>
    </CardHeader>
  )
}