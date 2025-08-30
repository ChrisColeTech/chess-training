import React, { useState } from 'react'
import { CreditCard, Calendar, CheckCircle, X, AlertTriangle, TrendingUp } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { soundFX } from '@/utils/soundEffects'
import type { SubscriptionManagementProps } from '@/types/account'

export const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({
  subscription,
  availableTiers,
  onUpgrade,
  onCancel,
  onUpdatePayment,
  isLoading,
  error,
  theme
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [selectedTier, setSelectedTier] = useState<{ tier: any; cycle: 'monthly' | 'yearly' } | null>(null)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-slate-700/30 border-slate-600/50'
      case 'premium': return 'bg-purple-900/20 border-purple-500/30 text-purple-400'
      case 'pro': return 'bg-yellow-900/20 border-yellow-500/30 text-yellow-400'
      case 'grandmaster': return 'bg-emerald-900/20 border-emerald-500/30 text-emerald-400'
      default: return 'bg-slate-700/30 border-slate-600/50'
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium': return <FaCrown size={20} className="text-purple-400" />
      case 'pro': return <FaCrown size={20} className="text-yellow-400" />
      case 'grandmaster': return <FaCrown size={20} className="text-emerald-400" />
      default: return <FaCrown size={20} className="text-slate-400" />
    }
  }

  const formatPrice = (price: number, cycle: 'monthly' | 'yearly' | 'lifetime' = 'monthly') => {
    const yearlyDiscount = 0.15 // 15% discount for yearly
    const actualPrice = cycle === 'yearly' ? price * 12 * (1 - yearlyDiscount) : price
    
    if (cycle === 'yearly') {
      return {
        display: `$${(actualPrice / 12).toFixed(2)}/mo`,
        billing: `$${actualPrice.toFixed(2)} billed annually`,
        savings: `Save ${(price * 12 * yearlyDiscount).toFixed(0)}% yearly`
      }
    }
    
    if (cycle === 'lifetime') {
      return {
        display: 'Lifetime Access',
        billing: 'One-time payment'
      }
    }
    
    return {
      display: `$${price.toFixed(2)}/mo`,
      billing: 'Billed monthly'
    }
  }

  const handleUpgrade = async (tier: any, cycle: 'monthly' | 'yearly') => {
    setSelectedTier({ tier, cycle })
    try {
      await onUpgrade(tier.tier, cycle)
      setSelectedTier(null)
      soundFX.playSuccess()
    } catch (err) {
      setSelectedTier(null)
      soundFX.playError()
    }
  }

  const handleCancel = async () => {
    try {
      await onCancel()
      setShowCancelConfirm(false)
      soundFX.playSuccess()
    } catch (err) {
      soundFX.playError()
    }
  }

  const daysUntilRenewal = Math.ceil(
    (subscription.currentPeriod.end - Date.now()) / (24 * 60 * 60 * 1000)
  )

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className={`${theme.glassMorphism} border-slate-700/50 ${getTierColor(subscription.tier)}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
              {getTierIcon(subscription.tier)}
              Current Plan: {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
              {subscription.status === 'cancelled' && (
                <Badge variant="destructive" className="ml-2">Cancelled</Badge>
              )}
            </CardTitle>
            <div className="text-right">
              <div className={`text-2xl font-bold ${theme.text}`}>
                {subscription.tier === 'free' ? 'Free' : formatPrice(subscription.tier === 'premium' ? 9.99 : subscription.tier === 'pro' ? 19.99 : 49.99, subscription.billingCycle).display}
              </div>
              {subscription.tier !== 'free' && (
                <p className="text-sm text-slate-400">
                  {formatPrice(subscription.tier === 'premium' ? 9.99 : subscription.tier === 'pro' ? 19.99 : 49.99, subscription.billingCycle).billing}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Plan Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className={`text-2xl font-bold ${theme.text}`}>
                {subscription.features.unlimitedPuzzles ? '∞' : '10'}
              </div>
              <div className="text-sm text-slate-400">Puzzles per day</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className={`text-2xl font-bold ${theme.text}`}>
                {subscription.features.advancedAnalytics ? '✓' : '✗'}
              </div>
              <div className="text-sm text-slate-400">Advanced analytics</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className={`text-2xl font-bold ${theme.text}`}>
                {subscription.features.personalCoach ? '✓' : '✗'}
              </div>
              <div className="text-sm text-slate-400">Personal AI coach</div>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <h3 className={`font-medium ${theme.text} mb-3`}>This Period Usage</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className={`text-lg font-bold ${theme.text}`}>{subscription.usage.puzzlesSolved.toLocaleString()}</div>
                <div className="text-slate-400">Puzzles solved</div>
              </div>
              <div>
                <div className={`text-lg font-bold ${theme.text}`}>{subscription.usage.gamesPlayed}</div>
                <div className="text-slate-400">Games played</div>
              </div>
              <div>
                <div className={`text-lg font-bold ${theme.text}`}>{subscription.usage.studyHours}h</div>
                <div className="text-slate-400">Study time</div>
              </div>
              <div>
                <div className={`text-lg font-bold ${theme.text}`}>{subscription.usage.coachingSessions}</div>
                <div className="text-slate-400">Coaching sessions</div>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          {subscription.tier !== 'free' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-slate-400" />
                  <div>
                    <div className={`font-medium ${theme.text}`}>
                      Payment Method
                    </div>
                    <div className="text-sm text-slate-400">
                      •••• •••• •••• {subscription.payment.lastFour}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdatePayment({})}
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                >
                  Update
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-slate-400" />
                  <div>
                    <div className={`font-medium ${theme.text}`}>
                      {subscription.status === 'cancelled' ? 'Expires' : 'Renews'}
                    </div>
                    <div className="text-sm text-slate-400">
                      {new Date(subscription.currentPeriod.end).toLocaleDateString()}
                      {subscription.status !== 'cancelled' && ` (${daysUntilRenewal} days)`}
                    </div>
                  </div>
                </div>
                {subscription.payment.autoRenew && subscription.status === 'active' && (
                  <Badge className="bg-green-900/20 text-green-400 border-green-700/50">
                    Auto-renew
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {subscription.tier !== 'free' && subscription.status === 'active' && (
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
              >
                Manage Billing
              </Button>
              <Button
                variant="outline"
                className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
              >
                View Invoices
              </Button>
              {!showCancelConfirm ? (
                <Button
                  variant="outline"
                  onClick={() => setShowCancelConfirm(true)}
                  className="bg-red-900/20 border-red-700/50 text-red-400 hover:bg-red-900/30 ml-auto"
                >
                  Cancel Subscription
                </Button>
              ) : (
                <div className="flex gap-2 ml-auto">
                  <Button
                    variant="outline"
                    onClick={() => setShowCancelConfirm(false)}
                    className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                    size="sm"
                  >
                    Keep
                  </Button>
                  <Button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                  >
                    {isLoading ? 'Cancelling...' : 'Confirm Cancel'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      {subscription.tier !== 'grandmaster' && (
        <Card className={`${theme.glassMorphism} border-slate-700/50`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
              <TrendingUp size={20} />
              Upgrade Your Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableTiers
                .filter(tier => {
                  const tierOrder = { free: 0, premium: 1, pro: 2, grandmaster: 3 }
                  return tierOrder[tier.tier] > tierOrder[subscription.tier]
                })
                .map((tier) => (
                  <div key={tier.tier} className={`p-6 rounded-xl border-2 ${getTierColor(tier.tier)} ${tier.popular ? 'ring-2 ring-purple-500/50' : ''}`}>
                    {tier.popular && (
                      <div className="flex justify-center mb-4">
                        <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <h3 className={`text-xl font-bold ${theme.text} flex items-center justify-center gap-2`}>
                        {getTierIcon(tier.tier)}
                        {tier.name}
                      </h3>
                    </div>

                    {/* Pricing Options */}
                    <div className="space-y-3 mb-6">
                      <div className="p-3 bg-slate-800/50 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className={`text-lg font-bold ${theme.text}`}>
                              {formatPrice(tier.price, 'monthly').display}
                            </div>
                            <div className="text-sm text-slate-400">Monthly billing</div>
                          </div>
                          <Button
                            onClick={() => handleUpgrade(tier, 'monthly')}
                            disabled={isLoading || (selectedTier?.tier === tier && selectedTier?.cycle === 'monthly')}
                            size="sm"
                            className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}
                          >
                            {isLoading && selectedTier?.tier === tier && selectedTier?.cycle === 'monthly' ? 'Processing...' : 'Choose Monthly'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-slate-800/50 rounded-lg border-2 border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className={`text-lg font-bold ${theme.text}`}>
                              {formatPrice(tier.price, 'yearly').display}
                            </div>
                            <div className="text-sm text-slate-400">
                              {formatPrice(tier.price, 'yearly').billing}
                            </div>
                            <div className="text-xs text-green-400 font-medium">
                              {formatPrice(tier.price, 'yearly').savings}
                            </div>
                          </div>
                          <Button
                            onClick={() => handleUpgrade(tier, 'yearly')}
                            disabled={isLoading || (selectedTier?.tier === tier && selectedTier?.cycle === 'yearly')}
                            size="sm"
                            className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}
                          >
                            {isLoading && selectedTier?.tier === tier && selectedTier?.cycle === 'yearly' ? 'Processing...' : 'Choose Yearly'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 text-sm">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-300">
                          <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      <Card className={`${theme.glassMorphism} border-slate-700/50`}>
        <CardHeader>
          <CardTitle className={`${theme.text}`}>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {subscription.billingHistory.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    payment.status === 'paid' ? 'bg-green-900/20 text-green-400' :
                    payment.status === 'refunded' ? 'bg-yellow-900/20 text-yellow-400' :
                    'bg-red-900/20 text-red-400'
                  }`}>
                    {payment.status === 'paid' ? <CheckCircle size={16} /> :
                     payment.status === 'refunded' ? <AlertTriangle size={16} /> :
                     <X size={16} />}
                  </div>
                  <div>
                    <div className={`font-medium ${theme.text}`}>
                      ${payment.amount.toFixed(2)} {payment.currency}
                    </div>
                    <div className="text-sm text-slate-400">
                      {payment.description} • {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm capitalize ${
                    payment.status === 'paid' ? 'text-green-400' :
                    payment.status === 'refunded' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {payment.status}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                    onClick={() => window.open(payment.invoiceUrl, '_blank')}
                  >
                    Invoice
                  </Button>
                </div>
              </div>
            ))}
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