import React, { useState } from 'react'
import { Bell, X, Archive, Check, Clock, Star, Signal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { NotificationCenterProps, NotificationInstance } from '@/types/notifications'

/**
 * NotificationCenter component - displays recent notifications with SIGNAL TOWER theme
 */
export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  showUnreadOnly,
  onNotificationClick,
  onNotificationDismiss,
  onMarkAllRead,
  onArchiveNotification,
  isLoading,
  theme
}) => {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  const filteredNotifications = showUnreadOnly 
    ? notifications.filter(n => n.status === 'unread')
    : notifications

  const getNotificationIcon = (notification: NotificationInstance) => {
    switch (notification.eventType) {
      case 'achievement_unlocked':
        return <Star size={20} className="text-yellow-400" />
      case 'game_completed':
        return <Signal size={20} className="text-green-400" />
      case 'challenge_received':
        return <Bell size={20} className="text-orange-400" />
      case 'training_reminder':
        return <Clock size={20} className="text-blue-400" />
      default:
        return <Bell size={20} className={theme.text} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 border-red-500/30 text-red-400'
      case 'high': return 'bg-orange-500/20 border-orange-500/30 text-orange-400'
      case 'normal': return 'bg-blue-500/20 border-blue-500/30 text-blue-400'
      case 'low': return 'bg-gray-500/20 border-gray-500/30 text-gray-400'
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-400'
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const toggleNotificationSelection = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    )
  }

  const handleBulkMarkRead = () => {
    selectedNotifications.forEach(id => {
      const notification = notifications.find(n => n.id === id)
      if (notification && notification.status === 'unread') {
        onNotificationClick(notification)
      }
    })
    setSelectedNotifications([])
  }

  const handleBulkArchive = () => {
    selectedNotifications.forEach(onArchiveNotification)
    setSelectedNotifications([])
  }

  return (
    <Card className={`${theme.glassMorphism} border-gray-700/50 backdrop-blur-xl`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.primary}`}>
              <Signal size={24} className="text-white" />
            </div>
            <div>
              <CardTitle className={`text-xl ${theme.text} flex items-center space-x-2`}>
                <span>Signal Tower</span>
                {notifications.filter(n => n.status === 'unread').length > 0 && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {notifications.filter(n => n.status === 'unread').length} new
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className={`${theme.text} opacity-70`}>
                Recent transmission logs and alerts
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {selectedNotifications.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkMarkRead}
                  className={`border-green-500/30 text-green-400 hover:bg-green-500/10`}
                >
                  <Check size={14} className="mr-1" />
                  Mark Read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkArchive}
                  className={`border-blue-500/30 text-blue-400 hover:bg-blue-500/10`}
                >
                  <Archive size={14} className="mr-1" />
                  Archive
                </Button>
              </>
            )}
            
            {notifications.filter(n => n.status === 'unread').length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMarkAllRead}
                className={`border-gray-600 ${theme.text} hover:bg-gray-700/50`}
              >
                <Check size={14} className="mr-1" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className={`w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin`}></div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Signal size={48} className={`mx-auto mb-4 ${theme.text} opacity-30`} />
            <p className={`${theme.text} opacity-70`}>
              {showUnreadOnly ? 'All signals processed' : 'No transmission history'}
            </p>
            <p className={`text-sm ${theme.text} opacity-50 mt-1`}>
              {showUnreadOnly ? 'Check back for new notifications' : 'Your notification center is empty'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`group relative p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-gray-800/30 ${
                  notification.status === 'unread' 
                    ? 'bg-blue-500/5 border-blue-500/20' 
                    : 'bg-gray-800/20 border-gray-700/30'
                } ${selectedNotifications.includes(notification.id) ? 'ring-2 ring-blue-500/50' : ''}`}
                onClick={() => toggleNotificationSelection(notification.id)}
              >
                {/* Status Indicator */}
                {notification.status === 'unread' && (
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}

                <div className="flex items-start space-x-3 ml-4">
                  {/* Icon */}
                  <div className="mt-1">
                    {getNotificationIcon(notification)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-medium ${theme.text} mb-1`}>
                          {notification.title}
                        </h4>
                        <p className={`text-sm ${theme.text} opacity-70 line-clamp-2`}>
                          {notification.message}
                        </p>
                        
                        {/* Action Buttons */}
                        {notification.actions && notification.actions.length > 0 && (
                          <div className="flex items-center space-x-2 mt-2">
                            {notification.actions.map((action) => (
                              <Button
                                key={action.id}
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  if (action.url) {
                                    window.location.href = action.url
                                  }
                                }}
                                className={`text-xs ${
                                  action.type === 'primary' 
                                    ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10' 
                                    : 'border-gray-600 text-gray-400 hover:bg-gray-700/50'
                                }`}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-col items-end ml-4 space-y-2">
                        <span className={`text-xs ${theme.text} opacity-50`}>
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              onNotificationClick(notification)
                            }}
                            className="p-1 h-6 w-6 border-gray-600 hover:bg-gray-700/50"
                          >
                            <Check size={12} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              onArchiveNotification(notification.id)
                            }}
                            className="p-1 h-6 w-6 border-gray-600 hover:bg-gray-700/50"
                          >
                            <Archive size={12} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              onNotificationDismiss(notification.id)
                            }}
                            className="p-1 h-6 w-6 border-gray-600 hover:bg-red-700/50 hover:text-red-400"
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expiration Warning */}
                {notification.expiresAt && notification.expiresAt < Date.now() + 3600000 && (
                  <div className="mt-2 ml-7 p-2 bg-orange-500/10 border border-orange-500/20 rounded text-xs text-orange-400">
                    <Clock size={12} className="inline mr-1" />
                    Expires in {Math.floor((notification.expiresAt - Date.now()) / 60000)} minutes
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Selection Info */}
        {selectedNotifications.length > 0 && (
          <div className={`mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm ${theme.text}`}>
            {selectedNotifications.length} notification{selectedNotifications.length === 1 ? '' : 's'} selected
          </div>
        )}
      </CardContent>
    </Card>
  )
}