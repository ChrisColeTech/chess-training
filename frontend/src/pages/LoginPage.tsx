import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn, Crown, Zap } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../hooks/auth/useAuth'
import { useThemeStore } from '../stores/themeStore'
import { soundFX } from '../utils/soundEffects'
import { BackgroundEffects } from '../components/ui/BackgroundEffects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>('')
  const { login, isLoading } = useAuth()
  const { getCurrentTheme } = useThemeStore()
  const navigate = useNavigate()
  const theme = getCurrentTheme()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  const onSubmit = async (data: LoginFormData) => {
    soundFX.playClick()
    setError('')
    
    try {
      await login(data.email, data.password)
      soundFX.playSuccess()
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.')
      soundFX.playError()
    }
  }

  const handleDemoLogin = async () => {
    soundFX.playClick()
    setError('')
    
    try {
      await login('demo@chess-training.com', 'demo123')
      soundFX.playSuccess()
      navigate('/dashboard')
    } catch (error) {
      console.error('Demo login failed:', error)
      setError(error instanceof Error ? error.message : 'Demo login failed. Please try again.')
      soundFX.playError()
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4`}>
      <BackgroundEffects />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl transition-all duration-300 backdrop-blur-xl bg-black/20 border-white/10 hover:shadow-cyan-500/25 hover:border-white/20 animate-card-entrance">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${theme.accent} flex items-center justify-center shadow-xl`}>
            <Crown size={32} className="text-white" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to your chess training account</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white/80">
                Email
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

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-white/80">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`pr-12 bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-transparent focus:ring-2 focus:ring-offset-transparent ${errors.password ? 'border-red-500/50' : ''}`}
                  style={{
                    '--ring-color': errors.password ? 'rgb(239 68 68)' : theme.accent.includes('cyan') ? 'rgb(6 182 212)' : 
                                   theme.accent.includes('amber') ? 'rgb(245 158 11)' : 
                                   'rgb(59 130 246)'
                  } as React.CSSProperties}
                  placeholder="Enter your password"
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
          </div>

          {/* Login Button */}
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
                <LogIn size={20} className="mr-2" />
                <span>Sign In</span>
              </>
            )}
          </Button>

          {/* Demo Login Button */}
          <Button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            variant="outline"
            className={`w-full bg-black/20 border-white/20 ${theme.text} hover:bg-black/30 hover:border-white/30 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated disabled:opacity-50 disabled:cursor-not-allowed font-medium`}
            size="lg"
          >
            <Zap size={20} className="text-amber-400 mr-2" />
            <span>Demo Login</span>
          </Button>
        </form>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <div className="text-sm text-white/60">
            <span>Don't have an account? </span>
            <Link 
              to="/register" 
              className={`font-medium ${theme.accent.includes('cyan') ? 'text-cyan-400 hover:text-cyan-300' : theme.accent.includes('amber') ? 'text-amber-400 hover:text-amber-300' : 'text-blue-400 hover:text-blue-300'} transition-colors`}
            >
              Sign up
            </Link>
          </div>
          
          <Link 
            to="/forgot-password" 
            className="block text-sm text-white/60 hover:text-white/80 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

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