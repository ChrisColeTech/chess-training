import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import 'responsive-chessboard/dist/style.css'
import App from './App.tsx'
import { queryClient } from './lib/query-client'

function DesktopApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesktopApp />
  </StrictMode>,
)