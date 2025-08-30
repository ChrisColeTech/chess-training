// Debug utilities to prevent page reload from clearing logs
export function setupDebugLogging() {
  // Prevent page reload from clearing console
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  
  const logs: string[] = [];
  
  console.log = (...args) => {
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    logs.push(`LOG: ${new Date().toISOString()} - ${message}`);
    originalLog(...args);
    
    // Persist to localStorage
    localStorage.setItem('chess-debug-logs', JSON.stringify(logs.slice(-50))); // Keep last 50
  };
  
  console.error = (...args) => {
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    logs.push(`ERROR: ${new Date().toISOString()} - ${message}`);
    originalError(...args);
    
    // Persist to localStorage  
    localStorage.setItem('chess-debug-logs', JSON.stringify(logs.slice(-50)));
  };
  
  console.warn = (...args) => {
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    logs.push(`WARN: ${new Date().toISOString()} - ${message}`);
    originalWarn(...args);
    
    // Persist to localStorage
    localStorage.setItem('chess-debug-logs', JSON.stringify(logs.slice(-50)));
  };
  
  // Global error handler
  window.addEventListener('error', (event) => {
    console.error('🚨 Global JavaScript Error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.stack
    });
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled Promise Rejection:', event.reason);
  });
  
  console.log('🔧 Debug logging enabled - logs persist across page reloads');
}

// Function to view persisted logs
export function showDebugLogs() {
  const logs = JSON.parse(localStorage.getItem('chess-debug-logs') || '[]');
  console.log('📜 Persisted Debug Logs:', logs);
  return logs;
}

// Clear debug logs
export function clearDebugLogs() {
  localStorage.removeItem('chess-debug-logs');
  console.log('🧹 Debug logs cleared');
}