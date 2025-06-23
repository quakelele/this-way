import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/az';
import { useTranslation } from 'shared/hooks/useTranslation';
import { useSelector } from 'react-redux';

export const useLocalizedDate = (locationName?: string) => {
  const { t } = useTranslation();
  const lang = useSelector((state: any) => state.language.lang.localLanguage) || 'ru';

  dayjs.locale(lang);

  const date = dayjs().format('dddd, D MMMM');
  const capitalizedDate = date.charAt(0).toUpperCase() + date.slice(1);

  return locationName
    ? `${capitalizedDate} | ${locationName}`
    : capitalizedDate;
};
