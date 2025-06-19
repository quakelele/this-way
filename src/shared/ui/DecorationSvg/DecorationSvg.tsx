import styles from './DecorationSvg.module.scss'

export const DecorationSvg = () => {
  return (
    <div className={styles.decoration}>
      <svg
        width="40"
        height="8"
        viewBox="0 0 40 8">
        <circle
          cx="4"
          cy="4"
          r="1.5"
          fill="currentColor"
        />
        <circle
          cx="20"
          cy="4"
          r="2"
          fill="currentColor"
        />
        <circle
          cx="36"
          cy="4"
          r="1.5"
          fill="currentColor"
        />
        <path
          d="M1 4 L7 4 M13 4 L27 4 M33 4 L39 4"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  )
}
