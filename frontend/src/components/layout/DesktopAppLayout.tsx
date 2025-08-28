import { ReactNode } from 'react'
import { StatusBar } from './StatusBar'

interface DesktopAppLayoutProps {
  children: ReactNode
}

export const DesktopAppLayout: React.FC<DesktopAppLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
      
      {/* Status Bar - Spans full width */}
      <StatusBar />
    </div>
  )
}