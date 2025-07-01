import { ReadingView } from 'react-quran'
import { useState } from 'react'
import styles from './Mushaf.module.scss'
import { quranSurahPages } from 'entities/Mushaf/lib/quranSurahPages'

type Props = {
  chapterId: number
}

export const Mushaf = ({ chapterId }: Props) => {
  const [page, setPage] = useState(1)
  return (
    <div className={styles.wrapper}>
      <ReadingView
        page={quranSurahPages[chapterId]}
        readingViewStyles={{
          width: '1200px',
          maxWidth: '100%',
          backgroundColor: 'hsl(200 5% 94% / 1)',
          borderRadius: 22,
        }}
        surahTitleStyles={{
          color: 'black',
        }}
      />
    </div>
  )
}
