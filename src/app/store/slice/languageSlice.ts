import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Language {
  selectedLanguage: string
  localLanguage: string
  translationLanguage: number
  isTajweedEnabled: boolean
}

interface LanguageState {
  lang: Language
}

const savedLang = localStorage.getItem('language')

const initialLang: Language = savedLang
  ? JSON.parse(savedLang)
  : {
      selectedLanguage: 'Русский',
      localLanguage: 'ru',
      translationLanguage: 45,
      isTajweedEnabled: false,
    }

const initialState: LanguageState = {
  lang: initialLang,
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Partial<Language>>) => {
      state.lang = { ...state.lang, ...action.payload }
      localStorage.setItem('language', JSON.stringify(state.lang))
    },
    setLanguageFromHeader: (state, action: PayloadAction<string>) => {
      state.lang = { ...state.lang, localLanguage: action.payload }
      localStorage.setItem('language', JSON.stringify(state.lang))
    },
  },
})

export const { setLanguage, setLanguageFromHeader } = languageSlice.actions
export default languageSlice.reducer
