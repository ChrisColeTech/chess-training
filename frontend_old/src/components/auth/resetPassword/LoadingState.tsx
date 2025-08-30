import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { UI_TEXT } from './constants'

interface LoadingStateProps {
  theme: any
}

export const LoadingState: React.FC<LoadingStateProps> = ({ theme }) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4`}>
      <Card className="w-full max-w-md relative z-10 bg-gray-900 border-gray-700 shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className={`${theme.text}`}>{UI_TEXT.VALIDATING}</p>
        </CardContent>
      </Card>
    </div>
  )
}