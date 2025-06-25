import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const quranApi = createApi({
  tagTypes: ['Ayas'],
  reducerPath: 'quranApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.quran.com/api/v4/' }),
  endpoints: build => ({
    getAya: build.infiniteQuery({
      query: ({ queryArg: chapter_id, pageParam }) => {
        // console.log('query chapterId', chapter_id)
        return {
          url: `verses/by_chapter/${chapter_id}?translations=45&language=ru&fields=text_uthmani,translations&per_page=4&page=${pageParam}`,
        }
      },
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: lastPage => {
          const currentPage = lastPage.pagination.current_page
          const totalPages = lastPage.pagination.total_pages
          return currentPage < totalPages ? currentPage + 1 : undefined
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
          return firstPageParam > 1 ? firstPageParam - 1 : undefined
        },
      },
      providesTags: [{ type: 'Ayas', id: 'LIST' }],
    }),
        getTransliteration: build.query<{ text: string }, string>({
      query: (verseKey) => ({
        url: `https://api.alquran.cloud/v1/ayah/${verseKey}/en.transliteration`,
        baseUrl: '',
      }),
    }),
    getAudio: build.query<{ audio: any }, any>({
      query: (verseKey) => ({
        url: `https://api.alquran.cloud/v1/ayah/${verseKey}/ar.alafasy`,
        baseUrl: '',
      }),
    }),
  }),
})

export const { useGetAyaInfiniteQuery, useGetAudioQuery, useGetTransliterationQuery } = quranApi

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { QuranResponse, Ayah } from '../model/types';

// export const quranApi = createApi({
//   reducerPath: 'quranApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://api.quran.com/api/v4/' }),
//   endpoints: (builder) => ({
//     getAyahs: builder.query<QuranResponse, { chapterId: number; page: number }>({
//       query: ({ chapterId, page }) =>
//         `verses/by_chapter/${chapterId}?translations=45&language=ru&fields=text_uthmani,translations&per_page=4&page=${page}`,
//     }),
//     getSurahName: builder.query<{ name: string }, number>({
//       query: (chapterId) => `chapters/${chapterId}?language=ru`,
//     }),
//     getTransliteration: builder.query<{ text: string }, string>({
//       query: (verseKey) => ({
//         url: `https://api.alquran.cloud/v1/ayah/${verseKey}/en.transliteration`,
//         baseUrl: '',
//       }),
//     }),
//     getAudio: builder.query<{ audio: any }, any>({
//       query: (verseKey) => ({
//         url: `https://api.alquran.cloud/v1/ayah/${verseKey}/ar.alafasy`,
//         baseUrl: '',
//       }),
//     }),
//     getAyahById: builder.query<Ayah, string>({
//       query: (verseKey) =>
//         `verses/by_key/${verseKey}?translations=45&language=ru&fields=text_uthmani,translations`,
//     }),
//   }),
// });

// export const {
//   useGetAyahsQuery,
//   useGetSurahNameQuery,
//   useGetTransliterationQuery,
//   useGetAudioQuery,
//   useGetAyahByIdQuery,
// } = quranApi;
