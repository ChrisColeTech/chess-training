/**
 * TutorialPlayer Component
 * 
 * Video player and tutorial viewer interface with progress tracking.
 * Page-specific component for TutorialsPage following proper SRP architecture.
 */

import React from 'react'
import { ArrowLeft, CheckCircle, Play, Star } from 'lucide-react'
import type { Tutorial } from '@/types/tutorials'

interface TutorialPlayerProps {
  tutorial: Tutorial
  onBackToTutorials: () => void
  getLevelColor: (level: string) => string
}

export const TutorialPlayer: React.FC<TutorialPlayerProps> = ({
  tutorial,
  onBackToTutorials,
  getLevelColor,
}) => {
  // Mock progress data
  const progress = tutorial.completionRate || 0
  const isCompleted = progress >= 100

  return (
    <div className="space-y-6">
      <button
        onClick={onBackToTutorials}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back to Tutorials</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="aspect-video bg-slate-700/50 flex items-center justify-center relative">
              <div className="text-8xl">{tutorial.thumbnailUrl}</div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <button className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
                        <Play size={16} className="text-white" />
                      </button>
                      <span className="text-white font-mono text-sm">0:00 / {tutorial.estimatedDuration}:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300">Speed: 1x</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-1">
                    <div 
                      className="bg-purple-500 h-1 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold text-white mb-3">{tutorial.title}</h1>
              <p className="text-slate-300 mb-4">{tutorial.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </div>
                  <span className="text-sm text-slate-400">by {typeof tutorial.instructor === 'string' ? tutorial.instructor : tutorial.instructor?.name || 'Chess Master'}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400" size={16} />
                    <span>{tutorial.averageRating?.toFixed(1) || '4.8'}</span>
                  </div>
                  <span>{tutorial.views?.toLocaleString() || '1,234'} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Your Progress</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-white mb-1">{Math.round(progress)}%</div>
              <div className="text-sm text-slate-400">Complete</div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-400 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {isCompleted ? (
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle size={18} />
                <span className="font-medium">Completed!</span>
              </div>
            ) : (
              <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors">
                Mark as Complete
              </button>
            )}
          </div>

          {/* Related Tutorials */}
          <RelatedTutorials tutorial={tutorial} />

          {/* Notes */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Notes</h3>
            <textarea
              placeholder="Take notes while watching..."
              rows={4}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface RelatedTutorialsProps {
  tutorial: Tutorial
}

const RelatedTutorials: React.FC<RelatedTutorialsProps> = ({ tutorial }) => {
  // Mock related tutorials - in real app this would come from props or hook
  const relatedTutorials = [
    { id: '1', title: 'Advanced Tactics', duration: '25:30', thumbnail: '<Zap className="w-4 h-4 inline" />' },
    { id: '2', title: 'Endgame Mastery', duration: '32:15', thumbnail: '<FaChessKing className="w-4 h-4 inline" />' },
    { id: '3', title: 'Strategic Play', duration: '28:45', thumbnail: '🎨' }
  ].filter(t => t.id !== tutorial.id).slice(0, 3)

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Related Tutorials</h3>
      <div className="space-y-3">
        {relatedTutorials.map((relatedTutorial) => (
          <div key={relatedTutorial.id} className="flex gap-3 cursor-pointer hover:bg-slate-700/20 rounded-lg p-2 transition-colors">
            <div className="w-16 h-12 bg-slate-700/50 rounded flex items-center justify-center text-lg">
              {relatedTutorial.thumbnail}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white text-sm line-clamp-1">{relatedTutorial.title}</h4>
              <div className="text-xs text-slate-400">{relatedTutorial.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TutorialPlayer