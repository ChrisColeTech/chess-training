import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { useThemeStore } from '@/stores/themeStore'
import { useForgotPassword } from '@/hooks/useForgotPassword'
import { 
  EmailForm, 
  SuccessState, 
  ErrorDisplay, 
  PageHeader, 
  BackToLoginLink, 
  PageFooter 
} from '@/components/auth/forgotPassword'
import { Mail, Zap } from 'lucide-react'

export const ForgotPasswordPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // All business logic extracted to page-specific hook
  const {
    // Form state
    isLoading,
    isEmailSent,
    error,
    emailValue,
    
    // Form methods
    register,
    handleSubmit,
    formErrors,
    
    // Presentation handlers (business logic extracted to hook)
    handleFormSubmit,
    handleSendAnotherEmail,
    handleBackToLogin,
    
  } = useForgotPassword()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-24 h-16 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Moving Orbs */}
        <div className={`absolute top-10 right-1/3 w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-full opacity-30 blur-md animate-float`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-lg animate-float animation-delay-3000`}></div>
        
        {/* Sparkle Effect */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-twinkle`}></div>
          <div className={`absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500`}></div>
          <div className={`absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-1500`}></div>
          <div className={`absolute bottom-1/3 left-1/5 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-2500`}></div>
        </div>
      </div>

      {/* Password Reset Card */}
      <Card className="w-full max-w-md relative z-10 bg-gray-900 border-gray-700 shadow-2xl transition-all duration-300">
        <PageHeader
          isEmailSent={isEmailSent}
          emailValue={emailValue}
          theme={theme}
        />

        <CardContent className="space-y-6">
          {isEmailSent ? (
            // Success State - All business logic extracted to hook
            <SuccessState
              emailValue={emailValue}
              onSendAnotherEmail={handleSendAnotherEmail}
              onBackToLogin={handleBackToLogin}
              theme={theme}
            />
          ) : (
            // Form State - All business logic extracted to hook
            <>
              {/* Error Display */}
              {error && <ErrorDisplay error={error} theme={theme} />}
              
              {/* Email Form */}
              <EmailForm
                register={register}
                onSubmit={handleSubmit(handleFormSubmit)}
                isLoading={isLoading}
                errors={formErrors}
                theme={theme}
              />

              {/* Back to Login Link */}
              <BackToLoginLink
                onBackToLogin={handleBackToLogin}
                theme={theme}
              />
            </>
          )}

          {/* Footer */}
          <PageFooter theme={theme} />
        </CardContent>
      </Card>

      {/* Gaming Visual Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Chess Pieces Background */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">🔐</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000"><Mail className="w-4 h-4 inline" /></div>
        <div className="absolute top-1/3 left-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">🔑</div>
        <div className="absolute bottom-1/3 right-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000"><Zap className="w-4 h-4 inline" /></div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage