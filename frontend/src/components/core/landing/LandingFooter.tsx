/**
 * Landing Footer Component
 * Footer section for the landing page
 */

import React from 'react'
import type { LandingFooterProps } from '@/types/landing'
import { FaChessKing } from 'react-icons/fa'

export const LandingFooter: React.FC<LandingFooterProps> = ({
  theme
}) => {
  return (
    <footer className="relative z-10 px-6 py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className={`w-10 h-10 bg-gradient-to-br ${theme.primary} rounded-lg flex items-center justify-center`}>
              <span className="text-lg font-bold text-white"><FaChessKing className="w-4 h-4 inline" /></span>
            </div>
            <span className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Chess Training
            </span>
          </div>
          <div className="text-sm text-gray-400">
            © 2024 Chess Training. All rights reserved. Powered by Stockfish Engine.
          </div>
        </div>
      </div>
    </footer>
  )
}