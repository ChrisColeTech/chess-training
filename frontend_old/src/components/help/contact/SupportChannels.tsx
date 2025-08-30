import React from 'react'
import { Clock } from 'lucide-react'
import type { SupportChannel } from '@/types/contact'

interface SupportChannelsProps {
  channels: SupportChannel[]
  onChannelAction: (channelId: string) => void
}

export const SupportChannels: React.FC<SupportChannelsProps> = ({
  channels,
  onChannelAction
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Support Channels</h2>
      <div className="space-y-4">
        {channels.map((channel) => (
          <div key={channel.id} className="border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/50 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <channel.icon size={24} className="text-purple-400 mt-1" />
              <div>
                <h3 className="font-semibold text-white">{channel.name}</h3>
                <p className="text-sm text-slate-300 mt-1">{channel.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{channel.responseTime}</span>
              </div>
              <div>{channel.availability}</div>
            </div>
            <button
              onClick={() => onChannelAction(channel.id)}
              disabled={!channel.isEnabled}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                !channel.isEnabled 
                  ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {!channel.isEnabled && channel.id === 'chat' ? 'Currently Offline' : channel.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}