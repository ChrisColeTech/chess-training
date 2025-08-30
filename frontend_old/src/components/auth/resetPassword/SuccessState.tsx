import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UI_TEXT, SUCCESS_MESSAGES } from './constants'

interface SuccessStateProps {
  theme: any
  onContinueToLogin: () => void
}

export const SuccessState: React.FC<SuccessStateProps> = ({ 
  theme, 
  onContinueToLogin 
}) => {
  return (
    <>
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-xl flex items-center justify-center">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <CardTitle className="text-green-400">{UI_TEXT.SUCCESS_TITLE}</CardTitle>
        <CardDescription className={`${theme.text} opacity-80`}>
          {UI_TEXT.SUCCESS_DESCRIPTION}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className={`${theme.text}`}>
          {UI_TEXT.SUCCESS_INFO}
        </p>
        <p className="text-sm text-gray-400">
          {SUCCESS_MESSAGES.redirecting}
        </p>
        <Link to="/auth/login">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={onContinueToLogin}
          >
            {UI_TEXT.CONTINUE_TO_LOGIN}
          </Button>
        </Link>
      </CardContent>
    </>
  )
}