/**
 * ResetPasswordPage Component - PRESENTATION LOGIC ONLY
 * All business logic extracted to useResetPassword hook for SRP compliance
 * Architecture: ZERO inline handlers, ALL business logic in page-specific hook
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { useThemeStore } from '@/stores/themeStore'
import { useResetPassword } from '@/hooks/useResetPassword'
import { 
  LoadingState, 
  InvalidTokenState, 
  SuccessState, 
  ResetPasswordFormComponent 
} from '@/components/auth/resetPassword'
import { Shield, Zap } from 'lucide-react'

/**
 * ResetPasswordPage - SRP Compliant Architecture
 * <CheckCircle className="w-4 h-4 inline" /> ONLY presentation logic - NO business logic handlers
 * <CheckCircle className="w-4 h-4 inline" /> ALL business logic extracted to useResetPassword hook
 * <CheckCircle className="w-4 h-4 inline" /> NO inline "const handle..." functions allowed
 * <CheckCircle className="w-4 h-4 inline" /> Follows LoginPage.tsx golden standard patterns
 */
export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // ALL business logic handled by page-specific hook
  const {
    formState,
    passwordValue,
    form,
    handleSubmit,
    handleTogglePassword,
    handleToggleConfirmPassword,
    handleBackToLogin,
    handleRequestNewLink,
    handleContinueToLogin,
    passwordRequirements
  } = useResetPassword({ navigate })

  // Loading state while validating token
  if (formState.isValidToken === null) {
    return <LoadingState theme={theme} />
  }

  // Invalid token state
  if (!formState.isValidToken) {
    return (
      <InvalidTokenState 
        theme={theme}
        onRequestNewLink={handleRequestNewLink}
        onBackToLogin={handleBackToLogin}
      />
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className={`absolute top-20 right-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 right-10 w-24 h-16 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Moving Orbs */}
        <div className={`absolute top-10 left-1/3 w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-full opacity-30 blur-md animate-float`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-lg animate-float animation-delay-3000`}></div>
        
        {/* Sparkle Effect */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-twinkle`}></div>
          <div className={`absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500`}></div>
          <div className={`absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-1500`}></div>
          <div className={`absolute bottom-1/3 right-1/5 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-2500`}></div>
        </div>
      </div>

      {/* Reset Password Card */}
      <Card className="w-full max-w-md relative z-10 bg-gray-900 border-gray-700 shadow-2xl transition-all duration-300">
        {formState.isSuccess ? (
          // Success State - Component handles presentation
          <SuccessState 
            theme={theme}
            onContinueToLogin={handleContinueToLogin}
          />
        ) : (
          // Form State - Component handles presentation
          <ResetPasswordFormComponent
            theme={theme}
            form={form}
            formState={formState}
            passwordValue={passwordValue}
            passwordRequirements={passwordRequirements}
            onSubmit={handleSubmit}
            onTogglePassword={handleTogglePassword}
            onToggleConfirmPassword={handleToggleConfirmPassword}
            onBackToLogin={handleBackToLogin}
          />
        )}
      </Card>

      {/* Gaming Visual Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Security Icons Background */}
        <div className="absolute top-10 left-10 text-6xl opacity-5 animate-bounce-subtle delay-500">🔐</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-5 animate-bounce-subtle delay-1000"><Shield className="w-4 h-4 inline" /></div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">🔑</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000"><Zap className="w-4 h-4 inline" /></div>
      </div>
    </div>
  )
}

export default ResetPasswordPage