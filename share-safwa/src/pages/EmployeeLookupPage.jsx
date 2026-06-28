import { useState } from 'react'
import logo    from '../assets/logo.png'
import Button  from '../components/Button'
import { useLanguage } from '../i18n/useLanguage'
import styles  from './EmployeeLookupPage.module.css'

/* ─────────────────────────────────────────────────────────
   Mock employee directory
   Replace with a real fetch() when the backend is ready.
───────────────────────────────────────────────────────── */
const EMPLOYEE_DIRECTORY = {
  'SIB-EMP-0001': { fullName: 'Ahmed Al-Rashidi',  branchNumber: '001' },
  'SIB-EMP-0002': { fullName: 'Sara Al-Mutairi',   branchNumber: '002' },
  'SIB-EMP-0003': { fullName: 'Khalid Al-Otaibi',  branchNumber: '003' },
  'SIB-EMP-0004': { fullName: 'Nora Al-Harbi',     branchNumber: '001' },
  'SIB-EMP-0005': { fullName: 'Faisal Al-Ghamdi',  branchNumber: '004' },
}

export default function EmployeeLookupPage({ onConfirm }) {
  const { t, toggle } = useLanguage()

  const [employeeNumber, setEmployeeNumber] = useState('')
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [queried, setQueried] = useState(false)

  /* ── Step 1: look up ── */
  const handleLookup = (e) => {
    e.preventDefault()
    const key = employeeNumber.trim().toUpperCase()
    if (!key) { setError(t('lookup.required')); return }

    setError('')
    setResult(null)
    setQueried(false)
    setLoading(true)

    setTimeout(() => {
      const found = EMPLOYEE_DIRECTORY[key]
      if (found) {
        setResult(found)
        setQueried(true)
      } else {
        setError(t('lookup.notFound'))
      }
      setLoading(false)
    }, 850)
  }

  /* ── Step 2: confirm ── */
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
      {/* Minimal topbar */}
      <header className={styles.topbar}>
        <img src={logo} alt="Safwa Islamic Bank" className={styles.topbarLogo} />
        <button id="lookup-lang-toggle" className={styles.langBtn} onClick={toggle}>
          {t('lang.switchTo')}
        </button>
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
              <h1 className={styles.title}>{t('lookup.title')}</h1>
              <p className={styles.subtitle}>{t('lookup.subtitle')}</p>
            </div>
          </div>

          {/* Lookup form */}
          <form onSubmit={handleLookup} noValidate className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="employeeNumber" className={styles.label}>
                {t('lookup.empNumber')} <span className={styles.required}>*</span>
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
                  placeholder={t('lookup.placeholder')}
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
                    {t('lookup.locked')}
                  </div>
                )}
              </div>
              {error && (
                <p id="emp-error" className={styles.errorText} role="alert">{error}</p>
              )}
            </div>

            {!queried && (
              <Button
                id="lookup-submit"
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                {loading ? t('lookup.searching') : t('lookup.lookupBtn')}
              </Button>
            )}
          </form>

          {/* Retrieved profile panel */}
          {queried && result && (
            <div className={styles.resultPanel}>
              <div className={styles.resultHeader}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t('lookup.found')}
              </div>

              <div className={styles.resultGrid}>
                <div className={styles.resultField}>
                  <span className={styles.resultLabel}>{t('lookup.fullName')}</span>
                  <span className={styles.resultValue}>{result.fullName}</span>
                </div>
                <div className={styles.resultField}>
                  <span className={styles.resultLabel}>{t('lookup.branchNum')}</span>
                  <span className={styles.resultValue}>{result.branchNumber}</span>
                </div>
                <div className={styles.resultField}>
                  <span className={styles.resultLabel}>{t('lookup.empNum')}</span>
                  <span className={styles.resultValue}>{employeeNumber.trim().toUpperCase()}</span>
                </div>
              </div>

              <p className={styles.confirmHint}>{t('lookup.confirmHint')}</p>

              <div className={styles.confirmActions}>
                <Button
                  id="confirm-identity"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleConfirm}
                >
                  {t('lookup.confirm')}
                </Button>
                <button type="button" className={styles.retryLink} onClick={handleReset}>
                  {t('lookup.notYou')}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className={styles.footerHint}>{t('lookup.trouble')}</p>
      </main>
    </div>
  )
}
