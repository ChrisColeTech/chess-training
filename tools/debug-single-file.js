const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function debugSingleFile() {
  console.log('=== Debugging openingsDatabase.ts extraction ===');
  
  const filePath = '../frontend/src/data/openingsDatabase.ts';
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  console.log('\n=== Original file content (first 500 chars) ===');
  console.log(fileContent.substring(0, 500));
  
  // Clean up the content like the migrator does
  let cleanContent = fileContent
    .replace(/import\s+.*?from\s+['"].*?['"];?\s*\n?/g, '')
    .replace(/export\s+/g, '')
    .replace(/interface\s+\w+\s*\{[^}]*\}/g, '');

  console.log('\n=== Cleaned content (first 500 chars) ===');
  console.log(cleanContent.substring(0, 500));

  // Extract arrays
  const exportMatches = cleanContent.match(/const \w+.*?=\s*(\[[\s\S]*?\]);?/g) || [];
  console.log(`\n=== Found ${exportMatches.length} export matches ===`);
  
  for (let i = 0; i < Math.min(exportMatches.length, 2); i++) {
    console.log(`\nExport ${i + 1}: ${exportMatches[i].substring(0, 200)}...`);
    
    const dataMatch = exportMatches[i].match(/=\s*(\[[\s\S]*?\]);?$/);
    if (dataMatch) {
      let dataStr = dataMatch[1];
      console.log(`\nRaw data string (first 300 chars): ${dataStr.substring(0, 300)}...`);
      
      // Apply the same cleaning as the improved migrator
      dataStr = dataStr
        // Remove comments first (before any other processing)
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* */ comments
        .replace(/\/\/.*$/gm, '') // Remove // comments
        // Handle TypeScript types and generics
        .replace(/<[^>]*>/g, '') // Remove generic types
        .replace(/:\s*\w+(\[\])?\s*(?=[,}])/g, '') // Remove type annotations
        .replace(/'/g, '"') // Single to double quotes
        // Fix unquoted object keys and values
        .replace(/(\w+):/g, '"$1":') // Quote object keys
        .replace(/"(\w+)":\s*(\w+)(?=[,}\]])/g, '"$1": "$2"') // Quote unquoted string values
        .replace(/"(\w+)":\s*(\d+\.?\d*)(?=[,}\]])/g, '"$1": $2') // Keep numbers unquoted
        .replace(/"(\w+)":\s*(true|false)(?=[,}\]])/g, '"$1": $2') // Keep booleans unquoted
        .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      console.log(`\nCleaned data string (first 300 chars): ${dataStr.substring(0, 300)}...`);
      
      try {
        const parsedData = JSON.parse(dataStr);
        console.log(`\nParsed successfully! Type: ${typeof parsedData}, Array: ${Array.isArray(parsedData)}`);
        if (Array.isArray(parsedData)) {
          console.log(`Array length: ${parsedData.length}`);
          if (parsedData.length > 0) {
            console.log(`First item keys: ${Object.keys(parsedData[0])}`);
            console.log(`First item sample:`, JSON.stringify(parsedData[0], null, 2).substring(0, 300));
          }
        }
      } catch (error) {
        console.log(`\nParsing failed: ${error.message}`);
        
        // Try the fallback approach
        const objectMatches = dataStr.match(/\{[^{}]*\}/g);
        console.log(`Found ${objectMatches ? objectMatches.length : 0} object matches with fallback`);
        if (objectMatches && objectMatches.length > 0) {
          console.log(`First object match: ${objectMatches[0].substring(0, 200)}...`);
        }
      }
    }
  }
  
  // Test database insertion
  console.log('\n=== Testing database insertion ===');
  try {
    const db = await open({
      filename: '../backend/database/chess_training.db',
      driver: sqlite3.Database
    });
    
    const testOpening = {
      name: 'Test Sicilian Defense',
      eco: 'B92',
      moves: ['e4', 'c5', 'Nf3'],
      description: 'Test opening description',
      frequency: 8.7,
      difficulty: 'Master'
    };
    
    console.log('Attempting to insert test opening:', testOpening);
    
    const id = 'debug_test_' + Date.now();
    await db.run(
      `INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, testOpening.name, testOpening.eco || '', 
       JSON.stringify(testOpening.moves || []), 
       testOpening.description || testOpening.theory || '',
       Math.round((testOpening.frequency || testOpening.popularity || 0) * 100),
       testOpening.difficulty || 'intermediate']
    );
    
    const count = await db.get('SELECT COUNT(*) as count FROM openings');
    console.log(`Total openings after test insert: ${count.count}`);
    
    await db.close();
    console.log('✅ Test insertion successful!');
    
  } catch (error) {
    console.log('❌ Database insertion failed:', error.message);
  }
}

debugSingleFile().catch(console.error);