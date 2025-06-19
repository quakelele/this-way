import styles from './PatternSvg.module.scss'

type Position = 'topLeft' | 'botRight'

type Props = {
  position: Position
}

export const PatternSvg = ({ position }: Props) => {
  return (
    <div className={styles[position]}>
      <svg
        viewBox="0 0 200 200"
        className={styles.patternSvg}>
        <defs>
          <pattern
            id="islamic-pattern-2"
            x="0"
            y="0"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse">
            <polygon
              points="15,5 25,15 15,25 5,15"
              fill="none"
              stroke="#6B7280"
              strokeWidth="0.5"
            />
            <circle
              cx="15"
              cy="15"
              r="3"
              fill="none"
              stroke="#6B7280"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect
          width="200"
          height="200"
          fill="url(#islamic-pattern-2)"
        />
      </svg>
    </div>
  )
}
