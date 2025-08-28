import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore } from './stores/themeStore'
import { useAuthStore } from './stores/authStore'
import { SplashPage } from './pages/SplashPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { ProfilePage } from './pages/ProfilePage'
import { PageTransition } from './components/PageTransition'
import { MainLayout } from './components/layout/MainLayout'
import { DesktopAppLayout } from './components/layout/DesktopAppLayout'

// Puzzle pages
import TacticalPuzzlesPage from './pages/puzzles/TacticalPuzzlesPage'
import EndgamePuzzlesPage from './pages/puzzles/EndgamePuzzlesPage'
import OpeningPuzzlesPage from './pages/puzzles/OpeningPuzzlesPage'
import CustomPuzzlesPage from './pages/puzzles/CustomPuzzlesPage'
import PuzzleSelectionPage from './pages/puzzles/PuzzleSelectionPage'

// Play pages
import PlayComputerPage from './pages/play/PlayComputerPage'
import AnalysisBoardPage from './pages/play/AnalysisBoardPage'
import GameReviewPage from './pages/play/GameReviewPage'


// Progress pages
import ProgressOverviewPage from './pages/progress/ProgressOverviewPage'
import DetailedStatsPage from './pages/progress/DetailedStatsPage'
import AchievementsPage from './pages/progress/AchievementsPage'
import LearningPathPage from './pages/progress/LearningPathPage'

// Settings pages
import PreferencesPage from './pages/settings/PreferencesPage'
import BoardSettingsPage from './pages/settings/BoardSettingsPage'
import NotificationsPage from './pages/settings/NotificationsPage'
import AccountPage from './pages/settings/AccountPage'

// Help pages
import HelpCenterPage from './pages/help/HelpCenterPage'
import TutorialsPage from './pages/help/TutorialsPage'
import ContactPage from './pages/help/ContactPage'

import './styles/gaming-animations.css'

// Auth-aware home route component
const AuthAwareHome: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  
  // For authenticated users, show dashboard directly (no marketing flash)
  if (isAuthenticated) {
    return (
      <PageTransition direction="fade">
        <DashboardPage />
      </PageTransition>
    )
  }
  
  // Desktop app - go directly to login (no marketing pages in desktop apps)
  return (
    <PageTransition direction="slide-right">
      <LoginPage />
    </PageTransition>
  )
}

// Protected route for authenticated users only
const AuthProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  
  if (!isAuthenticated) {
    return (
      <PageTransition direction="slide-right">
        <LoginPage />
      </PageTransition>
    )
  }
  
  return <>{children}</>
}

// Public route for unauthenticated users only (redirect authenticated users to dashboard)
const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  
  if (isAuthenticated) {
    return (
      <PageTransition direction="fade">
        <DashboardPage />
      </PageTransition>
    )
  }
  
  return <>{children}</>
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Zustand stores
  const { initializeTheme } = useThemeStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize theme synchronously first to prevent flicker
      await initializeTheme()
      // Ensure theme is applied before showing any routing
      await new Promise(resolve => setTimeout(resolve, 50))
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
      <DesktopAppLayout>
        <MainLayout>
          <Routes>
        {/* Auth-aware home route - no marketing flash for authenticated users */}
        <Route 
          path="/" 
          element={<AuthAwareHome />} 
        />
        
        {/* Authentication routes - redirect authenticated users to dashboard */}
        <Route 
          path="/login" 
          element={
            <PublicOnlyRoute>
              <PageTransition direction="slide-right">
                <LoginPage />
              </PageTransition>
            </PublicOnlyRoute>
          } 
        />
        <Route 
          path="/auth/register" 
          element={
            <PublicOnlyRoute>
              <PageTransition direction="slide-right">
                <RegisterPage />
              </PageTransition>
            </PublicOnlyRoute>
          } 
        />
        <Route 
          path="/auth/forgot-password" 
          element={
            <PublicOnlyRoute>
              <PageTransition direction="slide-right">
                <ForgotPasswordPage />
              </PageTransition>
            </PublicOnlyRoute>
          } 
        />
        <Route 
          path="/auth/reset/:token" 
          element={
            <PublicOnlyRoute>
              <PageTransition direction="slide-right">
                <ResetPasswordPage />
              </PageTransition>
            </PublicOnlyRoute>
          } 
        />
        
        {/* Main app routes - require authentication */}
        <Route 
          path="/dashboard" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <DashboardPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <ProfilePage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />

        {/* Puzzle routes - require authentication */}
        <Route 
          path="/puzzles" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <PuzzleSelectionPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/puzzles/tactical" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <TacticalPuzzlesPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/puzzles/endgame" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <EndgamePuzzlesPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/puzzles/opening" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <OpeningPuzzlesPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/puzzles/custom" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <CustomPuzzlesPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />

        {/* Play routes - require authentication */}
        <Route 
          path="/play/computer" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <PlayComputerPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/play/analysis" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <AnalysisBoardPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/play/review" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <GameReviewPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />


        {/* Progress routes - require authentication */}
        <Route 
          path="/progress/overview" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <ProgressOverviewPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/progress/detailed-stats" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <DetailedStatsPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/progress/achievements" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <AchievementsPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/progress/learning-path" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <LearningPathPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />

        {/* Settings routes - require authentication */}
        <Route 
          path="/settings/preferences" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <PreferencesPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/settings/board" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <BoardSettingsPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/settings/notifications" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <NotificationsPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/settings/account" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <AccountPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />

        {/* Help routes - require authentication */}
        <Route 
          path="/help/center" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <HelpCenterPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/help/tutorials" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <TutorialsPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/help/contact" 
          element={
            <AuthProtectedRoute>
              <PageTransition direction="slide-left">
                <ContactPage />
              </PageTransition>
            </AuthProtectedRoute>
          } 
        />
          </Routes>
        </MainLayout>
      </DesktopAppLayout>
    </Router>
  )
}

export default App