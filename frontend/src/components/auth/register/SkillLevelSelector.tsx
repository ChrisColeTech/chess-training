import React from 'react'
import { Label } from "@/components/ui/label"
import { type SkillLevelOption } from '@/types/register'
import { type Theme } from '@/stores/themeStore'

/**
 * Skill Level Selector Component
 * Following SRP - Page-specific component extraction
 * Based on ARCHITECTURE.md component extraction requirements
 */

interface SkillLevelSelectorProps {
  skillLevels: SkillLevelOption[]
  selectedSkillLevel: string
  register: any // react-hook-form register function
  error?: string
  theme: Theme
}

export const SkillLevelSelector: React.FC<SkillLevelSelectorProps> = ({
  skillLevels,
  selectedSkillLevel,
  register,
  error,
  theme
}) => {
  return (
    <div className="space-y-3">
      <Label className={`text-sm font-medium ${theme.text}`}>
        Chess Skill Level
      </Label>
      <div className="grid grid-cols-1 gap-3">
        {skillLevels.map((level) => {
          const IconComponent = level.icon
          const isSelected = selectedSkillLevel === level.value
          
          return (
            <label
              key={level.value}
              className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-500/20 border-blue-500 ring-2 ring-blue-500/50'
                  : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                value={level.value}
                {...register('skillLevel')}
                className="sr-only"
              />
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-4 ${
                isSelected ? 'bg-blue-500' : 'bg-gray-700'
              }`}>
                <IconComponent size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className={`font-semibold ${theme.text}`}>{level.label}</div>
                <div className="text-sm text-gray-400">{level.description}</div>
                <div className="text-xs text-gray-500 mt-1">ELO: {level.rating}</div>
              </div>
              {isSelected && (
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </label>
          )
        })}
      </div>
      {error && (
        <p className="text-sm text-red-400 animate-slide-down">
          {error}
        </p>
      )}
    </div>
  )
}