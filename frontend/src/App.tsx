import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import { useAuthStore } from './stores/authStore'
import { useThemeStore } from './stores/themeStore'
import { MainLayout } from './components/layout/MainLayout'
import { SplashScreen } from './pages/SplashScreen'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { TailwindTest } from './TailwindTest'

// Route guards following research-compliant auth pattern
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <MainLayout>{children}</MainLayout>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
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
          <Routes>
            {/* Splash Screen - Entry point */}
            <Route path="/" element={<SplashScreen />} />
            
            {/* Public routes - redirect to dashboard if authenticated */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
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
            
            {/* Catch all - redirect to splash */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  )
}

export default App