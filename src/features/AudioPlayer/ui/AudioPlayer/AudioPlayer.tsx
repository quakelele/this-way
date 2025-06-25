import { useRef, useState } from 'react'
import { Ayah } from 'features/QuranReader/model/types'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import styles from './AudioPlayer.module.scss'
import { useGetAudioQuery } from 'features/QuranReader/api/quranApi'
// import { useGetAudioQuery } from 'features/QuranReader/api/quranApi'

interface Props {
  ayah: Ayah
}

const AudioPlayer = ({ ayah } : Props) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)

  const { data } = useGetAudioQuery(ayah?.verse_key)
  const audoUrl = data?.data?.audioSecondary[0]


  const handlePlay = async () => {
    if (!audoUrl) {
      console.error(
        'No audio URL for ayah:',
        ayah.id,
        'verse_key:',
        `${data?.surah?.number}:${data?.surah?.numberOfAyahs}`
      )
      return
    }

    if (!audioRef.current) return

    if (isPlaying) {
      setCurrentTime(audioRef.current.currentTime) // Сохраняем позицию
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      try {
        // Устанавливаем src только если изменился аят
        if (audioRef.current.src !== audoUrl) {
          audioRef.current.src = audoUrl
          audioRef.current.currentTime = 0 // Новый аят с начала
        } else {
          audioRef.current.currentTime = currentTime // Восстанавливаем позицию
        }

        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Audio playback error:', error)
        setIsPlaying(false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <button
        className={`${styles.actionButton} ${
          isPlaying ? styles.actionButtonPlaying : ''
        }`}
        onClick={handlePlay}
        disabled={isLoading || !audoUrl}
        title={
          audoUrl
            ? isPlaying
              ? 'Пауза'
              : 'Воспроизвести аят'
            : 'Аудио недоступно'
        }>
        {isLoading ? (
          <LoadingOutlined />
        ) : isPlaying ? (
          <PauseCircleOutlined />
        ) : (
          <PlayCircleOutlined />
        )}
      </button>
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />
      {!audoUrl && (
        <span className={styles.audioWarning}>Аудио для аята недоступно</span>
      )}
    </>
  )
}

export default AudioPlayer
