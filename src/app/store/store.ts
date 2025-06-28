import { configureStore } from '@reduxjs/toolkit'
import { locationApi } from 'entities/LocationSetting/api/locationApi'
import { searchApi } from 'features/QuranSearch/api/searchApi'
import locationFormReducer from './slice/locationForm'
import languageReducer from './slice/languageSlice'
import { quranApi } from 'features/QuranReader/api/quranApi'
import { surahListApi } from 'features/SurahList/api/surahListApi'

export const store = configureStore({
  reducer: {
    language: languageReducer,
    locationForm: locationFormReducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [surahListApi.reducerPath]: surahListApi.reducer,
    [quranApi.reducerPath]: quranApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(searchApi.middleware)
      .concat(locationApi.middleware)
      .concat(surahListApi.middleware)
      .concat(quranApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
