import React from 'react'
import type { SystemInfo } from '@/types/contact'

interface SystemInfoPreviewProps {
  systemInfo: SystemInfo
}

export const SystemInfoPreview: React.FC<SystemInfoPreviewProps> = ({
  systemInfo
}) => {
  return (
    <div className="mb-6 p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg">
      <h4 className="text-sm font-medium text-slate-300 mb-2">System Information (will be included)</h4>
      <div className="text-xs text-slate-400 space-y-1">
        <div>Browser: {systemInfo.browser}</div>
        <div>OS: {systemInfo.os}</div>
        <div>Screen: {systemInfo.screen}</div>
        <div>Account Type: {systemInfo.accountType}</div>
        <div>Last Login: {systemInfo.lastLogin}</div>
      </div>
    </div>
  )
}