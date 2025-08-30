// Simplified, more robust TypeScript to JSON converter

function convertTsToJson(tsString) {
  let result = tsString;
  
  // Step 1: Remove comments
  result = result
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* */ comments
    .replace(/\/\/.*$/gm, ''); // Remove // comments
  
  // Step 2: Remove TypeScript type annotations but be more careful
  result = result
    .replace(/:\s*\w+(\[\])?\s*(?=[,}=])/g, '') // Remove type annotations like ': string'
    .replace(/:\s*['"][^'"]*['"](?=[,}=])/g, ''); // Remove string literal types
  
  // Step 3: Handle single quotes to double quotes for string values only
  result = result.replace(/:\s*'([^']*)'/g, ': "$1"'); // Convert ': 'value'' to ': "value"'
  result = result.replace(/\[([^\]]*)\]/g, (match, content) => {
    // Handle arrays - convert single quotes to double quotes inside arrays
    const cleanContent = content.replace(/'([^']*)'/g, '"$1"');
    return `[${cleanContent}]`;
  });
  
  // Step 4: Quote unquoted object keys (but not if already quoted)
  result = result.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
  
  // Step 5: Clean up trailing commas
  result = result.replace(/,(\s*[}\]])/g, '$1');
  
  // Step 6: Normalize whitespace
  result = result.replace(/\s+/g, ' ').trim();
  
  return result;
}

// Test with a sample from the openings file
const testData = `[
  // Sicilian Defense variations
  {
    eco: 'B92',
    name: 'Sicilian Defense: Najdorf Variation',
    fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
    frequency: 8.7,
    whiteWins: 37.2,
    blackWins: 34.4,
    theory: 'The Najdorf is one of the most complex openings',
    difficulty: 'Master',
  },
  {
    eco: 'B90',
    name: 'Sicilian Defense: English Attack',
    moves: ['e4', 'c5', 'Nf3'],
    frequency: 6.3,
    isPopular: true,
  }
]`;

console.log('=== Original ===');
console.log(testData);

console.log('\n=== Converted ===');
const converted = convertTsToJson(testData);
console.log(converted);

console.log('\n=== Testing JSON parsing ===');
try {
  const parsed = JSON.parse(converted);
  console.log('✅ Parsing successful!');
  console.log(`Array length: ${parsed.length}`);
  console.log('First item:', JSON.stringify(parsed[0], null, 2));
} catch (error) {
  console.log('❌ Parsing failed:', error.message);
  console.log('Problematic content:', converted.substring(0, 200));
}