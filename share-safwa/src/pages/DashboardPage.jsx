import Topbar from '../components/Topbar'
import styles  from './DashboardPage.module.css'

/* ── All portal operation modules ── */
const MODULES = [
  {
    id: 'accounts',
    label: 'Accounts',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    active: true,
    color: 'green',
  },
  {
    id: 'financing',
    label: 'Financing & Loans',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    active: false,
    color: 'blue',
  },
  {
    id: 'transfers',
    label: 'Transfers',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    active: false,
    color: 'purple',
  },
  {
    id: 'cards',
    label: 'Cards',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    active: false,
    color: 'orange',
  },
  {
    id: 'customer',
    label: 'Customer Service',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    active: false,
    color: 'teal',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
      </svg>
    ),
    active: false,
    color: 'rose',
  },
  {
    id: 'compliance',
    label: 'Compliance & AML',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    active: false,
    color: 'amber',
  },
  {
    id: 'settings',
    label: 'Branch Settings',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    active: false,
    color: 'slate',
  },
]

export default function DashboardPage({ user, onLogout, onSelectModule }) {
  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className={styles.page}>
      <Topbar user={user} onLogout={onLogout} />

      <main className={styles.main}>

        {/* ── Welcome banner ── */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.heroGreeting}>{greeting()}, {user?.fullName?.split(' ')[0]} 👋</p>
            <h1 className={styles.heroTitle}>What would you like to do today?</h1>
            <p className={styles.heroSub}>
              Select an operation module below to get started. Your branch is&nbsp;
              <strong>{user?.branchNumber}</strong>.
            </p>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statChip}>
              <span className={styles.statDot} />
              <span>System operational</span>
            </div>
            <div className={styles.statChip}>
              <span>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* ── Module grid ── */}
        <section className={styles.grid}>
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              id={`module-${mod.id}`}
              className={[
                styles.card,
                styles[`card--${mod.color}`],
                !mod.active ? styles.cardDisabled : '',
              ].join(' ')}
              onClick={() => mod.active && onSelectModule(mod.id)}
              disabled={!mod.active}
              aria-disabled={!mod.active}
              title={mod.active ? `Open ${mod.label}` : 'Coming soon'}
            >
              {/* Coming soon ribbon */}
              {!mod.active && (
                <span className={styles.ribbon}>Coming soon</span>
              )}

              <div className={styles.cardIcon}>{mod.icon}</div>

              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{mod.label}</h2>
              </div>

              <div className={styles.cardFooter}>
                {mod.active ? (
                  <span className={styles.openBtn}>
                    Open module
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </span>
                ) : (
                  <span className={styles.soonLabel}>Available soon</span>
                )}
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  )
}
