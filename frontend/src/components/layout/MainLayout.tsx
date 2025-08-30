import { useLocation } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { useAuthStore } from '../../stores/authStore'
import { ChessSidebar } from './ChessSidebar'
import { TitleBar } from './TitleBar'
import { BackgroundEffects } from '../ui/BackgroundEffects'
import { SidebarProvider, SidebarInset } from '../ui/sidebar'
import { Toaster } from '../ui/toaster'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Fixed Background Layer */}
      <div className={`fixed inset-0 bg-gradient-to-br ${theme.background} ${theme.text}`}>
        <BackgroundEffects />
      </div>

      {/* Main Layout - Over Background */}
      <div className="h-full flex flex-col relative z-10">
        {/* Title Bar - Full Width */}
        <TitleBar />
        
        {/* Main Layout - Sidebar + Content */}
        <div className="flex-1 flex min-h-0">
          {/* Modern Sidebar */}
          <ChessSidebar />
          
          {/* Main Content */}
          <SidebarInset>
            <main className="flex-1 overflow-y-auto h-full">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
      
      {/* Global Toast Notifications */}
      <Toaster />
    </SidebarProvider>
  )
}