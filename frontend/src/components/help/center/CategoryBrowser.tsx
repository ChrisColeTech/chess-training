import React from 'react'
import { Rocket, Gamepad2, Puzzle, GraduationCap, Settings, Wrench, AlertTriangle, Zap, ArrowRight, Star, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CategoryBrowserProps, HelpCategory } from '@/types/helpCenter'

// Icon mapping for categories
const categoryIcons = {
  'getting-started': Rocket,
  'gameplay': Gamepad2,
  'puzzles': Puzzle,
  'training': GraduationCap,
  'account': Settings,
  'technical': Wrench,
  'troubleshooting': AlertTriangle,
  'advanced': Zap
}

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  theme
}) => {
  // Sort categories: popular first, then alphabetical
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1
    if (!a.isPopular && b.isPopular) return 1
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
          Browse Knowledge Base
        </h2>
        <p className={`${theme.text} opacity-80`}>
          Find help organized by topic and expertise level
        </p>
      </div>

      {/* Popular Categories Section */}
      <div>
        <div className={`flex items-center space-x-2 mb-4`}>
          <TrendingUp size={20} className={`${theme.accent} text-orange-500`} />
          <h3 className={`text-lg font-semibold ${theme.text}`}>Popular Categories</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sortedCategories
            .filter(category => category.isPopular)
            .map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onSelect={onCategorySelect}
                theme={theme}
                isPopular={true}
              />
            ))}
        </div>
      </div>

      {/* All Categories Section */}
      <div>
        <div className={`flex items-center space-x-2 mb-4`}>
          <Puzzle size={20} className={`${theme.accent} text-blue-500`} />
          <h3 className={`text-lg font-semibold ${theme.text}`}>All Categories</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onSelect={onCategorySelect}
              theme={theme}
              isPopular={false}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="text-center space-y-2">
          <p className={`${theme.text} opacity-60 text-sm`}>
            {categories.reduce((total, cat) => total + cat.articleCount, 0)} total articles across {categories.length} categories
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <div className={`${theme.text} opacity-80`}>
              <span className="font-medium">{categories.filter(c => c.isPopular).length}</span> popular topics
            </div>
            <div className={`${theme.text} opacity-80`}>
              <span className="font-medium">
                {categories.reduce((total, cat) => total + (cat.subcategories?.length || 0), 0)}
              </span> subtopics
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Category Card Component
interface CategoryCardProps {
  category: any
  isSelected: boolean
  onSelect: (categoryId: HelpCategory) => void
  theme: any
  isPopular: boolean
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
  theme,
  isPopular
}) => {
  const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Puzzle

  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-300 hover:shadow-xl hover-glow
        ${isSelected 
          ? `border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20` 
          : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
        }
        ${isPopular ? 'ring-2 ring-orange-500/30 shadow-lg' : ''}
      `}
      onClick={() => onSelect(category.id)}
    >
      <div className="p-6 relative overflow-hidden">
        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
              <Star size={12} className="mr-1 fill-current" />
              Popular
            </Badge>
          </div>
        )}

        {/* Category Icon */}
        <div className={`
          w-12 h-12 rounded-xl mb-4 flex items-center justify-center
          bg-gradient-to-br ${category.color} shadow-lg
        `}>
          <IconComponent size={24} className="text-white" />
        </div>

        {/* Category Info */}
        <div className="space-y-3">
          <div>
            <h4 className={`text-lg font-semibold ${theme.text} mb-1`}>
              {category.name}
            </h4>
            <p className={`${theme.text} opacity-70 text-sm line-clamp-2`}>
              {category.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                {category.articleCount} articles
              </Badge>
              {category.subcategories && category.subcategories.length > 0 && (
                <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                  {category.subcategories.length} topics
                </Badge>
              )}
            </div>

            <ArrowRight 
              size={16} 
              className={`${theme.text} opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1`} 
            />
          </div>

          {/* Subcategories Preview */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="pt-2 border-t border-gray-700">
              <p className={`${theme.text} opacity-60 text-xs mb-2`}>Topics include:</p>
              <div className="flex flex-wrap gap-1">
                {category.subcategories.slice(0, 3).map((sub: any) => (
                  <Badge 
                    key={sub.id} 
                    variant="outline" 
                    className="border-gray-600 text-gray-400 text-xs px-2 py-0.5"
                  >
                    {sub.name}
                  </Badge>
                ))}
                {category.subcategories.length > 3 && (
                  <Badge 
                    variant="outline" 
                    className="border-gray-600 text-gray-400 text-xs px-2 py-0.5"
                  >
                    +{category.subcategories.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 
          transition-opacity duration-300 hover:opacity-5 pointer-events-none
        `} />
      </div>
    </Card>
  )
}