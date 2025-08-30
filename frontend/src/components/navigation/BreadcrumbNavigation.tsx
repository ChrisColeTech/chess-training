import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { useThemeStore } from '../../stores/themeStore'
import { useBreadcrumbs } from '../../hooks/navigation/useBreadcrumbs'
import { cn } from '../../lib/utils'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

interface BreadcrumbNavigationProps {
  className?: string
  showHomeIcon?: boolean
  variant?: 'default' | 'minimal' | 'glass'
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  className,
  showHomeIcon = true,
  variant = 'default'
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  const { items, hasMultipleItems } = useBreadcrumbs()

  // Don't render if only one item (current page) and no parents
  if (!hasMultipleItems) {
    return null
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return cn(
          "p-3 rounded-lg backdrop-blur-sm border border-white/10",
          theme.glassMorphism
        )
      case 'minimal':
        return "py-2"
      default:
        return cn(
          "p-4 rounded-lg border border-white/20",
          "bg-gradient-to-r", theme.background,
          "shadow-lg"
        )
    }
  }

  return (
    <div className={cn(getVariantStyles(), className)}>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <React.Fragment key={item.path}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage
                      className={cn(
                        "text-white font-medium transition-colors duration-200",
                        "flex items-center space-x-2"
                      )}
                    >
                      {index === 0 && showHomeIcon && <Home size={16} />}
                      <span>{item.label}</span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      asChild
                      className={cn(
                        "text-white/70 hover:text-white transition-all duration-200",
                        "hover:bg-white/10 px-2 py-1 rounded-md",
                        "flex items-center space-x-2"
                      )}
                    >
                      <Link to={item.path}>
                        {index === 0 && showHomeIcon && <Home size={16} />}
                        <span>{item.label}</span>
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight 
                      size={16} 
                      className={cn(
                        "text-white/50 transition-colors duration-200",
                        "group-hover:text-white/70"
                      )} 
                    />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

// Convenience components for different use cases
export const PageBreadcrumbs: React.FC<{ className?: string }> = ({ className }) => (
  <BreadcrumbNavigation variant="default" className={className} />
)

export const GlassBreadcrumbs: React.FC<{ className?: string }> = ({ className }) => (
  <BreadcrumbNavigation variant="glass" className={className} />
)

export const MinimalBreadcrumbs: React.FC<{ className?: string }> = ({ className }) => (
  <BreadcrumbNavigation variant="minimal" showHomeIcon={false} className={className} />
)