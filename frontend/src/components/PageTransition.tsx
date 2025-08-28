import { type ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  direction?: 'fade' | 'slide-left' | 'slide-right'
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  direction = 'fade' 
}) => {
  const getAnimationClass = () => {
    switch (direction) {
      case 'slide-left':
        return 'animate-slide-in-left'
      case 'slide-right':
        return 'animate-slide-in-right'
      default:
        return 'animate-fade-in'
    }
  }

  return (
    <div className={`${getAnimationClass()} gpu-accelerated`}>
      {children}
    </div>
  )
}