import React from 'react';
import { ClockCircleOutlined as ClockIcon } from '@ant-design/icons';
import styles from '../PrayerTimes/PrayerTimes.module.scss';
import { Dayjs } from 'dayjs';
import { Location, NextPrayer } from 'entities/PrayerTimes/model/types';
interface PrayerHeaderProps {
  currentTime: Dayjs;
  nextPrayer: NextPrayer | null;
  location: Location | null;
}

export const PrayerHeader: React.FC<PrayerHeaderProps> = ({ currentTime, nextPrayer, location }) => {
  // Отладка для проверки location

  return (
    <div className={styles.header}>
      <div className={styles.time}>{currentTime.format('HH:mm')}</div>
      <div className={styles.date}>
        {currentTime.format('dddd, DD MMMM')} {location?.city ? `| ${location.city}` : '| Город не выбран'}
      </div>
      <div className={styles.nextPrayer}>
        <ClockIcon className={styles.clockIcon} />
        <span className={styles.remainingTime}>
          
          до {nextPrayer?.prayer || 'Н/Д'}: {nextPrayer?.remaining || 'Н/Д'}
        </span>
      </div>
    </div>
  );
};
