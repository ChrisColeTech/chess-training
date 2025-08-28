import React, { useState, useRef } from 'react'
import { User, Camera, Upload, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { soundFX } from '@/utils/soundEffects'
import type { ProfileEditorProps } from '@/types/account'

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  profile,
  onProfileUpdate,
  isLoading,
  error,
  theme
}) => {
  const [localProfile, setLocalProfile] = useState(profile)
  const [, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (field: keyof typeof profile, value: string | number) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
    soundFX.playClick()
  }

  const handleRatingChange = (ratingType: string, value: string) => {
    const numValue = parseInt(value) || 0
    setLocalProfile(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [ratingType]: numValue }
    }))
    setHasChanges(true)
    soundFX.playClick()
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setLocalProfile(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }))
    setHasChanges(true)
    soundFX.playClick()
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
    soundFX.playClick()
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setAvatarFile(file)
    setHasChanges(true)

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    
    soundFX.playSuccess()
  }

  const handleSave = () => {
    if (!hasChanges) return
    
    onProfileUpdate(localProfile)
    setHasChanges(false)
    soundFX.playSuccess()
  }

  const handleReset = () => {
    setLocalProfile(profile)
    setAvatarFile(null)
    setAvatarPreview(null)
    setHasChanges(false)
    soundFX.playClick()
  }

  return (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
            <Camera size={20} />
            Profile Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-700/50 flex items-center justify-center">
                {avatarPreview || localProfile.avatarUrl ? (
                  <img
                    src={avatarPreview || localProfile.avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-slate-400" />
                )}
              </div>
              <button
                onClick={handleAvatarClick}
                className={`absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
              >
                <Upload size={20} className="text-white" />
              </button>
            </div>
            
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${theme.text}`}>
                {localProfile.displayName}
              </h3>
              <p className="text-slate-400 mb-3">
                {localProfile.title && `${localProfile.title} • `}
                Member since {new Date(Date.now() - (180 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={handleAvatarClick}
                  variant="outline"
                  size="sm"
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                >
                  <Upload size={16} className="mr-2" />
                  Upload New
                </Button>
                {(avatarPreview || localProfile.avatarUrl) && (
                  <Button
                    onClick={() => {
                      setAvatarPreview(null)
                      setLocalProfile(prev => ({ ...prev, avatarUrl: undefined }))
                      setHasChanges(true)
                    }}
                    variant="outline"
                    size="sm"
                    className="bg-red-900/20 border-red-700/50 text-red-400 hover:bg-red-900/30"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`${theme.text}`}>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Display Name
              </Label>
              <Input
                value={localProfile.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                placeholder="Your display name"
              />
            </div>
            
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Email Address
              </Label>
              <Input
                value={localProfile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                type="email"
                className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Phone Number
              </Label>
              <Input
                value={localProfile.phoneNumber || ''}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                type="tel"
                className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Location
              </Label>
              <Input
                value={localProfile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                placeholder="City, Country"
              />
            </div>
            
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Birth Date
              </Label>
              <Input
                value={localProfile.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                type="date"
                className="mt-1 bg-slate-800/50 border-slate-600 text-white"
              />
            </div>
            
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Profile Visibility
              </Label>
              <Select
                value={localProfile.profileVisibility}
                onValueChange={(value) => handleInputChange('profileVisibility', value)}
              >
                <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="public">Public - Visible to everyone</SelectItem>
                  <SelectItem value="friends">Friends only</SelectItem>
                  <SelectItem value="private">Private - Only you</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
              Bio
            </Label>
            <textarea
              value={localProfile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
              className="mt-1 w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50 resize-none"
              placeholder="Tell others about your chess journey..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Chess Ratings */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`${theme.text}`}>Chess Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(localProfile.ratings).map(([type, rating]) => (
              <div key={type}>
                <Label className={`text-sm font-medium ${theme.text} opacity-90 capitalize`}>
                  {type} Rating
                </Label>
                <Input
                  value={rating}
                  onChange={(e) => handleRatingChange(type, e.target.value)}
                  type="number"
                  min="0"
                  max="4000"
                  className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
              FIDE Rating
            </Label>
            <Input
              value={localProfile.fideRating || ''}
              onChange={(e) => handleInputChange('fideRating', parseInt(e.target.value) || 0)}
              type="number"
              min="0"
              max="3000"
              className="mt-1 max-w-xs bg-slate-800/50 border-slate-600 text-white"
              placeholder="Official FIDE rating"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`${theme.text}`}>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Twitter
              </Label>
              <Input
                value={localProfile.socialLinks.twitter || ''}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                placeholder="https://twitter.com/username"
              />
            </div>
            
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                YouTube
              </Label>
              <Input
                value={localProfile.socialLinks.youtube || ''}
                onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                placeholder="https://youtube.com/@username"
              />
            </div>
            
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Twitch
              </Label>
              <Input
                value={localProfile.socialLinks.twitch || ''}
                onChange={(e) => handleSocialLinkChange('twitch', e.target.value)}
                className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                placeholder="https://twitch.tv/username"
              />
            </div>
            
            <div>
              <Label className={`text-sm font-medium ${theme.text} opacity-90`}>
                Website
              </Label>
              <Input
                value={localProfile.socialLinks.website || ''}
                onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                className="mt-1 bg-slate-800/50 border-slate-600 text-white"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      {hasChanges && (
        <div className="flex justify-between items-center p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
          <p className="text-sm text-slate-400">
            You have unsaved changes
          </p>
          <div className="flex gap-3">
            <Button
              onClick={handleReset}
              variant="outline"
              disabled={isLoading}
              className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <>
                  <Check size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}