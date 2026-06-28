import { useState } from 'react'
import Topbar    from '../components/Topbar'
import FormField from '../components/FormField'
import Button    from '../components/Button'
import { useLanguage } from '../i18n/useLanguage'
import styles    from './AccountFormPage.module.css'

/* ─────────────────────────────────────────────────────────
   Mock account directory — accountTypeKey maps to a
   translation key so the label is language-aware.
   Replace the lookup with a real fetch() when ready.
───────────────────────────────────────────────────────── */
const ACCOUNT_DIRECTORY = {
  '1000001': { customerName: 'Mohammed Al-Ahmad',   accountTypeKey: 'accType.3005', openingDate: '01/03/2024' },
  '1000002': { customerName: 'Fatima Al-Zahrani',   accountTypeKey: 'accType.3092', openingDate: '15/06/2023' },
  '1000003': { customerName: 'Abdullah Al-Shehri',  accountTypeKey: 'accType.3005', openingDate: '22/11/2022' },
  '1000004': { customerName: 'Hessa Al-Dosari',     accountTypeKey: 'accType.3092', openingDate: '07/01/2025' },
  '1000005': { customerName: 'Turki Al-Malki',      accountTypeKey: 'accType.3005', openingDate: '30/08/2023' },
}

export default function AccountFormPage({ user, onLogout, onBack }) {
  const { t } = useLanguage()

  /* ── Account lookup state ── */
  const [accountNumber, setAccountNumber] = useState('')
  const [accountData, setAccountData]     = useState(null)
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupError, setLookupError]     = useState('')
  const [accountLocked, setAccountLocked] = useState(false)

  /* ── Notes ── */
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
    if (!key) { setLookupError(t('form.accNumberRequired')); return }

    setLookupError('')
    setAccountData(null)
    setLookupLoading(true)

    setTimeout(() => {
      const found = ACCOUNT_DIRECTORY[key]
      if (found) {
        setAccountData(found)
        setAccountLocked(true)
      } else {
        setLookupError(t('form.accNotFound'))
      }
      setLookupLoading(false)
    }, 800)
  }

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
              <button type="button" className={styles.breadcrumbBack} onClick={onBack}>
                {t('form.breadPortal')}
              </button>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
              <span>{t('form.breadOps')}</span>
            </p>
            <h1 className={styles.pageTitle}>{t('form.title')}</h1>
            <p className={styles.pageDesc}>{t('form.desc')}</p>
          </div>
          {submitted && (
            <div className={styles.successBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {t('form.submittedBadge')}
            </div>
          )}
        </div>

        {submitted ? (
          /* ════ SUCCESS ════ */
          <div className={styles.successPanel}>
            <div className={styles.successIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className={styles.successTitle}>{t('form.successTitle')}</h2>
            <p className={styles.successBody}>{t('form.successBody')}</p>

            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>{t('form.summaryTitle')}</h3>
              <div className={styles.summaryGrid}>
                <SummaryRow label={t('form.sumBranch')}   value={emp.branchNumber} />
                <SummaryRow label={t('form.sumEmpName')}  value={emp.fullName} />
                <SummaryRow label={t('form.sumEmpNo')}    value={emp.employeeNumber} />
                <SummaryRow label={t('form.sumAccNo')}    value={accountNumber} />
                <SummaryRow label={t('form.sumCustomer')} value={accountData?.customerName} />
                <SummaryRow label={t('form.sumAccType')}  value={t(accountData?.accountTypeKey)} />
                <SummaryRow label={t('form.sumDate')}     value={accountData?.openingDate} />
                {notes && <SummaryRow label={t('form.sumNotes')} value={notes} wide />}
              </div>
            </div>

            <div className={styles.successActions}>
              <Button id="new-form-btn" variant="primary" size="lg" onClick={handleReset}>
                {t('form.newForm')}
              </Button>
              <Button id="back-dashboard-btn" variant="ghost" size="lg" onClick={onBack}>
                {t('form.backPortal')}
              </Button>
            </div>
          </div>

        ) : (
          /* ════ FORM ════ */
          <form id="account-form" onSubmit={handleSubmit} noValidate className={styles.formCard}>

            {/* ── Section 1: Employee Information ── */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>{t('form.empSection')}</h2>
                  <p className={styles.sectionSub}>{t('form.empSectionSub')}</p>
                </div>
              </div>

              <div className={styles.grid3}>
                <FormField id="branchNumber"   label={t('form.branchNumber')} value={emp.branchNumber}   autoFilled hint={t('form.branchHint')} />
                <FormField id="userFullName"   label={t('form.empFullName')}  value={emp.fullName}       autoFilled />
                <FormField id="employeeNumber" label={t('form.empNumber')}    value={emp.employeeNumber} autoFilled />
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
                  <h2 className={styles.sectionTitle}>{t('form.accSection')}</h2>
                  <p className={styles.sectionSub}>
                    {accountData ? t('form.accSectionSubDone') : t('form.accSectionSubIdle')}
                  </p>
                </div>
              </div>

              {/* Account number + search */}
              <div className={styles.lookupRow}>
                <div className={styles.lookupFieldWrap}>
                  <label htmlFor="accountNumber" className={styles.lookupLabel}>
                    {t('form.accNumber')} <span className={styles.required}>*</span>
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
                      placeholder={t('form.accNumberPh')}
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
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        {t('form.change')}
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
                        {lookupLoading ? t('form.searching') : t('form.search')}
                      </Button>
                    )}
                  </div>
                  {lookupError && (
                    <p className={styles.lookupError} role="alert">{lookupError}</p>
                  )}
                  {!accountLocked && !lookupError && (
                    <p className={styles.lookupHint}>{t('form.demoAccounts')}</p>
                  )}
                </div>
              </div>

              {/* Retrieved account fields */}
              {accountData && (
                <div className={styles.retrievedFields}>
                  <div className={styles.retrievedBanner}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {t('form.accFound')}
                  </div>
                  <div className={styles.grid3}>
                    <FormField id="customerName" label={t('form.customerName')} value={accountData.customerName}          autoFilled hint={t('form.customerHint')} />
                    <FormField id="accountType"  label={t('form.accType')}      value={t(accountData.accountTypeKey)}     autoFilled hint={t('form.accTypeHint')} />
                    <FormField id="openingDate"  label={t('form.openingDate')}  value={accountData.openingDate}           autoFilled hint={t('form.openingDateHint')} />
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
                  <h2 className={styles.sectionTitle}>{t('form.notesSection')}</h2>
                  <p className={styles.sectionSub}>{t('form.notesSectionSub')}</p>
                </div>
              </div>

              <div className={styles.textareaGroup}>
                <textarea
                  id="notes"
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('form.notesPh')}
                  className={styles.textarea}
                  rows={4}
                  aria-label={t('form.notesSection')}
                />
                <span className={styles.charCount}>{notes.length} {t('form.characters')}</span>
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
                {submitLoading ? t('form.submitting') : t('form.submit')}
              </Button>
              <Button
                id="account-form-clear"
                type="button"
                variant="ghost"
                size="lg"
                onClick={handleReset}
              >
                {t('form.clear')}
              </Button>
              {!accountData && (
                <span className={styles.submitHint}>{t('form.submitHint')}</span>
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
