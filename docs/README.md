# Chess Training Desktop Application

A full-stack chess training application with AI opponents, tactical puzzles, and progress tracking. Built with React, Node.js, and Electron.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd chess-training

# Install all dependencies
npm run install:all
```

### Development
```bash
# Start complete application (API + Web + Desktop)
npm run dev
```

**Development URLs:**
- **Desktop App**: Launches automatically via Electron
- **Web Interface**: http://localhost:5173
- **API Server**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health

## 📦 Building & Production

### Development Build
```bash
npm run build        # Build all components (backend + frontend)
```

### Production Deployment

#### Production Server
```bash
npm run build        # Build backend + frontend
npm run start        # Start production server
# Server runs on port 3000
```

#### Desktop Application
```bash
npm run build
cd electron
npm run pack         # Create distributable package
npm run dist         # Create installer/executable
```

## 🛠️ Development Features

### Hot Reloading
- **Backend**: Auto-restarts on TypeScript changes (via nodemon)
- **Frontend**: Instant hot module replacement (via Vite)
- **Electron**: Reload manually or restart to see main process changes

### Database
```bash
npm run seed         # Populate with sample puzzles and test data
```

### Code Quality
```bash
npm run lint         # Lint frontend code
npm run test         # Run all tests
```

## 📁 Project Structure

```
chess-training/
├── backend/         # Node.js API server
│   ├── src/
│   ├── database/    # SQLite database files
│   └── package.json
├── frontend/        # React web interface  
│   ├── src/
│   ├── dist/        # Built files
│   └── package.json
├── electron/        # Desktop app wrapper
│   ├── src/
│   ├── dist/        # Built files
│   └── package.json
└── package.json     # Root orchestration scripts
```

## 🎮 Features

- **Chess Games**: Play against 5 AI difficulty levels
- **Tactical Puzzles**: Solve chess puzzles with rating system
- **Progress Tracking**: ELO ratings for both chess and puzzles
- **User Authentication**: Secure login and session management
- **Desktop & Web**: Works as desktop app or in browser

## 🔧 Troubleshooting

### Port Conflicts
If ports 3000 or 5173 are in use:
- Backend: Set `PORT=3001` environment variable
- Frontend: Modify `frontend/vite.config.ts` port setting

### Database Issues
```bash
rm backend/database/chess_training.db  # Reset database
npm run seed                           # Recreate with sample data
```

### Electron White Screen
- Ensure frontend dev server is running on port 5173
- Check electron console for JavaScript errors
- Verify NODE_ENV is set correctly

### Build Failures
```bash
# Clean and rebuild
rm -rf */node_modules */dist
npm run install:all
npm run build
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in  
- `POST /api/auth/refresh` - Refresh token

### Games
- `POST /api/games/create` - Start new chess game
- `POST /api/games/:id/move` - Make a move
- `GET /api/games/:id` - Get game state

### Puzzles  
- `GET /api/puzzles/next` - Get puzzle to solve
- `POST /api/puzzles/:id/solve` - Submit solution
- `GET /api/puzzles/stats` - Get user puzzle stats

### Stats
- `GET /api/stats/dashboard` - User dashboard data

## 🤝 Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit source files (auto-reload enabled)  
3. **Test Features**: Use desktop app or web interface
4. **Check API**: Visit http://localhost:3000/api/health
5. **Build for Production**: `npm run build`

## 💡 Tips

- Use `npm run dev:web` if you don't need the desktop app
- Database is SQLite - no separate server needed
- Frontend runs independently - can be deployed to any static host
- Electron app includes bundled backend for offline use