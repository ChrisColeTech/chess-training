import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryClient } from './lib/query-client'
import { useAuthStore } from './stores/authStore'
import { useThemeStore } from './stores/themeStore'
import { MainLayout } from './components/layout/MainLayout'
import { SplashScreen } from './pages/SplashScreen'
import { LoginPage } from './pages/auth/LoginPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'

// Auth navigator - handles auth redirects programmatically
function AuthNavigator() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/auth/login' || location.pathname === '/auth/forgot-password' || location.pathname === '/auth/register')) {
      navigate('/dashboard', { replace: true })
    }
    if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/auth/login' && location.pathname !== '/auth/forgot-password' && location.pathname !== '/auth/register' && location.pathname !== '/') {
      navigate('/auth/login', { replace: true })
    }
  }, [isAuthenticated, navigate, location.pathname])
  
  return null
}

// Route guards - now just check auth without Navigate components
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return null // AuthNavigator handles the redirect
  }
  
  return <MainLayout>{children}</MainLayout>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (isAuthenticated) {
    return null // AuthNavigator handles the redirect
  }
  
  return <>{children}</>
}

function App() {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen bg-gradient-to-br ${theme.background}`}>
        <Router>
          <AuthNavigator />
          <Routes>
            {/* Splash Screen - Entry point */}
            <Route path="/" element={<SplashScreen />} />
            
            {/* Public routes - redirect to dashboard if authenticated */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/auth/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/auth/forgot-password" element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            } />
            <Route path="/auth/register" element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } />
            
            {/* Protected routes - require authentication and use MainLayout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            {/* Placeholder routes for future pages */}
            <Route path="/play/computer" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Play vs Computer</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/play/online" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Online Games</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/puzzles/daily" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Daily Puzzles</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/puzzles/tactical" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Tactical Puzzles</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/puzzles/endgame" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Endgame Puzzles</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/progress/overview" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Progress Overview</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/progress/achievements" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Achievements</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/settings/preferences" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Preferences</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/settings/account" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Account Settings</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/help/tutorials" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Tutorials</h1></div>
              </ProtectedRoute>
            } />
            
            <Route path="/help/contact" element={
              <ProtectedRoute>
                <div className="p-6"><h1 className="text-2xl font-bold text-white">Contact</h1></div>
              </ProtectedRoute>
            } />
            
            {/* Catch all - redirect to splash handled by AuthNavigator */}
            <Route path="*" element={<SplashScreen />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  )
}

export default App