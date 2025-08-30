import React, { useState } from 'react'
import { Gamepad2, Trophy, Users, Clock, Settings, Shield, ChevronDown, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
// Removed mock data import - priorityLevelOptions and frequencyOptions now come from useNotifications hook
import type { EventSettingsProps, NotificationEventSettings } from '@/types/notifications'

/**
 * EventSettings component - manages event-specific notification configuration
 */
export const EventSettings: React.FC<EventSettingsProps> = ({
  eventSettings,
  onEventSettingsChange,
  availableChannels,
  groupByCategory,
  priorityLevelOptions,
  frequencyOptions,
  theme
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['gameplay', 'achievements']))

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'gameplay':
        return <Gamepad2 size={20} />
      case 'achievements':
        return <Trophy size={20} />
      case 'social':
        return <Users size={20} />
      case 'training':
        return <Clock size={20} />
      case 'system':
        return <Settings size={20} />
      default:
        return <Shield size={20} />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'gameplay': return 'Gameplay Events'
      case 'achievements': return 'Achievement & Progress'
      case 'social': return 'Social & Community'
      case 'training': return 'Training & Study'
      case 'system': return 'System & Security'
      default: return 'Other Events'
    }
  }

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'gameplay': return 'Game starts, completions, rating changes'
      case 'achievements': return 'Unlocked badges, milestones, streaks'
      case 'social': return 'Friend activity, challenges, tournaments'
      case 'training': return 'Study reminders, lesson completions'
      case 'system': return 'Maintenance, security alerts, updates'
      default: return 'Miscellaneous notifications'
    }
  }

  const groupedEventSettings = groupByCategory
    ? eventSettings.reduce((groups, event) => {
        const category = event.category
        if (!groups[category]) {
          groups[category] = []
        }
        groups[category].push(event)
        return groups
      }, {} as Record<string, NotificationEventSettings[]>)
    : { 'all': eventSettings }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  const updateEventSetting = (eventIndex: number, updates: any) => {
    const updatedSettings = eventSettings.map((setting, index) =>
      index === eventIndex ? { ...setting, ...updates } : setting
    )
    onEventSettingsChange(updatedSettings)
  }

  const getGlobalEventIndex = (event: NotificationEventSettings) => {
    return eventSettings.findIndex(e => e.eventType === event.eventType)
  }

  const updateChannelSelection = (eventIndex: number, channel: string, enabled: boolean) => {
    const event = eventSettings[eventIndex]
    const updatedChannels = enabled
      ? [...event.enabledChannels, channel as any]
      : event.enabledChannels.filter(ch => ch !== channel)
    
    updateEventSetting(eventIndex, { enabledChannels: updatedChannels })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 border-red-500/30 text-red-400'
      case 'high': return 'bg-orange-500/20 border-orange-500/30 text-orange-400'
      case 'normal': return 'bg-blue-500/20 border-blue-500/30 text-blue-400'
      case 'low': return 'bg-gray-500/20 border-gray-500/30 text-gray-400'
    }
  }

  return (
    <Card className={`${theme.glassMorphism} border-gray-700/50 backdrop-blur-xl`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.secondary}`}>
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <CardTitle className={`text-xl ${theme.text}`}>Event Configuration</CardTitle>
              <CardDescription className={`${theme.text} opacity-70`}>
                Configure notifications for specific events and activities
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const allEnabled = eventSettings.every(e => e.enabled)
                const updatedSettings = eventSettings.map(e => ({ ...e, enabled: !allEnabled }))
                onEventSettingsChange(updatedSettings)
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              {eventSettings.every(e => e.enabled) ? 'Disable All' : 'Enable All'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {Object.entries(groupedEventSettings).map(([category, events]) => (
          <div key={category} className="space-y-2">
            {groupByCategory && (
              <Button
                variant="ghost"
                onClick={() => toggleCategory(category)}
                className={`w-full justify-start p-3 h-auto ${theme.text} hover:bg-gray-800/30`}
              >
                <div className="flex items-center space-x-3">
                  {expandedCategories.has(category) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                  
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.primary}`}>
                    {getCategoryIcon(category)}
                  </div>
                  
                  <div className="text-left">
                    <h3 className="font-medium">{getCategoryName(category)}</h3>
                    <p className={`text-sm ${theme.text} opacity-60`}>
                      {getCategoryDescription(category)} • {events.length} events
                    </p>
                  </div>
                </div>

                <div className="ml-auto flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {events.filter(e => e.enabled).length}/{events.length} enabled
                  </Badge>
                </div>
              </Button>
            )}

            {(!groupByCategory || expandedCategories.has(category)) && (
              <div className={`space-y-3 ${groupByCategory ? 'ml-4' : ''}`}>
                {events.map((event) => {
                  const eventIndex = getGlobalEventIndex(event)
                  
                  return (
                    <div key={event.eventType} className="p-4 bg-gray-800/20 rounded-lg border border-gray-700/30">
                      {/* Event Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h4 className={`font-medium ${theme.text}`}>{event.eventName}</h4>
                            <p className={`text-sm ${theme.text} opacity-60`}>{event.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge className={getPriorityColor(event.priority)}>
                            {event.priority}
                          </Badge>
                          <Switch
                            checked={event.enabled}
                            onCheckedChange={(enabled) => updateEventSetting(eventIndex, { enabled })}
                          />
                        </div>
                      </div>

                      {/* Event Configuration */}
                      {event.enabled && (
                        <div className="space-y-4 pt-4 border-t border-gray-700/30">
                          {/* Priority & Frequency Row */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className={`text-sm font-medium ${theme.text}`}>Priority Level</label>
                              <Select
                                value={event.priority}
                                onValueChange={(priority: any) => updateEventSetting(eventIndex, { priority })}
                              >
                                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {priorityLevelOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      <div className="flex items-center space-x-2">
                                        <span>{option.label}</span>
                                        <Badge className={getPriorityColor(option.value)}>
                                          {option.value}
                                        </Badge>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <label className={`text-sm font-medium ${theme.text}`}>Frequency</label>
                              <Select
                                value={event.frequency}
                                onValueChange={(frequency: any) => updateEventSetting(eventIndex, { frequency })}
                              >
                                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {frequencyOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      <div>
                                        <div className="font-medium">{option.label}</div>
                                        <div className={`text-xs ${theme.text} opacity-60`}>
                                          {option.description}
                                        </div>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Channels Selection */}
                          <div className="space-y-2">
                            <label className={`text-sm font-medium ${theme.text}`}>Notification Channels</label>
                            <div className="grid grid-cols-2 gap-2">
                              {availableChannels.map((channel) => (
                                <div key={channel} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`${event.eventType}-${channel}`}
                                    checked={event.enabledChannels.includes(channel)}
                                    onCheckedChange={(checked) => 
                                      updateChannelSelection(eventIndex, channel, !!checked)
                                    }
                                  />
                                  <label
                                    htmlFor={`${event.eventType}-${channel}`}
                                    className={`text-sm ${theme.text} capitalize cursor-pointer`}
                                  >
                                    {channel.replace('-', ' ')}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Custom Overrides */}
                          {event.customSound && (
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <p className={`text-sm text-blue-400`}>
                                <span className="font-medium">Custom Sound:</span> {event.customSound}
                              </p>
                            </div>
                          )}

                          {event.customVisualStyle && event.customVisualStyle !== 'none' && (
                            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                              <p className={`text-sm text-purple-400`}>
                                <span className="font-medium">Visual Effect:</span> {event.customVisualStyle}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-700/30">
          <h4 className={`font-medium ${theme.text} mb-3`}>Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = eventSettings.map(e => ({ 
                  ...e, 
                  priority: 'high' as const,
                  enabledChannels: ['in-app', 'push'] as any
                }))
                onEventSettingsChange(updated)
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              High Priority All
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = eventSettings.map(e => ({ 
                  ...e, 
                  frequency: 'daily' as const
                }))
                onEventSettingsChange(updated)
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              Daily Digest Mode
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = eventSettings.map(e => ({ 
                  ...e, 
                  enabledChannels: ['in-app'] as any
                }))
                onEventSettingsChange(updated)
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              In-App Only
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = eventSettings.map(e => ({ 
                  ...e, 
                  frequency: 'instant' as const,
                  priority: 'normal' as const
                }))
                onEventSettingsChange(updated)
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              Reset Defaults
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}