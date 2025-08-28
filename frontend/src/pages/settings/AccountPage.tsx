import React, { useState } from 'react'
import { ArrowLeft, User, Shield, Database, Crown } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '@/stores/themeStore'
import { useAccount } from '@/hooks/useAccount'
import { availableSubscriptionTiers } from '@/data/userAccount'
import { ProfileEditor, SecuritySettings, SubscriptionManagement, DataManagement } from '@/components/settings/account'
import { soundFX } from '@/utils/soundEffects'

const AccountPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // Local state will be declared below with proper typing
  
  // Account management hook
  const {
    account,
    isLoading,
    error,
    updateProfile,
    updateSecurity,
    changePassword,
    setupTwoFactor,
    upgradeSubscription,
    cancelSubscription,
    updatePaymentMethod,
    updatePrivacy,
    requestDataExport,
    deleteAccount,
    clearError
  } = useAccount()

  // Local handler functions
  const getAccountTypeColor = () => {
    switch (account?.subscription?.tier) {
      case 'premium':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
      case 'pro':
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30'
      case 'free':
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30'
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30'
    }
  }

  const getAccountTypeIcon = () => {
    switch (account?.subscription?.tier) {
      case 'premium':
        return <Crown className="w-4 h-4 text-yellow-400" />
      case 'pro':
        return <FaCrown className="w-4 h-4 text-blue-400" />
      case 'free':
        return <User className="w-4 h-4 text-gray-400" />
      default:
        return <User className="w-4 h-4 text-gray-400" />
    }
  }

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId as 'profile' | 'security' | 'subscription' | 'data')
    soundFX.playClick()
  }
  
  // Wrapper functions to match component interface expectations
  const handleUpgradeSubscription = async (tier: any, cycle: any) => {
    await upgradeSubscription(tier, cycle)
  }
  
  const handleCancelSubscription = async () => {
    await cancelSubscription()
  }
  
  const handleUpdatePaymentMethod = async (method: any) => {
    await updatePaymentMethod(method)
  }
  
  const handleExportRequest = async (format: any, dataTypes: any) => {
    await requestDataExport(format, dataTypes)
  }
  
  const handleDeleteAccount = async (reason: any, exportData: any) => {
    await deleteAccount(reason, exportData)
  }
  
  // UI state
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'subscription' | 'data'>('profile')

  // Loading state
  if (!account) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-lg">Loading account...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} relative overflow-hidden`}>
      {/* Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Moving Orbs */}
        <div className={`absolute top-10 right-1/3 w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-full opacity-30 blur-md animate-float`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-lg animate-float animation-delay-3000`}></div>
        
        {/* Sparkle Effect */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-twinkle`}></div>
          <div className={`absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500`}></div>
          <div className={`absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-1500`}></div>
          <div className={`absolute bottom-1/3 left-1/5 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-2500`}></div>
        </div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                navigate('/settings')
                soundFX.playClick()
              }}
              className={`p-3 ${theme.glassMorphism} border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200 text-slate-300 hover:text-white hover-glow`}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                USER VAULT
              </h1>
              <p className="text-slate-400 mt-1">Manage your chess training empire</p>
            </div>
          </div>

          {/* Account Status Badge */}
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 ${getAccountTypeColor()} backdrop-blur-sm`}>
            {getAccountTypeIcon()}
            <span className="font-medium capitalize">{account.subscription.tier} Account</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${theme.glassMorphism} border border-slate-700/50 rounded-xl p-4`}>
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'security', label: 'Security', icon: Shield },
                  { id: 'subscription', label: 'Subscription', icon: Crown },
                  { id: 'data', label: 'Data Vault', icon: Database }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-left hover-glow ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                        : `text-slate-400 hover:text-white hover:${theme.glassMorphism}`
                    }`}
                  >
                    <section.icon size={20} />
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Content Components */}
            {activeSection === 'profile' && account.profile && (
              <ProfileEditor
                profile={account.profile}
                onProfileUpdate={updateProfile}
                isLoading={isLoading}
                error={error}
                theme={theme}
              />
            )}

            {activeSection === 'security' && account.security && (
              <SecuritySettings
                security={account.security}
                onSecurityUpdate={updateSecurity}
                onPasswordChange={changePassword}
                onTwoFactorSetup={setupTwoFactor}
                isLoading={isLoading}
                error={error}
                theme={theme}
              />
            )}

            {activeSection === 'subscription' && (
              <SubscriptionManagement
                subscription={account.subscription}
                availableTiers={availableSubscriptionTiers}
                onUpgrade={handleUpgradeSubscription}
                onCancel={handleCancelSubscription}
                onUpdatePayment={handleUpdatePaymentMethod}
                isLoading={isLoading}
                error={error}
                theme={theme}
              />
            )}

            {activeSection === 'data' && (
              <DataManagement
                privacy={account.privacy}
                dataExports={account.dataExports}
                deletionRequest={account.deletionRequest}
                onPrivacyUpdate={updatePrivacy}
                onExportRequest={handleExportRequest}
                onDeleteAccount={handleDeleteAccount}
                isLoading={isLoading}
                error={error}
                theme={theme}
              />
            )}
          </div>
        </div>

        {/* Global Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg animate-slide-down">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className={`flex items-center justify-between mt-8 p-6 ${theme.glassMorphism} border border-slate-700/50 rounded-xl`}>
          <div className="text-sm text-slate-400">
            Changes are saved automatically • Last updated: {new Date(account.lastLoginAt).toLocaleString()}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                navigate('/settings')
                soundFX.playSuccess()
              }}
              className={`px-6 py-3 bg-gradient-to-r ${theme.primary} hover:opacity-90 rounded-lg text-white font-medium transition-all duration-300 hover-glow active:animate-button-press shadow-lg`}
            >
              Return to Settings
            </button>
          </div>
        </div>
      </div>

      {/* Gaming Visual Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Chess Pieces Background */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">♜</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000">♞</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">♝</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000">♛</div>
      </div>
    </div>
  )
}

export default AccountPage