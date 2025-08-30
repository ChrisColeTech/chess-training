import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useThemeStore } from '../../stores/themeStore'
import { useResetPassword } from '../../hooks/auth/useResetPassword'
import { BackgroundEffects } from '../../components/ui/BackgroundEffects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const ForgotPasswordPage: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { getCurrentTheme } = useThemeStore()
  const { resetPassword, isLoading, error, success } = useResetPassword()
  const theme = getCurrentTheme()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange'
  })

  if (success) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4`}>
        <BackgroundEffects />
        
        <Card className="w-full max-w-md relative z-10 shadow-2xl transition-all duration-300 backdrop-blur-xl bg-black/20 border-white/10">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl`}>
              <Lock size={32} className="text-white" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Password Reset Successful!</h1>
              <p className="text-white/70">Your password has been updated. Redirecting to login...</p>
            </div>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4`}>
      <BackgroundEffects />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl transition-all duration-300 backdrop-blur-xl bg-black/20 border-white/10 hover:shadow-cyan-500/25 hover:border-white/20">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${theme.accent} flex items-center justify-center shadow-xl`}>
            <Lock size={32} className="text-white" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-white/70">Enter your email and new password</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Reset Form */}
          <form onSubmit={handleSubmit(resetPassword)} className="space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-white/80">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-transparent focus:ring-2 focus:ring-offset-transparent ${errors.email ? 'border-red-500/50' : ''}`}
                  style={{
                    '--ring-color': errors.email ? 'rgb(239 68 68)' : theme.accent.includes('cyan') ? 'rgb(6 182 212)' : 
                                   theme.accent.includes('amber') ? 'rgb(245 158 11)' : 
                                   'rgb(59 130 246)'
                  } as React.CSSProperties}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* New Password Field */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-white/80">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    {...register('newPassword')}
                    className={`pr-12 bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-transparent focus:ring-2 focus:ring-offset-transparent ${errors.newPassword ? 'border-red-500/50' : ''}`}
                    style={{
                      '--ring-color': errors.newPassword ? 'rgb(239 68 68)' : theme.accent.includes('cyan') ? 'rgb(6 182 212)' : 
                                     theme.accent.includes('amber') ? 'rgb(245 158 11)' : 
                                     'rgb(59 130 246)'
                    } as React.CSSProperties}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.newPassword.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-white/80">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    className={`pr-12 bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-transparent focus:ring-2 focus:ring-offset-transparent ${errors.confirmPassword ? 'border-red-500/50' : ''}`}
                    style={{
                      '--ring-color': errors.confirmPassword ? 'rgb(239 68 68)' : theme.accent.includes('cyan') ? 'rgb(6 182 212)' : 
                                     theme.accent.includes('amber') ? 'rgb(245 158 11)' : 
                                     'rgb(59 130 246)'
                    } as React.CSSProperties}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Reset Password Button */}
            <Button
              type="submit"
              disabled={isLoading || !isValid}
              className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl hover-glow active:animate-button-press transition-all duration-300 gpu-accelerated disabled:opacity-50 disabled:cursor-not-allowed`}
              size="lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock size={20} className="mr-2" />
                  <span>Reset Password</span>
                </>
              )}
            </Button>

            {/* Back to Login */}
            <Link
              to="/auth/login"
              className="w-full flex items-center justify-center space-x-2 p-3 bg-black/20 border border-white/20 text-white/80 hover:text-white hover:bg-black/30 hover:border-white/30 rounded-lg transition-all duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to Login</span>
            </Link>
          </form>

          {/* Theme Indicator */}
          <div className="text-center">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${theme.glassMorphism} text-xs text-white/60`}>
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.accent}`}></div>
              <span>{theme.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}