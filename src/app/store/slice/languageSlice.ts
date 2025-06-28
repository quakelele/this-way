import { createSlice } from '@reduxjs/toolkit'

// Попытка взять из localStorage
const savedLang = localStorage.getItem('language')

// Если нет — определить по браузеру
const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'az'

const initialLang = savedLang
  ? JSON.parse(savedLang)
  : {
      selectedLanguage: 'Русский',
      localLanguage: browserLang,
      translationLanguage: 45
    }

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: initialLang,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload
      localStorage.setItem('language', JSON.stringify(action.payload)) // сохраняем в localStorage
    },
  },
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer
