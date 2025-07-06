import { useEffect, useState } from 'react'
import styles from './ToastHelper.module.scss'

interface ToastHelper {
  text?: string
  duration?: number
  storageKey?: string
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

export const ToastHelper = ({
  text = 'Двойной клик — откроет фильтры',
  duration = 4000,
  storageKey = 'doubleClickHintShown',
  position = 'bottom-left',
}: ToastHelper) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem(storageKey)
    if (!hasSeen) {
      setVisible(true)
      sessionStorage.setItem(storageKey, 'true')
      setTimeout(() => setVisible(false), duration)
    }
  }, [storageKey, duration])

  if (!visible) return null

  return (
    <div className={`${styles.hintWrapper} ${styles[position]}`}>
      <div className={styles.cursor} />
      <div className={styles.bubble}>{text}</div>
    </div>
  )
}
