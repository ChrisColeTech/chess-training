import { useLocation } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { useAuthStore } from '../../stores/authStore'
import { ChessSidebar } from './ChessSidebar'
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
      {/* Background Effects for the layout */}
      <BackgroundEffects />
      
      {/* Main Layout - Sidebar + Content */}
      <div className="h-full w-full flex">
        {/* Modern Sidebar */}
        <ChessSidebar />
        
        {/* Main Content */}
        <SidebarInset className="flex-1 min-w-0">
          <main className="w-full h-full overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
      
      {/* Global Toast Notifications */}
      <Toaster />
    </SidebarProvider>
  )
}