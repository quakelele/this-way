import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QuranResponse, Ayah } from '../model/types';

export const quranApi = createApi({
  reducerPath: 'quranApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.quran.com/api/v4/' }),
  endpoints: (builder) => ({
    getAyahs: builder.query<QuranResponse, { chapterId: number; page: number }>({
      query: ({ chapterId, page }) =>
        `verses/by_chapter/${chapterId}?translations=45&language=ru&fields=text_uthmani,translations&per_page=4&page=${page}`,
    }),
    getSurahName: builder.query<{ name: string }, number>({
      query: (chapterId) => `chapters/${chapterId}?language=ru`,
    }),
    getTransliteration: builder.query<{ text: string }, string>({
      query: (verseKey) => ({
        url: `https://api.alquran.cloud/v1/ayah/${verseKey}/en.transliteration`,
        baseUrl: '',
      }),
    }),
    getAudio: builder.query<{ audio: any }, any>({
      query: (verseKey) => ({
        url: `https://api.alquran.cloud/v1/ayah/${verseKey}/ar.alafasy`,
        baseUrl: '',
      }),
    }),
    getAyahById: builder.query<Ayah, string>({
      query: (verseKey) =>
        `verses/by_key/${verseKey}?translations=45&language=ru&fields=text_uthmani,translations`,
    }),
  }),
});

export const {
  useGetAyahsQuery,
  useGetSurahNameQuery,
  useGetTransliterationQuery,
  useGetAudioQuery,
  useGetAyahByIdQuery,
} = quranApi;
