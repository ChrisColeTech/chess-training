import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useThemeStore } from './stores/themeStore'
import { useAuthStore } from './stores/authStore'
import { SplashPage } from './pages/SplashPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import './styles/gaming-animations.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Zustand stores
  const { initializeTheme, isInitialized: themeInitialized } = useThemeStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize theme first to prevent flicker
      await initializeTheme()
      setIsInitialized(true)
    }
    initializeApp()
  }, [initializeTheme])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Don't show anything until theme is loaded to prevent flicker
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (isLoading) {
    return <SplashPage onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App