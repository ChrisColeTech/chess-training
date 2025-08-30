import React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Theme } from '@/stores/themeStore'

/**
 * Password Field Component
 * Following SRP - Page-specific component extraction
 * Based on ARCHITECTURE.md component extraction requirements
 */

interface PasswordFieldProps {
  id: string
  label: string
  placeholder: string
  showPassword: boolean
  onTogglePassword: () => void
  register: any // react-hook-form register function
  error?: string
  theme: Theme
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  placeholder,
  showPassword,
  onTogglePassword,
  register,
  error,
  theme
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={`text-sm font-medium ${theme.text}`}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors pr-10"
          {...register(id)}
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
      {error && (
        <p className="text-sm text-red-400 animate-slide-down">
          {error}
        </p>
      )}
    </div>
  )
}