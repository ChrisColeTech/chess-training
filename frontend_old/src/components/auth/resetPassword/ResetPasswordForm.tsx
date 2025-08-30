import React from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Shield, Key, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ResetPasswordForm as FormData, type PasswordRequirement } from '@/types/resetPassword'
import { UI_TEXT } from './constants'

interface ResetPasswordFormProps {
  theme: any
  form: UseFormReturn<FormData>
  formState: {
    showPassword: boolean
    showConfirmPassword: boolean
    isLoading: boolean
    error: string | null
  }
  passwordValue: string
  passwordRequirements: PasswordRequirement[]
  onSubmit: (data: FormData) => Promise<void>
  onTogglePassword: () => void
  onToggleConfirmPassword: () => void
  onBackToLogin: () => void
}

export const ResetPasswordFormComponent: React.FC<ResetPasswordFormProps> = ({
  theme,
  form,
  formState,
  passwordValue,
  passwordRequirements,
  onSubmit,
  onTogglePassword,
  onToggleConfirmPassword,
  onBackToLogin
}) => {
  const { register, handleSubmit, formState: { errors } } = form
  const { showPassword, showConfirmPassword, isLoading, error } = formState

  return (
    <>
      <CardHeader className="space-y-4 text-center">
        <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
          <Key size={24} className="text-white" />
        </div>
        <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
          {UI_TEXT.FORM_TITLE}
        </CardTitle>
        <CardDescription className={`${theme.text} opacity-80`}>
          {UI_TEXT.FORM_DESCRIPTION}
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
          {/* New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className={`text-sm font-medium ${theme.text}`}>
              {UI_TEXT.NEW_PASSWORD}
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
                onClick={onTogglePassword}
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

          {/* Password Requirements */}
          <div className="space-y-2">
            <Label className={`text-sm font-medium ${theme.text} flex items-center`}>
              <Shield size={14} className="mr-2" />
              {UI_TEXT.PASSWORD_REQUIREMENTS}
            </Label>
            <div className="grid grid-cols-1 gap-1">
              {passwordRequirements.map((req, index) => {
                const isMet = req.regex.test(passwordValue)
                return (
                  <div key={index} className={`flex items-center text-xs transition-colors ${
                    isMet ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      isMet ? 'bg-green-400' : 'bg-gray-600'
                    }`}></div>
                    {req.text}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className={`text-sm font-medium ${theme.text}`}>
              {UI_TEXT.CONFIRM_PASSWORD}
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors pr-10"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={onToggleConfirmPassword}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.text} hover:opacity-70 transition-opacity`}
              >
                {showConfirmPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-400 animate-slide-down">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Reset Password Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover-glow active:animate-button-press transition-all duration-300 border-0 gpu-accelerated`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{UI_TEXT.UPDATING}</span>
              </div>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Shield size={16} />
                <span>{UI_TEXT.UPDATE_PASSWORD}</span>
              </span>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <Link 
            to="/auth/login"
            onClick={onBackToLogin}
            className={`inline-flex items-center text-sm ${theme.text} opacity-60 hover:opacity-100 transition-opacity`}
          >
            <ArrowLeft size={14} className="mr-2" />
            {UI_TEXT.BACK_TO_LOGIN}
          </Link>
        </div>
      </CardContent>
    </>
  )
}