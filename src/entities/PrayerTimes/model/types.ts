import { LucideIcon } from 'lucide-react';
import { Dayjs } from 'dayjs';

export interface MonthlPrayerTime {
  date: string
  hijri: string
  arabicDate?: string
  timings: {
    Fajr: string
    Sunrise: string
    Dhuhr: string
    Asr: string
    Maghrib: string
    Isha: string
  }
}
export interface AladhanMeta {
  timezone: string;
}

// 1 день в месячном запросе
export interface AladhanDay {
  date: AladhanDate;
  timings: AladhanTimings;
  meta: AladhanMeta;
}

// Ответ для /calendar (месяц)
export interface AladhanMonthResponse {
  code: number;
  data: AladhanDay[];
  status?: string;
}

export interface AladhanTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}
export interface AladhanDate {
  readable: string;
  hijri: {
    day: string;
    month: { en: string };
    year: string;
  };
}



export interface AladhanMonthResponse {
  code: number;
  data: AladhanDay[];
  status?: string;
}
export interface AladhanResponse {
  code: number;
  data: AladhanDay[]; // ← здесь должен быть массив AladhanDay с timings
  status?: string;
}

export interface PrayerQueryBase {
  latitude: number;
  longitude: number;
  method: number;
  timezone: string;
}

export interface PrayerMonthQuery extends PrayerQueryBase {
  month: number;
  year: number;
}
export interface AladhanTodayResponse {
  code: number;
  data: {
    date: AladhanDate;
    timings: AladhanTimings;
    meta: AladhanMeta;
  };
  status?: string;
}

export type PrayerFormType = {
  city: string
  country: string
}

export type FormOption = {
  value: string
  label: string
  children?: { value: string; label: string }[]
}
export interface TodayPrayerTime {
  key: string;
  prayer: string;
  time: string;
  isBanner: boolean
  bannerText: string
}


export interface Prayer {
  key: string;
  prayer: string;
  time: string; // Формат "HH:mm"
}

export interface NextPrayer extends Prayer {
  diff: number;
  remaining: string;
}

export interface PrayerIcon {
  icon: LucideIcon;
  label: string;
}

export interface Location {
  city: string;
  lat: number;
  lng: number;
  timezone: string;
  isAuto: boolean;
}

export interface PrayerTimesProps {
  currentTime: Dayjs;
  todayPrayerTimes: Prayer[];
  todayFetching: boolean;
  nextPrayer: NextPrayer | null;
  currentPrayer: string | null;
  timezone: string;
  location: Location | null;
}