import React from 'react'
import { Mail, Info } from 'lucide-react'
import type { ContactFormData, ContactFormErrors, ContactCategory, SystemInfo } from '@/types/contact'
import { CategorySelect } from './CategorySelect'
import { SystemInfoPreview } from './SystemInfoPreview'

// Local constants for response time info instead of importing from @/data
const responseTimeInfo = {
  title: "Expected Response Time",
  message: "We typically respond within 24-48 hours. High priority issues may receive faster responses during business hours."
}

interface ContactFormProps {
  formData: ContactFormData
  errors: ContactFormErrors
  categories: ContactCategory[]
  systemInfo: SystemInfo
  isSubmitting: boolean
  onFieldChange: (field: keyof ContactFormData, value: any) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  onClear: () => void
  getPriorityColor: (priority: string) => string
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  errors,
  categories,
  systemInfo,
  isSubmitting,
  onFieldChange,
  onSubmit,
  onClear,
  getPriorityColor
}) => {
  return (
    <form onSubmit={onSubmit} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Send us a Message</h2>

      {/* Category Selection */}
      <CategorySelect
        categories={categories}
        selectedCategory={formData.selectedCategory}
        onCategorySelect={(categoryId) => onFieldChange('selectedCategory', categoryId)}
        getPriorityColor={getPriorityColor}
        error={errors.category}
      />

      {/* Subject */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">Subject *</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => onFieldChange('subject', e.target.value)}
          placeholder="Brief description of your issue or question"
          className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none transition-colors ${
            errors.subject ? 'border-red-500/50' : 'border-slate-600/50 focus:border-purple-500/50'
          }`}
        />
        {errors.subject && <p className="text-red-400 text-sm mt-2">{errors.subject}</p>}
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onFieldChange('email', e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
          readOnly
        />
        <p className="text-xs text-slate-400 mt-1">Using your account email address</p>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
        <textarea
          value={formData.message}
          onChange={(e) => onFieldChange('message', e.target.value)}
          placeholder="Please provide as much detail as possible about your issue or question..."
          rows={6}
          className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none resize-none transition-colors ${
            errors.message ? 'border-red-500/50' : 'border-slate-600/50 focus:border-purple-500/50'
          }`}
        />
        <div className="flex justify-between items-center mt-2">
          {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
          <p className="text-xs text-slate-400 ml-auto">{formData.message.length} characters</p>
        </div>
      </div>

      {/* Options */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="attachFiles"
            checked={formData.attachFiles}
            onChange={(e) => onFieldChange('attachFiles', e.target.checked)}
            className="rounded bg-slate-700 border-slate-600 text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="attachFiles" className="text-sm text-slate-300">
            I have files to attach (screenshots, logs, etc.)
          </label>
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="includeSystemInfo"
            checked={formData.includeSystemInfo}
            onChange={(e) => onFieldChange('includeSystemInfo', e.target.checked)}
            className="rounded bg-slate-700 border-slate-600 text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="includeSystemInfo" className="text-sm text-slate-300">
            Include system information (browser, device, etc.)
          </label>
        </div>
      </div>

      {/* System Info Preview */}
      {formData.includeSystemInfo && (
        <SystemInfoPreview systemInfo={systemInfo} />
      )}

      {/* Submit */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Mail size={18} />
              <span>Send Message</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onClear}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Response Time Notice */}
      <div className="p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-300 mb-1">{responseTimeInfo.title}</h4>
            <p className="text-sm text-slate-300">
              {responseTimeInfo.message}
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}