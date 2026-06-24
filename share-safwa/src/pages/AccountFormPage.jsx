import { useState } from 'react'
import Topbar    from '../components/Topbar'
import FormField from '../components/FormField'
import Button    from '../components/Button'
import styles    from './AccountFormPage.module.css'

/* ─────────────────────────────────────────────────────────
   Mock account directory
   Key: account number (string)
   Replace the lookup block with a real fetch() when ready.
───────────────────────────────────────────────────────── */
const ACCOUNT_DIRECTORY = {
  '1000001': {
    customerName: 'Mohammed Al-Ahmad',
    accountType:  '3005 — Savings Account',
    openingDate:  '01/03/2024',
  },
  '1000002': {
    customerName: 'Fatima Al-Zahrani',
    accountType:  '3092 — Current Account',
    openingDate:  '15/06/2023',
  },
  '1000003': {
    customerName: 'Abdullah Al-Shehri',
    accountType:  '3005 — Savings Account',
    openingDate:  '22/11/2022',
  },
  '1000004': {
    customerName: 'Hessa Al-Dosari',
    accountType:  '3092 — Current Account',
    openingDate:  '07/01/2025',
  },
  '1000005': {
    customerName: 'Turki Al-Malki',
    accountType:  '3005 — Savings Account',
    openingDate:  '30/08/2023',
  },
}

