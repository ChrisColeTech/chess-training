import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { useAuthStore } from '../../stores/authStore'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { TitleBar } from './TitleBar'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { getCurrentTheme } = useThemeStore()
  const { isAuthenticated } = useAuthStore()
  const theme = getCurrentTheme()
  const location = useLocation()

  // Don't show layout for auth pages, BUT if user is authenticated and on root "/", show layout
  const authPages = ['/login', '/auth/register', '/auth/forgot-password', '/auth/reset']
  const isAuthPage = authPages.includes(location.pathname) || location.pathname.startsWith('/auth/reset/') || (location.pathname === '/' && !isAuthenticated)

  // Debug log to see what's happening
  console.log('MainLayout - Current path:', location.pathname, 'isAuthenticated:', isAuthenticated, 'isAuthPage:', isAuthPage)

  if (isAuthPage) {
    return <>{children}</>
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className={`h-full flex flex-col bg-gradient-to-br ${theme.background} ${theme.text}`}>
      {/* Title Bar - Full Width */}
      <TitleBar />
      
      {/* Main Layout - Sidebar + Content */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header 
            onToggleSidebar={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
          />
          
          {/* Content Area */}
          <main className="flex-1 overflow-y-auto bg-black/5">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}