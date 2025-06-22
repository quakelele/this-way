import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { customOffsets, timeAdjustments } from '../config/adjustments';
import { useTranslation } from 'shared/hooks/useTranslation';

type Prayer = {
  key: string
  prayer: string
  time: string // формат "HH:mm"
}

// Хук для текущего времени
export const useCurrentTime = (): Dayjs => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(dayjs()), 60000);
    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

// Существующие функции
export const getCurrentDate = () => {
  const today = dayjs();
  return {
    date: today.format('DD-MM-YYYY'),
    month: today.format('MM'),
    year: today.format('YYYY'),
  };
};

export const adjustPrayerTime = (time: string, city: string, prayer: string): string => {
  if (!time) return time;

  const cleanTime = time.split(' ')[0];
  const [hours, minutes] = cleanTime.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    console.error(`Invalid time format for ${city}: ${time}`);
    return time;
  }

  let totalMinutes = hours * 60 + minutes;
  const baseAdjustment = timeAdjustments[city] || 0;
  const customAdjustment = customOffsets[city]?.[prayer] || 0;

  totalMinutes += baseAdjustment + customAdjustment;
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  if (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60;

  const newHours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const newMinutes = (totalMinutes % 60).toString().padStart(2, '0');
  return `${newHours}:${newMinutes}`;
};

function pluralize(value: number, forms: [string, string, string]) {
  const mod10 = value % 10;
  const mod100 = value % 100;

  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export const getNextPrayer = (prayers: Prayer[], t:any) => {

  if (!prayers || prayers.length === 0) return null;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const withDiffs = prayers.map(p => {
    const [h, m] = p.time.split(':').map(Number);
    const totalMinutes = h * 60 + m;
    const diff = totalMinutes - nowMinutes;
    return {
      ...p,
      diff: diff >= 0 ? diff : diff + 1440,
    };
  });

  const nextPrayer = withDiffs.reduce((a, b) => (a.diff < b.diff ? a : b));
  const hours = Math.floor(nextPrayer.diff / 60);
  const minutes = nextPrayer.diff % 60;

  const hourText = pluralize(hours, [t('час'), t('часа'), t('часов')]);
  const minuteText = pluralize(minutes, [t('минута'), t('минуты'), t('минут')]);

  if (hours > 0 && minutes > 0) {
    return {
      ...nextPrayer,
      remaining: `${t('Осталось')} ${hours} ${hourText} и ${minutes} ${minuteText}`,
    };
  }

  if (hours > 0 && minutes === 0) {
    const verb = hours === 1 ? t('Остался') : t('Осталось');
    return {
      ...nextPrayer,
      remaining: `${verb} ${hours} ${hourText}`,
    };
  }

  if (hours === 0 && minutes > 0) {
    const verb = minutes === 1 ? t('Осталась') : t('Осталось');
    return {
      ...nextPrayer,
      remaining: `${verb} ${minutes} ${minuteText}`,
    };
  }

  return {
    ...nextPrayer,
    remaining: t('Сейчас'),
  };
};

export const getCurrentPrayer = (prayers: Prayer[], currentTime: Dayjs): string | null => {
  if (!prayers.length) return null;

  const nowMinutes = currentTime.hour() * 60 + currentTime.minute();

  for (let i = 0; i < prayers.length; i++) {
    const prayer = prayers[i];
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;

    if (nowMinutes >= prayerMinutes) {
      const nextPrayer = prayers[i + 1] || prayers[0];
      const [nextHours, nextMinutes] = nextPrayer.time.split(':').map(Number);
      const nextPrayerMinutes = nextHours * 60 + nextMinutes;
      if (nowMinutes < nextPrayerMinutes || i === prayers.length - 1) {
        return prayer.key;
      }
    }
  }

  return null;
};