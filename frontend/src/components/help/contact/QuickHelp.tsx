import React from 'react'

interface QuickHelpOption {
  id: string
  title: string
  description: string
  path: string
}

interface QuickHelpProps {
  options: QuickHelpOption[]
  onHelpClick: (path: string) => void
}

export const QuickHelp: React.FC<QuickHelpProps> = ({
  options,
  onHelpClick
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Quick Help</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onHelpClick(option.path)}
            className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-600/30 rounded-lg transition-colors"
          >
            <div className="font-medium text-white text-sm">{option.title}</div>
            <div className="text-xs text-slate-400">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}