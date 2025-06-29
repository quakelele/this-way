export type TranslationOption = {
  label: string
  value: number // selectedLanguage
  selectedLanguage: string
  localLanguage: string
}

export const options = [
  { label: 'Русский (Кулиев)', value: 45, selectedLanguage: 'ru' },
  { label: 'Русский (Абу Адель)', value: 79, selectedLanguage: 'ru' },
  { label: 'Azerbaijan (Alikhan Musayev)', value: 75, selectedLanguage: 'az' },
  { label: 'Turkish (Türkçe)', value: 77, selectedLanguage: 'tr' },
  { label: 'English (English)', value: 85, selectedLanguage: 'en' },
]

// { label: 'Arabic (العربية")', value: 'ar', translationId: 75 },
