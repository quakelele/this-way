import { Bookmark } from 'lucide-react'
import styles from './FavoriteButton.module.scss'

export const FavoriteButton = () => {
  return (
    <button
      className={styles.actionButton}
   >
    <Bookmark />
    </button>
  )
}
