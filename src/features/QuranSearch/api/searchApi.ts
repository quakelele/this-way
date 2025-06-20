import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { BASE_URL_SEARCH } from 'shared/api/config';
import { SearchFormTypes, SearchResponse } from 'shared/model/types';



export const searchApi = createApi({
    reducerPath: 'searchApi',
    tagTypes: ['Aya'],
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://api.quran.com/api/v4/search',
    }),
    endpoints: build => ({
      getAya: build.query<SearchResponse, SearchFormTypes  >({
        query: ({ searchText, selectedLanguage }) => ({
          url: `?q=${searchText}&language=${selectedLanguage}&translations=45`,
        //   url: `?q=${searchText}&lang=${selectedLanguage}`,
        }),

        providesTags: [{ type: 'Aya', id: 'LIST' }],
      }),
    }),
  });
  
export const { useGetAyaQuery, useLazyGetAyaQuery } = searchApi



