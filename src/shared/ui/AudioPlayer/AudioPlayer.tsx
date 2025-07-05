import { FC, useEffect, useRef, useState } from 'react'
import { AudioButton } from '../AudioButton/AudioButton'
import { useLazyGetAudioQuery } from 'features/QuranReader/api/quranApi'
import styles from './AudioPlayer.module.scss'

interface AudioPlayerProps {
  surahKeys: string
  size?: number
  reciter: string
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ surahKeys,reciter}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const [lazyAudioHandler, {  isFetching }] = useLazyGetAudioQuery()


  const handlePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!isLoaded) {
      const res = await lazyAudioHandler({ surahKeys, reciter }).unwrap()
      const url = res?.data?.audioSecondary?.[0]
      if (!url) return
      audio.src = url
      await audio.play()
      setIsPlaying(true)
      setIsLoaded(true)
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      await audio.play()
      setIsPlaying(true)
    }
    
  }
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
  
    // Сброс состояния при смене чтеца
    audio.pause()
    audio.src = ''
    audio.load()
    setIsPlaying(false)
    setIsLoaded(false)
    audio.currentTime = 0
  }, [reciter])

  return (
    <div className={styles.controls}>

      <AudioButton
        type="play"
        size={2.2}
        isActive={isPlaying}
        isLoading={isFetching}
        onClick={handlePlay}
        disabled={isFetching}
        title={isPlaying ? 'Пауза' : 'Воспроизвести'}
      />
      <AudioButton
        type="repeat"
        size={2.2}
        isActive={repeat}
        onClick={() => setRepeat(prev => !prev)}
        title="Повтор"
      />
      <audio
        ref={audioRef}
        onEnded={() => {
          if (repeat) {
            audioRef.current?.play()
          } else {
            setIsPlaying(false)
            audioRef.current!.currentTime = 0
          }
        }}
        preload="none"
      />
    </div>
  )
}
