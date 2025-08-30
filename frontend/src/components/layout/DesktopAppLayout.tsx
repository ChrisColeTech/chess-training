import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import { TitleBar } from './TitleBar'
import { ChessSidebar } from './ChessSidebar'
import { StatusBar } from './StatusBar'
import { BackgroundEffects } from '../ui/BackgroundEffects'
import { SidebarProvider, SidebarInset } from '../ui/sidebar'
import { Toaster } from '../ui/toaster'

interface DesktopAppLayoutProps {
  children: React.ReactNode
}

export const DesktopAppLayout: React.FC<DesktopAppLayoutProps> = ({ children }) => {
  const { getCurrentTheme } = useThemeStore()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const theme = getCurrentTheme()
  const location = useLocation()

  // Don't show desktop layout for auth pages
  const authPages = ['/login', '/auth/register', '/auth/forgot-password', '/auth/reset']
  const isAuthPage = authPages.includes(location.pathname) || 
                     location.pathname.startsWith('/auth/reset/') || 
                     (location.pathname === '/' && !isAuthenticated)

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="h-screen flex flex-col dark">
      <BackgroundEffects />
      
      {/* Desktop Title Bar - Fixed height */}
      <TitleBar />
      
      {/* Main Layout - Apply lessons learned */}
      <div className="flex-1 overflow-hidden flex">
        <SidebarProvider defaultOpen={true}>
          <ChessSidebar />
          
          {/* Main Content Area - Proper scrolling setup */}
          <div className="flex-1 overflow-y-auto">
            <main className={`p-6 ${theme.text}`}>
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
      
      {/* Desktop Status Bar - Fixed height */}
      <StatusBar variant="full" />
      
      {/* Global Toast Notifications */}
      <Toaster />
    </div>
  )
}

// Convenience layouts for different contexts
export const CompactDesktopLayout: React.FC<DesktopAppLayoutProps> = ({ children }) => {
  const { getCurrentTheme } = useThemeStore()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const theme = getCurrentTheme()
  const location = useLocation()

  const authPages = ['/login', '/auth/register', '/auth/forgot-password', '/auth/reset']
  const isAuthPage = authPages.includes(location.pathname) || 
                     location.pathname.startsWith('/auth/reset/') || 
                     (location.pathname === '/' && !isAuthenticated)

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="h-screen flex flex-col dark">
      <BackgroundEffects />
      <TitleBar />
      
      {/* Main Layout - Apply lessons learned for compact version */}
      <div className="flex-1 overflow-hidden flex">
        <SidebarProvider defaultOpen={false}>
          <ChessSidebar />
          
          {/* Main Content Area - Proper scrolling setup */}
          <div className="flex-1 overflow-y-auto">
            <main className={`p-6 ${theme.text}`}>
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
      
      <StatusBar variant="compact" />
      <Toaster />
    </div>
  )
}