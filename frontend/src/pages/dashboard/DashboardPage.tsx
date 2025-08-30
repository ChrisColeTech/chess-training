import React from 'react'
import { DashboardHeader } from '../../components/dashboard/DashboardHeader'
import { ThemeShowcase } from '../../components/dashboard/ThemeShowcase'
import { QuickActions } from '../../components/dashboard/QuickActions'
import { DailyGoals } from '../../components/dashboard/DailyGoals'
import { RecentAchievements } from '../../components/dashboard/RecentAchievements'

/**
 * DashboardPage - Built the correct way
 * Shows UI components and layout regardless of backend status
 * Uses proper component composition with individual dashboard components
 */
export const DashboardPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        <div className="space-y-6">
          {/* Header Section - Stats + Recent Activity */}
          <DashboardHeader />

          {/* Premium Theme Showcase - Prominent placement */}
          <ThemeShowcase />

          {/* Quick Actions Row */}
          <QuickActions />

          {/* Daily Goals - Prominent position per ASCII mockup */}
          <DailyGoals />

          {/* Recent Achievements - New section per ASCII mockup */}
          <RecentAchievements />
        </div>
      </div>
    </div>
  )
}