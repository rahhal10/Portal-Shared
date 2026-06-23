import logo from '../assets/logo.png'
import styles from './Topbar.module.css'

export default function Topbar({ user, onLogout, showNav = false }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src={logo} alt="Safwa Islamic Bank" className={styles.logo} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Employee Portal</span>
            <span className={styles.brandSub}>Internal Operations Workspace</span>
          </div>
        </div>

        <div className={styles.right}>
          {user && (
            <div className={styles.userChip}>
              <div className={styles.avatar}>{user.fullName?.[0] ?? 'E'}</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.fullName}</span>
                <span className={styles.userRole}>Branch {user.branchNumber}</span>
              </div>
            </div>
          )}
          {onLogout && (
            <button className={styles.logoutBtn} onClick={onLogout}>
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
