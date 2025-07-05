import { PrayerTimes } from 'entities'
import { LocationSetting } from 'entities/LocationSetting/ui/LocationSetting/LocationSetting'
import styles from './PrayerTimePage.module.scss'
export const PrayerTimePage = () => {
  // const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <PrayerTimes  />
      <div className={styles.section}>
        <LocationSetting />
      </div>
    </div>
  )
}
