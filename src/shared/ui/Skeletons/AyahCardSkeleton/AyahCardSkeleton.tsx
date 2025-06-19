import styles from 'entities/AyahCard/ui/AyahCard/AyahCard.module.scss';
import './skeletonStyles.scss'; // подключим shimmer-эффект

export const AyahCardSkeleton = () => {
    return (
      <div className={`${styles.card} ${styles.skeletonCardWrapper}`}>
        <div className={styles.header}>
          <div className={styles.surahInfo}>
            <div className="skeleton-circle" style={{ width: 32, height: 32 }} />
            <div className="skeleton-text" style={{ width: 150, height: 16 }} />
          </div>
          <div className="skeleton-circle" style={{ width: 32, height: 32 }} />
        </div>
  
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.verseContainer}>
            <div className={styles.arabicText}>
              <div className="skeleton-block" style={{ height: 90, width: '100%' }} />
            </div>
            <div className={styles.translation}>
              <div className="skeleton-block" style={{ height: 60, width: '100%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  };
  