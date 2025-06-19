import {  TodayPrayerTime } from 'entities/PrayerTimes/model/types';
import styles from '../PrayerTimes/PrayerTimes.module.scss';
import { prayerIcons } from 'entities/PrayerTimes/utils/prayerIcons';
interface PrayerItemProps {
    prayer: TodayPrayerTime;
    isActive: boolean;
  }
  
  export const PrayerItem: React.FC<PrayerItemProps> = ({ prayer, isActive }) => {
    const Icon = prayerIcons[prayer.prayer].icon;
    return (
      <div className={`${styles.prayerItem} ${isActive ? styles.active : ''}`}>
        <div className={styles.prayerInfo}>
          <Icon size={35} className={`${styles.icon} ${styles.prayerIcon} ${isActive ? styles.activeIcon : ''}`} />
          <span className={styles.prayerName}>{prayer.prayer}</span>
        </div>
        <span className={styles.prayerTime}>{prayer.time}</span>
      </div>
    );
  };