import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { useAuthStore } from '../../stores/authStore'
import { Sidebar } from './Sidebar'
import { TitleBar } from './TitleBar'
import { BackgroundEffects } from '../ui/BackgroundEffects'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { getCurrentTheme } = useThemeStore()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const theme = getCurrentTheme()
  const location = useLocation()

  // Don't show layout for auth pages
  const authPages = ['/login', '/auth/register', '/auth/forgot-password', '/auth/reset']
  const isAuthPage = authPages.includes(location.pathname) || location.pathname.startsWith('/auth/reset/') || (location.pathname === '/' && !isAuthenticated)

  if (isAuthPage) {
    return <>{children}</>
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className={`h-full flex flex-col bg-gradient-to-br ${theme.background} ${theme.text} relative`}>
      <BackgroundEffects />

      {/* Title Bar - Full Width */}
      <TitleBar />
      
      {/* Main Layout - Sidebar + Content */}
      <div className="flex-1 flex min-h-0 relative z-10">
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">          
          {/* Content Area - No shared header, pages handle their own headers */}
          <main className="flex-1 overflow-y-auto bg-black/5">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}