import React from 'react'
import { animated, useSpring } from '@react-spring/web'
import { Star, Lock, CheckCircle, TrendingUp, Clock } from 'lucide-react'
import type { SkillTreeProps, SkillNode, SkillLevel } from '@/types/learningPath'

/**
 * Skill Tree Component - Visual representation of learning path as an interactive skill tree
 * Shows skill nodes with connections, mastery levels, and progress indicators
 */
export const SkillTree: React.FC<SkillTreeProps> = ({
  skillTree,
  selectedSkill,
  onSkillSelect,
  onSkillFocus,
  viewMode,
  theme
}) => {
  const { nodes, branches, connections } = skillTree

  /**
   * Get color scheme for skill mastery level
   */
  const getMasteryColor = (level: SkillLevel) => {
    switch (level) {
      case 'Mastered':
        return 'from-emerald-400 to-emerald-600'
      case 'Advanced':
        return 'from-blue-400 to-blue-600'
      case 'Proficient':
        return 'from-indigo-400 to-indigo-600'
      case 'Developing':
        return 'from-yellow-400 to-orange-500'
      case 'Beginner':
        return 'from-purple-400 to-purple-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  /**
   * Get appropriate icon for skill mastery level
   */
  const getMasteryIcon = (level: SkillLevel, isUnlocked: boolean) => {
    if (!isUnlocked) return <Lock size={16} />
    
    switch (level) {
      case 'Mastered':
        return <CheckCircle size={16} />
      case 'Advanced':
      case 'Proficient':
        return <Star size={16} />
      case 'Developing':
        return <TrendingUp size={16} />
      default:
        return <Star size={16} />
    }
  }

  /**
   * Calculate glow intensity based on progress and mastery
   */
  const getGlowIntensity = (node: SkillNode) => {
    if (!node.isUnlocked) return 0
    if (node.isFeatured) return 1
    return node.masteryProgress / 100
  }

  /**
   * Handle skill node click
   */
  const handleSkillClick = (skill: SkillNode) => {
    if (!skill.isUnlocked) return
    onSkillSelect(skill)
  }

  /**
   * Handle focus button click
   */
  const handleFocusClick = (e: React.MouseEvent, skillId: string) => {
    e.stopPropagation()
    onSkillFocus(skillId)
  }

  return (
    <div className="relative w-full h-full min-h-[600px] overflow-hidden rounded-lg">
      {/* Background with gaming effects */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.background} opacity-20`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      
      {/* Connection lines between skills */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from)
          const toNode = nodes.find(n => n.id === connection.to)
          
          if (!fromNode || !toNode) return null
          
          const opacity = connection.type === 'prerequisite' ? 0.6 : 0.3
          const strokeWidth = connection.strength * 3
          
          return (
            <animated.line
              key={`${connection.from}-${connection.to}`}
              x1={fromNode.position.x + 60}
              y1={fromNode.position.y + 60}
              x2={toNode.position.x + 60}
              y2={toNode.position.y + 60}
              stroke={connection.type === 'prerequisite' ? theme.accent.split(' ')[1] : theme.secondary.split(' ')[1]}
              strokeWidth={strokeWidth}
              strokeOpacity={opacity}
              strokeDasharray={connection.type === 'enhancement' ? '5,5' : 'none'}
              style={useSpring({
                strokeDashoffset: `${2 * Math.PI * 50}`,
                from: { strokeDashoffset: `${2 * Math.PI * 100}` },
                delay: index * 100
              })}
            />
          )
        })}
      </svg>
      
      {/* Skill nodes */}
      <div className="relative w-full h-full">
        {nodes.map((node, index) => {
          const isSelected = selectedSkill?.id === node.id
          const glowIntensity = getGlowIntensity(node)
          
          return (
            <animated.div
              key={node.id}
              className="absolute cursor-pointer group"
              style={{
                left: node.position.x,
                top: node.position.y,
                zIndex: node.position.level * 10 + (isSelected ? 100 : 0),
                ...useSpring({
                  scale: 1, 
                  opacity: 1,
                  from: { scale: 0, opacity: 0 },
                  delay: index * 100,
                  config: { tension: 100, friction: 10 }
                })
              }}
              onClick={() => handleSkillClick(node)}
            >
              {/* Node glow effect */}
              {node.isUnlocked && glowIntensity > 0 && (
                <animated.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${node.visual.color} blur-xl opacity-${Math.floor(glowIntensity * 6)}`}
                  style={useSpring({
                    from: { scale: 1, opacity: glowIntensity * 0.6 },
                    to: async (next) => {
                      while (true) {
                        await next({ scale: 1.2, opacity: glowIntensity })
                        await next({ scale: 1, opacity: glowIntensity * 0.6 })
                      }
                    },
                    config: { duration: 2000 }
                  })}
                />
              )}
              
              {/* Main skill node */}
              <div className={`
                relative w-24 h-24 rounded-full border-2 transition-all duration-300
                ${node.isUnlocked 
                  ? `bg-gradient-to-br ${getMasteryColor(node.masteryLevel)} border-white/30 shadow-lg hover:shadow-xl` 
                  : 'bg-gray-800 border-gray-600 opacity-50'
                }
                ${isSelected ? 'ring-4 ring-white/50 scale-110' : ''}
                ${node.isFeatured ? 'ring-2 ring-yellow-400/60' : ''}
              `}>
                {/* Skill icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl select-none">
                    {node.visual.icon}
                  </span>
                </div>
                
                {/* Mastery indicator */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 rounded-full border border-gray-600 flex items-center justify-center">
                  <span className={`text-xs ${node.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                    {getMasteryIcon(node.masteryLevel, node.isUnlocked)}
                  </span>
                </div>
                
                {/* Progress ring */}
                {node.isUnlocked && (
                  <svg className="absolute inset-0 w-24 h-24 -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="46"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <animated.circle
                      cx="48"
                      cy="48"
                      r="46"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 46}`}
                      style={useSpring({
                        strokeDashoffset: 2 * Math.PI * 46 * (1 - node.masteryProgress / 100),
                        from: { strokeDashoffset: 2 * Math.PI * 46 },
                        delay: index * 100
                      })}
                    />
                  </svg>
                )}
                
                {/* Featured star */}
                {node.isFeatured && (
                  <animated.div
                    className="absolute -top-1 -left-1 text-yellow-400"
                    style={useSpring({
                      from: { rotate: 0, scale: 1 },
                      to: async (next) => {
                        while (true) {
                          await next({ rotate: 360, scale: 1.2 })
                          await next({ rotate: 720, scale: 1 })
                        }
                      },
                      config: { duration: 3000 }
                    })}
                  >
                    <Star size={16} />
                  </animated.div>
                )}
              </div>
              
              {/* Hover tooltip */}
              <animated.div
                className={`
                  absolute left-1/2 -translate-x-1/2 top-full mt-4 px-3 py-2 
                  bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg 
                  text-sm text-white whitespace-nowrap opacity-0 pointer-events-none
                  group-hover:opacity-100 transition-opacity duration-200 z-50
                `}
              >
                <div className="text-center">
                  <div className="font-semibold">{node.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {node.masteryLevel} • {node.masteryProgress}%
                  </div>
                  {node.isUnlocked && (
                    <div className="flex items-center justify-center gap-1 mt-1 text-xs text-gray-500">
                      <Clock size={10} />
                      {node.metrics.timeSpent}min
                    </div>
                  )}
                  {!node.isUnlocked && (
                    <div className="text-xs text-red-400 mt-1">
                      Locked
                    </div>
                  )}
                </div>
                
                {/* Arrow pointing to node */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-700" />
              </animated.div>
              
              {/* Focus button for unlocked skills */}
              {node.isUnlocked && !isSelected && (
                <animated.button
                  className={`
                    absolute -bottom-2 left-1/2 -translate-x-1/2 
                    px-2 py-1 bg-gradient-to-r ${theme.primary} text-white text-xs 
                    rounded-full opacity-0 group-hover:opacity-100 
                    hover:scale-105 transition-all duration-200
                  `}
                  onClick={(e: React.MouseEvent) => handleFocusClick(e, node.id)}
                >
                  Focus
                </animated.button>
              )}
            </animated.div>
          )
        })}
      </div>
      
      {/* Branch labels */}
      {viewMode === 'category' && branches.map((branch, index) => (
        <animated.div
          key={branch.id}
          className={`
            absolute top-4 left-4 px-4 py-2 bg-gradient-to-r ${branch.theme} 
            rounded-lg text-white text-sm font-semibold shadow-lg
          `}
          style={{
            left: 20 + index * 200,
            ...useSpring({
              opacity: 1,
              y: 0,
              from: { opacity: 0, y: -20 },
              delay: index * 200
            })
          }}
        >
          <div>{branch.name}</div>
          <div className="text-xs opacity-80">
            {branch.completion.percentage}% Complete
          </div>
        </animated.div>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3">
        <div className="text-sm font-semibold text-white mb-2">Skill Levels</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
            <span className="text-gray-300">Mastered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
            <span className="text-gray-300">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600" />
            <span className="text-gray-300">Proficient</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
            <span className="text-gray-300">Developing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600" />
            <span className="text-gray-300">Beginner</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillTree