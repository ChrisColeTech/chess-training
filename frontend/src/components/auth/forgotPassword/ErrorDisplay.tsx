import React from 'react'

interface ErrorDisplayProps {
  error: string
  theme: any
}

/**
 * ErrorDisplay - Component for displaying error messages
 * Handles ONLY presentation logic - all business logic in useForgotPassword hook
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  // theme, // Unused for now
}) => {
  if (!error) return null

  return (
    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg animate-slide-down">
      <p className="text-sm text-red-400">{error}</p>
    </div>
  )
}