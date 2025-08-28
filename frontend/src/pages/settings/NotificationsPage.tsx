import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Signal, Save, ArrowLeft, AlertCircle, TestTube, Download, Upload, RotateCw, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useThemeStore } from '@/stores/themeStore'
import { useNotifications } from '@/hooks/useNotifications'
import { 
  NotificationCenter, 
  AlertSettings, 
  EventSettings, 
  QuietHours 
} from '@/components/settings/notifications'
import { notificationSoundOptions, mockNotificationTests } from '@/data/notificationSettings'

/**
 * NotificationsPage - SIGNAL TOWER themed notification settings page
 * Professional mockup interface for comprehensive notification management
 */
export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  const {
    // Settings state
    settings,
    isLoading,
    hasUnsavedChanges,
    
    // Notifications state
    notifications,
    unreadCount,
    notificationStats,
    
    // Actions
    updateChannelSettings,
    updateEventSettings,
    updateQuietHours,
    updateDoNotDisturb,
    
    // Notification management
    markAllAsRead,
    dismissNotification,
    archiveNotification,
    
    // Testing and preview
    previewSound,
    
    // Utilities
    resetToDefaults,
    
    // Error handling
    error,
    clearError
  } = useNotifications()

  const [activeTab, setActiveTab] = useState('center')
  const [showUnreadOnly] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false)
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null)
  const [testResults, setTestResults] = useState<Record<string, any>>({})

  // Local handler functions
  const handleRunDiagnostics = async () => {
    setIsRunningDiagnostics(true)
    try {
      // Simulate diagnostics
      await new Promise(resolve => setTimeout(resolve, 2000))
      setDiagnosticResults({
        browser: 'Supported',
        permissions: 'Granted',
        connectivity: 'Online',
        status: 'All systems operational'
      })
    } catch (error) {
      console.error('Diagnostics failed:', error)
    } finally {
      setIsRunningDiagnostics(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Settings saved')
    } catch (error) {
      console.error('Save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportSettings = () => {
    const settingsJson = JSON.stringify(settings, null, 2)
    const blob = new Blob([settingsJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'notification-settings.json'
    link.click()
  }

  const handleImportSettings = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const importedSettings = JSON.parse(e.target?.result as string)
            console.log('Imported settings:', importedSettings)
          } catch (error) {
            console.error('Failed to import settings:', error)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleNotificationClick = (notification: any) => {
    console.log('Notification clicked:', notification)
    // Mark as read if unread
    if (notification.isRead === false) {
      // markAsRead(notification.id)
    }
  }

  const handleTestNotification = async (test: any) => {
    try {
      // Simulate test notification
      setTestResults(prev => ({ ...prev, [test.id]: 'running' }))
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTestResults(prev => ({ ...prev, [test.id]: 'success' }))
      console.log('Test notification sent:', test)
    } catch (error) {
      setTestResults(prev => ({ ...prev, [test.id]: 'error' }))
      console.error('Test notification failed:', error)
    }
  }

  // Clear error after delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-4`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Signal Tower Visual Effects */}
        <div className={`absolute top-20 right-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br ${theme.primary} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 right-10 w-24 h-24 bg-gradient-to-br ${theme.highlight} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Moving Signal Waves */}
        <div className={`absolute top-10 left-1/3 w-16 h-16 bg-gradient-to-br ${theme.secondary} rounded-full opacity-30 blur-md animate-float`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-lg animate-float animation-delay-3000`}></div>
        
        {/* Signal Tower Icons */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">📡</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000">📻</div>
        <div className="absolute top-1/3 left-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">📶</div>
        <div className="absolute bottom-1/3 right-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000">🛰️</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/settings/preferences')}
              className={`border-gray-600 ${theme.text} hover:bg-gray-700/50`}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Settings
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${theme.primary} shadow-lg`}>
                <Signal size={32} className="text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                  Signal Tower
                </h1>
                <p className={`${theme.text} opacity-70`}>
                  Notification Command Center
                  {unreadCount > 0 && (
                    <Badge className="ml-2 bg-red-500/20 text-red-400 border-red-500/30">
                      {unreadCount} new
                    </Badge>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                Unsaved Changes
              </Badge>
            )}
            
            <Button
              variant="outline"
              onClick={handleRunDiagnostics}
              disabled={isRunningDiagnostics}
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              {isRunningDiagnostics ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin mr-2" />
              ) : (
                <TestTube size={16} className="mr-2" />
              )}
              Diagnostics
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={!hasUnsavedChanges || isSaving}
              className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0`}
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 bg-red-500/10 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle size={20} className="text-red-400" />
                <span className="text-red-400">{error}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="ml-auto text-red-400 hover:bg-red-500/10"
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gray-800/50 border border-gray-700">
              <TabsTrigger 
                value="center" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Signal size={16} className="mr-2" />
                Signal Center
              </TabsTrigger>
              <TabsTrigger 
                value="alerts" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Alert Settings
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Event Rules
              </TabsTrigger>
              <TabsTrigger 
                value="quiet" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Quiet Hours
              </TabsTrigger>
              <TabsTrigger 
                value="testing" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <TestTube size={16} className="mr-2" />
                Testing
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportSettings}
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                <Download size={14} className="mr-1" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleImportSettings}
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                <Upload size={14} className="mr-1" />
                Import
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetToDefaults}
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                <RotateCw size={14} className="mr-1" />
                Reset
              </Button>
            </div>
          </div>

          {/* Notification Center Tab */}
          <TabsContent value="center" className="space-y-6">
            <div className="grid gap-6">
              <NotificationCenter
                notifications={notifications}
                showUnreadOnly={showUnreadOnly}
                onNotificationClick={handleNotificationClick}
                onNotificationDismiss={dismissNotification}
                onMarkAllRead={markAllAsRead}
                onArchiveNotification={archiveNotification}
                isLoading={isLoading}
                theme={theme}
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={`${theme.glassMorphism} border-gray-700/50`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${theme.text} opacity-60`}>Total Notifications</p>
                        <p className={`text-2xl font-bold ${theme.text}`}>{notificationStats.totalSent}</p>
                      </div>
                      <Signal size={24} className={theme.text} />
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${theme.glassMorphism} border-gray-700/50`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${theme.text} opacity-60`}>Read Rate</p>
                        <p className={`text-2xl font-bold ${theme.text}`}>{notificationStats.readRate}%</p>
                      </div>
                      <CheckCircle size={24} className="text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${theme.glassMorphism} border-gray-700/50`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${theme.text} opacity-60`}>Avg Response Time</p>
                        <p className={`text-2xl font-bold ${theme.text}`}>{notificationStats.avgTimeToRead}m</p>
                      </div>
                      <TestTube size={24} className="text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Alert Settings Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <AlertSettings
              channelSettings={settings.channels}
              onChannelSettingsChange={updateChannelSettings}
              availableSounds={notificationSoundOptions}
              onPreviewSound={previewSound}
              theme={theme}
            />
          </TabsContent>

          {/* Event Settings Tab */}
          <TabsContent value="events" className="space-y-6">
            <EventSettings
              eventSettings={settings.events}
              onEventSettingsChange={updateEventSettings}
              availableChannels={['in-app', 'push', 'email', 'sms']}
              groupByCategory={true}
              theme={theme}
            />
          </TabsContent>

          {/* Quiet Hours Tab */}
          <TabsContent value="quiet" className="space-y-6">
            <QuietHours
              quietHours={settings.quietHours}
              doNotDisturb={settings.doNotDisturb}
              onQuietHoursChange={updateQuietHours}
              onDoNotDisturbChange={updateDoNotDisturb}
              availableExceptions={['security_alert', 'tournament_starting', 'challenge_received']}
              theme={theme}
            />
          </TabsContent>

          {/* Testing Tab */}
          <TabsContent value="testing" className="space-y-6">
            <div className="grid gap-6">
              {/* Test Notifications */}
              <Card className={`${theme.glassMorphism} border-gray-700/50 backdrop-blur-xl`}>
                <CardHeader>
                  <CardTitle className={`text-xl ${theme.text} flex items-center space-x-2`}>
                    <TestTube size={24} />
                    <span>Notification Testing</span>
                  </CardTitle>
                  <CardDescription className={`${theme.text} opacity-70`}>
                    Test different notification types and behaviors
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {mockNotificationTests.map((test) => (
                    <div key={test.id} className="p-4 bg-gray-800/20 rounded-lg border border-gray-700/30">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className={`font-medium ${theme.text}`}>{test.name}</h4>
                          <p className={`text-sm ${theme.text} opacity-60`}>{test.expectedBehavior}</p>
                        </div>
                        <Button
                          onClick={() => handleTestNotification(test)}
                          disabled={testResults[test.id]?.running}
                          className={`bg-gradient-to-r ${theme.accent} hover:opacity-90`}
                        >
                          {testResults[test.id]?.running ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          ) : (
                            <TestTube size={16} className="mr-2" />
                          )}
                          Test
                        </Button>
                      </div>

                      {testResults[test.id] && !testResults[test.id].running && (
                        <div className={`p-3 rounded-lg ${
                          testResults[test.id].success 
                            ? 'bg-green-500/10 border-green-500/20' 
                            : 'bg-red-500/10 border-red-500/20'
                        }`}>
                          <p className={`text-sm ${
                            testResults[test.id].success ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {testResults[test.id].message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Diagnostic Results */}
              {diagnosticResults && (
                <Card className={`${theme.glassMorphism} border-gray-700/50 backdrop-blur-xl`}>
                  <CardHeader>
                    <CardTitle className={`text-xl ${theme.text} flex items-center space-x-2`}>
                      <CheckCircle size={24} className="text-green-400" />
                      <span>System Diagnostics</span>
                      <Badge className={
                        diagnosticResults.systemStatus === 'healthy' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                      }>
                        {diagnosticResults.systemStatus}
                      </Badge>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Channel Status */}
                    <div className="space-y-2">
                      <h4 className={`font-medium ${theme.text}`}>Channel Status</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(diagnosticResults.channelStatus).map(([channel, status]: [string, any]) => (
                          <div key={channel} className="flex items-center justify-between p-2 bg-gray-800/20 rounded">
                            <span className={`text-sm ${theme.text} capitalize`}>{channel.replace('-', ' ')}</span>
                            <Badge className={
                              status.available 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }>
                              {status.available ? 'Available' : 'Unavailable'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-2">
                      <h4 className={`font-medium ${theme.text}`}>Performance</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-gray-800/20 rounded">
                          <p className={`text-sm ${theme.text} opacity-60`}>Success Rate</p>
                          <p className={`font-bold ${theme.text}`}>{(diagnosticResults.performance.successRate * 100).toFixed(1)}%</p>
                        </div>
                        <div className="text-center p-2 bg-gray-800/20 rounded">
                          <p className={`text-sm ${theme.text} opacity-60`}>Avg Delivery</p>
                          <p className={`font-bold ${theme.text}`}>{diagnosticResults.performance.avgDeliveryTime}ms</p>
                        </div>
                        <div className="text-center p-2 bg-gray-800/20 rounded">
                          <p className={`text-sm ${theme.text} opacity-60`}>Memory Usage</p>
                          <p className={`font-bold ${theme.text}`}>{diagnosticResults.performance.memoryUsage}MB</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default NotificationsPage
