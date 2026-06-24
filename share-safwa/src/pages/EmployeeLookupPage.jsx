import { useState } from 'react'
import logo    from '../assets/logo.png'
import Button  from '../components/Button'
import styles  from './EmployeeLookupPage.module.css'

/* ─────────────────────────────────────────────────────────
   Mock employee directory
   Replace this with a real API call when the backend is ready.
   Lookup key: employee number (string, case-insensitive trim)
───────────────────────────────────────────────────────── */
const EMPLOYEE_DIRECTORY = {
  'SIB-EMP-0001': { fullName: 'Ahmed Al-Rashidi',  branchNumber: '001' },
  'SIB-EMP-0002': { fullName: 'Sara Al-Mutairi',   branchNumber: '002' },
  'SIB-EMP-0003': { fullName: 'Khalid Al-Otaibi',  branchNumber: '003' },
  'SIB-EMP-0004': { fullName: 'Nora Al-Harbi',     branchNumber: '001' },
  'SIB-EMP-0005': { fullName: 'Faisal Al-Ghamdi',  branchNumber: '004' },
}

export default function EmployeeLookupPage({ onConfirm }) {
  const [employeeNumber, setEmployeeNumber] = useState('')
  const [result, setResult]   = useState(null)   // { fullName, branchNumber }
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [queried, setQueried] = useState(false)

  /* ── Step 1: look up the employee number ── */
  const handleLookup = (e) => {
    e.preventDefault()
    const key = employeeNumber.trim().toUpperCase()
    if (!key) { setError('Please enter your employee number.'); return }

    setError('')
    setLoading(true)
    setResult(null)
    setQueried(false)

    // Simulate network delay
    setTimeout(() => {
      const found = EMPLOYEE_DIRECTORY[key]
      if (found) {
        setResult(found)
        setQueried(true)
      } else {
        setError('No employee record found for this number. Please check and try again.')
      }
      setLoading(false)
    }, 850)
  }

  /* ── Step 2: confirm and proceed to dashboard ── */
  const handleConfirm = () => {
    onConfirm({
      employeeNumber: employeeNumber.trim().toUpperCase(),
      fullName:       result.fullName,
      branchNumber:   result.branchNumber,
    })
  }

  const handleReset = () => {
    setResult(null)
    setQueried(false)
    setEmployeeNumber('')
    setError('')
  }

  return (
    <div className={styles.page}>
      {/* Minimal top bar — no user info yet */}
      <header className={styles.topbar}>
        <img src={logo} alt="Safwa Islamic Bank" className={styles.topbarLogo} />
      </header>

      <main className={styles.main}>
        <div className={styles.card}>

          {/* Card header */}
          <div className={styles.cardHeader}>
            <div className={styles.iconWrap}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <h1 className={styles.title}>Verify your identity</h1>
              <p className={styles.subtitle}>Enter your employee number to retrieve your profile information.</p>
            </div>
          </div>

          {/* ── Lookup form ── */}
          <form onSubmit={handleLookup} noValidate className={styles.form}>

            {/* Employee number field — locked after successful query */}
            <div className={styles.fieldGroup}>
              <label htmlFor="employeeNumber" className={styles.label}>
                Employee Number <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputRow}>
                <input
                  id="employeeNumber"
                  name="employeeNumber"
                  type="text"
                  value={employeeNumber}
                  onChange={(e) => {
                    setEmployeeNumber(e.target.value)
                    setError('')
                    if (queried) handleReset()
                  }}
                  placeholder="e.g. SIB-EMP-0001"
                  readOnly={queried}
                  className={[
                    styles.input,
                    error   ? styles.inputError  : '',
                    queried ? styles.inputLocked : '',
                  ].join(' ')}
                  aria-describedby={error ? 'emp-error' : undefined}
                  autoComplete="off"
                  spellCheck="false"
                />
                {queried && (
                  <div className={styles.lockedBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Locked
                  </div>
                )}
              </div>
              {error && (
                <p id="emp-error" className={styles.errorText} role="alert">{error}</p>
              )}
            </div>

            {/* Query button — hidden after success */}
            {!queried && (
              <Button
                id="lookup-submit"
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                {loading ? 'Searching…' : 'Look up employee'}
              </Button>
            )}
          </form>

          {/* ── Retrieved profile panel ── */}
          {queried && result && (
            <div className={styles.resultPanel}>
              <div className={styles.resultHeader}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Employee record found
              </div>

              <div className={styles.resultGrid}>
                <div className={styles.resultField}>
                  <span className={styles.resultLabel}>Full Name</span>
                  <span className={styles.resultValue}>{result.fullName}</span>
                </div>
                <div className={styles.resultField}>
                  <span className={styles.resultLabel}>Branch Number</span>
                  <span className={styles.resultValue}>{result.branchNumber}</span>
                </div>
                <div className={styles.resultField}>
                  <span className={styles.resultLabel}>Employee Number</span>
                  <span className={styles.resultValue}>{employeeNumber.trim().toUpperCase()}</span>
                </div>
              </div>

              <p className={styles.confirmHint}>
                Please confirm the above information is correct before continuing.
              </p>

              <div className={styles.confirmActions}>
                <Button
                  id="confirm-identity"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleConfirm}
                >
                  Confirm &amp; continue
                </Button>
                <button type="button" className={styles.retryLink} onClick={handleReset}>
                  Not you? Enter a different number
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer hint */}
        <p className={styles.footerHint}>
          Having trouble? Contact your branch administrator.
        </p>
      </main>
    </div>
  )
}
