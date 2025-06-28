import styles from 'entities/Surah/ui/SurahCard/SurahCard.module.scss'
import './skeletonStyles.scss' // подключим shimmer-эффект

export const SurahCardSkeleton = () => {
  return (
    <div>
      {[...Array(30)].map((_,i) => (
        <div
          key={i}
          className={`${styles.cartForSkeleton} ${styles.skeletonCardWrapper}`}>
          <div className={styles.verseContainer}>
            <div className={styles.arabicText}>
              <div
                className="skeleton-block"
                style={{ height: 200, width: '100%' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
