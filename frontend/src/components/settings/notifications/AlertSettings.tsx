import React from 'react'
import { Volume, VolumeX, Volume2, Eye, Play } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { notificationSoundOptions, visualAlertOptions, priorityLevelOptions } from '@/data/notificationSettings'
import type { AlertSettingsProps, NotificationChannel } from '@/types/notifications'

/**
 * AlertSettings component - manages sound and visual alert configuration
 */
export const AlertSettings: React.FC<AlertSettingsProps> = ({
  channelSettings,
  onChannelSettingsChange,
  onPreviewSound,
  theme
}) => {
  const getChannelIcon = (channel: NotificationChannel) => {
    switch (channel) {
      case 'in-app':
        return <Eye size={20} />
      case 'push':
        return <Volume2 size={20} />
      case 'email':
        return <Volume size={20} />
      case 'sms':
        return <VolumeX size={20} />
    }
  }

  const getChannelName = (channel: NotificationChannel) => {
    switch (channel) {
      case 'in-app': return 'In-App Notifications'
      case 'push': return 'Push Notifications'
      case 'email': return 'Email Notifications'
      case 'sms': return 'SMS Notifications'
    }
  }

  const getChannelDescription = (channel: NotificationChannel) => {
    switch (channel) {
      case 'in-app': return 'Notifications shown within the application interface'
      case 'push': return 'System notifications sent to your device'
      case 'email': return 'Email notifications sent to your registered address'
      case 'sms': return 'Text messages sent to your mobile phone'
    }
  }

  const updateChannelSetting = (channelIndex: number, updates: any) => {
    const updatedSettings = channelSettings.map((setting, index) =>
      index === channelIndex ? { ...setting, ...updates } : setting
    )
    onChannelSettingsChange(updatedSettings)
  }

  return (
    <Card className={`${theme.glassMorphism} border-gray-700/50 backdrop-blur-xl`}>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.accent}`}>
            <Volume2 size={24} className="text-white" />
          </div>
          <div>
            <CardTitle className={`text-xl ${theme.text}`}>Alert & Sound Settings</CardTitle>
            <CardDescription className={`${theme.text} opacity-70`}>
              Configure audio and visual alerts for each notification channel
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {channelSettings.map((channelSetting, index) => (
          <div key={channelSetting.channel} className="space-y-4">
            {/* Channel Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${channelSetting.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-700/50 text-gray-500'}`}>
                  {getChannelIcon(channelSetting.channel)}
                </div>
                <div>
                  <h3 className={`font-medium ${theme.text}`}>
                    {getChannelName(channelSetting.channel)}
                  </h3>
                  <p className={`text-sm ${theme.text} opacity-60`}>
                    {getChannelDescription(channelSetting.channel)}
                  </p>
                </div>
              </div>

              <Switch
                checked={channelSetting.enabled}
                onCheckedChange={(enabled) => updateChannelSetting(index, { enabled })}
              />
            </div>

            {/* Channel Settings */}
            {channelSetting.enabled && (
              <div className="ml-11 space-y-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                {/* Priority Threshold */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${theme.text}`}>
                    Minimum Priority Level
                  </label>
                  <Select
                    value={channelSetting.minPriority}
                    onValueChange={(minPriority: any) => updateChannelSetting(index, { minPriority })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{option.label}</span>
                            <Badge
                              variant="outline"
                              className={`ml-2 text-xs ${
                                option.value === 'urgent' ? 'border-red-500/30 text-red-400' :
                                option.value === 'high' ? 'border-orange-500/30 text-orange-400' :
                                option.value === 'normal' ? 'border-blue-500/30 text-blue-400' :
                                'border-gray-500/30 text-gray-400'
                              }`}
                            >
                              {option.value}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className={`text-xs ${theme.text} opacity-60`}>
                    Only notifications at or above this priority level will be sent through this channel
                  </p>
                </div>

                {/* Sound Settings */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${theme.text}`}>Sound Alert</label>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={channelSetting.sound}
                      onValueChange={(sound: any) => updateChannelSetting(index, { sound })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {notificationSoundOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPreviewSound(channelSetting.sound)}
                      disabled={channelSetting.sound === 'none'}
                      className="border-gray-600 hover:bg-gray-700/50"
                    >
                      <Play size={14} />
                    </Button>
                  </div>
                </div>

                {/* Visual Style */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${theme.text}`}>Visual Effect</label>
                  <Select
                    value={channelSetting.visualStyle}
                    onValueChange={(visualStyle: any) => updateChannelSetting(index, { visualStyle })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {visualAlertOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Delivery Delay */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${theme.text} flex items-center justify-between`}>
                    <span>Delivery Delay</span>
                    <span className={`text-xs ${theme.text} opacity-60`}>
                      {channelSetting.deliveryDelay === 0 ? 'Instant' : `${channelSetting.deliveryDelay} min`}
                    </span>
                  </label>
                  <Slider
                    value={[channelSetting.deliveryDelay]}
                    onValueChange={(value) => updateChannelSetting(index, { deliveryDelay: value[0] })}
                    max={1440} // 24 hours
                    step={15} // 15-minute increments
                    className="w-full"
                  />
                  <div className={`flex justify-between text-xs ${theme.text} opacity-50`}>
                    <span>Instant</span>
                    <span>24 hours</span>
                  </div>
                </div>

                {/* Quiet Hours Respect */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className={`text-sm font-medium ${theme.text}`}>
                      Respect Quiet Hours
                    </label>
                    <p className={`text-xs ${theme.text} opacity-60`}>
                      Hold notifications during quiet hours unless urgent
                    </p>
                  </div>
                  <Switch
                    checked={channelSetting.respectQuietHours}
                    onCheckedChange={(respectQuietHours) => updateChannelSetting(index, { respectQuietHours })}
                  />
                </div>
              </div>
            )}

            {/* Channel Availability Warning */}
            {channelSetting.channel === 'sms' && (
              <div className="ml-11 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className={`text-sm text-orange-400`}>
                  SMS notifications require phone number verification and may incur carrier charges
                </p>
              </div>
            )}

            {channelSetting.channel === 'push' && (
              <div className="ml-11 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className={`text-sm text-blue-400`}>
                  Push notifications require browser permission. Click the notification icon in your browser to enable.
                </p>
              </div>
            )}

            {index < channelSettings.length - 1 && (
              <div className="border-t border-gray-700/30 pt-4"></div>
            )}
          </div>
        ))}

        {/* Global Sound Settings */}
        <div className="pt-4 border-t border-gray-700/30">
          <h4 className={`font-medium ${theme.text} mb-4`}>Global Audio Settings</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className={`text-sm font-medium ${theme.text} flex items-center justify-between`}>
                <span>Master Volume</span>
                <span className={`text-xs ${theme.text} opacity-60`}>75%</span>
              </label>
              <Slider
                value={[75]}
                onValueChange={() => {}} // This would control global volume
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-sm font-medium ${theme.text}`}>
                  Audio Preview
                </label>
                <p className={`text-xs ${theme.text} opacity-60`}>
                  Play sound previews when adjusting settings
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-sm font-medium ${theme.text}`}>
                  Spatial Audio
                </label>
                <p className={`text-xs ${theme.text} opacity-60`}>
                  Use 3D positioning for notification sounds
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}