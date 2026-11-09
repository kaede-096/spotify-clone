import React, { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { PlayerProvider } from './context/PlayerContext'
import LoadingScreen from './components/LoadingScreen'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AppPage from './pages/AppPage'

export default function App() {
  const [screen, setScreen] = useState('loading') // loading | login | signup | app

  return (
    <ThemeProvider>
      <PlayerProvider>
        {screen === 'loading' && (
          <LoadingScreen onComplete={() => setScreen('login')} />
        )}
        {screen === 'login' && (
          <LoginPage
            onLogin={() => setScreen('app')}
            onGoSignup={() => setScreen('signup')}
          />
        )}
        {screen === 'signup' && (
          <SignupPage
            onSignup={() => setScreen('app')}
            onGoLogin={() => setScreen('login')}
          />
        )}
        {screen === 'app' && (
          <AppPage onLogout={() => setScreen('login')} />
        )}
      </PlayerProvider>
    </ThemeProvider>
  )
}