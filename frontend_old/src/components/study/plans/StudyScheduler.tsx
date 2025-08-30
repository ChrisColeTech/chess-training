import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlarmClock, Bell, Calendar, CalendarCheck, CheckCircle, Clock, PlayCircle, Settings, Sparkles, Target, TrendingUp } from 'lucide-react'
import type { StudySchedulerProps, StudySchedule, StudyFrequency } from '@/types/studyPlans'
// Define common configurations inline instead of importing from mock data
const frequencyOptions: StudyFrequency[] = ['Daily', 'Weekly', 'BiWeekly', 'Monthly']
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * StudyScheduler Component
 * Comprehensive study schedule management with recommendations
 */
export const StudyScheduler: React.FC<StudySchedulerProps> = ({
  schedule,
  onScheduleUpdate,
  recommendations,
  theme
}) => {
  const [editMode, setEditMode] = useState(false)
  const [localSchedule, setLocalSchedule] = useState<Partial<StudySchedule>>(
    schedule || {
      frequency: 'Daily',
      preferredTimes: [{ hour: 19, minute: 0 }],
      daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
      sessionDuration: 30,
      dailyGoal: 30,
      weeklyGoal: 3,
      isActive: true
    }
  )

  // Imported from common configurations

  const formatTime = (hour: number, minute: number) => {
    const time = new Date()
    time.setHours(hour, minute)
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getNextStudySession = () => {
    if (!schedule?.nextSession) return null
    
    const sessionDate = new Date(schedule.nextSession.date)
    const now = new Date()
    const diffHours = Math.round((sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 0) return 'Overdue'
    if (diffHours === 0) return 'Now'
    if (diffHours < 24) return `In ${diffHours}h`
    
    return sessionDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleSaveSchedule = () => {
    const completeSchedule: StudySchedule = {
      id: schedule?.id || 'schedule-' + Date.now(),
      frequency: localSchedule.frequency || 'Daily',
      preferredTimes: localSchedule.preferredTimes || [{ hour: 19, minute: 0 }],
      daysOfWeek: localSchedule.daysOfWeek || [1, 2, 3, 4, 5],
      sessionDuration: localSchedule.sessionDuration || 30,
      dailyGoal: localSchedule.dailyGoal || 30,
      weeklyGoal: localSchedule.weeklyGoal || 3,
      isActive: localSchedule.isActive !== false,
      nextSession: {
        date: Date.now() + (24 * 60 * 60 * 1000), // Tomorrow
        plannedContent: ['Next lesson in current path']
      }
    }
    
    onScheduleUpdate(completeSchedule)
    setEditMode(false)
  }

  const toggleDay = (dayIndex: number) => {
    const currentDays = localSchedule.daysOfWeek || []
    const newDays = currentDays.includes(dayIndex)
      ? currentDays.filter(d => d !== dayIndex)
      : [...currentDays, dayIndex].sort()
    
    setLocalSchedule(prev => ({ ...prev, daysOfWeek: newDays }))
  }

  const addPreferredTime = () => {
    const currentTimes = localSchedule.preferredTimes || []
    setLocalSchedule(prev => ({
      ...prev,
      preferredTimes: [...currentTimes, { hour: 20, minute: 0 }]
    }))
  }

  const removePreferredTime = (index: number) => {
    const currentTimes = localSchedule.preferredTimes || []
    setLocalSchedule(prev => ({
      ...prev,
      preferredTimes: currentTimes.filter((_, i) => i !== index)
    }))
  }

  const updatePreferredTime = (index: number, hour: number, minute: number) => {
    const currentTimes = localSchedule.preferredTimes || []
    const newTimes = [...currentTimes]
    newTimes[index] = { hour, minute }
    setLocalSchedule(prev => ({ ...prev, preferredTimes: newTimes }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
          <Calendar className="w-4 h-4 inline" /> Study Scheduler
        </h2>
        <p className={`${theme.text} opacity-60`}>
          Create and manage your personalized study schedule
        </p>
      </div>

      {/* Current Schedule Overview */}
      {schedule && !editMode && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={`text-xl ${theme.text} flex items-center`}>
                  <Calendar size={24} className="mr-2" />
                  Current Schedule
                  {schedule.isActive && (
                    <Badge className="ml-2 bg-green-500/20 text-green-400">Active</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {schedule.frequency} • {schedule.sessionDuration} minutes per session
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(true)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Settings size={16} className="mr-2" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Next Session */}
            {schedule.nextSession && (
              <div className={`bg-gradient-to-r ${theme.primary.split(' ')[0]}/10 border border-${theme.accent.split(' ')[1]}/20 rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${theme.text} mb-1`}>Next Study Session</h3>
                    <p className="text-sm text-gray-400">
                      {getNextStudySession()} • {schedule.sessionDuration} minutes
                    </p>
                  </div>
                  <Button size="sm" className={`bg-gradient-to-r ${theme.primary}`}>
                    <PlayCircle size={16} className="mr-2" />
                    Start Now
                  </Button>
                </div>
              </div>
            )}

            {/* Schedule Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className={`font-medium ${theme.text} mb-2 flex items-center`}>
                  <Calendar size={16} className="mr-2" />
                  Study Days
                </h4>
                <div className="flex flex-wrap gap-1">
                  {schedule.daysOfWeek.map(dayIndex => (
                    <Badge key={dayIndex} className="bg-blue-500/20 text-blue-400">
                      {daysOfWeek[dayIndex].slice(0, 3)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`font-medium ${theme.text} mb-2 flex items-center`}>
                  <Clock size={16} className="mr-2" />
                  Preferred Times
                </h4>
                <div className="space-y-1">
                  {schedule.preferredTimes.map((time, index) => (
                    <div key={index} className="text-sm text-gray-400">
                      {formatTime(time.hour, time.minute)}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`font-medium ${theme.text} mb-2 flex items-center`}>
                  <Target size={16} className="mr-2" />
                  Goals
                </h4>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>Daily: {schedule.dailyGoal} minutes</div>
                  <div>Weekly: {schedule.weeklyGoal} hours</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schedule Editor */}
      {editMode && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className={`text-lg ${theme.text}`}>
              Schedule Configuration
            </CardTitle>
            <CardDescription>
              Customize your study schedule to fit your lifestyle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Frequency Selection */}
            <div>
              <Label className={`text-sm font-medium ${theme.text} mb-2 block`}>
                Study Frequency
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {frequencyOptions.map(freq => (
                  <Button
                    key={freq}
                    variant={localSchedule.frequency === freq ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLocalSchedule(prev => ({ ...prev, frequency: freq }))}
                    className={localSchedule.frequency === freq ? 
                      `bg-gradient-to-r ${theme.primary}` : 
                      "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    {freq}
                  </Button>
                ))}
              </div>
            </div>

            {/* Days of Week */}
            <div>
              <Label className={`text-sm font-medium ${theme.text} mb-2 block`}>
                Study Days
              </Label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day, index) => (
                  <Button
                    key={day}
                    variant={localSchedule.daysOfWeek?.includes(index) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDay(index)}
                    className={localSchedule.daysOfWeek?.includes(index) ? 
                      "bg-blue-500 hover:bg-blue-600" : 
                      "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    {day.slice(0, 3)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Preferred Times */}
            <div>
              <Label className={`text-sm font-medium ${theme.text} mb-2 block`}>
                Preferred Study Times
              </Label>
              <div className="space-y-2">
                {(localSchedule.preferredTimes || []).map((time, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="number"
                      min="0"
                      max="23"
                      value={time.hour}
                      onChange={(e) => updatePreferredTime(index, parseInt(e.target.value), time.minute)}
                      className="w-20 bg-gray-800 border-gray-600"
                      placeholder="Hour"
                    />
                    <span className={theme.text}>:</span>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      step="15"
                      value={time.minute}
                      onChange={(e) => updatePreferredTime(index, time.hour, parseInt(e.target.value))}
                      className="w-20 bg-gray-800 border-gray-600"
                      placeholder="Min"
                    />
                    <span className="text-sm text-gray-400 min-w-[60px]">
                      {formatTime(time.hour, time.minute)}
                    </span>
                    {(localSchedule.preferredTimes?.length || 0) > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removePreferredTime(index)}
                        className="text-red-400 border-red-400 hover:bg-red-400/10"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addPreferredTime}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Add Time Slot
                </Button>
              </div>
            </div>

            {/* Session Duration and Goals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className={`text-sm font-medium ${theme.text} mb-2 block`}>
                  Session Duration (minutes)
                </Label>
                <Input
                  type="number"
                  min="15"
                  max="180"
                  step="15"
                  value={localSchedule.sessionDuration || 30}
                  onChange={(e) => setLocalSchedule(prev => ({ 
                    ...prev, 
                    sessionDuration: parseInt(e.target.value) 
                  }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>

              <div>
                <Label className={`text-sm font-medium ${theme.text} mb-2 block`}>
                  Daily Goal (minutes)
                </Label>
                <Input
                  type="number"
                  min="15"
                  max="300"
                  step="15"
                  value={localSchedule.dailyGoal || 30}
                  onChange={(e) => setLocalSchedule(prev => ({ 
                    ...prev, 
                    dailyGoal: parseInt(e.target.value) 
                  }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>

              <div>
                <Label className={`text-sm font-medium ${theme.text} mb-2 block`}>
                  Weekly Goal (hours)
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={localSchedule.weeklyGoal || 3}
                  onChange={(e) => setLocalSchedule(prev => ({ 
                    ...prev, 
                    weeklyGoal: parseInt(e.target.value) 
                  }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
            </div>

            {/* Schedule Active Toggle */}
            <div className="flex items-center space-x-3">
              <Switch
                checked={localSchedule.isActive !== false}
                onCheckedChange={(checked) => setLocalSchedule(prev => ({ 
                  ...prev, 
                  isActive: checked 
                }))}
              />
              <Label className={`${theme.text}`}>
                Activate schedule and notifications
              </Label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={handleSaveSchedule}
                className={`bg-gradient-to-r ${theme.primary} flex-1`}
              >
                <CheckCircle size={16} className="mr-2" />
                Save Schedule
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditMode(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Study Recommendations */}
      {recommendations.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className={`text-lg ${theme.text} flex items-center`}>
              <Sparkles size={20} className="mr-2 text-yellow-400" />
              Recommended Study Sessions
            </CardTitle>
            <CardDescription>
              AI-powered recommendations based on your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.slice(0, 3).map((rec) => (
                <div key={rec.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className={`font-medium ${theme.text} mb-1`}>
                      {rec.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div className="text-sm text-gray-400 mb-1">
                      {rec.reason}
                    </div>
                    <div className="text-xs text-gray-500">
                      Expected benefit: {rec.expectedBenefit}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${
                      rec.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                      rec.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {rec.priority}
                    </Badge>
                    <Button size="sm" variant="outline" className="text-xs">
                      Schedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <CalendarCheck size={24} className="mx-auto mb-2 text-green-400" />
            <div className={`text-lg font-bold ${theme.text}`}>5/7</div>
            <div className="text-sm text-gray-400">Days This Week</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <TrendingUp size={24} className="mx-auto mb-2 text-blue-400" />
            <div className={`text-lg font-bold ${theme.text}`}>87%</div>
            <div className="text-sm text-gray-400">Goal Achievement</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <AlarmClock size={24} className="mx-auto mb-2 text-purple-400" />
            <div className={`text-lg font-bold ${theme.text}`}>2.5h</div>
            <div className="text-sm text-gray-400">This Week</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Bell size={24} className="mx-auto mb-2 text-yellow-400" />
            <div className={`text-lg font-bold ${theme.text}`}>3</div>
            <div className="text-sm text-gray-400">Reminders Set</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}