import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Keyboard } from 'lucide-react'
import { useThemeStore } from '../../stores/themeStore'
import { useSidebarNavigation } from '../../hooks/layout/useSidebarNavigation'
import { SidebarUserMenu } from '../user/UserMenu'
import { cn } from '../../lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar'
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import type { NavItem } from '../../constants/navigation'

export const ChessSidebar: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  const { state } = useSidebar()
  const { 
    navigationItems, 
    toggleExpanded, 
    isItemActive, 
    isItemExpanded
  } = useSidebarNavigation()

  const isCollapsed = state === 'collapsed'

  const renderNavItem = (item: NavItem) => {
    const isActive = isItemActive(item)
    const isExpanded = isItemExpanded(item.id)
    const hasChildren = item.children && item.children.length > 0
    const Icon = item.icon

    if (hasChildren) {
      return (
        <SidebarMenuItem key={item.id}>
          <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(item.id)}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={cn(
                  "w-full transition-all duration-200",
                  isActive && `bg-gradient-to-r ${theme.accent} text-white shadow-lg hover:opacity-90`,
                  !isActive && "hover:bg-white/10"
                )}
                data-active={isActive}
              >
                <Icon className="shrink-0" size={18} />
                <span className="font-medium">{item.title}</span>
                <ChevronRight 
                  className={cn(
                    "ml-auto transition-transform duration-200",
                    isExpanded && "rotate-90"
                  )} 
                  size={16} 
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenu>
                {item.children?.map(child => renderNavItem(child))}
              </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      )
    }

    // Leaf item with path
    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton
          asChild
          className={cn(
            "transition-all duration-200",
            isActive && `bg-gradient-to-r ${theme.accent} text-white shadow-lg hover:opacity-90`,
            !isActive && "hover:bg-white/10"
          )}
          data-active={isActive}
        >
          <Link to={item.path || '#'}>
            <Icon className="shrink-0" size={18} />
            <span className="font-medium">{item.title}</span>
            {isActive && !isCollapsed && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar 
      variant="inset"
      collapsible="icon"
      className={cn(
        "relative transition-all duration-300",
        theme.glassMorphism,
        "backdrop-blur-md border-r border-white/20"
      )}
    >
      {/* Header with User Profile */}
      <SidebarHeader className="p-4 border-b border-white/10">
        <SidebarUserMenu />
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 text-xs font-medium px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map(item => renderNavItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Shortcuts Info */}
      <SidebarFooter className="p-4 border-t border-white/10">
        {!isCollapsed && (
          <div className="flex items-center justify-center space-x-1 text-xs text-white/50">
            <Keyboard size={12} />
            <span>Ctrl+B to toggle</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}