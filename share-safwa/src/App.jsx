import { useState } from 'react'
import LoginPage          from './pages/LoginPage'
import EmployeeLookupPage from './pages/EmployeeLookupPage'
import DashboardPage      from './pages/DashboardPage'
import AccountFormPage    from './pages/AccountFormPage'

// Pages: 'login' | 'lookup' | 'dashboard' | 'form'

function App() {
  const [page, setPage] = useState('login')
  const [user, setUser] = useState(null)

  // Step 1: Login authenticates the session (credentials only)
  const handleLogin = () => {
    setPage('lookup')
  }

  // Step 2: Employee lookup fills in profile data
  const handleLookupConfirm = (employeeData) => {
    setUser(employeeData)   // { employeeNumber, fullName, branchNumber }
    setPage('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    setPage('login')
  }

  const handleSelectModule = (moduleId) => {
    if (moduleId === 'accounts') setPage('form')
  }

  return (
    <>
      {page === 'login'     && <LoginPage          onLogin={handleLogin} />}
      {page === 'lookup'    && <EmployeeLookupPage  onConfirm={handleLookupConfirm} />}
      {page === 'dashboard' && <DashboardPage       user={user} onLogout={handleLogout} onSelectModule={handleSelectModule} />}
      {page === 'form'      && <AccountFormPage     user={user} onLogout={handleLogout} onBack={() => setPage('dashboard')} />}
    </>
  )
}

export default App
