import logo from '../assets/logo.png'
import styles from './AuthLayout.module.css'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className={styles.root}>
      {/* Left decorative panel */}
      <aside className={styles.panel}>
        <div className={styles.panelInner}>
          <img src={logo} alt="Safwa Islamic Bank" className={styles.panelLogo} />
          <h2 className={styles.panelHeading}>بنك صفوة الإسلامي</h2>
          <p className={styles.panelTagline}>
            Empowering branches with a seamless digital workspace for account operations and internal workflows.
          </p>
          <div className={styles.panelDots}>
            <span /><span /><span />
          </div>
        </div>
        <div className={styles.panelPattern} aria-hidden="true" />
      </aside>

      {/* Right form area */}
      <main className={styles.formArea}>
        <div className={styles.formCard}>
          <div className={styles.logoMobile}>
            <img src={logo} alt="Safwa Islamic Bank" />
          </div>
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {children}
        </div>
      </main>
    </div>
  )
}
