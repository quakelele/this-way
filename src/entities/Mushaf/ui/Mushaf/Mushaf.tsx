import React, { useEffect, useState } from 'react'

import { useGetMushafPageQuery } from 'entities/Mushaf/api/mushafApi'
import { quranSurahPages } from 'entities/Mushaf/lib/quranSurahPages'
import styles from './Mushaf.module.scss'
import { Divider, Tooltip } from 'antd'

type Props = {
  chapterId: number
}

export const Mushaf: React.FC<Props> = ({ chapterId }) => {
  const [page, setPage] = useState(quranSurahPages[chapterId] || 1)

  const { data, isLoading, isError } = useGetMushafPageQuery(page)

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

  if (isLoading) return <div className={styles.loading}>جاري التحميل...</div>
  if (isError || !data?.verses)
    return <div className={styles.error}>خطأ في تحميل البيانات</div>

  return (
    <div className={styles.mushafContainer}>
      <div className={styles.mushaf}>
        <div
          className={styles.pageTitle}
          prefix={data.page_number}>
          صفحة القرآن
          <Tooltip title={data.page_number}>
            <span  >{data.page_number.toLocaleString('ar-EG')}</span>
          </Tooltip>
        </div>
        <Divider/>
        <div className={styles.arabicText}>
          {data.verses.map((verse, verseIndex) => {
            return (
              <span
                key={verseIndex}
                className={styles.verse}>
                {verse.words.map((word, wordIndex) => (
                  <span
                    key={`${verseIndex}-${wordIndex}`}
                    className={`${styles.word} ${
                      word.audio_url ? styles.clickable : ''
                    }`}
                    onClick={() => {
                      playAudio(word.audio_url)
                      console.log(data?.verses[0].words)
                    }}>
                    {word.text_uthmani}
                  </span>
                ))}
                <span   className={styles.verseNumber}>{verse.verse_number}</span>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
