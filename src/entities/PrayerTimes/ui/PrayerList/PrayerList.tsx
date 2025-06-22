import { TodayPrayerTime } from 'entities/PrayerTimes/model/types'
import styles from '../PrayerTimes/PrayerTimes.module.scss'
import { PrayerItem } from '../PrayerItem/PrayerItem'
import { Spin } from 'antd'
import { useTranslation } from 'shared/hooks/useTranslation'
interface PrayerListProps {
  prayers: TodayPrayerTime[]
  currentPrayer: string | null
  isLoading: boolean
}
export const PrayerList: React.FC<PrayerListProps> = ({
  prayers,
  currentPrayer,
  isLoading,
}) => {
  const { t } = useTranslation()
  return (
    <div className={styles.prayerList}>
      {isLoading ? (
        // <div>Загрузка...</div>
        isLoading && <Spin size="small" />
      ) : prayers.length ? (
        prayers.map(prayer => (
          <PrayerItem
            key={prayer.key}
            prayer={prayer}
            isActive={currentPrayer === prayer.key}
          />
        ))
      ) : (
        <div>{t('Нет данных о молитвах')}</div>
      )}
    </div>
  )
}
