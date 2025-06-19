import { Clock12, Moon, MoonStar, SunMoon, Sunrise, Sunset } from 'lucide-react';
import { PrayerIcon } from '../model/types';

export const prayerIcons: Record<string, PrayerIcon> = {
  Фаджр: { icon: MoonStar, label: 'Фаджр' },
  Восход: { icon: Sunrise, label: 'Восход' },
  Зухр: { icon: Clock12, label: 'Зухр' },
  Аср: { icon: SunMoon, label: 'Аср' },
  Магриб: { icon: Sunset, label: 'Магриб' },
  Иша: { icon: Moon, label: 'Иша' },
};