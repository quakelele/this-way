export const optionsQuranReader = [
  { label: 'Русский (Кулиев)', value: 45, localLanguage: 'ru' },
  { label: 'Русский (Абу Адель)', value: 79, localLanguage: 'ru' },
  { label: 'Azerbaijan (Alikhan Musayev)', value: 75, localLanguage: 'az'  },
  { label: 'Turkish (Türkçe)', value: 77,  localLanguage: 'tr' },
  { label: 'English (English)', value: 85,  localLanguage: 'en' },
]
export type TranslationOption = (typeof optionsQuranReader)[number]