import React from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EmailFormProps {
  register: any
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  errors: any
  theme: any
}

/**
 * EmailForm - Form component for password reset email input
 * Handles ONLY presentation logic - all business logic in useForgotPassword hook
 */
export const EmailForm: React.FC<EmailFormProps> = ({
  register,
  onSubmit,
  isLoading,
  errors,
  theme,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
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

      {/* Send Reset Email Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover-glow active:animate-button-press transition-all duration-300 border-0 gpu-accelerated`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Sending...</span>
          </div>
        ) : (
          <span className="flex items-center justify-center space-x-2">
            <Send size={16} />
            <span>Send Reset Email</span>
          </span>
        )}
      </Button>
    </form>
  )
}