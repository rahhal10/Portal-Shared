import { useLanguage } from '../i18n/useLanguage'
import styles from './FormField.module.css'

export default function FormField({
  id, name, label, type = 'text', value = '', onChange,
  placeholder = '', required = false, disabled = false,
  readOnly = false, error, hint, autoFilled = false,
}) {
  const { t } = useLanguage()
  const isLocked = disabled || readOnly || autoFilled

  return (
    <div className={styles.group}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        {autoFilled && (
          <span className={styles.autoBadge}>{t('common.autoFilled')}</span>
        )}
      </div>

      <input
        id={id}
        name={name ?? id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly || autoFilled}
        className={[
          styles.input,
          error    ? styles.inputError  : '',
          isLocked ? styles.inputLocked : '',
        ].join(' ')}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
      />

      {error && (
        <span id={`${id}-err`} className={styles.errorText} role="alert">{error}</span>
      )}
      {!error && hint && (
        <span id={`${id}-hint`} className={styles.hint}>{hint}</span>
      )}
    </div>
  )
}
