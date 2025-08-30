import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './stores/authStore'
import { DesktopAppLayout } from './components/layout/DesktopAppLayout'
import { SplashScreen } from './pages/SplashScreen'
import { LoginPage } from './pages/auth/LoginPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'

// Play pages
import PlayComputerPage from './pages/play/PlayComputerPage'
import AnalysisBoardPage from './pages/play/AnalysisBoardPage'
import GameReviewPage from './pages/play/GameReviewPage'

// Puzzle pages
import TacticalPuzzlesPage from './pages/puzzles/TacticalPuzzlesPage'
import EndgamePuzzlesPage from './pages/puzzles/EndgamePuzzlesPage'
import PuzzleSelectionPage from './pages/puzzles/PuzzleSelectionPage'

// Progress pages
import ProgressOverviewPage from './pages/progress/ProgressOverviewPage'
import AchievementsPage from './pages/progress/AchievementsPage'
import LearningPathPage from './pages/progress/LearningPathPage'

// Settings pages
import PreferencesPage from './pages/settings/PreferencesPage'
import BoardSettingsPage from './pages/settings/BoardSettingsPage'
import AccountPage from './pages/settings/AccountPage'

// Help pages
import HelpCenterPage from './pages/help/HelpCenterPage'
import TutorialsPage from './pages/help/TutorialsPage'
import ContactPage from './pages/help/ContactPage'

// Profile page
import ProfilePage from './pages/profile/ProfilePage'

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
  
  return <DesktopAppLayout>{children}</DesktopAppLayout>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (isAuthenticated) {
    return null // AuthNavigator handles the redirect
  }
  
  return <>{children}</>
}

function App() {
  return (
    <>
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
            
            {/* Play routes */}
            <Route path="/play/computer" element={
              <ProtectedRoute>
                <PlayComputerPage />
              </ProtectedRoute>
            } />
            
            <Route path="/play/analysis" element={
              <ProtectedRoute>
                <AnalysisBoardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/play/review" element={
              <ProtectedRoute>
                <GameReviewPage />
              </ProtectedRoute>
            } />
            
            {/* Puzzle routes */}
            <Route path="/puzzles" element={
              <ProtectedRoute>
                <PuzzleSelectionPage />
              </ProtectedRoute>
            } />
            
            <Route path="/puzzles/tactical" element={
              <ProtectedRoute>
                <TacticalPuzzlesPage />
              </ProtectedRoute>
            } />
            
            <Route path="/puzzles/endgame" element={
              <ProtectedRoute>
                <EndgamePuzzlesPage />
              </ProtectedRoute>
            } />
            
            {/* Progress routes */}
            <Route path="/progress" element={
              <ProtectedRoute>
                <ProgressOverviewPage />
              </ProtectedRoute>
            } />
            
            <Route path="/progress/achievements" element={
              <ProtectedRoute>
                <AchievementsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/progress/learning" element={
              <ProtectedRoute>
                <LearningPathPage />
              </ProtectedRoute>
            } />
            
            {/* Profile route */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Settings routes */}
            <Route path="/settings/preferences" element={
              <ProtectedRoute>
                <PreferencesPage />
              </ProtectedRoute>
            } />
            
            <Route path="/settings/board" element={
              <ProtectedRoute>
                <BoardSettingsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/settings/account" element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            } />
            
            {/* Help routes */}
            <Route path="/help" element={
              <ProtectedRoute>
                <HelpCenterPage />
              </ProtectedRoute>
            } />
            
            <Route path="/help/tutorials" element={
              <ProtectedRoute>
                <TutorialsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/help/contact" element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            } />
            
            {/* Catch all - redirect to splash handled by AuthNavigator */}
            <Route path="*" element={<SplashScreen />} />
          </Routes>
    </>
  )
}

export default App