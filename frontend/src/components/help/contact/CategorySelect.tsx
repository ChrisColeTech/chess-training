import React from 'react'
import type { ContactCategory } from '@/types/contact'

interface CategorySelectProps {
  categories: ContactCategory[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
  getPriorityColor: (priority: string) => string
  error?: string
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  getPriorityColor,
  error
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-300 mb-3">What can we help you with?</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySelect(category.id)}
            className={`text-left p-4 border-2 rounded-lg transition-all duration-200 ${
              selectedCategory === category.id
                ? getPriorityColor(category.priority) + ' border-opacity-100'
                : 'border-slate-700/50 bg-slate-700/20 hover:bg-slate-600/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <category.icon size={20} className="text-purple-400 mt-1" />
              <div>
                <h3 className="font-medium text-white text-sm">{category.label}</h3>
                <p className="text-xs text-slate-400 mt-1">{category.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  )
}