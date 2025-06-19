type PrayerKey = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
export const PRAYER_TYPES: { key: PrayerKey; label: string }[] = [
    { key: 'Fajr', label: 'Фаджр' },
    { key: 'Sunrise', label: 'Восход' },
    { key: 'Dhuhr', label: 'Зухр' },
    { key: 'Asr', label: 'Аср' },
    { key: 'Maghrib', label: 'Магриб' },
    { key: 'Isha', label: 'Иша' },
  ];
  