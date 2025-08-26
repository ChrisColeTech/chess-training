# Chess Training POC - API Documentation

**Version:** 1.0 POC  
**Base URL:** `http://localhost:3000/api`  
**Database:** Local SQLite  
**Authentication:** JWT tokens

## Overview

This API supports a single-user desktop chess training application with:
- Local user authentication
- Chess games vs AI opponents
- Tactical puzzle training
- Basic progress tracking

**POC Scope:**
- ✅ Single user per installation
- ✅ AI opponents only (no multiplayer)
- ✅ Local SQLite database
- ✅ Basic error handling
- ❌ Rate limiting (not needed for local app)
- ❌ Complex validation (basic validation only)
- ❌ Production security measures

---

## Authentication

### Register Account

**POST** `/auth/register`

Create a new user account.

```json
// Request
{
  "username": "chessplayer",
  "email": "player@example.com", 
  "password": "password123"
}

// Response
{
  "success": true,
  "user": {
    "id": "user123",
    "username": "chessplayer",
    "email": "player@example.com"
  }
}
```

### Login

**POST** `/auth/login`

Authenticate user and get tokens.

```json
// Request
{
  "email": "player@example.com",
  "password": "password123"
}

// Response  
{
  "success": true,
  "accessToken": "jwt-token-here",
  "refreshToken": "refresh-token-here",
  "user": {
    "id": "user123",
    "username": "chessplayer",
    "chessElo": 1200,
    "puzzleRating": 1200
  }
}
```

### Refresh Token

**POST** `/auth/refresh`

Get new access token.

```json
// Request
{
  "refreshToken": "refresh-token-here"
}

// Response
{
  "success": true,
  "accessToken": "new-jwt-token"
}
```

---

## Chess Games

All chess games are vs AI opponents. No multiplayer in POC.

### Create Game

**POST** `/games/create`

Start a new game vs AI.

```json
// Request
{
  "aiLevel": 3,        // 1-5 difficulty
  "timeControl": "10+0", // optional
  "color": "white"     // white or random
}

// Response
{
  "success": true,
  "gameId": "game123",
  "initialFen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
}
```

### Make Move

**POST** `/games/:gameId/move`

Submit a move and get AI response.

```json
// Request  
{
  "move": {
    "from": "e2",
    "to": "e4"
  }
}

// Response
{
  "success": true,
  "legal": true,
  "gameState": {
    "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2",
    "turn": "white",
    "check": false,
    "gameOver": false,
    "result": null
  },
  "aiMove": {
    "from": "e7", 
    "to": "e5",
    "san": "e5"
  }
}

// Error Response
{
  "success": false,
  "error": "Illegal move"
}
```

### Get Game

**GET** `/games/:gameId`

Get current game state.

```json
// Response
{
  "success": true,
  "game": {
    "id": "game123",
    "aiLevel": 3,
    "currentFen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2",
    "pgn": "1. e4 e5",
    "result": null,
    "gameOver": false
  }
}
```

### Game History  

**GET** `/games/history`

Get user's completed games.

```json
// Response
{
  "success": true,
  "games": [
    {
      "id": "game123",
      "result": "1-0",
      "aiLevel": 3,
      "completedAt": "2025-08-24T10:00:00Z",
      "eloChange": +12
    }
  ]
}
```

---

## Puzzle Training

Tactical puzzle system with spaced repetition.

### Get Next Puzzle

**GET** `/puzzles/next`

Get next puzzle based on user rating and schedule.

```json
// Response
{
  "success": true,
  "puzzle": {
    "id": "puzzle123", 
    "fen": "r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQ - 0 6",
    "themes": ["fork", "attack"],
    "rating": 1250,
    "description": "White to play and win material"
  }
}
```

### Submit Solution

**POST** `/puzzles/:puzzleId/solve`

Submit puzzle solution.

```json
// Request
{
  "moves": ["Nxe5", "Nxe5", "d4"],
  "timeTaken": 15000  // milliseconds
}

// Success Response
{
  "success": true,
  "correct": true,
  "solution": ["Nxe5", "Nxe5", "d4"],
  "ratingChange": +8,
  "newRating": 1258,
  "feedback": "Excellent! You found the fork."
}

// Wrong Answer Response  
{
  "success": true,
  "correct": false,
  "hint": "Look for a move that attacks two pieces at once",
  "ratingChange": -3,
  "newRating": 1247
}
```

