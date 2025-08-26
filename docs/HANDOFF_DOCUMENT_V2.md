# Chess Training Project - Fresh Start Handoff

## Status: Complete Restart Required

### The Problem
- Wasted 2 days building wrong system (training vs chess game)
- Created incorrect documentation with false claims 
- Made bad architectural decisions (backend-new folder)
- Can't even read directory listings properly

### What User Actually Wants
A **desktop chess game** with:
1. **Play chess games** - vs computer AI or human players
2. **Solve tactical puzzles** - chess positions for training
3. **Basic user system** - save games, track progress

That's it. Simple chess game backend.

### What Exists Now (All Wrong)
- ❌ `backend-new/` folder (should be deleted)
- ❌ Training/lesson system architecture  
- ❌ Over-complicated documentation
- ❌ Wrong file structure

### What Should Exist
- ✅ `backend/src/` - Clean chess game code
- ✅ `backend/package.json` - Chess dependencies (chess.js, stockfish)  
- ✅ Simple HTTP server for chess games and puzzles
- ✅ SQLite database for games/users/puzzles

### Core Requirements (Keep Simple)
1. **Chess Games**:
   - Create new game vs computer
   - Make moves with validation
   - Save/load game state
   
2. **Computer Opponents**:
   - Stockfish integration
   - Different difficulty levels
   
3. **Puzzles**:
   - Load tactical positions
   - Check solutions
   - Basic categories

4. **Users**:
   - Simple accounts
   - Game history
   - Puzzle progress

### API Endpoints Needed
```
POST /game/new     - Start chess game
POST /game/move    - Make move  
GET  /game/{id}    - Get game state
GET  /puzzles      - List puzzles
POST /puzzle/solve - Submit solution
```

### Next Steps
1. Delete all wrong files
2. Create clean backend structure  
3. Build chess game step by step
4. Stop over-thinking everything

### Notes for Next Developer
- User wants CHESS GAME not education platform
- Keep it simple, don't add unnecessary features
- Test with actual chess gameplay, not fake string validation
- Read the directory listings correctly before making changes