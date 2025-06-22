import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SearchFormTypes, SearchResponse } from 'shared/model/types'

export const searchApi = createApi({
  reducerPath: 'searchApi',
  tagTypes: ['Aya'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.quran.com/api/v4/search',
  }),
  endpoints: build => ({
    getAya: build.infiniteQuery<SearchResponse, SearchFormTypes, number>({
      query: ({ queryArg: { searchText, selectedLanguage, translationId }, pageParam }) => ({
        url: `?q=${searchText}&language=${selectedLanguage}&translations=${translationId}&size=5&page=${pageParam}`,
      }),
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          const totalPages = lastPage?.search?.total_pages
          return lastPageParam < totalPages ? lastPageParam + 1 : undefined
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
          return firstPageParam > 1 ? firstPageParam - 1 : undefined
        },
        maxPages: 3, // Ограничение на количество страниц в кэше
      },
      providesTags: [{ type: 'Aya', id: 'LIST' }],
    }),
  }),
})

export const { useGetAyaInfiniteQuery } = searchApi


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// // import { BASE_URL_SEARCH } from 'shared/api/config';
// import { SearchFormTypes, SearchResponse } from 'shared/model/types'

// export const searchApi = createApi({
//   reducerPath: 'searchApi',
//   tagTypes: ['Aya'],
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.quran.com/api/v4/search',
//   }),
//   endpoints: build => ({
//     getAya: build.query<SearchResponse, SearchFormTypes>({
//       query: ({ searchText, selectedLanguage, translationId }) => ({
//         url: `?q=${searchText}&language=${selectedLanguage}&translations=${translationId}`,
//         //   url: `?q=${searchText}&lang=${selectedLanguage}`,
//       }),

//       providesTags: [{ type: 'Aya', id: 'LIST' }],
//     }),
//   }),
// })

// export const { useGetAyaQuery, useLazyGetAyaQuery } = searchApi