import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useContact } from '@/hooks/useContact'
import { quickHelpOptions } from '@/data/contactSupport'
import { 
  ContactForm, 
  SupportChannels, 
  QuickHelp, 
  SuccessState 
} from '@/components/help/contact'

/**
 * Contact Page Component
 * 
 * SUPPORT CENTER themed contact interface with comprehensive support channels,
 * categorized contact form, quick help options, and submission handling.
 * 
 * ARCHITECTURE: SRP COMPLIANT
 * - Page handles ONLY presentation logic
 * - ALL business logic extracted to useContact hook
 * - Components extracted to /components/help/contact/
 * - Mock data in /data/contactSupport.ts
 * - Types defined in /types/contact.ts
 */
const ContactPage: React.FC = () => {
  // Contact management hook (contains ALL business logic)
  const {
    // Form state
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    submissionResult,
    
    // Static data
    supportChannels,
    contactCategories,
    systemInfo,
    
    // Form handlers (business logic extracted to hook)
    updateFormField,
    handleSubmit,
    clearForm,
    
    // Utility functions
    getPriorityColor,
    
    // Navigation handlers (business logic extracted to hook)
    handleBackToHelp,
    handleSendAnother,
    handleQuickHelpClick,
    handleChannelAction
  } = useContact()

  // Success state - separate component
  if (isSubmitted && submissionResult) {
    return (
      <SuccessState
        submissionResult={submissionResult}
        onSendAnother={handleSendAnother}
        onBackToHelp={handleBackToHelp}
      />
    )
  }

  // Main contact page layout - presentation only
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full opacity-20 animate-bounce animation-delay-1000"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-purple-300 rounded-full opacity-30 animate-bounce animation-delay-2000"></div>
      <div className="absolute bottom-32 left-40 w-2 h-2 bg-blue-300 rounded-full opacity-25 animate-bounce animation-delay-3000"></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-indigo-300 rounded-full opacity-20 animate-bounce animation-delay-4000"></div>

      {/* Sparkle effects */}
      <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full opacity-40 animate-ping animation-delay-1000"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-300 rounded-full opacity-50 animate-ping animation-delay-3000"></div>
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-purple-300 rounded-full opacity-30 animate-ping animation-delay-5000"></div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToHelp}
              className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200 text-slate-300 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                SUPPORT CENTER
              </h1>
              <p className="text-slate-400 mt-1">Get help with your chess training experience</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Support Channels */}
          <div className="lg:col-span-1 space-y-6">
            <SupportChannels
              channels={supportChannels}
              onChannelAction={handleChannelAction}
            />

            {/* Quick Help */}
            <QuickHelp
              options={quickHelpOptions}
              onHelpClick={handleQuickHelpClick}
            />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm
              formData={formData}
              errors={errors}
              categories={contactCategories}
              systemInfo={systemInfo}
              isSubmitting={isSubmitting}
              onFieldChange={updateFormField}
              onSubmit={handleSubmit}
              onClear={clearForm}
              getPriorityColor={getPriorityColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
