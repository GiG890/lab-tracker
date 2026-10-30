import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/animations.css'
import { AuthProvider } from './app/providers/AuthProvider'
import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)