import { useSelector } from 'react-redux';
import az from 'locales/az.json';
import ru from 'locales/ru.json';

const resources = { az, ru };

export const useTranslation = () => {
  
  const lang = useSelector((state: any) => state.language.lang.localLanguage) || 'ru';
  const t = (key: string) => {
    const dict = resources[lang] || resources['ru'];
    if (!dict[key]) console.warn('🔍 MISSING KEY:', key);
    return dict[key] || key;
  };
  return { t };
};

