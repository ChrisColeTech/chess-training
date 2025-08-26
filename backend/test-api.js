#!/usr/bin/env node

const http = require('http');

const BASE_URL = 'http://localhost:3000/api';
let accessToken = '';
let gameId = '';
let puzzleId = '';

// Helper function for HTTP requests
function makeRequest(method, path, data = null, useAuth = false) {
  return new Promise((resolve, reject) => {
    const fullPath = BASE_URL + path;
    const url = new URL(fullPath);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (useAuth && accessToken) {
      options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test functions
async function testHealth() {
  console.log('🏥 Testing health endpoint...');
  const result = await makeRequest('GET', '/health');
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  return result.data.success;
}

async function testApiInfo() {
  console.log('\n📋 Testing API info endpoint...');
  const result = await makeRequest('GET', '/');
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  return result.data.success;
}

async function testUserRegistration() {
  console.log('\n👤 Testing user registration...');
  const timestamp = Date.now();
  const userData = {
    username: 'test' + timestamp.toString().slice(-6), // Keep it under 20 chars
    email: `test${timestamp}@example.com`,
    password: 'password123'
  };
  
  const result = await makeRequest('POST', '/auth/register', userData);
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  
  if (!result.data.success && result.data.error) {
    console.log(`  Error: ${result.data.error}`);
    if (result.data.details) {
      console.log(`  Details:`, result.data.details);
    }
  }
  
  if (result.data.user) {
    console.log(`  User ID: ${result.data.user.id}`);
    console.log(`  Username: ${result.data.user.username}`);
    console.log(`  Chess ELO: ${result.data.user.chess_elo}`);
    console.log(`  Puzzle Rating: ${result.data.user.puzzle_rating}`);
  }
  return result.data.success ? userData : null;
}

async function testUserLogin(userData) {
  console.log('\n🔐 Testing user login...');
  const loginData = {
    email: userData.email,
    password: userData.password
  };
  
  const result = await makeRequest('POST', '/auth/login', loginData);
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  
  if (result.data.accessToken) {
    accessToken = result.data.accessToken;
    console.log(`  Access token received: ${accessToken.substring(0, 20)}...`);
    console.log(`  User: ${result.data.user.username}`);
  }
  
  return result.data.success;
}

async function testGetNextPuzzle() {
  console.log('\n🧩 Testing get next puzzle...');
  const result = await makeRequest('GET', '/puzzles/next', null, true);
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  
  if (result.data.puzzle) {
    puzzleId = result.data.puzzle.id;
    console.log(`  Puzzle ID: ${puzzleId}`);
    console.log(`  FEN: ${result.data.puzzle.fen}`);
    console.log(`  Rating: ${result.data.puzzle.rating}`);
    console.log(`  Themes: ${result.data.puzzle.themes.join(', ')}`);
    console.log(`  Description: ${result.data.puzzle.description}`);
  }
  
  return result.data.success;
}

async function testSolvePuzzle() {
  console.log('\n✅ Testing solve puzzle...');
  const solutionData = {
    moves: ['Bb4+'], // Simple attempt
    timeTaken: 15000
  };
  
  const result = await makeRequest('POST', `/puzzles/${puzzleId}/solve`, solutionData, true);
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  
  if (result.data.correct !== undefined) {
    console.log(`  Correct: ${result.data.correct ? 'Yes' : 'No'}`);
    console.log(`  Rating change: ${result.data.ratingChange}`);
    console.log(`  New rating: ${result.data.newRating}`);
    if (result.data.feedback) console.log(`  Feedback: ${result.data.feedback}`);
    if (result.data.hint) console.log(`  Hint: ${result.data.hint}`);
  }
  
  return result.data.success;
}

async function testCreateGame() {
  console.log('\n♟️  Testing create chess game...');
  const gameData = {
    aiLevel: 2,
    color: 'white',
    timeControl: '10+0'
  };
  
  const result = await makeRequest('POST', '/games/create', gameData, true);
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  
  if (result.data.gameId) {
    gameId = result.data.gameId;
    console.log(`  Game ID: ${gameId}`);
    console.log(`  Initial FEN: ${result.data.initialFen}`);
    if (result.data.aiMove) {
      console.log(`  AI first move: ${result.data.aiMove.san} (${result.data.aiMove.from}-${result.data.aiMove.to})`);
    }
  }
  
  return result.data.success;
}

async function testMakeMove() {
  console.log('\n🎯 Testing make move in chess game...');
  const moveData = {
    move: { from: 'e2', to: 'e4' }
  };
  
  const result = await makeRequest('POST', `/games/${gameId}/move`, moveData, true);
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  
  if (result.data.gameState) {
    console.log(`  Move legal: ${result.data.legal ? 'Yes' : 'No'}`);
    console.log(`  Turn: ${result.data.gameState.turn}`);
    console.log(`  Check: ${result.data.gameState.check ? 'Yes' : 'No'}`);
    console.log(`  Game over: ${result.data.gameState.gameOver ? 'Yes' : 'No'}`);
    if (result.data.aiMove) {
      console.log(`  AI response: ${result.data.aiMove.san} (${result.data.aiMove.from}-${result.data.aiMove.to})`);
    }
  }
  
  return result.data.success;
}

async function testGetProfile() {
  console.log('\n👥 Testing get user profile...');
  const result = await makeRequest('GET', '/user/profile', null, true);
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  
  if (result.data.user) {
    console.log(`  Username: ${result.data.user.username}`);
    console.log(`  Chess ELO: ${result.data.user.chess_elo}`);
    console.log(`  Puzzle Rating: ${result.data.user.puzzle_rating}`);
    console.log(`  Games Played: ${result.data.user.gamesPlayed}`);
    console.log(`  Puzzles Solved: ${result.data.user.puzzlesSolved}`);
  }
  
  return result.data.success;
}

async function testDashboardStats() {
  console.log('\n📊 Testing dashboard stats...');
  const result = await makeRequest('GET', '/stats/dashboard', null, true);
  console.log(`Status: ${result.status}`, result.data.success ? '✅' : '❌');
  
  if (result.data.stats) {
    console.log(`  Chess Rating: ${result.data.stats.chessRating}`);
    console.log(`  Puzzle Rating: ${result.data.stats.puzzleRating}`);
    console.log(`  Today's Games: ${result.data.stats.todayGames}`);
    console.log(`  Today's Puzzles: ${result.data.stats.todayPuzzles}`);
    console.log(`  Current Streak: ${result.data.stats.currentStreak}`);
  }
  
  return result.data.success;
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Chess Training API Tests\n');
  console.log('='.repeat(50));
  
  let passed = 0;
  let total = 0;
  
  try {
    // Basic endpoints
    total++; if (await testHealth()) passed++;
    total++; if (await testApiInfo()) passed++;
    
    // Authentication flow
    total++; const userData = await testUserRegistration();
    if (!userData) throw new Error('Registration failed');
    
    total++; if (!await testUserLogin(userData)) throw new Error('Login failed');
    
    // Puzzle system
    total++; if (await testGetNextPuzzle()) passed++;
    total++; if (await testSolvePuzzle()) passed++;
    
    // Chess game system
    total++; if (await testCreateGame()) passed++;
    total++; if (await testMakeMove()) passed++;
    
    // User profile and stats
    total++; if (await testGetProfile()) passed++;
    total++; if (await testDashboardStats()) passed++;
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`🏁 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('✅ All tests passed! Backend API is working correctly.');
    process.exit(0);
  } else {
    console.log(`❌ ${total - passed} tests failed. Check the output above.`);
    process.exit(1);
  }
}

// Run the tests
runTests();