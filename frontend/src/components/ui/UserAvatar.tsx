import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserAvatar } from '@/hooks/user/useUserAvatar'
import { useThemeStore } from '@/stores/themeStore'
import { cn } from '@/lib/utils'

const userAvatarVariants = cva(
  "relative overflow-hidden ring-2 ring-offset-2 ring-offset-background",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg"
      },
      variant: {
        default: "ring-border",
        themed: "ring-current", // Uses theme color
        elo: "ring-current",    // Uses ELO-based color
        ghost: "ring-transparent"
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default"
    }
  }
)

export interface UserAvatarProps 
  extends React.ComponentPropsWithoutRef<typeof Avatar>,
    VariantProps<typeof userAvatarVariants> {
  showEloRing?: boolean
  userId?: string // For future use when showing other users
}

export const UserAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  UserAvatarProps
>(({ className, size, variant, showEloRing = false, userId, ...props }, ref) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  const { src, fallbackText, eloColorScheme } = useUserAvatar()

  // Determine classes based on variant
  const getAvatarClasses = () => {
    const baseClasses = userAvatarVariants({ size, variant })
    
    if (variant === 'elo' || showEloRing) {
      return cn(baseClasses, eloColorScheme.ringClass)
    }
    
    if (variant === 'themed') {
      // Use theme-based ring color
      const themeRingClass = theme.accent.includes('cyan') ? 'ring-cyan-500' :
                            theme.accent.includes('amber') ? 'ring-amber-500' :
                            'ring-blue-500'
      return cn(baseClasses, themeRingClass)
    }
    
    return baseClasses
  }

  // Determine background for fallback
  const getFallbackBackground = () => {
    if (variant === 'elo' || showEloRing) {
      return `bg-gradient-to-br ${eloColorScheme.gradient}`
    }
    if (variant === 'themed') {
      return `bg-gradient-to-br ${theme.accent}`
    }
    // For default variant, use shadcn's muted background for consistency
    return 'bg-muted'
  }

  const fallbackBg = getFallbackBackground()

  return (
    <Avatar
      ref={ref}
      className={cn(getAvatarClasses(), className)}
      {...props}
    >
      {src && <AvatarImage src={src} alt={`Avatar`} />}
      <AvatarFallback 
        className={cn(
          "font-semibold text-white",
          fallbackBg
        )}
      >
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  )
})

UserAvatar.displayName = "UserAvatar"

// Convenience components for common use cases
export const HeaderUserAvatar: React.FC = () => (
  <UserAvatar variant="themed" size="default" />
)

export const SidebarUserAvatar: React.FC = () => (
  <UserAvatar variant="elo" size="lg" showEloRing />
)

export const ProfileUserAvatar: React.FC = () => (
  <UserAvatar variant="elo" size="xl" showEloRing />
)