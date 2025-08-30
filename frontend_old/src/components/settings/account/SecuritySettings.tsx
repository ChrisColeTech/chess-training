import React, { useState } from 'react'
import { Shield, Key, Lock, Eye, EyeOff, CheckCircle, AlertTriangle, Copy, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { soundFX } from '@/utils/soundEffects'
import type { SecuritySettingsProps } from '@/types/account'

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  security,
  onSecurityUpdate,
  onPasswordChange,
  onTwoFactorSetup,
  isLoading,
  error,
  theme
}) => {
  const [showPasswords, setShowPasswords] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [twoFactorSetup, setTwoFactorSetup] = useState<{
    secret?: string
    qrCode?: string
    verificationCode: string
    showSetup: boolean
  }>({
    verificationCode: '',
    showSetup: false
  })

  const handlePasswordChange = async () => {
    if (passwordForm.new !== passwordForm.confirm) {
      alert('New passwords do not match')
      return
    }

    if (passwordForm.new.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }

    const success = await onPasswordChange(passwordForm.current, passwordForm.new)
    if (success) {
      setPasswordForm({ current: '', new: '', confirm: '' })
      soundFX.playSuccess()
    }
  }

  const handleTwoFactorToggle = async () => {
    if (security.twoFactorAuth.enabled) {
      // Disable 2FA
      const code = prompt('Please enter your authentication code to disable 2FA:')
      if (code) {
        onSecurityUpdate({
          twoFactorAuth: {
            ...security.twoFactorAuth,
            enabled: false,
            method: 'none'
          }
        })
      }
    } else {
      // Enable 2FA - show setup
      try {
        const setupData = await onTwoFactorSetup('totp')
        setTwoFactorSetup({
          secret: setupData.secret,
          qrCode: setupData.qrCode,
          verificationCode: '',
          showSetup: true
        })
      } catch (err) {
        console.error('2FA setup failed:', err)
      }
    }
  }

  const completeTwoFactorSetup = () => {
    if (twoFactorSetup.verificationCode.length !== 6) {
      alert('Please enter a valid 6-digit code')
      return
    }

    // Simulate verification
    onSecurityUpdate({
      twoFactorAuth: {
        ...security.twoFactorAuth,
        enabled: true,
        method: 'totp',
        enabledAt: Date.now()
      }
    })

    setTwoFactorSetup({
      verificationCode: '',
      showSetup: false
    })
    soundFX.playSuccess()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    soundFX.playClick()
  }

  const getPasswordStrengthColor = () => {
    switch (security.passwordRequirements.strength) {
      case 'weak': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'strong': return 'text-green-400'
      default: return 'text-slate-400'
    }
  }

  const daysSincePasswordChange = Math.floor(
    (Date.now() - security.passwordRequirements.lastChanged) / (24 * 60 * 60 * 1000)
  )

  return (
    <div className="space-y-6">
      {/* Password Management */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
            <Key size={20} />
            Password Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Password Status */}
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium ${theme.text}`}>Password Strength</span>
              <span className={`text-sm font-medium capitalize ${getPasswordStrengthColor()}`}>
                {security.passwordRequirements.strength}
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Last changed {daysSincePasswordChange} days ago
              {daysSincePasswordChange > 90 && (
                <span className="text-yellow-400 ml-1">
                  • Consider updating your password
                </span>
              )}
            </p>
          </div>

          {/* Change Password Form */}
          <div className="space-y-4">
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Current Password
              </Label>
              <div className="relative">
                <Input
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                  className="mt-1 bg-slate-800/50 border-slate-600 text-white pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                  New Password
                </Label>
                <Input
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                  className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                  Confirm New Password
                </Label>
                <Input
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                  className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <Button
              onClick={handlePasswordChange}
              disabled={isLoading || !passwordForm.current || !passwordForm.new || !passwordForm.confirm}
              className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}
            >
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
            <Lock size={20} />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 2FA Status */}
          <div className={`p-4 rounded-lg ${security.twoFactorAuth.enabled ? 'bg-green-900/20 border border-green-700/50' : 'bg-slate-700/30'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {security.twoFactorAuth.enabled ? (
                  <CheckCircle size={24} className="text-green-400" />
                ) : (
                  <AlertTriangle size={24} className="text-yellow-400" />
                )}
                <div>
                  <h3 className={`font-medium ${theme.text}`}>
                    Enhanced Security
                  </h3>
                  <p className="text-sm text-slate-400">
                    {security.twoFactorAuth.enabled 
                      ? 'Two-factor authentication is enabled'
                      : 'Add an extra layer of protection to your account'
                    }
                  </p>
                </div>
              </div>
              <Switch
                checked={security.twoFactorAuth.enabled}
                onCheckedChange={handleTwoFactorToggle}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* 2FA Setup Modal */}
          {twoFactorSetup.showSetup && (
            <Card className="border-purple-500/50 bg-purple-900/20">
              <CardHeader>
                <CardTitle className={`text-lg ${theme.text}`}>
                  Set up Two-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-slate-300">
                  <p className="mb-4">
                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                  </p>
                  
                  {twoFactorSetup.qrCode && (
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-white rounded-lg">
                        <QrCode size={48} className="text-slate-800" />
                        <p className="text-center text-xs text-slate-600 mt-2">QR Code Placeholder</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-3 bg-slate-800/50 rounded border-2 border-dashed border-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Secret Key:</span>
                      <button 
                        onClick={() => copyToClipboard(twoFactorSetup.secret || '')}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    <code className="text-sm text-white font-mono break-all">
                      {twoFactorSetup.secret}
                    </code>
                  </div>
                  
                  <div className="mt-4">
                    <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                      Enter the 6-digit code from your app
                    </Label>
                    <div className="flex gap-3 mt-1">
                      <Input
                        value={twoFactorSetup.verificationCode}
                        onChange={(e) => setTwoFactorSetup(prev => ({ 
                          ...prev, 
                          verificationCode: e.target.value.replace(/\D/g, '').slice(0, 6)
                        }))}
                        className="bg-slate-800/50 border-slate-600 text-white text-center font-mono text-lg"
                        placeholder="123456"
                        maxLength={6}
                      />
                      <Button
                        onClick={completeTwoFactorSetup}
                        disabled={twoFactorSetup.verificationCode.length !== 6}
                        className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Backup Codes */}
          {security.twoFactorAuth.enabled && (
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <h3 className={`font-medium ${theme.text} mb-2`}>Backup Codes</h3>
              <p className="text-sm text-slate-400 mb-3">
                Keep these codes safe. Each can only be used once if you lose access to your authenticator.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm font-mono">
                {security.twoFactorAuth.backupCodes.map((code, index) => (
                  <div key={index} className="p-2 bg-slate-800/50 rounded border">
                    <span className="text-white">{code}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                onClick={() => {
                  const codes = security.twoFactorAuth.backupCodes.join('\n')
                  copyToClipboard(codes)
                }}
              >
                <Copy size={16} className="mr-2" />
                Copy All Codes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Login Notifications */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
            <Shield size={20} />
            Login Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <h3 className={`font-medium ${theme.text}`}>New Device Notifications</h3>
                <p className="text-sm text-slate-400">Get alerted when you log in from a new device</p>
              </div>
              <Switch
                checked={security.loginNotifications.newDevice}
                onCheckedChange={(checked) => onSecurityUpdate({
                  loginNotifications: { ...security.loginNotifications, newDevice: checked }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <h3 className={`font-medium ${theme.text}`}>Suspicious Activity Alerts</h3>
                <p className="text-sm text-slate-400">Get notified of unusual login attempts</p>
              </div>
              <Switch
                checked={security.loginNotifications.suspiciousActivity}
                onCheckedChange={(checked) => onSecurityUpdate({
                  loginNotifications: { ...security.loginNotifications, suspiciousActivity: checked }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <h3 className={`font-medium ${theme.text}`}>Failed Login Attempts</h3>
                <p className="text-sm text-slate-400">Get alerts for failed password attempts</p>
              </div>
              <Switch
                checked={security.loginNotifications.failedAttempts}
                onCheckedChange={(checked) => onSecurityUpdate({
                  loginNotifications: { ...security.loginNotifications, failedAttempts: checked }
                })}
              />
            </div>
          </div>
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