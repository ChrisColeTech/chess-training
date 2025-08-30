import React from 'react'
import { useThemeStore } from '../../stores/themeStore'
import { cn } from '../../lib/utils'
import { Alert, AlertDescription, AlertTitle } from './alert'
import { ALERT_VARIANTS } from '../../constants/notifications'
import type { AlertVariantType } from '../../constants/notifications'

interface ChessAlertProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  title?: string
  description?: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  className?: string
  children?: React.ReactNode
  onClose?: () => void
  preset?: AlertVariantType
}

export const ChessAlert: React.FC<ChessAlertProps> = ({
  variant = 'default',
  title,
  description,
  icon: CustomIcon,
  className,
  children,
  onClose,
  preset
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Use preset configuration if provided
  const presetConfig = preset ? ALERT_VARIANTS[preset] : null
  const finalVariant = presetConfig?.variant || variant
  const finalTitle = presetConfig?.title || title
  const finalDescription = presetConfig?.description || description
  const FinalIcon = presetConfig?.icon || CustomIcon

  const getVariantStyles = () => {
    switch (finalVariant) {
      case 'destructive':
        return cn(
          "border-red-500/20 bg-red-500/10 text-red-300",
          "backdrop-blur-sm"
        )
      case 'success':
        return cn(
          "border-green-500/20 bg-green-500/10 text-green-300",
          "backdrop-blur-sm"
        )
      case 'warning':
        return cn(
          "border-yellow-500/20 bg-yellow-500/10 text-yellow-300", 
          "backdrop-blur-sm"
        )
      default:
        return cn(
          "border-white/20 backdrop-blur-sm",
          theme.glassMorphism,
          "text-white"
        )
    }
  }

  const getIconColor = () => {
    switch (finalVariant) {
      case 'destructive':
        return 'text-red-400'
      case 'success':
        return 'text-green-400'
      case 'warning':
        return 'text-yellow-400'
      default:
        return 'text-blue-400'
    }
  }

  return (
    <Alert 
      variant={finalVariant === 'success' || finalVariant === 'warning' ? 'default' : finalVariant}
      className={cn(
        getVariantStyles(),
        "transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start space-x-3">
        {FinalIcon && (
          <FinalIcon 
            size={20} 
            className={cn("flex-shrink-0 mt-0.5", getIconColor())} 
          />
        )}
        
        <div className="flex-1 min-w-0">
          {finalTitle && (
            <AlertTitle className="text-white font-medium mb-1">
              {finalTitle}
            </AlertTitle>
          )}
          
          {finalDescription && (
            <AlertDescription className="text-white/80 text-sm leading-relaxed">
              {finalDescription}
            </AlertDescription>
          )}
          
          {children}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              "flex-shrink-0 p-1 rounded-full transition-colors duration-200",
              "hover:bg-white/10 text-white/60 hover:text-white/80"
            )}
            aria-label="Close alert"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </Alert>
  )
}

// Convenience components for common use cases
export const SuccessAlert: React.FC<Omit<ChessAlertProps, 'variant'>> = (props) => (
  <ChessAlert variant="success" {...props} />
)

export const ErrorAlert: React.FC<Omit<ChessAlertProps, 'variant'>> = (props) => (
  <ChessAlert variant="destructive" {...props} />
)

export const WarningAlert: React.FC<Omit<ChessAlertProps, 'variant'>> = (props) => (
  <ChessAlert variant="warning" {...props} />
)

export const InfoAlert: React.FC<Omit<ChessAlertProps, 'variant'>> = (props) => (
  <ChessAlert variant="default" {...props} />
)

// Preset-based convenience components
export const ConnectionErrorAlert: React.FC<Omit<ChessAlertProps, 'preset'>> = (props) => (
  <ChessAlert preset="CONNECTION_ERROR" {...props} />
)

export const PremiumFeatureAlert: React.FC<Omit<ChessAlertProps, 'preset'>> = (props) => (
  <ChessAlert preset="PREMIUM_FEATURE" {...props} />
)