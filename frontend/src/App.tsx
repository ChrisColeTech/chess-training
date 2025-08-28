import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore } from './stores/themeStore'
import { SplashPage } from './pages/SplashPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { LandingPage } from './pages/LandingPage'
import { ProfilePage } from './pages/ProfilePage'
import { PageTransition } from './components/PageTransition'
import { AuthNavigator } from './components/AuthNavigator'
import { MainLayout } from './components/layout/MainLayout'

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

// Study pages
import OpeningExplorerPage from './pages/study/OpeningExplorerPage'
import EndgameLibraryPage from './pages/study/EndgameLibraryPage'
import MasterGamesPage from './pages/study/MasterGamesPage'
import StudyPlansPage from './pages/study/StudyPlansPage'

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

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Zustand stores
  const { initializeTheme } = useThemeStore()
  // const { isAuthenticated } = useAuthStore() // Unused for now

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
      <AuthNavigator />
      <MainLayout>
        <Routes>
        {/* Landing page as home */}
        <Route 
          path="/" 
          element={
            <PageTransition direction="fade">
              <LandingPage />
            </PageTransition>
          } 
        />
        
        {/* Authentication routes */}
        <Route 
          path="/login" 
          element={
            <PageTransition direction="slide-right">
              <LoginPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/auth/register" 
          element={
            <PageTransition direction="slide-right">
              <RegisterPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/auth/forgot-password" 
          element={
            <PageTransition direction="slide-right">
              <ForgotPasswordPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/auth/reset/:token" 
          element={
            <PageTransition direction="slide-right">
              <ResetPasswordPage />
            </PageTransition>
          } 
        />
        
        {/* Main app routes */}
        <Route 
          path="/dashboard" 
          element={
            <PageTransition direction="slide-left">
              <DashboardPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PageTransition direction="slide-left">
              <ProfilePage />
            </PageTransition>
          } 
        />

        {/* Puzzle routes */}
        <Route 
          path="/puzzles" 
          element={
            <PageTransition direction="slide-left">
              <PuzzleSelectionPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/puzzles/tactical" 
          element={
            <PageTransition direction="slide-left">
              <TacticalPuzzlesPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/puzzles/endgame" 
          element={
            <PageTransition direction="slide-left">
              <EndgamePuzzlesPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/puzzles/opening" 
          element={
            <PageTransition direction="slide-left">
              <OpeningPuzzlesPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/puzzles/custom" 
          element={
            <PageTransition direction="slide-left">
              <CustomPuzzlesPage />
            </PageTransition>
          } 
        />

        {/* Play routes */}
        <Route 
          path="/play/computer" 
          element={
            <PageTransition direction="slide-left">
              <PlayComputerPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/play/analysis" 
          element={
            <PageTransition direction="slide-left">
              <AnalysisBoardPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/play/review" 
          element={
            <PageTransition direction="slide-left">
              <GameReviewPage />
            </PageTransition>
          } 
        />

        {/* Study routes */}
        <Route 
          path="/study/openings" 
          element={
            <PageTransition direction="slide-left">
              <OpeningExplorerPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/study/endgames" 
          element={
            <PageTransition direction="slide-left">
              <EndgameLibraryPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/study/masters" 
          element={
            <PageTransition direction="slide-left">
              <MasterGamesPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/study/plans" 
          element={
            <PageTransition direction="slide-left">
              <StudyPlansPage />
            </PageTransition>
          } 
        />

        {/* Progress routes */}
        <Route 
          path="/progress/overview" 
          element={
            <PageTransition direction="slide-left">
              <ProgressOverviewPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/progress/detailed-stats" 
          element={
            <PageTransition direction="slide-left">
              <DetailedStatsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/progress/achievements" 
          element={
            <PageTransition direction="slide-left">
              <AchievementsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/progress/learning-path" 
          element={
            <PageTransition direction="slide-left">
              <LearningPathPage />
            </PageTransition>
          } 
        />

        {/* Settings routes */}
        <Route 
          path="/settings/preferences" 
          element={
            <PageTransition direction="slide-left">
              <PreferencesPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/settings/board" 
          element={
            <PageTransition direction="slide-left">
              <BoardSettingsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/settings/notifications" 
          element={
            <PageTransition direction="slide-left">
              <NotificationsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/settings/account" 
          element={
            <PageTransition direction="slide-left">
              <AccountPage />
            </PageTransition>
          } 
        />

        {/* Help routes */}
        <Route 
          path="/help/center" 
          element={
            <PageTransition direction="slide-left">
              <HelpCenterPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/help/tutorials" 
          element={
            <PageTransition direction="slide-left">
              <TutorialsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/help/contact" 
          element={
            <PageTransition direction="slide-left">
              <ContactPage />
            </PageTransition>
          } 
        />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App