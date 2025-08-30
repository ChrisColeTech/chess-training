// Common configuration data used across multiple components

// Day names for scheduling and quiet hours
export const dayNames = [
  'Sunday',
  'Monday', 
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

// Short day names
export const dayNamesShort = [
  'Sun',
  'Mon',
  'Tue', 
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

// Time options for scheduling (24-hour format)
export const timeOptions = [
  { value: '00:00', label: '12:00 AM' },
  { value: '00:30', label: '12:30 AM' },
  { value: '01:00', label: '1:00 AM' },
  { value: '01:30', label: '1:30 AM' },
  { value: '02:00', label: '2:00 AM' },
  { value: '02:30', label: '2:30 AM' },
  { value: '03:00', label: '3:00 AM' },
  { value: '03:30', label: '3:30 AM' },
  { value: '04:00', label: '4:00 AM' },
  { value: '04:30', label: '4:30 AM' },
  { value: '05:00', label: '5:00 AM' },
  { value: '05:30', label: '5:30 AM' },
  { value: '06:00', label: '6:00 AM' },
  { value: '06:30', label: '6:30 AM' },
  { value: '07:00', label: '7:00 AM' },
  { value: '07:30', label: '7:30 AM' },
  { value: '08:00', label: '8:00 AM' },
  { value: '08:30', label: '8:30 AM' },
  { value: '09:00', label: '9:00 AM' },
  { value: '09:30', label: '9:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '13:30', label: '1:30 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '15:30', label: '3:30 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '16:30', label: '4:30 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '17:30', label: '5:30 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '18:30', label: '6:30 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '19:30', label: '7:30 PM' },
  { value: '20:00', label: '8:00 PM' },
  { value: '20:30', label: '8:30 PM' },
  { value: '21:00', label: '9:00 PM' },
  { value: '21:30', label: '9:30 PM' },
  { value: '22:00', label: '10:00 PM' },
  { value: '22:30', label: '10:30 PM' },
  { value: '23:00', label: '11:00 PM' },
  { value: '23:30', label: '11:30 PM' }
]

// Common time zones
export const timeZones = [
  { value: 'America/New_York', label: 'Eastern Time (EST/EDT)', offset: -5 },
  { value: 'America/Chicago', label: 'Central Time (CST/CDT)', offset: -6 },
  { value: 'America/Denver', label: 'Mountain Time (MST/MDT)', offset: -7 },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PST/PDT)', offset: -8 },
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)', offset: 0 },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', offset: 0 },
  { value: 'Europe/Berlin', label: 'Central European Time (CET)', offset: 1 },
  { value: 'Europe/Moscow', label: 'Moscow Time (MSK)', offset: 3 },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', offset: 9 },
  { value: 'Asia/Shanghai', label: 'China Standard Time (CST)', offset: 8 },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)', offset: 5.5 },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AEST)', offset: 10 }
]

// Duration options for various settings
export const durationOptions = [
  { value: 300000, label: '5 minutes', seconds: 300 },
  { value: 900000, label: '15 minutes', seconds: 900 },
  { value: 1800000, label: '30 minutes', seconds: 1800 },
  { value: 3600000, label: '1 hour', seconds: 3600 },
  { value: 7200000, label: '2 hours', seconds: 7200 },
  { value: 14400000, label: '4 hours', seconds: 14400 },
  { value: 28800000, label: '8 hours', seconds: 28800 },
  { value: 43200000, label: '12 hours', seconds: 43200 },
  { value: 86400000, label: '24 hours', seconds: 86400 }
]

// Volume levels (0-100)
export const volumeLevels = [
  { value: 0, label: 'Muted' },
  { value: 10, label: 'Very Quiet' },
  { value: 25, label: 'Quiet' },
  { value: 50, label: 'Medium' },
  { value: 75, label: 'Loud' },
  { value: 100, label: 'Maximum' }
]

// File size limits (in bytes)
export const fileSizeLimits = {
  avatar: 5 * 1024 * 1024, // 5MB
  attachment: 25 * 1024 * 1024, // 25MB
  export: 100 * 1024 * 1024, // 100MB
  pgn: 10 * 1024 * 1024 // 10MB
}

// Supported file types
export const supportedFileTypes = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  documents: ['application/pdf', 'text/plain'],
  chess: ['application/x-chess-pgn', 'text/plain'],
  data: ['application/json', 'text/csv', 'application/zip']
}

// Common error messages
export const errorMessages = {
  fileSize: 'File size exceeds the maximum limit',
  fileType: 'File type is not supported',
  network: 'Network error. Please check your connection',
  server: 'Server error. Please try again later',
  validation: 'Please check your input and try again',
  authentication: 'Authentication required. Please log in',
  authorization: 'You do not have permission to perform this action',
  notFound: 'The requested resource was not found',
  timeout: 'Request timed out. Please try again'
}

// Success messages
export const successMessages = {
  saved: 'Settings saved successfully',
  uploaded: 'File uploaded successfully',
  deleted: 'Item deleted successfully',
  updated: 'Update completed successfully',
  created: 'Created successfully',
  sent: 'Message sent successfully',
  exported: 'Export completed successfully',
  imported: 'Import completed successfully'
}

// Loading states
export const loadingStates = {
  saving: 'Saving...',
  loading: 'Loading...',
  uploading: 'Uploading...',
  processing: 'Processing...',
  exporting: 'Exporting...',
  importing: 'Importing...',
  deleting: 'Deleting...',
  updating: 'Updating...'
}

// Default pagination settings
export const paginationDefaults = {
  pageSize: 20,
  maxPageSize: 100,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '50', '100']
}

// API endpoints (relative paths)
export const apiEndpoints = {
  auth: '/api/auth',
  users: '/api/users',
  games: '/api/games',
  puzzles: '/api/puzzles',
  settings: '/api/settings',
  notifications: '/api/notifications',
  uploads: '/api/uploads',
  exports: '/api/exports'
}

// Local storage keys
export const storageKeys = {
  theme: 'chess_training_theme',
  language: 'chess_training_language',
  settings: 'chess_training_settings',
  auth: 'chess_training_auth',
  preferences: 'chess_training_preferences',
  boardSettings: 'chess_training_board_settings'
}

// Event types for analytics
export const analyticsEvents = {
  pageView: 'page_view',
  settingsChanged: 'settings_changed',
  gameStarted: 'game_started',
  puzzleSolved: 'puzzle_solved',
  featureUsed: 'feature_used',
  error: 'error_occurred'
}