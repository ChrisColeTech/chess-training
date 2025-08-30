import { useThemeStore } from '../../stores/themeStore'

export const BackgroundEffects: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Theme Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.background}`}></div>
      {/* Floating Particles - More particles */}
      <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
      <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
      <div className={`absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
      <div className={`absolute top-16 right-1/2 w-28 h-28 bg-gradient-to-br ${theme.primary} rounded-full opacity-18 blur-xl animate-pulse-glow animation-delay-500`}></div>
      <div className={`absolute bottom-1/3 right-16 w-36 h-36 bg-gradient-to-br ${theme.accent} rounded-full opacity-22 blur-2xl animate-pulse-glow animation-delay-1500`}></div>
      <div className={`absolute top-2/3 left-1/3 w-20 h-20 bg-gradient-to-br ${theme.highlight} rounded-full opacity-16 blur-lg animate-pulse-glow animation-delay-2500`}></div>
      
      {/* Moving Orbs - More orbs */}
      <div className={`absolute top-10 right-1/3 w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-full opacity-30 blur-md animate-float`}></div>
      <div className={`absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-lg animate-float animation-delay-3000`}></div>
      <div className={`absolute top-1/3 left-1/2 w-12 h-12 bg-gradient-to-br ${theme.secondary} rounded-full opacity-25 blur-md animate-float animation-delay-1000`}></div>
      <div className={`absolute bottom-16 right-1/3 w-18 h-18 bg-gradient-to-br ${theme.highlight} rounded-full opacity-28 blur-lg animate-float animation-delay-2000`}></div>
      <div className={`absolute top-1/4 left-16 w-14 h-14 bg-gradient-to-br ${theme.primary} rounded-full opacity-22 blur-md animate-float animation-delay-4000`}></div>
      
      {/* Sparkle Effect - More sparkles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-twinkle"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500"></div>
        <div className="absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-2500"></div>
        <div className="absolute top-16 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-1000"></div>
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-white rounded-full animate-twinkle animation-delay-3000"></div>
        <div className="absolute top-2/3 right-16 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-2000"></div>
        <div className="absolute bottom-1/2 left-20 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-3500"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-4000"></div>
        <div className="absolute bottom-2/3 right-1/5 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-4500"></div>
      </div>
      
      {/* Animated Chess Pieces Background */}
      <div className="absolute top-10 right-10 text-6xl text-white opacity-20 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>♜</div>
      <div className="absolute bottom-10 left-10 text-5xl text-white opacity-20 animate-bounce-subtle" style={{ animationDelay: '1s' }}>♞</div>
      <div className="absolute top-1/3 right-1/4 text-4xl text-white opacity-20 animate-bounce-subtle" style={{ animationDelay: '1.5s' }}>♝</div>
      <div className="absolute bottom-1/3 left-1/4 text-7xl text-white opacity-20 animate-bounce-subtle" style={{ animationDelay: '2s' }}>♛</div>
    </div>
  )
}