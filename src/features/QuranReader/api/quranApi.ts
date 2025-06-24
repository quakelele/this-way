import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QuranResponse, Ayah } from '../model/types';

export const quranApi = createApi({
  reducerPath: 'quranApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.quran.com/api/v4/' }),
  endpoints: (builder) => ({
    getAyahs: builder.query<QuranResponse, { chapterId: number; page: number }>({
      queryFn: async ({ chapterId, page }) => {
        try {
          // Запрос для текста и переводов
          const versesResponse = await fetch(
            `https://api.quran.com/api/v4/verses/by_chapter/${chapterId}?translations=45&language=ru&fields=text_uthmani,translations&per_page=4&page=${page}`
          );
          if (!versesResponse.ok) {
            throw new Error(`Verses request failed: ${versesResponse.status}`);
          }
          const versesData = await versesResponse.json();
          console.log('Verses data:', versesData); // Отладка

          // Запрос для названия суры
          let surahName = '';
          if (versesData.verses?.length > 0) {
            const chapterResponse = await fetch(
              `https://api.quran.com/api/v4/chapters/${chapterId}?language=ru`
            );
            if (!chapterResponse.ok) {
              throw new Error(`Chapter request failed: ${chapterResponse.status}`);
            }
            const chapterData = await chapterResponse.json();
            surahName = chapterData.chapter?.translated_name?.name || 'Неизвестная сура';
          }

          // Комбинируем данные
          const ayahs = await Promise.all(
            versesData.verses.map(async (verse: any) => {
              const verseKey = `${chapterId}:${verse.verse_number}`;
              let transliteration = '';
              let audioUrl = '';
              try {
                // Запрос для транслитерации
                const transliterationResponse = await fetch(
                  `https://api.alquran.cloud/v1/ayah/${verseKey}/en.transliteration`
                );
                if (transliterationResponse.ok) {
                  const transliterationData = await transliterationResponse.json();
                  transliteration = transliterationData.data?.text || '';
                }

                // Запрос для аудио аята (Mishari Alafasy)
                const audioResponse = await fetch(
                  `https://api.alquran.cloud/v1/ayah/${verseKey}/ar.alafasy`
                );
                if (audioResponse.ok) {
                  const audioData = await audioResponse.json();
                  audioUrl = audioData.data?.audio || '';
                }
              } catch (err) {
                console.warn(`Error for ${verseKey}: ${err.message}`);
              }
              console.log(`Audio URL for ${verseKey}:`, audioUrl); // Отладка

              return {
                id: verse.id,
                number: verse.verse_number,
                arabicText: verse.text_uthmani || '',
                translation: verse.translations?.[0]?.text || 'Перевод отсутствует',
                transliteration,
                surahNumber: chapterId,
                surahName,
                audioUrl,
              };
            })
          );

          return {
            data: {
              ayahs,
              totalPages: versesData.pagination?.total_pages || 1,
              currentPage: versesData.pagination?.current_page || page,
              hasMore: versesData.pagination?.next_page !== null,
            },
          };
        } catch (error) {
          console.error('Query error:', error);
          return { error: { message: error.message || 'Unknown error' } };
        }
      },
    }),
    getAyahById: builder.query<Ayah, string>({
      queryFn: async (verseKey) => {
        try {
          // Запрос для текста и переводов
          const verseResponse = await fetch(
            `https://api.quran.com/api/v4/verses/by_key/${verseKey}?translations=45&language=ru&fields=text_uthmani,translations`
          );
          if (!verseResponse.ok) {
            throw new Error(`Verse request failed: ${verseResponse.status}`);
          }
          const verseData = await verseResponse.json();

          // Запрос для аудио аята
          let audioUrl = '';
          try {
            const audioResponse = await fetch(
              `https://api.alquran.cloud/v1/ayah/${verseKey}/ar.alafasy`
            );
            if (audioResponse.ok) {
              const audioData = await audioResponse.json();
              audioUrl = audioData.data?.audio || '';
            }
          } catch (err) {
            console.warn(`Audio request error for ${verseKey}: ${err.message}`);
          }
          console.log(`Audio URL for ${verseKey}:`, audioUrl); // Отладка

          // Запрос для названия суры
          const chapterResponse = await fetch(
            `https://api.quran.com/api/v4/chapters/${verseData.verse.chapter_id}?language=ru`
          );
          if (!chapterResponse.ok) {
            throw new Error(`Chapter request failed: ${chapterResponse.status}`);
          }
          const chapterData = await chapterResponse.json();
          const surahName = chapterData.chapter?.translated_name?.name || 'Неизвестная сура';

          // Запрос для транслитерации
          let transliteration = '';
          try {
            const transliterationResponse = await fetch(
              `https://api.alquran.cloud/v1/ayah/${verseKey}/en.transliteration`
            );
            if (transliterationResponse.ok) {
              const transliterationData = await transliterationResponse.json();
              transliteration = transliterationData.data?.text || '';
            }
          } catch (err) {
            console.warn(`Transliteration error for ${verseKey}: ${err.message}`);
          }

          return {
            data: {
              id: verseData.verse.id,
              number: verseData.verse.verse_number,
              arabicText: verseData.verse.text_uthmani || '',
              translation: verseData.verse.translations?.[0]?.text || 'Перевод отсутствует',
              transliteration,
              surahNumber: verseData.verse.chapter_id,
              surahName,
              audioUrl,
            },
          };
        } catch (error) {
          console.error('Query error:', error);
          return { error: { message: error.message || 'Unknown error' } };
        }
      },
    }),
  }),
});

export const { useGetAyahsQuery, useGetAyahByIdQuery } = quranApi;