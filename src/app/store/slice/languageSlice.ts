import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Тип состояния
export interface Language {
  selectedLanguage: string
  localLanguage: string
  translationLanguage: number

}

interface LanguageState {
  lang: Language
}

// Попытка взять из localStorage
const savedLang = localStorage.getItem('language')

// Если нет — дефолтное значение
const initialLang: Language = savedLang
  ? JSON.parse(savedLang)
  : {
      selectedLanguage: 'Русский',
      localLanguage: 'ru',
      translationLanguage: 45,
      isTransliteration: false
    }

const initialState: LanguageState = {
  lang: initialLang,
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.lang = action.payload
      localStorage.setItem('language', JSON.stringify(action.payload))
    },
    setLanguageFromHeader(state, action) {
      state.lang = { ...state.lang, localLanguage: action.payload }
    
        localStorage.setItem('language', JSON.stringify({ ...state.lang, localLanguage: action.payload }))
     


  
    },
  },
})

export const { setLanguage , setLanguageFromHeader } = languageSlice.actions
export default languageSlice.reducer
