import styles from './WrapperSvg.module.scss'

export const WrapperSvg = () => {
  return (
    <div className={styles.iconWrapper}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={styles.icon}>
        <path
          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
