# Chess Training API Specification

## Overview
RESTful API for 9 core database tables.

## Authentication Endpoints
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login  
POST   /api/auth/refresh      # Refresh JWT token
POST   /api/auth/logout       # Logout (invalidate session)
DELETE /api/auth/account      # Delete user account
```

## User Management
```
GET    /api/users/profile     # Get user profile
PUT    /api/users/profile     # Update user profile  
GET    /api/users/preferences # Get user preferences
PUT    /api/users/preferences # Update user preferences
GET    /api/users/stats       # Get user statistics
```

## Chess Games
```
POST   /api/games             # Create new game
GET    /api/games             # List user's games
GET    /api/games/:id         # Get specific game
PUT    /api/games/:id         # Update game (save state)
DELETE /api/games/:id         # Delete game
POST   /api/games/:id/moves   # Add move to game
GET    /api/games/:id/analysis # Get game analysis
```

## Puzzle System
```
GET    /api/puzzles           # Get puzzles (filtered)
GET    /api/puzzles/:id       # Get specific puzzle
POST   /api/puzzles/:id/attempt # Submit puzzle attempt
GET    /api/puzzles/daily     # Get daily puzzle
GET    /api/puzzles/stats     # Get puzzle statistics
```

## Progress & Achievements
```
GET    /api/achievements      # List all achievements
GET    /api/achievements/earned # User's earned achievements
GET    /api/progress/overview # Progress dashboard data
GET    /api/progress/charts   # Progress chart data
GET    /api/stats/daily       # Daily statistics
```

## Opening Database
```
GET    /api/openings          # Browse openings
GET    /api/openings/:eco     # Get opening by ECO code
GET    /api/openings/search   # Search openings
POST   /api/repertoire        # Add to personal repertoire
GET    /api/repertoire        # Get personal repertoire
```

## Query Parameters
- **Pagination**: `?page=1&limit=20`
- **Filtering**: `?difficulty=3&theme=fork`
- **Sorting**: `?sort=rating&order=desc`

## Response Format
```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 20,  
    "total": 150
  }
}
```

## Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid puzzle difficulty",
    "details": { ... }
  }
}
```

Total Endpoints: ~35
