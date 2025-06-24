export type SearchResponse = {
  search: SearchData
}
type SearchData = {
  query: string
  results: ResultType[]
  total_results: number
  total_pages: number
  current_page: number
}

export interface Translation {
  text: string
  surahAyah: string
  arabicText: string
  search: string
  resource_id: number
}
type ResultType = {
  verse_key: string
  verse_id: number
  text: string
  words: string
  translations: Translation[]
}

export interface SearchFormTypes {
  searchText: string
  translationId: number
  selectedLanguage: string
}

export interface Verse {
  id?: number
  text: string
  translation: string
}

// export interface Surah {
//   id: number
//   name: string
//   transliteration: string
//   translation: string
// }

export interface Language {
  code: string
  name: string
  nativeName: string
  direction: 'ltr' | 'rtl'
}

export const LANGUAGE_MAP: Record<string, Language> = {
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr' },
  en: { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr' },
  id: {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    direction: 'ltr',
  },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr' },
  sv: { code: 'sv', name: 'Swedish', nativeName: 'Svenska', direction: 'ltr' },
  tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr' },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', direction: 'ltr' },
  transliteration: {
    code: 'transliteration',
    name: 'Transliteration',
    nativeName: 'Transliteration',
    direction: 'ltr',
  },
}

export interface AudioRecitation {
  reciter: string
  url: string
  originalUrl: string
  type?: 'complete_surah' | 'single_verse'
}

export interface AudioData {
  [key: string]: AudioRecitation
}

export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}