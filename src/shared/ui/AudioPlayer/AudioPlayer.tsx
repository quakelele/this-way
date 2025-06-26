import { FC, useEffect, useRef, useState } from 'react'
import { AudioButton } from '../AudioButton/AudioButton'
import { useLazyGetAudioQuery } from 'features/QuranReader/api/quranApi'
import styles from './AudioPlayer.module.scss'
import { Select } from 'antd'

interface AudioPlayerProps {
  surahKeys: string
  size?: number
  reciter: string
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ surahKeys, size = 3 ,reciter}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const [lazyAudioHandler, { data, isFetching }] = useLazyGetAudioQuery()


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


  return (
    <div className={styles.controls}>

      <AudioButton
        type="play"
        size={size}
        isActive={isPlaying}
        isLoading={isFetching}
        onClick={handlePlay}
        disabled={isFetching}
        title={isPlaying ? 'Пауза' : 'Воспроизвести'}
      />
      <AudioButton
        type="repeat"
        size={size}
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
