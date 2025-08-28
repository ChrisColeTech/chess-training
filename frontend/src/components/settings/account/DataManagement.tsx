import React, { useState } from 'react'
import { Download, Trash, Shield, AlertTriangle, Clock, FileText, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { soundFX } from '@/utils/soundEffects'
import type { DataManagementProps } from '@/types/account'

export const DataManagement: React.FC<DataManagementProps> = ({
  privacy,
  dataExports,
  deletionRequest,
  onPrivacyUpdate,
  onExportRequest,
  onDeleteAccount,
  isLoading,
  error,
  theme
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteReason, setDeleteReason] = useState('')
  const [exportData, setExportData] = useState(true)
  const [exportConfig, setExportConfig] = useState({
    format: 'json' as const,
    includeProfile: true,
    includeGames: true,
    includePuzzles: true,
    includeProgress: true,
    includeSocial: false,
    includePayments: false
  })

  const handlePrivacyToggle = (setting: string, value: boolean | string) => {
    if (setting.includes('.')) {
      const [parent, child] = setting.split('.')
      onPrivacyUpdate({
        [parent]: {
          ...(privacy[parent as keyof typeof privacy] as object || {}),
          [child]: value
        }
      })
    } else {
      onPrivacyUpdate({ [setting]: value })
    }
    soundFX.playClick()
  }

  const handleExportRequest = async () => {
    const dataTypes = []
    if (exportConfig.includeProfile) dataTypes.push('profile')
    if (exportConfig.includeGames) dataTypes.push('games')
    if (exportConfig.includePuzzles) dataTypes.push('puzzles')
    if (exportConfig.includeProgress) dataTypes.push('progress')
    if (exportConfig.includeSocial) dataTypes.push('social')
    if (exportConfig.includePayments) dataTypes.push('payments')

    try {
      await onExportRequest(exportConfig.format, dataTypes)
      soundFX.playSuccess()
    } catch (err) {
      soundFX.playError()
    }
  }

  const handleDeleteAccount = async () => {
    if (!deleteReason.trim()) {
      alert('Please provide a reason for account deletion')
      return
    }

    try {
      await onDeleteAccount(deleteReason, exportData)
      soundFX.playSuccess()
      setShowDeleteConfirm(false)
    } catch (err) {
      soundFX.playError()
    }
  }

  const getExportStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-900/20 text-green-400 border-green-700/50'
      case 'processing': return 'bg-blue-900/20 text-blue-400 border-blue-700/50'
      case 'pending': return 'bg-yellow-900/20 text-yellow-400 border-yellow-700/50'
      case 'failed': return 'bg-red-900/20 text-red-400 border-red-700/50'
      default: return 'bg-slate-700/30 text-slate-400 border-slate-600/50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
            <Shield size={20} />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile Visibility */}
          <div className="space-y-4">
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90 mb-3 block`}>
                Profile Visibility
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-medium ${theme.text} text-sm`}>Profile</div>
                      <div className="text-xs text-slate-400">Basic profile information</div>
                    </div>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) => handlePrivacyToggle('profileVisibility', value)}
                    >
                      <SelectTrigger className="w-24 h-8 text-xs bg-slate-800/50 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-medium ${theme.text} text-sm`}>Games</div>
                      <div className="text-xs text-slate-400">Game history and results</div>
                    </div>
                    <Select
                      value={privacy.gameVisibility}
                      onValueChange={(value) => handlePrivacyToggle('gameVisibility', value)}
                    >
                      <SelectTrigger className="w-24 h-8 text-xs bg-slate-800/50 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-medium ${theme.text} text-sm`}>Statistics</div>
                      <div className="text-xs text-slate-400">Ratings and performance</div>
                    </div>
                    <Select
                      value={privacy.statsVisibility}
                      onValueChange={(value) => handlePrivacyToggle('statsVisibility', value)}
                    >
                      <SelectTrigger className="w-24 h-8 text-xs bg-slate-800/50 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Settings */}
            <div className="space-y-3">
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Communication Preferences
              </Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <div className={`font-medium ${theme.text} text-sm`}>Online Status</div>
                    <div className="text-xs text-slate-400">Show when you're online to other users</div>
                  </div>
                  <Switch
                    checked={privacy.onlineStatus}
                    onCheckedChange={(checked) => handlePrivacyToggle('onlineStatus', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <div className={`font-medium ${theme.text} text-sm`}>Friend Requests</div>
                    <div className="text-xs text-slate-400">Allow others to send you friend requests</div>
                  </div>
                  <Switch
                    checked={privacy.allowFriendRequests}
                    onCheckedChange={(checked) => handlePrivacyToggle('allowFriendRequests', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <div className={`font-medium ${theme.text} text-sm`}>Direct Messages</div>
                    <div className="text-xs text-slate-400">Allow direct messages from other users</div>
                  </div>
                  <Switch
                    checked={privacy.allowDirectMessages}
                    onCheckedChange={(checked) => handlePrivacyToggle('allowDirectMessages', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Data Collection */}
            <div className="space-y-3">
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Data Collection & Usage
              </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <div className={`font-medium ${theme.text} text-sm`}>Analytics</div>
                    <div className="text-xs text-slate-400">Usage analytics and performance tracking</div>
                  </div>
                  <Switch
                    checked={privacy.dataCollection.analytics}
                    onCheckedChange={(checked) => handlePrivacyToggle('dataCollection.analytics', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <div className={`font-medium ${theme.text} text-sm`}>Marketing</div>
                    <div className="text-xs text-slate-400">Promotional emails and offers</div>
                  </div>
                  <Switch
                    checked={privacy.dataCollection.marketing}
                    onCheckedChange={(checked) => handlePrivacyToggle('dataCollection.marketing', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <div className={`font-medium ${theme.text} text-sm`}>Personalization</div>
                    <div className="text-xs text-slate-400">Customized content and recommendations</div>
                  </div>
                  <Switch
                    checked={privacy.dataCollection.personalization}
                    onCheckedChange={(checked) => handlePrivacyToggle('dataCollection.personalization', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <div className={`font-medium ${theme.text} text-sm`}>Research</div>
                    <div className="text-xs text-slate-400">Anonymous data for product improvement</div>
                  </div>
                  <Switch
                    checked={privacy.dataCollection.research}
                    onCheckedChange={(checked) => handlePrivacyToggle('dataCollection.research', checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
            <Download size={20} />
            Export Your Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 text-sm">
            Download a copy of your account data including games, progress, and achievements. 
            Exports are automatically deleted after 7 days.
          </p>

          {/* Export Configuration */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                  Export Format
                </Label>
                <Select
                  value={exportConfig.format}
                  onValueChange={(value: any) => setExportConfig(prev => ({ ...prev, format: value }))}
                >
                  <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="json">JSON (Structured data)</SelectItem>
                    <SelectItem value="csv">CSV (Spreadsheet format)</SelectItem>
                    <SelectItem value="pgn">PGN (Chess games only)</SelectItem>
                    <SelectItem value="pdf">PDF (Human readable)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90 mb-3 block`}>
                Data to Include
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: 'includeProfile', label: 'Profile Info', icon: FileText },
                  { key: 'includeGames', label: 'Games', icon: Database },
                  { key: 'includePuzzles', label: 'Puzzles', icon: Database },
                  { key: 'includeProgress', label: 'Progress', icon: Database },
                  { key: 'includeSocial', label: 'Social Data', icon: Database },
                  { key: 'includePayments', label: 'Payments', icon: Database }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-slate-400" />
                      <span className="text-sm text-white">{label}</span>
                    </div>
                    <Switch
                      checked={exportConfig[key as keyof typeof exportConfig] as boolean}
                      onCheckedChange={(checked) => setExportConfig(prev => ({ ...prev, [key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleExportRequest}
              disabled={isLoading}
              className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  <Download size={16} className="mr-2" />
                  Request Data Export
                </>
              )}
            </Button>
          </div>

          {/* Export History */}
          {dataExports.length > 0 && (
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90 mb-3 block`}>
                Recent Exports
              </Label>
              <div className="space-y-3">
                {dataExports.map((exportItem) => (
                  <div key={exportItem.requestId} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-slate-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${theme.text}`}>
                            {exportItem.format.toUpperCase()} Export
                          </span>
                          <Badge className={getExportStatusColor(exportItem.status)}>
                            {exportItem.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-400">
                          Requested {new Date(exportItem.requestedAt).toLocaleDateString()}
                          {exportItem.fileSize && ` • ${(exportItem.fileSize / 1024 / 1024).toFixed(1)} MB`}
                        </div>
                      </div>
                    </div>
                    {exportItem.status === 'completed' && exportItem.downloadUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(exportItem.downloadUrl, '_blank')}
                        className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                      >
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className={`${theme.glassMorphism} border-red-700/50`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 text-red-400`}>
            <Trash size={20} />
            Delete Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-red-400 font-medium mb-2">This action cannot be undone</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• All your games, puzzles, and progress will be permanently deleted</li>
                  <li>• Your subscription will be cancelled immediately</li>
                  <li>• Connected services will be disconnected</li>
                  <li>• Your username will become available for others to use</li>
                  <li>• You have 7 days to cancel the deletion request</li>
                </ul>
              </div>
            </div>
          </div>

          {deletionRequest ? (
            <div className="p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Clock size={20} className="text-yellow-400" />
                <h3 className="text-yellow-400 font-medium">Account Deletion Scheduled</h3>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                Your account deletion is scheduled for {new Date(deletionRequest.scheduledFor || Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.
                You can cancel this request until then.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                >
                  Cancel Deletion
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-900/20 border-blue-700/50 text-blue-400 hover:bg-blue-900/30"
                >
                  Export Data First
                </Button>
              </div>
            </div>
          ) : (
            <>
              {!showDeleteConfirm ? (
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  variant="outline"
                  className="bg-red-900/20 border-red-700/50 text-red-400 hover:bg-red-900/30"
                >
                  <Trash size={16} className="mr-2" />
                  Delete My Account
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                      Please tell us why you're leaving (required)
                    </Label>
                    <textarea
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      rows={3}
                      className="mt-1 w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500/50 resize-none"
                      placeholder="Your feedback helps us improve our service..."
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <Switch
                      checked={exportData}
                      onCheckedChange={setExportData}
                    />
                    <Label className="text-sm text-white">
                      Export my data before deletion
                    </Label>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowDeleteConfirm(false)}
                      variant="outline"
                      className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeleteAccount}
                      disabled={isLoading || !deleteReason.trim()}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        'Schedule Account Deletion'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}