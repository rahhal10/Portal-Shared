import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import FormField  from '../components/FormField'
import Button     from '../components/Button'
import styles     from './LoginPage.module.css'

// Demo credentials — frontend only, no backend
const DEMO_USERS = [
  {
    employeeId: 'EMP001',
    password:   'safwa2024',
    fullName:   'Ahmed Al-Rashidi',
    branchNumber: '001',
    employeeNumber: 'SIB-EMP-0001',
  },
  {
    employeeId: 'EMP002',
    password:   'safwa2024',
    fullName:   'Sara Al-Mutairi',
    branchNumber: '002',
    employeeNumber: 'SIB-EMP-0002',
  },
]

export default function LoginPage({ onLogin }) {
  const [form, setForm]     = useState({ employeeId: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw]   = useState(false)

  const change = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.employeeId.trim()) errs.employeeId = 'Employee ID is required'
    if (!form.password.trim())   errs.password   = 'Password is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    // Simulate async check
    setTimeout(() => {
      const user = DEMO_USERS.find(
        (u) =>
          u.employeeId === form.employeeId.trim() &&
          u.password === form.password
      )
      if (user) {
        onLogin(user)
      } else {
        setErrors({ general: 'Invalid Employee ID or password. Please try again.' })
      }
      setLoading(false)
    }, 900)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access the Safwa Employee Portal."
    >
      <form
        id="login-form"
        onSubmit={handleSubmit}
        noValidate
        className={styles.form}
      >
        {errors.general && (
          <div className={styles.alertError} role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errors.general}
          </div>
        )}

        <FormField
          id="employeeId"
          name="employeeId"
          label="Employee ID"
          placeholder="e.g. EMP001"
          value={form.employeeId}
          onChange={change}
          required
          error={errors.employeeId}
        />

        <div className={styles.passwordGroup}>
          <FormField
            id="password"
            name="password"
            label="Password"
            type={showPw ? 'text' : 'password'}
            placeholder="Enter your password"
            value={form.password}
            onChange={change}
            required
            error={errors.password}
          />
          <button
            type="button"
            className={styles.showPwBtn}
            onClick={() => setShowPw((p) => !p)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        <div className={styles.forgot}>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.forgotLink}>
            Forgot password?
          </a>
        </div>

        <Button
          id="login-submit"
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>

      </form>

      <div className={styles.demoHint}>
        <strong>Demo credentials:</strong> EMP001 / safwa2024
      </div>
    </AuthLayout>
  )
}
