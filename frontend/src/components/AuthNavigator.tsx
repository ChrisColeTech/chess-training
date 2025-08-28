import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export const AuthNavigator: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Handle authentication-based navigation
    const currentPath = window.location.hash.replace('#', '') || '/'
    
    if (isAuthenticated && (currentPath === '/' || currentPath === '/login')) {
      // User is authenticated but on login page - redirect to dashboard
      navigate('/dashboard', { replace: true })
    } else if (!isAuthenticated && currentPath === '/dashboard') {
      // User is not authenticated but trying to access dashboard - redirect to login
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return null // This component only handles navigation logic
}