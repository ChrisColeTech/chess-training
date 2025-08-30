import React from 'react'
import { Link } from 'react-router-dom'
import { XCircle, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UI_TEXT } from './constants'

interface InvalidTokenStateProps {
  theme: any
  onRequestNewLink: () => void
  onBackToLogin: () => void
}

export const InvalidTokenState: React.FC<InvalidTokenStateProps> = ({ 
  theme, 
  onRequestNewLink, 
  onBackToLogin 
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4`}>
      <Card className="w-full max-w-md relative z-10 bg-gray-900 border-gray-700 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center">
            <XCircle size={32} className="text-red-400" />
          </div>
          <CardTitle className="text-red-400">{UI_TEXT.INVALID_TITLE}</CardTitle>
          <CardDescription className={`${theme.text} opacity-80`}>
            {UI_TEXT.INVALID_DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={`text-sm ${theme.text} opacity-60 text-center`}>
            {UI_TEXT.EXPIRY_INFO}
          </p>
          <Link to="/auth/forgot-password">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onRequestNewLink}
            >
              {UI_TEXT.REQUEST_NEW_LINK}
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button 
              variant="outline"
              className="w-full bg-black/20 border-white/20 text-white hover:bg-black/30"
              onClick={onBackToLogin}
            >
              <ArrowLeft size={16} className="mr-2" />
              {UI_TEXT.BACK_TO_LOGIN}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}