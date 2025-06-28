import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Chapters, SurahType } from '../model/types'

export const surahListApi = createApi({
  reducerPath: 'surahListApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.quran.com/api/v4/' }),
  endpoints: builder => ({
    getSurahListByLanguage: builder.query<Chapters, string>({
      query: language => ({
        url: `https://api.quran.com/api/v4/chapters?language=${language}`,
        baseUrl: '',
      }),
    }),
  }),
})

export const { useGetSurahListByLanguageQuery} = surahListApi
