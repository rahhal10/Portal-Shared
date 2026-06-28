import logo from '../assets/logo.png'
import { useLanguage } from '../i18n/useLanguage'
import styles from './Topbar.module.css'

export default function Topbar({ user, onLogout }) {
  const { t, toggle } = useLanguage()

  return (
    <header className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src={logo} alt="Safwa Islamic Bank" className={styles.logo} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>{t('common.employeePortal')}</span>
            <span className={styles.brandSub}>{t('common.internalWorkspace')}</span>
          </div>
        </div>

        <div className={styles.right}>
          {/* Language toggle */}
          <button className={styles.langBtn} onClick={toggle} id="topbar-lang-toggle">
            {t('lang.switchTo')}
          </button>

          {user && (
            <div className={styles.userChip}>
              <div className={styles.avatar}>{user.fullName?.[0] ?? 'E'}</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.fullName}</span>
                <span className={styles.userRole}>{t('common.portal')} {user.branchNumber}</span>
              </div>
            </div>
          )}

          {onLogout && (
            <button className={styles.logoutBtn} onClick={onLogout} id="topbar-logout">
              {t('common.signOut')}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
