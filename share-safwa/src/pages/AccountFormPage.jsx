import { useState } from 'react'
import Topbar     from '../components/Topbar'
import FormField  from '../components/FormField'
import FormSelect from '../components/FormSelect'
import Button     from '../components/Button'
import styles     from './AccountFormPage.module.css'

/* Ledger / account type options */
const ACCOUNT_TYPE_OPTIONS = [
  { value: '3005', label: '3005 — Savings Account' },
  { value: '3092', label: '3092 — Current Account' },
]

/* Utility: today's date formatted dd/mm/yyyy */
const todayFormatted = () => {
  const d = new Date()
  const dd   = String(d.getDate()).padStart(2, '0')
  const mm   = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

export default function AccountFormPage({ user, onLogout, onBack }) {
  const [form, setForm] = useState({
    accountNumber: '',
    customerName:  '',
    accountType:   '',
    notes:         '',
  })
  const [errors, setErrors]     = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]    = useState(false)

  // Auto-filled values derived from the logged-in user
  const autoFilled = {
    branchNumber:   user?.branchNumber   ?? '—',
    userFullName:   user?.fullName        ?? '—',
    employeeNumber: user?.employeeNumber  ?? '—',
    openingDate:    todayFormatted(),
  }

  const change = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.accountNumber.trim()) errs.accountNumber = 'Account number is required'
    if (!form.customerName.trim())  errs.customerName  = 'Customer name is required'
    if (!form.accountType)          errs.accountType   = 'Please select an account type / ledger'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1100)
  }

  const handleReset = () => {
    setForm({ accountNumber: '', customerName: '', accountType: '', notes: '' })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className={styles.page}>
      <Topbar user={user} onLogout={onLogout} />

      <main className={styles.main}>
        {/* Page header */}
        <div className={styles.pageHeader}>
          <div>
            <p className={styles.breadcrumb}>
              <button type="button" className={styles.breadcrumbBack} onClick={onBack}>Portal</button>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
              <span>Account Operations</span>
            </p>
            <h1 className={styles.pageTitle}>New Account Opening Form</h1>
            <p className={styles.pageDesc}>
              Complete the fields below. Highlighted fields are auto-filled from your employee profile.
            </p>
          </div>
          {submitted && (
            <div className={styles.successBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Form submitted
            </div>
          )}
        </div>

        {submitted ? (
          /* ── Success state ── */
          <div className={styles.successPanel}>
            <div className={styles.successIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className={styles.successTitle}>Form submitted successfully</h2>
            <p className={styles.successBody}>
              Account opening request has been recorded. The details have been sent for processing.
            </p>

            {/* Summary card */}
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Submission summary</h3>
              <div className={styles.summaryGrid}>
                <SummaryRow label="Branch" value={autoFilled.branchNumber} />
                <SummaryRow label="Employee" value={autoFilled.userFullName} />
                <SummaryRow label="Emp. No." value={autoFilled.employeeNumber} />
                <SummaryRow label="Account No." value={form.accountNumber} />
                <SummaryRow label="Customer Name" value={form.customerName} />
                <SummaryRow label="Account Type" value={ACCOUNT_TYPE_OPTIONS.find(o => o.value === form.accountType)?.label ?? ''} />
                <SummaryRow label="Opening Date" value={autoFilled.openingDate} />
                {form.notes && <SummaryRow label="Notes" value={form.notes} wide />}
              </div>
            </div>

            <div className={styles.successActions}>
              <Button id="new-form-btn" variant="primary" size="lg" onClick={handleReset}>
                Submit another form
              </Button>
              <Button id="logout-btn" variant="ghost" size="lg" onClick={onLogout}>
                Sign out
              </Button>
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <form id="account-form" onSubmit={handleSubmit} noValidate className={styles.formCard}>

            {/* Section: Auto-filled Employee & Branch Info */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Employee Information</h2>
                  <p className={styles.sectionSub}>Auto-filled from your account profile</p>
                </div>
              </div>

              <div className={styles.grid3}>
                <FormField
                  id="branchNumber"
                  label="Branch Number"
                  value={autoFilled.branchNumber}
                  autoFilled
                  hint="Assigned to your account"
                />
                <FormField
                  id="userFullName"
                  label="Employee Full Name"
                  value={autoFilled.userFullName}
                  autoFilled
                />
                <FormField
                  id="employeeNumber"
                  label="Employee Number"
                  value={autoFilled.employeeNumber}
                  autoFilled
                />
              </div>
            </section>

            <div className={styles.divider} />

            {/* Section: Account Details */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Account Details</h2>
                  <p className={styles.sectionSub}>Complete the customer and account information</p>
                </div>
              </div>

              <div className={styles.grid2}>
                <FormField
                  id="accountNumber"
                  name="accountNumber"
                  label="Account Number"
                  placeholder="Enter the account number"
                  value={form.accountNumber}
                  onChange={change}
                  required
                  error={errors.accountNumber}
                  hint="Manual entry — customer's account number"
                />
                <FormField
                  id="customerName"
                  name="customerName"
                  label="Customer Name"
                  placeholder="Enter full customer name"
                  value={form.customerName}
                  onChange={change}
                  required
                  error={errors.customerName}
                />
              </div>

              <div className={styles.grid2}>
                <FormSelect
                  id="accountType"
                  name="accountType"
                  label="Account Type / Ledger"
                  placeholder="Select account type"
                  options={ACCOUNT_TYPE_OPTIONS}
                  value={form.accountType}
                  onChange={change}
                  required
                  error={errors.accountType}
                  hint="Select the appropriate ledger code"
                />
                <FormField
                  id="openingDate"
                  label="Account Opening Date"
                  value={autoFilled.openingDate}
                  autoFilled
                  hint="Today's date — set automatically"
                />
              </div>
            </section>

            <div className={styles.divider} />

            {/* Section: Notes */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Notes</h2>
                  <p className={styles.sectionSub}>Optional — add any relevant remarks or special instructions</p>
                </div>
              </div>

              <div className={styles.textareaGroup}>
                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={change}
                  placeholder="Enter any additional notes or instructions here…"
                  className={styles.textarea}
                  rows={4}
                  aria-label="Notes and remarks"
                />
                <span className={styles.charCount}>{form.notes.length} characters</span>
              </div>
            </section>

            {/* Actions */}
            <div className={styles.actions}>
              <Button
                id="account-form-submit"
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
              >
                {loading ? 'Submitting…' : 'Submit form'}
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
