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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundEffects />
      
      {/* Desktop Title Bar - Electron window controls only */}
      <TitleBar />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex-1 flex min-h-0 relative z-10">
          {/* Chess Sidebar Navigation */}
          <ChessSidebar />
          
          {/* Main Content Area */}
          <SidebarInset>
            <main className={`flex-1 overflow-y-auto h-full bg-gradient-to-br ${theme.background} ${theme.text}`}>
              {/* Individual pages handle their own breadcrumbs - NO shared header */}
              {children}
            </main>
          </SidebarInset>
        </div>
        
        {/* Desktop Status Bar - System information */}
        <StatusBar variant="full" />
      </SidebarProvider>
      
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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundEffects />
      <TitleBar />
      
      <SidebarProvider defaultOpen={false}>
        <div className="flex-1 flex min-h-0 relative z-10">
          <ChessSidebar />
          <SidebarInset>
            <main className={`flex-1 overflow-y-auto h-full bg-gradient-to-br ${theme.background} ${theme.text}`}>
              {children}
            </main>
          </SidebarInset>
        </div>
        <StatusBar variant="compact" />
      </SidebarProvider>
      
      <Toaster />
    </div>
  )
}