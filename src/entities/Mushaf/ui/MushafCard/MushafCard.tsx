import React from 'react'
import styles from './MushafCard.module.scss'

export const MushafCard = ({ text, juz, numberInSurah, page, surah }) => {
  //   if (!ayah) {
  //     return <div className={styles.loading}>Загрузка...</div>;
  //   }

  return (
    <div className={styles.card}>
      <p className={styles.ayah}>{text}</p>
    </div>
  )
}
