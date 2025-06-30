import { useMemo } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru' // Импорт русской локали
import styles from './PrayerTimes.module.scss'
import { useLocationWithSearch } from 'entities/LocationSetting/hooks/useLocationWithSearch'
import { usePrayerTimes } from 'entities/PrayerTimes/hooks/usePrayerTimes'
import { DecorationSvg } from 'shared'
import { PrayerHeader } from '../PrayerHeader/PrayerHeader'
import { PrayerList } from '../PrayerList/PrayerList'
import {
  getCurrentPrayer,
  getNextPrayer,
  useCurrentTime,
} from 'entities/PrayerTimes/utils/helpers'
import { useTranslation } from 'shared/hooks/useTranslation'

// Установка русской локали
dayjs.locale('ru')

export const PrayerTimes = () => {
  const { todayPrayerTimes, todayFetching } = usePrayerTimes()
  const { location } = useLocationWithSearch()
  const currentTime = useCurrentTime()
  const { t } = useTranslation()
  // Отладка для проверки location

  // Мемоизация текущей и следующей молитвы
  const currentPrayer = useMemo(
    () => getCurrentPrayer(todayPrayerTimes, currentTime),
    [todayPrayerTimes, currentTime]
  )
  const nextPrayer = useMemo(
    () => getNextPrayer(todayPrayerTimes, t),
    [todayPrayerTimes, t]
  )

  return (
    <div className={styles.container}>
      <PrayerHeader
        currentTime={currentTime}
        nextPrayer={nextPrayer}
        location={location}
      />
      <PrayerList
        prayers={todayPrayerTimes}
        currentPrayer={currentPrayer}
        isLoading={todayFetching}
      />
      <div className={styles.decoration}>
        <DecorationSvg />
      </div>
    </div>
  )
}
