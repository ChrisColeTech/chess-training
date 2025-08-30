const fs = require('fs');

// Simpler approach: Use Node.js eval in a controlled way
function extractDataFromTsFile(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Remove imports and type annotations to make it evaluable JavaScript
  fileContent = fileContent
    .replace(/import\s+.*?from\s+['"].*?['"];?\s*\n?/g, '') // Remove imports
    .replace(/export\s+/g, '') // Remove export keywords
    .replace(/interface\s+\w+\s*\{[^}]*\}/g, '') // Remove interface definitions
    .replace(/:\s*\w+(\[\])?\s*(?=\s*[,=}])/g, '') // Remove type annotations carefully
    .replace(/:\s*['"][^'"]*['"](?=\s*[,=}])/g, ''); // Remove string literal types
    
  // Create a safe evaluation environment
  const extractedData = [];
  
  try {
    // Replace 'const variableName = ' with 'extractedData.push({"_name": "variableName", "_data": '
    const modifiedContent = fileContent.replace(
      /const\s+(\w+)\s*=\s*(\[[\s\S]*?\]);?/g,
      (match, varName, arrayContent) => {
        return `try { extractedData.push({"_name": "${varName}", "_data": ${arrayContent}}); } catch(e) { console.log("Failed to parse ${varName}:", e.message); }`;
      }
    );
    
    console.log('=== Modified content sample ===');
    console.log(modifiedContent.substring(0, 500));
    
    // Evaluate the modified content
    eval(modifiedContent);
    
    return extractedData;
  } catch (error) {
    console.log('Evaluation failed:', error.message);
    return [];
  }
}

// Test with openingsDatabase.ts
console.log('=== Testing openingsDatabase.ts extraction ===');
const filePath = '../frontend/src/data/openingsDatabase.ts';
const extracted = extractDataFromTsFile(filePath);

console.log(`\nExtracted ${extracted.length} data sets:`);
extracted.forEach((item, index) => {
  console.log(`\n${index + 1}. ${item._name}:`);
  if (Array.isArray(item._data)) {
    console.log(`  - Array with ${item._data.length} items`);
    if (item._data.length > 0) {
      console.log(`  - First item keys:`, Object.keys(item._data[0]));
      const firstItem = item._data[0];
      if (firstItem.name && firstItem.eco) {
        console.log(`  - Sample: ${firstItem.name} (${firstItem.eco})`);
      }
    }
  } else {
    console.log(`  - Type: ${typeof item._data}`);
  }
});

// Test database insertion with extracted data
if (extracted.length > 0) {
  const openingsData = extracted.find(item => item._name.includes('Opening') || item._name.includes('opening'));
  if (openingsData && Array.isArray(openingsData._data)) {
    console.log(`\n=== Testing database insertion with ${openingsData._name} ===`);
    console.log('Sample opening data:', JSON.stringify(openingsData._data[0], null, 2));
  }
}