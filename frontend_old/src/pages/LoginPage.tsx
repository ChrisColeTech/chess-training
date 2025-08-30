import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useThemeStore } from '@/stores/themeStore'
import { useAuthActions } from '@/hooks/auth/useAuthActions'
import { useAuthStore } from '@/stores/authStore'
import { soundFX } from '@/utils/soundEffects'
import { FaChessKing } from 'react-icons/fa'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean(),
})

type LoginForm = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const { login, isLoggingIn, loginError } = useAuthActions()
  const theme = getCurrentTheme()
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginForm) => {
    // Prevent form submission from causing page reload
    event?.preventDefault?.()
    
    console.log('🎯 LoginPage.onSubmit called with:', { email: data.email });
    console.log('🎯 Current auth state before login:', useAuthStore.getState());
    
    soundFX.playClick()
    setError(null) // Clear any previous errors
    
    try {
      console.log('🎯 LoginPage calling login function...');
      const result = await login(data.email, data.password)
      console.log('🎯 LoginPage login SUCCESS, result:', result);
      console.log('🎯 Auth state after login:', useAuthStore.getState());
      soundFX.playSuccess()
      console.log('🎯 Navigating to dashboard...');
      navigate('/dashboard')
    } catch (err: any) {
      console.error('🎯 LoginPage login FAILED with error:', err);
      console.error('🎯 Error stack:', err.stack);
      soundFX.playError()
      const errorMessage = loginError?.message || err.message || 'Login failed'
      console.error('🎯 Setting error message:', errorMessage);
      setError(errorMessage)
    }
  }

  const handleDemoLogin = async () => {
    soundFX.playClick()
    setError(null) // Clear any previous errors
    
    try {
      await login('demo@chess-training.com', 'demo123')
      soundFX.playSuccess()
      console.log('Demo login successful - auth routing will handle navigation')
      navigate('/dashboard')
    } catch (err: any) {
      soundFX.playError()
      setError(loginError?.message || err.message || 'Demo login failed')
    }
  }

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

      {/* Login Card with Gaming Enhancement */}
      <Card className="w-full max-w-md relative z-10 bg-gray-900 border-gray-700 shadow-2xl transition-all duration-300">
        <CardHeader className="space-y-4 text-center">
          <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
            <div className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              <FaChessKing className="w-4 h-4 inline" />
            </div>
          </div>
          <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            Chess Training
          </CardTitle>
          <CardDescription className={`${theme.text} opacity-80`}>
            Enter your credentials to access your training dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg animate-slide-down">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className={`text-sm font-medium ${theme.text}`}>
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="chess.master@example.com"
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-400 animate-slide-down">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className={`text-sm font-medium ${theme.text}`}>
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.text} hover:opacity-70 transition-opacity`}
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400 animate-slide-down">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input
                id="rememberMe"
                type="checkbox"
                className="rounded border-white/20 bg-black/30 text-white focus:ring-white/20"
                {...register('rememberMe')}
              />
              <Label htmlFor="rememberMe" className={`text-sm ${theme.text} opacity-80`}>
                Remember me for 30 days
              </Label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover-glow active:animate-button-press transition-all duration-300 border-0 gpu-accelerated`}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <span className="text-lg">🚀</span>
                </span>
              )}
            </Button>
          </form>

          {/* Demo Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className={`px-2 bg-black/20 ${theme.text} opacity-60`}>
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleDemoLogin}
            disabled={isLoggingIn}
            className={`w-full bg-black/20 border-white/20 ${theme.text} hover:bg-black/30 hover:border-white/30 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated`}
          >
            Demo Login (Skip Authentication)
          </Button>

          {/* Footer Links */}
          <div className="text-center space-y-2">
            <p className={`text-sm ${theme.text} opacity-60`}>
              Don't have an account?{' '}
              <button className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-semibold hover:opacity-80 transition-opacity`}>
                Create one now
              </button>
            </p>
            <p className={`text-xs ${theme.text} opacity-40`}>
              Powered by Shadcn UI + Tailwind CSS
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Gaming Visual Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Chess Pieces Background */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">♜</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000">♞</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">♝</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000">♛</div>
      </div>
    </div>
  )
}