import React from 'react'
import { MoreHorizontal, Crown, ChevronDown } from 'lucide-react'
import { useThemeStore } from '../../stores/themeStore'
import { useUserMenu } from '../../hooks/user/useUserMenu'
import { SidebarUserAvatar } from '../ui/UserAvatar'
import { cn } from '../../lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import type { UserMenuItem } from '../../constants/userMenu'

interface UserMenuProps {
  variant?: 'avatar' | 'button' | 'minimal'
  size?: 'sm' | 'default' | 'lg'
  showUsername?: boolean
  showELO?: boolean
  className?: string
}

export const UserMenu: React.FC<UserMenuProps> = ({
  variant = 'avatar',
  size = 'default',
  showUsername = true,
  showELO = true,
  className
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  const { menuItems, user, isPremium, handleItemClick } = useUserMenu()

  const renderTrigger = () => {
    switch (variant) {
      case 'button':
        return (
          <Button
            variant="ghost"
            size={size}
            className={cn(
              "transition-all duration-200 text-white/80 hover:text-white",
              "hover:bg-white/10 gap-2",
              className
            )}
          >
            <SidebarUserAvatar />
            {showUsername && size !== 'sm' && (
              <span className="hidden md:inline">
                {user?.username || 'Menu'}
              </span>
            )}
            <ChevronDown size={16} className="text-white/60" />
          </Button>
        )
        
      case 'minimal':
        return (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-8 h-8 p-0 rounded-full transition-all duration-200",
              "text-white/80 hover:text-white hover:bg-white/10",
              className
            )}
          >
            <MoreHorizontal size={16} />
          </Button>
        )
        
      default: // avatar
        return (
          <div className={cn(
            "flex items-center space-x-3 cursor-pointer rounded-lg transition-all duration-200",
            "hover:bg-white/10 p-2 group",
            className
          )}>
            <SidebarUserAvatar />
            {(showUsername || showELO) && size !== 'sm' && (
              <div className="flex-1 min-w-0 hidden md:block">
                {showUsername && (
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.username || 'Player'}
                    </p>
                    {isPremium && (
                      <Crown size={12} className="text-yellow-400 flex-shrink-0" />
                    )}
                  </div>
                )}
                {showELO && (
                  <p className="text-xs text-white/70">
                    ELO: {user?.chess_elo || 1200}
                  </p>
                )}
              </div>
            )}
            <ChevronDown 
              size={16} 
              className="text-white/60 group-hover:text-white/80 transition-colors duration-200 hidden md:block" 
            />
          </div>
        )
    }
  }

  const renderMenuItem = (item: UserMenuItem) => {
    if (item.separator) {
      return <DropdownMenuSeparator key={item.id} />
    }

    const Icon = item.icon
    
    return (
      <DropdownMenuItem
        key={item.id}
        onClick={() => handleItemClick(item)}
        className={cn(
          "cursor-pointer transition-all duration-200 gap-3",
          "hover:bg-white/10 focus:bg-white/10",
          item.variant === 'destructive' && "text-red-400 hover:text-red-300 hover:bg-red-500/20"
        )}
      >
        {Icon && <Icon size={16} className="flex-shrink-0" />}
        <span className="flex-1">{item.label}</span>
        {item.shortcut && (
          <DropdownMenuShortcut className="text-white/50">
            {item.shortcut}
          </DropdownMenuShortcut>
        )}
      </DropdownMenuItem>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {renderTrigger()}
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        align="end"
        side="bottom"
        className={cn(
          "w-64 p-2 backdrop-blur-sm border border-white/20",
          theme.glassMorphism,
          "text-white"
        )}
      >
        {/* User Info Header */}
        <DropdownMenuLabel className="text-white">
          <div className="flex items-center space-x-3 py-2">
            <SidebarUserAvatar />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-white truncate">
                  {user?.username || 'Player'}
                </p>
                {isPremium && (
                  <Crown size={12} className="text-yellow-400" />
                )}
              </div>
              <p className="text-xs text-white/70">
                {user?.email || `ELO: ${user?.chess_elo || 1200}`}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {/* Menu Items */}
        {menuItems.map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Convenience components for different use cases
export const SidebarUserMenu: React.FC = () => (
  <UserMenu variant="avatar" showUsername showELO />
)

export const HeaderUserMenu: React.FC = () => (
  <UserMenu variant="button" size="sm" showUsername={false} showELO={false} />
)

export const CompactUserMenu: React.FC = () => (
  <UserMenu variant="minimal" size="sm" />
)