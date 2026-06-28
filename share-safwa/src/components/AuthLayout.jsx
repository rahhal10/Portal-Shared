import logo from '../assets/logo.png'
import { useLanguage } from '../i18n/useLanguage'
import styles from './AuthLayout.module.css'

export default function AuthLayout({ children, title, subtitle }) {
  const { t, toggle } = useLanguage()

  return (
    <div className={styles.root}>
      {/* ── Slim top bar with language toggle ── */}
      <div className={styles.topNav}>
        <button
          id="auth-lang-toggle"
          className={styles.langBtn}
          onClick={toggle}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          {t('lang.switchTo')}
        </button>
      </div>

      <div className={styles.body}>
        {/* Left / right decorative panel */}
        <aside className={styles.panel}>
          <div className={styles.panelInner}>
            <img src={logo} alt="Safwa Islamic Bank" className={styles.panelLogo} />
            <h2 className={styles.panelHeading}>بنك صفوة الإسلامي</h2>
            <p className={styles.panelTagline}>{t('auth.tagline')}</p>
            <div className={styles.panelDots}>
              <span /><span /><span />
            </div>
          </div>
          <div className={styles.panelPattern} aria-hidden="true" />
        </aside>

        {/* Form area */}
        <main className={styles.formArea}>
          <div className={styles.formCard}>
            {/* Mobile logo (shown only on small screens) */}
            <div className={styles.logoMobile}>
              <img src={logo} alt="Safwa Islamic Bank" />
            </div>

            {title    && <h1 className={styles.title}>{title}</h1>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
