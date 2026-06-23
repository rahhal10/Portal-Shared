import styles from './FormSelect.module.css'

/**
 * Reusable dropdown select field
 *
 * Props:
 *  - id, name, label, value, onChange
 *  - options: [{ value, label }]
 *  - required, disabled, error, hint
 *  - placeholder (text for default empty option)
 */
export default function FormSelect({
  id,
  name,
  label,
  value = '',
  onChange,
  options = [],
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  error,
  hint,
}) {
  return (
    <div className={styles.group}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.selectWrapper}>
        <select
          id={id}
          name={name ?? id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={[styles.select, error ? styles.selectError : ''].join(' ')}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {error && (
        <span id={`${id}-err`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={`${id}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
    </div>
  )
}
