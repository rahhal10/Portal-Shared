import { useState } from 'react'
import LoginPage       from './pages/LoginPage'
import DashboardPage   from './pages/DashboardPage'
import AccountFormPage from './pages/AccountFormPage'

// Pages: 'login' | 'dashboard' | 'form'

function App() {
  const [page, setPage] = useState('login')
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setPage('dashboard')       // ← goes to dashboard first
  }

  const handleLogout = () => {
    setUser(null)
    setPage('login')
  }

  const handleSelectModule = (moduleId) => {
    if (moduleId === 'accounts') {
      setPage('form')
    }
    // other modules → no-op for now (coming soon)
  }

  const goToLogin  = () => setPage('login')

  return (
    <>
      {page === 'login'     && <LoginPage     onLogin={handleLogin} />}
      {page === 'dashboard' && <DashboardPage  user={user} onLogout={handleLogout} onSelectModule={handleSelectModule} />}
      {page === 'form'      && <AccountFormPage user={user} onLogout={handleLogout} onBack={() => setPage('dashboard')} />}
    </>
  )
}

export default App
