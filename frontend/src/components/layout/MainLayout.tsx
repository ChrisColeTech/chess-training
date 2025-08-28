import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { StatusBar } from './StatusBar'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  const location = useLocation()

  // Don't show layout for auth pages
  const isAuthPage = ['/login', '/auth/register', '/auth/forgot-password', '/auth/reset', '/'].includes(location.pathname) || location.pathname.startsWith('/auth/reset/')

  if (isAuthPage) {
    return <>{children}</>
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className={`h-screen flex bg-gradient-to-br ${theme.background} ${theme.text}`}>
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        
        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black/5">
          <div className="h-full">
            {children}
          </div>
        </main>
        
        {/* Status Bar */}
        <StatusBar />
      </div>
    </div>
  )
}