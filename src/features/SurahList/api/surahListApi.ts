

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



// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// export const surahListApi = createApi({
//   tagTypes: ['surah'],
//   reducerPath: 'surahListApi',
//   baseQuery: fetchBaseQuery({ baseUrl: "https://api.quran.com/api/v4/" }),
//   endpoints: build => ({
//     getSurahList: build.infiniteQuery({
//       query: ({ language, pageParam }) => {
        
//         console.log("RTK LANGUAGE", language)
//         return {
//           url: `chapters?language=${language.localLanguage}`,
//         }
//       },
//       infiniteQueryOptions: {
//         initialPageParam: 1,
//         getNextPageParam: lastPage => {
//           const currentPage = lastPage.pagination.current_page
//           const totalPages = lastPage.pagination.total_pages
//           return currentPage < totalPages ? currentPage + 1 : undefined
//         },
//         getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
//           return firstPageParam > 1 ? firstPageParam - 1 : undefined
//         },
//       },
//       providesTags: [{ type: 'surah', id: 'LIST' }],
//     }),



//   }),
// })

// export const {
//   useGetSurahListInfiniteQuery
// } = surahListApi

