// src/entities/Mushaf/api/mushafApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mushafApi = createApi({
  reducerPath: 'mushafApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.quran.com/api/v4/',
    prepareHeaders: headers => {
      headers.set('x-auth-token', '0B9..x-IClgh6fwF3Z0dq_ezy8');
      headers.set('x-client-id', '78b167cc-11e0-44a2-b840-efedbae13346');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    getMushafPage: builder.query({
      query: (page) =>
        `verses/by_page/${page}?words=true&word_fields=text_uthmani,audio_url&fields=hizb_number,ruku_number,manzil_number,sajdah_number,juz_number,text_uthmani`,

    }),
  }),
});

export const { useGetMushafPageQuery } = mushafApi;
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const mushafApi = createApi({
//   reducerPath: 'mushafApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.quran.com/api/v4/',
//     prepareHeaders: headers => {
//       headers.set('x-auth-token', '0B9..x-IClgh6fwF3Z0dq_ezy8');
//       headers.set('x-client-id', '78b167cc-11e0-44a2-b840-efedbae13346');
//       headers.set('Accept', 'application/json');
//       return headers;
//     },
//   }),
//   endpoints: builder => ({
//     getMushafPage: builder.query({
//       query: (page) =>
//         `verses/by_page/${page}?words=true&fields=hizb_number,ruku_number,manzil_number,sajdah_number,juz_number,text_uthmani`,
//       transformResponse: (response: { verses: any[] }) => ({
//         verses: response.verses.map(verse => ({
//           text_uthmani: verse.text_uthmani,
//           verse_number: `﴿${verse.verse_number.toLocaleString('ar-EG')}﴾`,
//           words: verse.words
//             .filter(word => word.char_type_name !== 'end')
//             .map(word => ({
//               text: word.text_uthmani || word.text,
//               audio_url: word.audio_url,
//             })),
//         })),
//         page_number: response.verses[0]?.page_number,
//       }),
//     }),
//   }),
// });

// export const { useGetMushafPageQuery } = mushafApi;


// transformResponse: (response: { verses: any[] }) => ({
//   verses: response.verses.map(verse => ({
//     text_uthmani: verse.text_uthmani,
//     verse_number: `﴿${verse.verse_number.toLocaleString('ar-EG')}﴾`,
//     words: verse.words
//       .filter(word => word.char_type_name !== 'end')
//       .map(word => ({
//         text_uthmani: word.text_uthmani,
//         audio_url: word.audio_url,
//       })),
//   })),
  
//   page_number: response.verses[0]?.page_number,
// }),