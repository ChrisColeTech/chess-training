# Build & Deployment Guide

Complete guide for building and deploying the Chess Training application in different environments.

## 📋 Build Prerequisites

### Required Software
- **Node.js 18+** (with npm)
- **Git** (for cloning)
- Platform-specific tools for desktop builds:
  - **Windows**: Windows SDK, Visual Studio Build Tools
  - **macOS**: Xcode Command Line Tools  
  - **Linux**: build-essential package

### Environment Setup
```bash
# Verify Node.js version
node --version  # Should be 18+ 
npm --version   # Should be 8+

# Clone and setup
git clone <repository-url>
cd chess-training
npm run install:all
```

## 🔨 Development Builds

### Quick Development
```bash
# Start all services with hot reloading
npm run dev

# Access points:
# - Desktop app: Auto-launches
# - Web app: http://localhost:5173
# - API: http://localhost:3000
```

### Individual Components
```bash
# Backend only (API server)
npm run dev:backend
# → Starts on http://localhost:3000
# → Auto-restarts on file changes

# Frontend only (web interface)  
npm run dev:frontend  
# → Starts on http://localhost:5173
# → Hot module replacement enabled

# Desktop app only
npm run dev:electron
# → Launches Electron window
# → Connects to running backend/frontend

# Web stack only (no desktop)
npm run dev:web
# → Starts both backend and frontend
```

## 🏗️ Production Builds

### Full Build Process
```bash
# Build all components
npm run build

# Individual builds
npm run build:backend    # TypeScript → JavaScript
npm run build:frontend   # React → Static files  
```

### Build Outputs
```
backend/dist/          # Compiled JavaScript
frontend/dist/         # Static web files
electron/dist/         # Desktop app files
```

## 🚀 Deployment Options

### Option 1: Web Application

Deploy frontend as static site + backend as API server.

#### Frontend (Static Hosting)
```bash
npm run build:frontend

# Deploy frontend/dist/ folder to:
# - Netlify, Vercel, GitHub Pages
# - AWS S3 + CloudFront  
# - Any static file server
```

#### Backend (API Server)
```bash
npm run build:backend

# Deploy to cloud platforms:
# - Heroku, Railway, Render
# - AWS EC2/ECS, Google Cloud Run
# - DigitalOcean Droplets

# Environment variables needed:
# PORT=3000
# NODE_ENV=production
# JWT_SECRET=<your-secret>
```

### Option 2: Desktop Application

Package as standalone desktop app with bundled backend.

#### Development Testing
```bash
# Test desktop build locally
npm run build
cd electron  
electron .
```

#### Distribution Packages
```bash
cd electron

# Create app bundle (for testing)
npm run pack
# → Creates electron/dist-electron/ with app files

# Create installer/executable  
npm run dist
# → Creates platform-specific installers:
#   Windows: .exe installer  
#   macOS: .dmg disk image
#   Linux: .AppImage portable app
```

### Option 3: Hybrid Deployment

Web app + downloadable desktop version.

1. Deploy web version (Option 1)
2. Build desktop packages (Option 2)  
3. Host desktop downloads on website

## 📦 Production Configuration

### Backend Environment Variables
```bash
# Required
NODE_ENV=production
PORT=3000
JWT_SECRET=your-jwt-secret-here

# Optional  
DATABASE_PATH=/path/to/database.db
CORS_ORIGIN=https://yourdomain.com
```

### Frontend Environment Variables  
```bash
# Create frontend/.env.production
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Database Setup
```bash
# Initialize production database
npm run seed

# Or manually create tables:
# The app will auto-create SQLite tables on first run
```

## 🔍 Build Verification

### Backend Health Check
```bash
# After starting backend
curl http://localhost:3000/api/health

# Expected response:
{
  "success": true,
  "status": "healthy", 
  "timestamp": "...",
  "version": "1.0.0"
}
```

### Frontend Build Test
```bash
npm run build:frontend

# Serve locally to test
cd frontend
npx serve dist
# → http://localhost:3000
```

### Desktop App Test
```bash
npm run build
cd electron
electron .
# → Should launch desktop app successfully
```

## 📈 Production Optimization

### Backend Optimizations
- Enable gzip compression
- Set up process manager (PM2)
- Configure logging (Winston)
- Add rate limiting
- Set up monitoring

### Frontend Optimizations  
- Static asset caching
- CDN for global distribution
- Bundle size analysis
- Progressive Web App features

### Desktop App Optimizations
- Code signing for distribution
- Auto-updater integration  
- App icon and metadata
- Platform-specific features

## 🐛 Build Troubleshooting

### Common Issues

#### "Command not found" errors
```bash
# Ensure all dependencies installed
npm run install:all

# Check PATH includes node_modules/.bin
echo $PATH
```

#### Port conflicts
```bash
# Check what's using ports
lsof -i :3000  # Backend port
lsof -i :5173  # Frontend port

# Kill processes or use different ports
```

#### Build failures
```bash
# Clean everything and rebuild
rm -rf node_modules */node_modules */dist
npm run install:all  
npm run build
```

#### Electron white screen
- Ensure frontend built: `npm run build:frontend`
- Check Electron console for errors
- Verify paths in electron/src/main.ts

### Platform-Specific Issues

#### Windows
- Install Windows Build Tools: `npm install -g windows-build-tools`
- Use PowerShell/Command Prompt (not Git Bash for some commands)

#### macOS  
- Install Xcode Command Line Tools: `xcode-select --install`
- Sign desktop apps for distribution

#### Linux
- Install build essentials: `sudo apt-get install build-essential`
- May need additional libraries for Electron

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing: `npm run test`
- [ ] Code linted: `npm run lint`  
- [ ] Build successful: `npm run build`
- [ ] Database seeded: `npm run seed`
- [ ] Environment variables configured
- [ ] Health checks working

### Web Deployment
- [ ] Frontend static files deployed
- [ ] Backend API server running
- [ ] Database accessible  
- [ ] CORS configured correctly
- [ ] HTTPS certificates installed

### Desktop Deployment
- [ ] Desktop app builds successfully
- [ ] Database bundled/accessible
- [ ] App signed (for distribution)
- [ ] Installers created for target platforms
- [ ] Auto-updater configured (if needed)

## 🔄 CI/CD Pipeline Example

```yaml
# .github/workflows/build.yml
name: Build and Deploy

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3  
        with:
          node-version: '18'
      
      - run: npm run install:all
      - run: npm run build
      - run: npm run test
      
      # Deploy steps...
```

This covers the complete build and deployment process for all deployment scenarios.