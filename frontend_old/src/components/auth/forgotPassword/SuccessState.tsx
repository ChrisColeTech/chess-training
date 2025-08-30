import React from 'react'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface SuccessStateProps {
  emailValue: string
  onSendAnotherEmail: () => void
  onBackToLogin: () => void
  theme: any
}

/**
 * SuccessState - Component shown after successful email submission
 * Handles ONLY presentation logic - all business logic in useForgotPassword hook
 */
export const SuccessState: React.FC<SuccessStateProps> = ({
  onSendAnotherEmail,
  onBackToLogin,
  theme,
}) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className={`w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle`}>
          <CheckCircle size={40} className="text-white" />
        </div>
      </div>
      
      <div className="space-y-3">
        <p className={`${theme.text} text-center`}>
          If an account with that email exists, you'll receive password reset instructions shortly.
        </p>
        <p className="text-sm text-gray-400 text-center">
          Don't see the email? Check your spam folder or try again.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onSendAnotherEmail}
          variant="outline"
          className="w-full bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30 transition-all duration-300"
        >
          Send Another Email
        </Button>
        
        <Button
          onClick={onBackToLogin}
          variant="outline"
          className="w-full bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30 transition-all duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </Button>
      </div>
    </div>
  )
}