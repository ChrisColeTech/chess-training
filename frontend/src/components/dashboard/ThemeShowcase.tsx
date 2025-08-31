import React from 'react'
import { cn } from '../../lib/utils'
import { useThemeSelection } from '../../hooks/useThemeSelection'
import { THEME_DISPLAY_DATA } from '../../data/themeData'
import type { ThemeShowcaseProps } from '../../types/components'

/**
 * ThemeShowcase - Pure UI Component Following SRP
 * Single Responsibility: Render theme selection UI only
 * No hooks logic, no data definitions, no business logic
 * Pure presentation that delegates to theme selection hook
 */
export const ThemeShowcase: React.FC<ThemeShowcaseProps> = () => {
  const {
    currentTheme,
    handleThemeSwitch,
    handleThemeHover,
    isThemeActive,
    isThemeHovered
  } = useThemeSelection()
  
  return (
    <div className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1 text-white">EXPERIENCE THEMES</h2>
          <p className="text-white/70 text-sm">Choose your gaming aesthetic</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-white/70">Current Theme:</div>
          <div className="text-lg font-bold text-white">
            {currentTheme.name}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        {THEME_DISPLAY_DATA.map((theme) => {
          const isActive = isThemeActive(theme.id)
          const isHovered = isThemeHovered(theme.id)
          
          return (
            <button
              key={theme.id}
              onClick={() => handleThemeSwitch(theme.id)}
              onMouseEnter={() => handleThemeHover(theme.id)}
              onMouseLeave={() => handleThemeHover(null)}
              className={cn(
                "relative group p-4 rounded-xl border-2 transition-all duration-500",
                "hover:scale-105 hover:-translate-y-2 hover:shadow-2xl",
                "transform-gpu backface-hidden",
                isActive 
                  ? "border-primary shadow-lg scale-105 -translate-y-1" 
                  : "border-border hover:border-primary/50",
                `bg-gradient-to-br ${theme.gradient}`
              )}
            >
              {theme.particles && (
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse" />
                </div>
              )}
              
              <div className="relative z-10 text-center">
                <div className="mb-2 transform group-hover:scale-110 transition-transform flex justify-center">
                  <theme.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="text-white font-bold text-xs leading-tight whitespace-pre-line">
                  {theme.shortName}
                </div>
                
                <div className="text-white/80 text-xs mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {theme.description}
                </div>
              </div>
              
              {isActive && (
                <>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-primary/20 rounded-xl animate-pulse" />
                </>
              )}
              
              {(isHovered || isActive) && (
                <div 
                  className={cn(
                    "absolute inset-0 rounded-xl blur-sm opacity-50 scale-110 transition-all duration-300",
                    `bg-gradient-to-br ${theme.gradient}`
                  )}
                />
              )}
            </button>
          )
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-white/70 text-sm">
          Click any theme to experience the full aesthetic transformation with animated backgrounds
        </p>
      </div>
    </div>
  )
}