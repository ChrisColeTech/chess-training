import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Languages, DollarSign, Hash, Type } from 'lucide-react'
// Local language options - moved from @/data/preferencesData
const languageOptions = [
  {
    value: 'en',
    label: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false,
    completeness: 100,
    region: 'US'
  },
  {
    value: 'es',
    label: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    rtl: false,
    completeness: 95,
    region: 'ES'
  },
  {
    value: 'fr',
    label: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false,
    completeness: 92,
    region: 'FR'
  },
  {
    value: 'de',
    label: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    rtl: false,
    completeness: 90,
    region: 'DE'
  },
  {
    value: 'ru',
    label: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    rtl: false,
    completeness: 88,
    region: 'RU'
  },
  {
    value: 'zh',
    label: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    rtl: false,
    completeness: 85,
    region: 'CN'
  },
  {
    value: 'ja',
    label: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    rtl: false,
    completeness: 82,
    region: 'JP'
  },
  {
    value: 'pt',
    label: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    rtl: false,
    completeness: 87,
    region: 'PT'
  },
  {
    value: 'it',
    label: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    rtl: false,
    completeness: 83,
    region: 'IT'
  },
  {
    value: 'ar',
    label: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    rtl: true,
    completeness: 75,
    region: 'SA'
  },
  {
    value: 'hi',
    label: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    rtl: false,
    completeness: 70,
    region: 'IN'
  },
  {
    value: 'ko',
    label: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    rtl: false,
    completeness: 78,
    region: 'KR'
  }
]
import type { LanguageSettingsProps } from '@/types/preferences'
import { FaChessKing } from 'react-icons/fa'
import { FaChessQueen } from 'react-icons/fa'
import { FaChessRook } from 'react-icons/fa'
import { FaChessBishop } from 'react-icons/fa'
import { FaChessKnight } from 'react-icons/fa'
import { FaChessPawn } from 'react-icons/fa'