### Get Hint

**POST** `/puzzles/:puzzleId/hint`

Get a hint for current puzzle.

```json
// Response
{
  "success": true,
  "hint": "Focus on the knight - it can attack multiple pieces",
  "hintsUsed": 1
}
```

---

## User Management

### Get Profile

**GET** `/user/profile`

Get user info and stats.

```json
// Response
{
  "success": true,
  "user": {
    "id": "user123",
    "username": "chessplayer",
    "email": "player@example.com",
    "chessElo": 1215,
    "puzzleRating": 1258,
    "gamesPlayed": 15,
    "wins": 8,
    "losses": 5,
    "draws": 2,
    "puzzlesSolved": 67,
    "preferences": {
      "boardTheme": "classic",
      "soundEnabled": true
    }
  }
}
```

### Update Profile  

**PUT** `/user/profile`

Update user preferences.

```json
// Request
{
  "preferences": {
    "boardTheme": "blue",
    "soundEnabled": false,
    "showCoordinates": true
  }
}

// Response
{
  "success": true,
  "message": "Profile updated"
}
```

---

## Statistics

### Get Dashboard Stats

**GET** `/stats/dashboard`

Get overview statistics.

```json
// Response
{
  "success": true,
  "stats": {
    "chessRating": 1215,
    "puzzleRating": 1258,
    "todayGames": 3,
    "todayPuzzles": 12,
    "currentStreak": 5,
    "recentGames": [
      {
        "result": "1-0",
        "aiLevel": 3,
        "eloChange": +12,
        "date": "2025-08-24"
      }
    ]
  }
}
```

---

## Error Handling

Simple error responses for POC:

### Success Response Format
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response Format  
```json
{
  "success": false,
  "error": "Error message"
}
```

### Common HTTP Status Codes
- `200` - Success
- `400` - Bad request (validation error)
- `401` - Unauthorized (invalid/expired token)
- `404` - Not found
- `500` - Server error

### Common Errors
- `"Invalid credentials"` - Wrong email/password  
- `"Token expired"` - Need to refresh token
- `"Illegal move"` - Chess move not valid
- `"Game not found"` - Invalid game ID
- `"Puzzle not found"` - Invalid puzzle ID
- `"Validation error"` - Required fields missing

---

## Development Examples

### cURL Examples

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create Game (with auth token)
curl -X POST http://localhost:3000/api/games/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"aiLevel":2,"color":"white"}'

# Make Move
curl -X POST http://localhost:3000/api/games/GAME_ID/move \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"move":{"from":"e2","to":"e4"}}'
```

### JavaScript API Client

```javascript
class ChessAPI {
  constructor() {
    this.baseURL = 'http://localhost:3000/api';
    this.token = localStorage.getItem('accessToken');
  }

  async login(email, password) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.success) {
      this.token = data.accessToken;
      localStorage.setItem('accessToken', data.accessToken);
    }
    return data;
  }

  async createGame(aiLevel) {
    const response = await fetch(`${this.baseURL}/games/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify({ aiLevel, color: 'white' })
    });
    
    return response.json();
  }

  async makeMove(gameId, move) {
    const response = await fetch(`${this.baseURL}/games/${gameId}/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify({ move })
    });
    
    return response.json();
  }

  async getNextPuzzle() {
    const response = await fetch(`${this.baseURL}/puzzles/next`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
    
    return response.json();
  }
}
```

---

**POC API Status:** ✅ **Ready for Implementation**

This simplified API provides all functionality needed for the POC:
- ✅ User authentication
- ✅ Chess games vs AI
- ✅ Puzzle training system  
- ✅ Basic statistics
- ✅ Simple error handling
- ✅ Local development friendly

**Removed from production version:**
- ❌ Rate limiting 
- ❌ Complex error codes
- ❌ Multiplayer endpoints
- ❌ Advanced security measures
- ❌ Detailed validation responses

**Ready for:** Frontend integration and backend implementation.