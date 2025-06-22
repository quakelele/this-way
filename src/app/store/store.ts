import { configureStore } from '@reduxjs/toolkit'
import { locationApi } from 'entities/LocationSetting/api/locationApi'
import { searchApi } from 'features/QuranSearch/api/searchApi'
import locationFormReducer from './slice/locationForm'


export const store = configureStore({
  reducer: {
    locationForm: locationFormReducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,


  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(searchApi.middleware)
      .concat(locationApi.middleware)


})
export type RootState = ReturnType<typeof store.getState>
