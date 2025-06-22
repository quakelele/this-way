import { Clock12, Moon, MoonStar, SunMoon, Sunrise, Sunset } from 'lucide-react';
import { PrayerIcon } from '../model/types';


export const getPrayerIcons = (t: (key: string) => string): Record<string, PrayerIcon> => ({
  Фаджр: { icon: MoonStar, label: t('Фаджр') },
  Восход: { icon: Sunrise, label: t('Восход') },
  Зухр: { icon: Clock12, label: t('Зухр') },
  Аср: { icon: SunMoon, label: t('Аср') },
  Магриб: { icon: Sunset, label: t('Магриб') },
  Иша: { icon: Moon, label: t('Иша') },
});
// import { Clock12, Moon, MoonStar, SunMoon, Sunrise, Sunset } from 'lucide-react';
// import { PrayerIcon } from '../model/types';
// import { useTranslation } from 'shared/hooks/useTranslation';
// const { t } = useTranslation()
// export const prayerIcons: Record<string, PrayerIcon> = {
//   Фаджр: { icon: MoonStar, label: t('Фаджр') },
//   Восход: { icon: Sunrise, label: t('Восход') },
//   Зухр: { icon: Clock12, label: t('Зухр') },
//   Аср: { icon: SunMoon, label: t('Аср') },
//   Магриб: { icon: Sunset, label: t('Магриб') },
//   Иша: { icon: Moon, label: t('Иша') },
// };