export const LanguageSettings: React.FC<LanguageSettingsProps> = ({
  preferences,
  onUpdate,
  isLoading = false,
  theme
}) => {
  const handleSelectChange = (key: keyof typeof preferences, value: string) => {
    onUpdate({ [key]: value })
  }

  const handleToggle = (key: keyof typeof preferences) => {
    onUpdate({ [key]: !preferences[key] })
  }

  const getCurrentLanguage = () => {
    return languageOptions.find(lang => lang.value === preferences.currentLanguage)
  }

  const getFallbackLanguage = () => {
    return languageOptions.find(lang => lang.value === preferences.fallbackLanguage)
  }

  return (
    <Card className={`bg-gray-900/50 border-gray-700/50 ${theme.glassMorphism}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.accent} shadow-lg`}>
            <Globe size={20} className="text-white" />
          </div>
          <div>
            <CardTitle className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Localization
            </CardTitle>
            <CardDescription className="text-gray-400">
              Language, region, and notation preferences
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Primary Language Selection */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Language Selection
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Primary Language
              </Label>
              <Select
                value={preferences.currentLanguage}
                onValueChange={(value) => handleSelectChange('currentLanguage', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCurrentLanguage()?.flag}</span>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {languageOptions.map((language) => (
                    <SelectItem 
                      key={language.value} 
                      value={language.value}
                      className="text-white hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{language.flag}</span>
                        <div>
                          <div className="font-medium">{language.label}</div>
                          <div className="text-xs opacity-70">{language.nativeName}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Fallback Language
              </Label>
              <Select
                value={preferences.fallbackLanguage}
                onValueChange={(value) => handleSelectChange('fallbackLanguage', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getFallbackLanguage()?.flag}</span>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {languageOptions.map((language) => (
                    <SelectItem 
                      key={language.value} 
                      value={language.value}
                      className="text-white hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{language.flag}</span>
                        <div>
                          <div className="font-medium">{language.label}</div>
                          <div className="text-xs opacity-70">{language.nativeName}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Regional Settings
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Region/Country
              </Label>
              <Select
                value={preferences.region}
                onValueChange={(value) => handleSelectChange('region', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="US" className="text-white hover:bg-gray-700">
                    🇺🇸 United States
                  </SelectItem>
                  <SelectItem value="GB" className="text-white hover:bg-gray-700">
                    🇬🇧 United Kingdom
                  </SelectItem>
                  <SelectItem value="DE" className="text-white hover:bg-gray-700">
                    🇩🇪 Germany
                  </SelectItem>
                  <SelectItem value="FR" className="text-white hover:bg-gray-700">
                    🇫🇷 France
                  </SelectItem>
                  <SelectItem value="ES" className="text-white hover:bg-gray-700">
                    🇪🇸 Spain
                  </SelectItem>
                  <SelectItem value="RU" className="text-white hover:bg-gray-700">
                    🇷🇺 Russia
                  </SelectItem>
                  <SelectItem value="CN" className="text-white hover:bg-gray-700">
                    🇨🇳 China
                  </SelectItem>
                  <SelectItem value="JP" className="text-white hover:bg-gray-700">
                    🇯🇵 Japan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Currency
              </Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) => handleSelectChange('currency', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="USD" className="text-white hover:bg-gray-700">
                    USD - US Dollar ($)
                  </SelectItem>
                  <SelectItem value="EUR" className="text-white hover:bg-gray-700">
                    EUR - Euro (€)
                  </SelectItem>
                  <SelectItem value="GBP" className="text-white hover:bg-gray-700">
                    GBP - British Pound (£)
                  </SelectItem>
                  <SelectItem value="JPY" className="text-white hover:bg-gray-700">
                    JPY - Japanese Yen (¥)
                  </SelectItem>
                  <SelectItem value="RUB" className="text-white hover:bg-gray-700">
                    RUB - Russian Ruble (₽)
                  </SelectItem>
                  <SelectItem value="CNY" className="text-white hover:bg-gray-700">
                    CNY - Chinese Yuan (¥)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className={`text-sm font-medium ${theme.text}`}>
              Number Format
            </Label>
            <Select
              value={preferences.numberFormat}
              onValueChange={(value) => handleSelectChange('numberFormat', value)}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <div className="flex items-center gap-2">
                  <Hash size={16} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="default" className="text-white hover:bg-gray-700">
                  Default - 1,234.56
                </SelectItem>
                <SelectItem value="european" className="text-white hover:bg-gray-700">
                  European - 1.234,56
                </SelectItem>
                <SelectItem value="indian" className="text-white hover:bg-gray-700">
                  Indian - 1,23,456.78
                </SelectItem>
                <SelectItem value="scientific" className="text-white hover:bg-gray-700">
                  Scientific - 1.23E+3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chess Notation */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Chess Notation
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Piece Notation
              </Label>
              <Select
                value={preferences.pieceNotation}
                onValueChange={(value) => handleSelectChange('pieceNotation', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <FaChessKnight size={16} />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="figurine" className="text-white hover:bg-gray-700">
                    Figurine - <FaChessKing className="w-4 h-4 inline" /><FaChessQueen className="w-4 h-4 inline" /><FaChessRook className="w-4 h-4 inline" /><FaChessBishop className="w-4 h-4 inline" /><FaChessKnight className="w-4 h-4 inline" /><FaChessPawn className="w-4 h-4 inline" />
                  </SelectItem>
                  <SelectItem value="letter" className="text-white hover:bg-gray-700">
                    Letter - KQRBNP
                  </SelectItem>
                  <SelectItem value="symbol" className="text-white hover:bg-gray-700">
                    Symbol - K Q R B N P
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Move Notation
              </Label>
              <Select
                value={preferences.moveNotation}
                onValueChange={(value) => handleSelectChange('moveNotation', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <Type size={16} />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="algebraic" className="text-white hover:bg-gray-700">
                    Algebraic - Nf3, Bb5+
                  </SelectItem>
                  <SelectItem value="long_algebraic" className="text-white hover:bg-gray-700">
                    Long Algebraic - Ng1-f3
                  </SelectItem>
                  <SelectItem value="descriptive" className="text-white hover:bg-gray-700">
                    Descriptive - N-KB3
                  </SelectItem>
                  <SelectItem value="coordinate" className="text-white hover:bg-gray-700">
                    Coordinate - g1f3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Language Features */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Language Features
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Languages size={18} className={`${theme.text} opacity-70`} />
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    Auto-Detect Language
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Automatically detect browser language on first visit
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.autoDetectLanguage}
                onCheckedChange={() => handleToggle('autoDetectLanguage')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Type size={18} className={`${theme.text} opacity-70`} />
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    Show Translations
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Display original text alongside translations
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.showTranslations}
                onCheckedChange={() => handleToggle('showTranslations')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Quick Language Switcher */}
        <div className="pt-4 border-t border-gray-700/30">
          <div className="space-y-3">
            <Label className={`text-sm font-medium ${theme.text}`}>
              Quick Language Switch
            </Label>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {languageOptions.map((language) => (
                <Button
                  key={language.value}
                  variant={preferences.currentLanguage === language.value ? "default" : "outline"}
                  size="sm"
                  className={`h-auto p-2 flex flex-col items-center gap-1 ${
                    preferences.currentLanguage === language.value 
                      ? `bg-gradient-to-r ${theme.primary} text-white border-transparent`
                      : 'bg-gray-800/30 border-gray-600 hover:bg-gray-700/50'
                  }`}
                  onClick={() => handleSelectChange('currentLanguage', language.value)}
                  disabled={isLoading}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-xs">{language.value.toUpperCase()}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}