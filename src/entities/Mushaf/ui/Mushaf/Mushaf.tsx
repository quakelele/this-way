import React, { useEffect,  useState } from 'react'
import { useGetMushafPageQuery } from 'entities/Mushaf/api/mushafApi'
import { quranSurahPages } from 'entities/Mushaf/lib/quranSurahPages'
import styles from './Mushaf.module.scss'
import { Divider, Tooltip,  } from 'antd'
import { BasmalaSvg } from 'shared/ui/BasmalaSvg/BasmalaSvg'

type Props = {
  chapterId: number
}

export const Mushaf: React.FC<Props> = ({ chapterId }) => {
  const [page, setPage] = useState(quranSurahPages[chapterId] || 1)
  const { data } = useGetMushafPageQuery(page)

  useEffect(() => {
    setPage(quranSurahPages[chapterId] || 1)
  }, [chapterId])

  const playAudio = (audioUrl: string | null) => {
    if (audioUrl) {
      const audio = new Audio(`https://audio.qurancdn.com/${audioUrl}`)
      audio.play().catch(error => {
        console.error('Audio playback error:', error)
      })
    }
  }

  const prevPage = () => {
    setPage(p => Math.max(1, p - 1))
  }

  const nextPage = () => {
    setPage(p => Math.min(604, p + 1))
  }

  return (
    <div className={styles.mushafContainer}>
      <div className={styles.mushaf}>
        <div className={styles.pageTitle}>
          صفحة القرآن
          <Tooltip title={data?.page_number}>
            <span>{data?.page_number.toLocaleString('ar-EG')}</span>
          </Tooltip>
        </div>
        <BasmalaSvg />
        <Divider />

        <div className={styles.arabicText}>
          {data?.verses.map((verse, verseIndex) => (
            <span
              key={verseIndex}
              className={styles.verse}>
              {verse?.words.map((word, wordIndex) => (
                <span
                  key={`${verseIndex}-${wordIndex}`}
                  className={`${styles.word} ${
                    word.audio_url ? styles.clickable : ''
                  }`}
                  onClick={() => playAudio(word.audio_url)}>
                  {word.text_uthmani}
                </span>
              ))}
              <span className={styles.verseNumber}>{verse.verse_number}</span>
            </span>
          ))}
        </div>
        <button
          onClick={prevPage}
          aria-label="Previous Page">
          →
        </button>

        <button
          onClick={nextPage}
          aria-label="Next Page">
          ←
        </button>
      </div>
    </div>
  )
}
