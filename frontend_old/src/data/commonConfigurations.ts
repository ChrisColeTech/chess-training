/**
 * Common Configuration Constants
 * Extracted from various components to centralize reusable configuration data
 */

// Study frequency options
export type StudyFrequency = 'Daily' | 'Every Other Day' | 'Weekly' | 'Custom';
export const frequencyOptions: StudyFrequency[] = ['Daily', 'Every Other Day', 'Weekly', 'Custom'];

// Day names for week selection UI
export const dayNames = [
  'Sunday', 
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday'
] as const

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Priority and severity mappings for learning path
export const priorityOrder = {
  'Critical': 4,
  'High': 3,
  'Medium': 2,
  'Low': 1
} as const;

export const severityOrder = {
  'Critical': 4,
  'Significant': 3,
  'Moderate': 2,
  'Minor': 1
} as const;

// Time options for time selection (24-hour format)
export const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return { 
    value: `${hour}:00`, 
    label: `${hour}:00` 
  }
}) as const

// Common rating ranges
export const ratingRanges = {
  beginner: { min: 400, max: 1000 },
  intermediate: { min: 1000, max: 1600 },
  advanced: { min: 1600, max: 2200 },
  expert: { min: 2200, max: 2800 }
} as const