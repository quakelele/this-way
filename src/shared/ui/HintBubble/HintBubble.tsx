import { useEffect, useState } from 'react'
import styles from './HintBubble.module.scss'
import { MousePointerClick } from 'lucide-react'

interface HintBubble {
  text?: string
  duration?: number
  storageKey?: string
}

export const HintBubble = ({
  text = 'Двойной клик — откроет фильтры',
  duration = 5000,
  storageKey = 'doubleClickHintShown',
}: HintBubble) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem(storageKey)
    if (!seen) {
      setVisible(true)
      sessionStorage.setItem(storageKey, 'true')
      setTimeout(() => setVisible(false), duration)
    }
  }, [duration, storageKey])

  if (!visible) return null

  return (
    <div className={styles.hint}>
      <div className={styles.bubble}>
        <MousePointerClick size={18} />
        <span>{text}</span>
        <span className={styles.arrow} />
      </div>
    </div>
  )
}
