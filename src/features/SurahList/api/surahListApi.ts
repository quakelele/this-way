import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Chapters } from '../model/types'

export const surahListApi = createApi({
  reducerPath: 'surahListApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.quran.com/api/v4/' }),
  endpoints: builder => ({
    getSurahListByLanguage: builder.query<Chapters, { localLanguage: string }>({
      query: language => ({
        url: `https://api.quran.com/api/v4/chapters?language=${language.localLanguage}`,
      }),
    }),
  }),
})

export const { useGetSurahListByLanguageQuery } = surahListApi