export default function AccountFormPage({ user, onLogout, onBack }) {
  /* ── Account lookup state ── */
  const [accountNumber, setAccountNumber] = useState('')
  const [accountData, setAccountData]     = useState(null)   // result from lookup
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupError, setLookupError]     = useState('')
  const [accountLocked, setAccountLocked] = useState(false)

  /* ── Notes (only manual field left) ── */
  const [notes, setNotes] = useState('')

  /* ── Submit state ── */
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitted, setSubmitted]         = useState(false)

  /* ── Auto-filled employee values ── */
  const emp = {
    branchNumber:   user?.branchNumber   ?? '—',
    fullName:       user?.fullName        ?? '—',
    employeeNumber: user?.employeeNumber  ?? '—',
  }

  /* ── Lookup handler ── */
  const handleLookup = (e) => {
    e.preventDefault()
    const key = accountNumber.trim()
    if (!key) { setLookupError('Please enter an account number.'); return }

    setLookupError('')
    setAccountData(null)
    setLookupLoading(true)

    setTimeout(() => {
      const found = ACCOUNT_DIRECTORY[key]
      if (found) {
        setAccountData(found)
        setAccountLocked(true)
      } else {
        setLookupError('No account found for this number. Please check and try again.')
      }
      setLookupLoading(false)
    }, 800)
  }

  /* ── Clear lookup to try a different account ── */
  const handleClearLookup = () => {
    setAccountNumber('')
    setAccountData(null)
    setAccountLocked(false)
    setLookupError('')
  }

  /* ── Submit handler ── */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!accountData) return
    setSubmitLoading(true)
    setTimeout(() => {
      setSubmitLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  /* ── Reset everything ── */
  const handleReset = () => {
    setAccountNumber('')
    setAccountData(null)
    setAccountLocked(false)
    setLookupError('')
    setNotes('')
    setSubmitted(false)
  }

  return (
    <div className={styles.page}>
      <Topbar user={user} onLogout={onLogout} />

      <main className={styles.main}>
        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <div>
            <p className={styles.breadcrumb}>
              <button type="button" className={styles.breadcrumbBack} onClick={onBack}>Portal</button>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
              <span>Account Operations</span>
            </p>
            <h1 className={styles.pageTitle}>Account Opening Form</h1>
            <p className={styles.pageDesc}>
              Enter the account number to retrieve customer details, then complete the form.
            </p>
          </div>
          {submitted && (
            <div className={styles.successBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Submitted
            </div>
          )}
        </div>

        {submitted ? (
          /* ════════════════════════════════════
             SUCCESS STATE
          ════════════════════════════════════ */
          <div className={styles.successPanel}>
            <div className={styles.successIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className={styles.successTitle}>Form submitted successfully</h2>
            <p className={styles.successBody}>
              The account opening request has been recorded and sent for processing.
            </p>

            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Submission summary</h3>
              <div className={styles.summaryGrid}>
                <SummaryRow label="Branch"          value={emp.branchNumber} />
                <SummaryRow label="Employee Name"   value={emp.fullName} />
                <SummaryRow label="Employee No."    value={emp.employeeNumber} />
                <SummaryRow label="Account No."     value={accountNumber} />
                <SummaryRow label="Customer Name"   value={accountData?.customerName} />
                <SummaryRow label="Account Type"    value={accountData?.accountType} />
                <SummaryRow label="Opening Date"    value={accountData?.openingDate} />
                {notes && <SummaryRow label="Notes" value={notes} wide />}
              </div>
            </div>

            <div className={styles.successActions}>
              <Button id="new-form-btn" variant="primary" size="lg" onClick={handleReset}>
                Submit another form
              </Button>
              <Button id="back-dashboard-btn" variant="ghost" size="lg" onClick={onBack}>
                Back to portal
              </Button>
            </div>
          </div>

        ) : (
          /* ════════════════════════════════════
             FORM
          ════════════════════════════════════ */
          <form id="account-form" onSubmit={handleSubmit} noValidate className={styles.formCard}>

            {/* ── Section 1: Employee Information (auto-filled) ── */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Employee Information</h2>
                  <p className={styles.sectionSub}>Auto-filled from your verified profile</p>
                </div>
              </div>

              <div className={styles.grid3}>
                <FormField id="branchNumber"   label="Branch Number"       value={emp.branchNumber}   autoFilled />
                <FormField id="userFullName"   label="Employee Full Name"  value={emp.fullName}       autoFilled />
                <FormField id="employeeNumber" label="Employee Number"     value={emp.employeeNumber} autoFilled />
              </div>
            </section>

            <div className={styles.divider} />

            {/* ── Section 2: Account Lookup ── */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Account Details</h2>
                  <p className={styles.sectionSub}>
                    {accountData
                      ? 'Customer details retrieved from the system'
                      : 'Enter the account number to retrieve customer details'}
                  </p>
                </div>
              </div>

              {/* ── Account number + search ── */}
              <div className={styles.lookupRow}>
                <div className={styles.lookupFieldWrap}>
                  <label htmlFor="accountNumber" className={styles.lookupLabel}>
                    Account Number <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.lookupInputRow}>
                    <input
                      id="accountNumber"
                      name="accountNumber"
                      type="text"
                      value={accountNumber}
                      onChange={(e) => {
                        setAccountNumber(e.target.value)
                        setLookupError('')
                        if (accountLocked) handleClearLookup()
                      }}
                      readOnly={accountLocked}
                      placeholder="e.g. 1000001"
                      className={[
                        styles.lookupInput,
                        lookupError   ? styles.lookupInputError  : '',
                        accountLocked ? styles.lookupInputLocked : '',
                      ].join(' ')}
                      autoComplete="off"
                    />
                    {accountLocked ? (
                      <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={handleClearLookup}
                        title="Search a different account"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        Change
                      </button>
                    ) : (
                      <Button
                        id="account-lookup-btn"
                        type="button"
                        variant="secondary"
                        size="md"
                        loading={lookupLoading}
                        onClick={handleLookup}
                      >
                        {lookupLoading ? 'Searching…' : 'Search'}
                      </Button>
                    )}
                  </div>
                  {lookupError && (
                    <p className={styles.lookupError} role="alert">{lookupError}</p>
                  )}
                  {!accountLocked && !lookupError && (
                    <p className={styles.lookupHint}>
                      Demo accounts: 1000001 · 1000002 · 1000003 · 1000004 · 1000005
                    </p>
                  )}
                </div>
              </div>

              {/* ── Retrieved account fields (shown after lookup) ── */}
              {accountData && (
                <div className={styles.retrievedFields}>
                  <div className={styles.retrievedBanner}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Account found — details auto-filled below
                  </div>
                  <div className={styles.grid3}>
                    <FormField
                      id="customerName"
                      label="Customer Full Name"
                      value={accountData.customerName}
                      autoFilled
                      hint="From account record"
                    />
                    <FormField
                      id="accountType"
                      label="Account Type / Ledger"
                      value={accountData.accountType}
                      autoFilled
                      hint="From account record"
                    />
                    <FormField
                      id="openingDate"
                      label="Account Opening Date"
                      value={accountData.openingDate}
                      autoFilled
                      hint="From account record"
                    />
                  </div>
                </div>
              )}
            </section>

            <div className={styles.divider} />

            {/* ── Section 3: Notes ── */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Notes</h2>
                  <p className={styles.sectionSub}>Optional — add any remarks or special instructions</p>
                </div>
              </div>

              <div className={styles.textareaGroup}>
                <textarea
                  id="notes"
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter any additional notes or instructions here…"
                  className={styles.textarea}
                  rows={4}
                  aria-label="Notes and remarks"
                />
                <span className={styles.charCount}>{notes.length} characters</span>
              </div>
            </section>

            {/* ── Actions ── */}
            <div className={styles.actions}>
              <Button
                id="account-form-submit"
                type="submit"
                variant="primary"
                size="lg"
                disabled={!accountData}
                loading={submitLoading}
              >
                {submitLoading ? 'Submitting…' : 'Submit form'}
              </Button>
              <Button
                id="account-form-clear"
                type="button"
                variant="ghost"
                size="lg"
                onClick={handleReset}
              >
                Clear form
              </Button>
              {!accountData && (
                <span className={styles.submitHint}>Search for an account first to enable submission</span>
              )}
            </div>
          </form>
        )}
      </main>
    </div>
  )
}

function SummaryRow({ label, value, wide }) {
  return (
    <div className={[styles.summaryRow, wide ? styles.summaryRowWide : ''].join(' ')}>
      <span className={styles.summaryLabel}>{label}</span>
      <span className={styles.summaryValue}>{value}</span>
    </div>
  )
}
