import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const quranApi = createApi({
  tagTypes: ['Aya'],
  reducerPath: 'quranApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.quran.com/api/v4/' }),
  endpoints: build => ({
    getAya: build.infiniteQuery({
      query: ({ queryArg: { chapter_id }, pageParam }) => ({
        url: `verses/by_chapter/${chapter_id}?translations=45&language=ru&fields=text_uthmani,translations&per_page=4&page=${page}`,
      }),
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          const totalPages = lastPage?.pagination.total_pages
          return lastPage < totalPages ? lastPageParam + 1 : undefined
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
          return firstPageParam > 1 ? firstPageParam - 1 : undefined
        },
        maxPages: 3,
      },
      providesTags: [{ type: 'Aya', id: 'LIST' }],
    }),
  }),
})

export const {

    useGetAyaInfiniteQuery
} = quranApi
