import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import FormField  from '../components/FormField'
import Button     from '../components/Button'
import styles     from './SignUpPage.module.css'

export default function SignUpPage({ onSignUp, onLogin }) {
  const [form, setForm] = useState({
    fullName:       '',
    employeeNumber: '',
    branchNumber:   '',
    email:          '',
    password:       '',
    confirmPw:      '',
  })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw]   = useState(false)
  const [done, setDone]       = useState(false)

  const change = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim())       errs.fullName       = 'Full name is required'
    if (!form.employeeNumber.trim()) errs.employeeNumber = 'Employee number is required'
    if (!form.branchNumber.trim())   errs.branchNumber   = 'Branch number is required'
    if (!form.email.trim())          errs.email          = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address'
    if (!form.password)              errs.password       = 'Password is required'
    else if (form.password.length < 8) errs.password     = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPw) errs.confirmPw  = 'Passwords do not match'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    // Simulate account creation
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 1100)
  }

  if (done) {
    return (
      <AuthLayout title="Account created!" subtitle="Your account is pending approval by an administrator.">
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className={styles.successMsg}>
            Your registration has been submitted. You will receive an email once your account is approved.
          </p>
          <Button id="go-to-login" variant="primary" size="lg" fullWidth onClick={onLogin}>
            Back to Sign in
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Register to access the Safwa Employee Portal."
    >
      <form
        id="signup-form"
        onSubmit={handleSubmit}
        noValidate
        className={styles.form}
      >
        <div className={styles.row}>
          <FormField
            id="fullName"
            name="fullName"
            label="Full Name"
            placeholder="e.g. Ahmed Al-Rashidi"
            value={form.fullName}
            onChange={change}
            required
            error={errors.fullName}
          />
          <FormField
            id="employeeNumber"
            name="employeeNumber"
            label="Employee Number"
            placeholder="e.g. SIB-EMP-0001"
            value={form.employeeNumber}
            onChange={change}
            required
            error={errors.employeeNumber}
          />
        </div>

        <div className={styles.row}>
          <FormField
            id="branchNumber"
            name="branchNumber"
            label="Branch Number"
            placeholder="e.g. 001"
            value={form.branchNumber}
            onChange={change}
            required
            error={errors.branchNumber}
          />
          <FormField
            id="email"
            name="email"
            label="Work Email"
            type="email"
            placeholder="you@safwabank.com"
            value={form.email}
            onChange={change}
            required
            error={errors.email}
          />
        </div>

        <div className={styles.passwordGroup}>
          <FormField
            id="password"
            name="password"
            label="Password"
            type={showPw ? 'text' : 'password'}
            placeholder="Minimum 8 characters"
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

        <FormField
          id="confirmPw"
          name="confirmPw"
          label="Confirm Password"
          type={showPw ? 'text' : 'password'}
          placeholder="Repeat your password"
          value={form.confirmPw}
          onChange={change}
          required
          error={errors.confirmPw}
        />

        <Button
          id="signup-submit"
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        >
          {loading ? 'Creating account…' : 'Create account'}
        </Button>

        <p className={styles.switchText}>
          Already have an account?{' '}
          <button type="button" className={styles.switchLink} onClick={onLogin}>
            Sign in
          </button>
        </p>
      </form>
    </AuthLayout>
  )
}
