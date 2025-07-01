import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { QuranResponse } from 'features/QuranReader/model/types'

export const mushafApi = createApi({
  reducerPath: 'mushafApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.alquran.cloud/v1/' }),
  endpoints: builder => ({
    getMushafPage: builder.query<QuranResponse, { page: number }>({
      query: ({ page }) => `page/${page}/quran-uthmani`,
    }),
  }),
})

export const { useGetMushafPageQuery } = mushafApi
