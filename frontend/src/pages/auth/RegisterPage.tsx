import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, UserPlus, Crown, ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useThemeStore } from '../../stores/themeStore'
import { useRegister } from '../../hooks/auth/useRegister'
import { BackgroundEffects } from '../../components/ui/BackgroundEffects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { getCurrentTheme } = useThemeStore()
  const { register, isLoading, error, success, clearError } = useRegister()
  const theme = getCurrentTheme()

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  })

  if (success) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4`}>
        <BackgroundEffects />
        
        <Card className="w-full max-w-md relative z-10 shadow-2xl transition-all duration-300 backdrop-blur-xl bg-black/20 border-white/10">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl`}>
              <UserPlus size={32} className="text-white" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Registration Successful!</h1>
              <p className="text-white/70">Your account has been created. Redirecting to login...</p>
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
            <Crown size={32} className="text-white" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/70">Join the Chess Training Platform</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit(register)} className="space-y-6">
            <div className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-white/80">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  {...formRegister('username')}
                  className={`bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-transparent focus:ring-2 focus:ring-offset-transparent ${errors.username ? 'border-red-500/50' : ''}`}
                  style={{
                    '--ring-color': errors.username ? 'rgb(239 68 68)' : theme.accent.includes('cyan') ? 'rgb(6 182 212)' : 
                                   theme.accent.includes('amber') ? 'rgb(245 158 11)' : 
                                   'rgb(59 130 246)'
                  } as React.CSSProperties}
                  placeholder="Enter username"
                  onFocus={clearError}
                />
                {errors.username && (
                  <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-white/80">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...formRegister('email')}
                  className={`bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-transparent focus:ring-2 focus:ring-offset-transparent ${errors.email ? 'border-red-500/50' : ''}`}
                  style={{
                    '--ring-color': errors.email ? 'rgb(239 68 68)' : theme.accent.includes('cyan') ? 'rgb(6 182 212)' : 
                                   theme.accent.includes('amber') ? 'rgb(245 158 11)' : 
                                   'rgb(59 130 246)'
                  } as React.CSSProperties}
                  placeholder="Enter your email"
                  onFocus={clearError}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-white/80">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...formRegister('password')}
                    className={`pr-12 bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-transparent focus:ring-2 focus:ring-offset-transparent ${errors.password ? 'border-red-500/50' : ''}`}
                    style={{
                      '--ring-color': errors.password ? 'rgb(239 68 68)' : theme.accent.includes('cyan') ? 'rgb(6 182 212)' : 
                                     theme.accent.includes('amber') ? 'rgb(245 158 11)' : 
                                     'rgb(59 130 246)'
                    } as React.CSSProperties}
                    placeholder="Enter password"
                    onFocus={clearError}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
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
                    {...formRegister('confirmPassword')}
                    className={`pr-12 bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-transparent focus:ring-2 focus:ring-offset-transparent ${errors.confirmPassword ? 'border-red-500/50' : ''}`}
                    style={{
                      '--ring-color': errors.confirmPassword ? 'rgb(239 68 68)' : theme.accent.includes('cyan') ? 'rgb(6 182 212)' : 
                                     theme.accent.includes('amber') ? 'rgb(245 158 11)' : 
                                     'rgb(59 130 246)'
                    } as React.CSSProperties}
                    placeholder="Confirm password"
                    onFocus={clearError}
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

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl hover-glow active:animate-button-press transition-all duration-300 gpu-accelerated disabled:opacity-50 disabled:cursor-not-allowed`}
              size="lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={20} className="mr-2" />
                  <span>Create Account</span>
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