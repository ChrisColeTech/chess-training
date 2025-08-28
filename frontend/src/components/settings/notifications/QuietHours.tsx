import React from 'react'
import { Moon, Clock, Ban, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import type { QuietHoursProps } from '@/types/notifications'

/**
 * QuietHours component - manages quiet hours and do not disturb settings
 */
export const QuietHours: React.FC<QuietHoursProps> = ({
  quietHours,
  doNotDisturb,
  onQuietHoursChange,
  onDoNotDisturbChange,
  availableExceptions,
  theme
}) => {
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return { value: `${hour}:00`, label: `${hour}:00` }
  })

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const updateQuietHours = (updates: any) => {
    onQuietHoursChange({ ...quietHours, ...updates })
  }

  const updateDoNotDisturb = (updates: any) => {
    onDoNotDisturbChange({ ...doNotDisturb, ...updates })
  }

  const toggleDay = (dayIndex: number) => {
    const newDays = quietHours.daysOfWeek.includes(dayIndex)
      ? quietHours.daysOfWeek.filter(d => d !== dayIndex)
      : [...quietHours.daysOfWeek, dayIndex]
    
    updateQuietHours({ daysOfWeek: newDays })
  }

  const toggleException = (eventType: any) => {
    const newExceptions = doNotDisturb.exceptions.includes(eventType)
      ? doNotDisturb.exceptions.filter(e => e !== eventType)
      : [...doNotDisturb.exceptions, eventType]
    
    updateDoNotDisturb({ exceptions: newExceptions })
  }

  const formatDoNotDisturbUntil = () => {
    if (!doNotDisturb.until) return null
    
    const untilDate = new Date(doNotDisturb.until)
    const now = new Date()
    
    if (untilDate < now) return 'Expired'
    
    const diffMs = untilDate.getTime() - now.getTime()
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60))
    
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'}`
    } else {
      const diffDays = Math.ceil(diffHours / 24)
      return `${diffDays} day${diffDays === 1 ? '' : 's'}`
    }
  }

  const setDoNotDisturbFor = (hours: number) => {
    const until = Date.now() + (hours * 60 * 60 * 1000)
    updateDoNotDisturb({ enabled: true, until })
  }

  return (
    <div className="space-y-6">
      {/* Quiet Hours Card */}
      <Card className={`${theme.glassMorphism} border-gray-700/50 backdrop-blur-xl`}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.primary}`}>
              <Moon size={24} className="text-white" />
            </div>
            <div>
              <CardTitle className={`text-xl ${theme.text}`}>Quiet Hours</CardTitle>
              <CardDescription className={`${theme.text} opacity-70`}>
                Automatically reduce notifications during specified hours
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-medium ${theme.text}`}>Enable Quiet Hours</h3>
              <p className={`text-sm ${theme.text} opacity-60`}>
                Suppress non-urgent notifications during specified times
              </p>
            </div>
            <Switch
              checked={quietHours.enabled}
              onCheckedChange={(enabled) => updateQuietHours({ enabled })}
            />
          </div>

          {quietHours.enabled && (
            <div className="space-y-6 pt-4 border-t border-gray-700/30">
              {/* Time Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${theme.text}`}>Start Time</label>
                  <Select
                    value={quietHours.startTime}
                    onValueChange={(startTime) => updateQuietHours({ startTime })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${theme.text}`}>End Time</label>
                  <Select
                    value={quietHours.endTime}
                    onValueChange={(endTime) => updateQuietHours({ endTime })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Days of Week */}
              <div className="space-y-3">
                <label className={`text-sm font-medium ${theme.text}`}>Active Days</label>
                <div className="grid grid-cols-7 gap-2">
                  {dayNames.map((day, index) => (
                    <Button
                      key={index}
                      variant={quietHours.daysOfWeek.includes(index) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDay(index)}
                      className={`h-10 ${quietHours.daysOfWeek.includes(index) 
                        ? `bg-gradient-to-r ${theme.primary} text-white border-0` 
                        : 'border-gray-600 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuietHours({ daysOfWeek: [1, 2, 3, 4, 5] })} // Weekdays
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  >
                    Weekdays Only
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuietHours({ daysOfWeek: [0, 1, 2, 3, 4, 5, 6] })} // All days
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  >
                    Every Day
                  </Button>
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock size={16} className="text-blue-400" />
                  <span className={`text-sm font-medium text-blue-400`}>Quiet Hours Preview</span>
                </div>
                <p className={`text-sm ${theme.text} opacity-70`}>
                  Active from {quietHours.startTime} to {quietHours.endTime} on{' '}
                  {quietHours.daysOfWeek.length === 7 
                    ? 'every day' 
                    : quietHours.daysOfWeek.map(d => dayNames[d].slice(0, 3)).join(', ')
                  }
                </p>
                <p className={`text-xs ${theme.text} opacity-50 mt-1`}>
                  Only urgent and exception notifications will be delivered during these hours
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Do Not Disturb Card */}
      <Card className={`${theme.glassMorphism} border-gray-700/50 backdrop-blur-xl`}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.accent}`}>
              <Ban size={24} className="text-white" />
            </div>
            <div>
              <CardTitle className={`text-xl ${theme.text} flex items-center space-x-2`}>
                <span>Do Not Disturb</span>
                {doNotDisturb.enabled && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Active
                    {doNotDisturb.until && (
                      <span className="ml-1">• {formatDoNotDisturbUntil()}</span>
                    )}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className={`${theme.text} opacity-70`}>
                Temporarily silence all notifications except exceptions
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-medium ${theme.text}`}>Enable Do Not Disturb</h3>
              <p className={`text-sm ${theme.text} opacity-60`}>
                Block all notifications until manually disabled or timer expires
              </p>
            </div>
            <Switch
              checked={doNotDisturb.enabled}
              onCheckedChange={(enabled) => updateDoNotDisturb({ enabled, until: enabled ? doNotDisturb.until : undefined })}
            />
          </div>

          {/* Quick Timer Options */}
          <div className="space-y-3">
            <label className={`text-sm font-medium ${theme.text}`}>Quick Settings</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDoNotDisturbFor(1)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                1 Hour
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDoNotDisturbFor(4)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                4 Hours
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDoNotDisturbFor(8)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                8 Hours
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateDoNotDisturb({ enabled: true, until: undefined })}
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                Until Disabled
              </Button>
            </div>
          </div>

          {/* Exceptions */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck size={16} className={theme.text} />
              <label className={`text-sm font-medium ${theme.text}`}>Always Allow (Exceptions)</label>
            </div>
            <p className={`text-xs ${theme.text} opacity-60`}>
              These notification types will still be delivered during Do Not Disturb mode
            </p>
            
            <div className="space-y-2">
              {availableExceptions.map((eventType) => (
                <div key={eventType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exception-${eventType}`}
                    checked={doNotDisturb.exceptions.includes(eventType)}
                    onCheckedChange={() => toggleException(eventType)}
                  />
                  <label
                    htmlFor={`exception-${eventType}`}
                    className={`text-sm ${theme.text} cursor-pointer capitalize`}
                  >
                    {eventType.replace(/_/g, ' ')}
                  </label>
                  {eventType === 'security_alert' && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                      Critical
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status Info */}
          {doNotDisturb.enabled && (
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Ban size={16} className="text-orange-400" />
                <span className={`text-sm font-medium text-orange-400`}>
                  Do Not Disturb is Active
                </span>
              </div>
              <p className={`text-sm ${theme.text} opacity-70`}>
                {doNotDisturb.until 
                  ? `Will be automatically disabled in ${formatDoNotDisturbUntil()}`
                  : 'Active until manually disabled'
                }
              </p>
              <p className={`text-xs ${theme.text} opacity-50 mt-1`}>
                {doNotDisturb.exceptions.length} exception{doNotDisturb.exceptions.length === 1 ? '' : 's'} configured
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}