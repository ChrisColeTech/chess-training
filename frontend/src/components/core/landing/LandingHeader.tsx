/**
 * Landing Header Component
 * Navigation header for the landing page
 */

import React from 'react'
import { Button } from "@/components/ui/button"
import type { LandingHeaderProps } from '@/types/landing'
import { FaChessKing } from 'react-icons/fa'

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  theme,
  onSignIn,
  onGetStarted
}) => {
  return (
    <header className="relative z-50 w-full px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
            <span className="text-xl font-bold text-white"><FaChessKing className="w-4 h-4 inline" /></span>
          </div>
          <span className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            Chess Training
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline"
            onClick={onSignIn}
            className="bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
          >
            Sign In
          </Button>
          <Button 
            onClick={onGetStarted}
            className={`bg-gradient-to-r ${theme.primary} text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}