import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useThemeStore } from '@/stores/themeStore'
import { useRegister } from '@/hooks/useRegister'
import { skillLevelOptions, registrationPlaceholders } from '@/data/registration'
import { SkillLevelSelector, PasswordField, TermsAgreement } from '@/components/auth/register'
import { Zap } from 'lucide-react'
import { FaChessKing } from 'react-icons/fa'
import { FaChessBishop } from 'react-icons/fa'
import { FaChessKnight } from 'react-icons/fa'

/**
 * Register Page Component
 * REFACTORED to follow SRP - ONLY presentation logic
 * Based on ARCHITECTURE.md zero-tolerance SRP enforcement
 * ALL business logic extracted to useRegister hook
 */
export const RegisterPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Register hook (contains ALL business logic)
  const {
    form,
    selectedSkillLevel,
    showPassword,
    showConfirmPassword,
    isLoading,
    error,
    handleSubmit,
    handleTogglePassword,
    handleToggleConfirmPassword,
    handleSignInNavigation
  } = useRegister()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className={`absolute top-20 right-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 right-10 w-24 h-24 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
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

      {/* Registration Card */}
      <Card className="w-full max-w-lg relative z-10 bg-gray-900 border-gray-700 shadow-2xl transition-all duration-300">
        <CardHeader className="space-y-4 text-center">
          <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
            <div className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              <FaChessKing className="w-4 h-4 inline" />
            </div>
          </div>
          <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            Join Chess Training
          </CardTitle>
          <CardDescription className={`${theme.text} opacity-80`}>
            Create your account and start your chess mastery journey
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg animate-slide-down">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Display Name Field */}
            <div className="space-y-2">
              <Label htmlFor="displayName" className={`text-sm font-medium ${theme.text}`}>
                Display Name
              </Label>
              <Input
                id="displayName"
                type="text"
                placeholder={registrationPlaceholders.displayName}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors"
                {...form.register('displayName')}
              />
              {form.formState.errors.displayName && (
                <p className="text-sm text-red-400 animate-slide-down">
                  {form.formState.errors.displayName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className={`text-sm font-medium ${theme.text}`}>
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={registrationPlaceholders.email}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors"
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-400 animate-slide-down">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field Component */}
            <PasswordField
              id="password"
              label="Password"
              placeholder={registrationPlaceholders.password}
              showPassword={showPassword}
              onTogglePassword={handleTogglePassword}
              register={form.register}
              error={form.formState.errors.password?.message}
              theme={theme}
            />

            {/* Confirm Password Field Component */}
            <PasswordField
              id="confirmPassword"
              label="Confirm Password"
              placeholder={registrationPlaceholders.confirmPassword}
              showPassword={showConfirmPassword}
              onTogglePassword={handleToggleConfirmPassword}
              register={form.register}
              error={form.formState.errors.confirmPassword?.message}
              theme={theme}
            />

            {/* Skill Level Selector Component */}
            <SkillLevelSelector
              skillLevels={skillLevelOptions}
              selectedSkillLevel={selectedSkillLevel}
              register={form.register}
              error={form.formState.errors.skillLevel?.message}
              theme={theme}
            />

            {/* Terms Agreement Component */}
            <TermsAgreement
              register={form.register}
              error={form.formState.errors.agreeToTerms?.message}
              theme={theme}
            />

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover-glow active:animate-button-press transition-all duration-300 border-0 gpu-accelerated`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Create Account</span>
                  <span className="text-lg"><Zap className="w-4 h-4 inline" /></span>
                </span>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="text-center space-y-2">
            <p className={`text-sm ${theme.text} opacity-60`}>
              Already have an account?{' '}
              <button 
                onClick={handleSignInNavigation}
                className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-semibold hover:opacity-80 transition-opacity`}
              >
                Sign in here
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
        <div className="absolute top-10 left-10 text-6xl opacity-5 animate-bounce-subtle delay-500">♛</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-5 animate-bounce-subtle delay-1000"><FaChessBishop className="w-4 h-4 inline" /></div>
        <div className="absolute top-1/3 left-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500"><FaChessKnight className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-1/3 right-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000">♜</div>
      </div>
    </div>
  )
}