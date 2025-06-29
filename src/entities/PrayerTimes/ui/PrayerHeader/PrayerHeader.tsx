import React from 'react'
import { ClockCircleOutlined as ClockIcon } from '@ant-design/icons'
import styles from '../PrayerTimes/PrayerTimes.module.scss'
import { Dayjs } from 'dayjs'
import { Location, NextPrayer } from 'entities/PrayerTimes/model/types'
import { useTranslation } from 'shared/hooks/useTranslation'
import { useLocalizedDate } from 'shared/hooks/useLocalizedDate'
interface PrayerHeaderProps {
  currentTime: Dayjs
  nextPrayer: NextPrayer | null
  location: Location | null
}

export const PrayerHeader: React.FC<PrayerHeaderProps> = ({
  currentTime,
  nextPrayer,
  location,
}) => {
  // Отладка для проверки location
  const { t } = useTranslation()
  const localizedDate = useLocalizedDate(location?.city)
  return (
    <div className={styles.header}>
      <div className={styles.time}>{currentTime.format('HH:mm')}</div>
      <div className={styles.date}>{localizedDate}</div>

      <div className={styles.nextPrayer}>
        <ClockIcon className={styles.clockIcon} />
        <span className={styles.remainingTime}>
          {nextPrayer?.remaining || t('Н/Д')}
        </span>
      </div>
    </div>
  )
}
