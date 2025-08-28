import React from 'react'
import { Shield } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { GiSwordsPower } from 'react-icons/gi'
import type { PuzzleTabsProps } from '@/types/openingPuzzles'

/**
 * Tabbed interface for puzzle theory, analysis, and defense information
 * Follows the style guide for theme integration and animations
 */
export const PuzzleTabs: React.FC<PuzzleTabsProps> = ({
  puzzle,
  theme
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FaBrain className="w-4 h-4" />
          Opening Theory
        </h3>
        <div className="space-y-3">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.primary}/10 border border-white/10`}>
            <h4 className="font-medium text-sm mb-2">Why This Works:</h4>
            <p className="text-sm opacity-90">{puzzle.theory}</p>
          </div>
          
          <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.accent}/10 border border-white/10`}>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
              <GiSwordsPower className="w-3 h-3" />
              The Trap:
            </h4>
            <p className="text-sm opacity-90">{puzzle.trap}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          How to Defend
        </h3>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.highlight}/10 border border-white/10`}>
          <h4 className="font-medium text-sm mb-2">Prevention:</h4>
          <p className="text-sm opacity-90">{puzzle.prevention}</p>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-2">Key Principles:</h4>
          <ul className="space-y-1 text-sm opacity-90">
            <li>• Develop knights before bishops</li>
            <li>• Don't neglect king safety</li>
            <li>• Control the center early</li>
            <li>• Watch for weak squares like f7/f2</li>
          </ul>
        </div>
      </div>
    </div>
  )
}