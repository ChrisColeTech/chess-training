import React from 'react'
import { CheckCircle } from 'lucide-react'
import type { ContactSubmissionResponse } from '@/types/contact'
import { successMessages } from '@/data/contactSupport'

interface SuccessStateProps {
  submissionResult: ContactSubmissionResponse
  onSendAnother: () => void
  onBackToHelp: () => void
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  submissionResult,
  onSendAnother,
  onBackToHelp
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 p-6 flex items-center justify-center min-h-screen">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-600/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">{successMessages.submitted.title}</h2>
          <p className="text-slate-300 mb-4">
            {successMessages.submitted.message}
          </p>
          <p className="text-sm text-slate-400 mb-6">
            Ticket ID: #{submissionResult.ticketId}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onSendAnother}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-colors"
            >
              {successMessages.submitted.actions.sendAnother}
            </button>
            <button
              onClick={onBackToHelp}
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
            >
              {successMessages.submitted.actions.backToHelp}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}